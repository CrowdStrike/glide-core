import {
  type GetLocalVariablesResponse,
  type VariableScope,
  type LocalVariable,
  type VariableAlias,
  type RGB,
  type RGBA,
} from '@figma/rest-api-spec';
import yoctoSpinner from 'yocto-spinner';
import { type DesignToken, type TokenGroup, type TokensFile } from './types.js';
import isDesignToken from './is-design-token.js';

/**
 * Uses the `GetLocalVariablesResponse` meta from Figma's API to
 * generate Design Tokens¹ grouped by the Figma collection.
 *
 * 1: https://tr.designtokens.org/format/#design-token
 */
export default (meta: GetLocalVariablesResponse['meta']) => {
  if (!meta) {
    throw new Error('The JSON response from Figma was empty.');
  }

  const spinner = yoctoSpinner({ text: 'Parsing variables…\n' }).start();

  try {
    const { deletedButReferencedVariableNames, tokens } =
      buildTokensFromVariables(meta);

    if (deletedButReferencedVariableNames.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `\nThe following variables were listed as "deletedButReferenced". Report these to the design team for cleanup.\n${deletedButReferencedVariableNames?.map((variable) => `\n- ${variable}`)?.join('')}\n\n`,
      );
    }

    spinner.success('Tokens parsed.');

    return tokens;
  } catch (error) {
    spinner.error(
      'An error occurred generating tokens from the Figma variables.',
    );

    throw error;
  }
};

function rgbaNumberToHex(value: number) {
  const hex = Math.round(value * 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(color: RGB | RGBA) {
  const a = 'a' in color ? color.a : 1;

  const hex = [
    rgbaNumberToHex(color.r),
    rgbaNumberToHex(color.g),
    rgbaNumberToHex(color.b),
  ].join('');

  return `#${hex}${a === 1 ? '' : rgbaNumberToHex(a)}`;
}

function isRGBA(object: unknown): object is RGBA {
  return (
    typeof object === 'object' &&
    object !== null &&
    'r' in object &&
    'g' in object &&
    'b' in object &&
    'a' in object &&
    typeof (object as RGBA).r === 'number' &&
    typeof (object as RGBA).g === 'number' &&
    typeof (object as RGBA).b === 'number' &&
    typeof (object as RGBA).a === 'number'
  );
}

function isVariableAlias(object: unknown): object is VariableAlias {
  return (
    typeof object === 'object' &&
    object !== null &&
    'type' in object &&
    (object as VariableAlias).type === 'VARIABLE_ALIAS' &&
    'id' in object &&
    typeof (object as VariableAlias).id === 'string'
  );
}

function getTokenValueFromVariable({
  $type,
  modeId,
  scopes,
  variable,
  variables,
}: {
  $type: DesignToken['$type'];
  modeId: string;
  scopes: VariableScope[];
  variable: LocalVariable;
  variables: Record<string, LocalVariable>;
}): string | number | { value: number; unit: 'rem' } {
  const value = variable.valuesByMode[modeId];

  // When a variable is an object, it's either a color
  // or a `VariableAlias`.
  if (typeof value === 'object') {
    // A `VariableAlias` is a variable that references
    // another variable.
    if (isVariableAlias(value)) {
      const aliasedVariable = variables[value.id];

      if (!aliasedVariable) {
        throw new Error(`Aliased variable not found for "${value.id}".`);
      }

      const [maybeRgba] = Object.values(aliasedVariable.valuesByMode);

      // In some cases, a variable is only aliased one level deep
      // and we can extract the value immediately.
      // In other cases, a variable is aliased again (and again!),
      // which means we recursively need to call this function
      // until we get to a non-aliased variable value that we can parse.
      return isRGBA(maybeRgba)
        ? rgbToHex(maybeRgba)
        : getTokenValueFromVariable({
            $type,
            modeId,
            scopes,
            variable: aliasedVariable,
            variables,
          });
    }

    if (isRGBA(value)) {
      return rgbToHex(value);
    }

    throw new Error(
      `The variable "${JSON.stringify(value)}" is an object, but is unable to be parsed to a hex value or variable alias.`,
    );
  }

  if (typeof value === 'number') {
    // Figma's API returns numbers as pixels, but we prefer using
    // rem instead. Assuming a dimension¹ should use a rem unit
    // may not be true in the future, so we may need to update accordingly
    // as new use cases come in.
    //
    // 1: https://tr.designtokens.org/format/#dimension
    if ($type === 'dimension') {
      return { value: value / 16, unit: 'rem' };
    }

    return value;
  }

  return String(value);
}

function buildTokensFromVariables({
  variables,
  variableCollections,
}: {
  variables: GetLocalVariablesResponse['meta']['variables'];
  variableCollections: GetLocalVariablesResponse['meta']['variableCollections'];
}) {
  const tokens: Record<string, TokensFile> = {};
  const deletedButReferencedVariableNames: string[] = [];

  for (const variable of Object.values(variables)) {
    // A remote variable¹ is a type of variable that is defined and managed in a separate file
    // and can be used across multiple files or projects.
    // We should not use remote variables in our Design System as we instead rely on
    // local variables from the provided Figma file.
    //
    // 1: https://www.figma.com/developers/api?fuid=1111467023992153920#variables-types
    if (variable.remote) {
      continue;
    }

    // `deletedButReferenced¹` indicates that the variable was deleted in the editor,
    // but the document may still contain references to the variable.
    // References to the variable may exist through bound values or variable aliases.
    //
    // We should not generate a token from these variables, but we can notify the
    // design team of their existence, in hopes they can be properly removed from
    // Figma.
    //
    // 1: https://www.figma.com/developers/api?fuid=1111467023992153920#variables-types
    if (variable.deletedButReferenced) {
      deletedButReferencedVariableNames.push(variable.name);
      continue;
    }

    const collection = variableCollections[variable.variableCollectionId];

    if (!collection) {
      throw new Error(
        `Could not find a collection with the id of "${variable.variableCollectionId}".`,
      );
    }

    for (const mode of collection.modes) {
      // "mode" is used to differentiate between "light" and "dark" mode variables;
      // however, Figma also adds a default mode when one is not specified.
      // Typically this is labeled as "Mode 1". We could rely on "Mode 1", or we
      // could instead be explicit with our known, custom modes - "light" and "dark".
      //
      // If the time comes where we have additional modes to support,
      // we'll need to modify this logic.
      const modeName =
        mode.name.toLowerCase() === 'light' ||
        mode.name.toLowerCase() === 'dark'
          ? mode.name.toLowerCase()
          : null;

      // Token file names use the `.tokens.json` extension to follow the
      // file extension¹ guidance provided by the draft specification.
      //
      // Tokens are grouped based on the Figma collection they are a part of.
      // Some collections also have a mode specified, as outlined above.
      // Others do not, which we refer to as "modeless collections".
      // These are used for variables that don't need different values based on
      // the theme, for example. They contain a single set of values for each variable.
      //
      // The naming convention we use is `{collection}.tokens.json` for modeless collections.
      // Collections with modes should use kebab casing, e.g., `{collection}-{mode}.tokens.json`.
      //
      // Adjusting this naming convention will have consequences in other parts of the
      // export process, so take care in making changes here.
      //
      // Additionally, we use the collection and optional mode as the file name
      // as it aligns closely with what users see in Figma's UI. This helps with
      // troubleshooting.
      //
      // 1: https://tr.designtokens.org/format/#file-extensions
      const tokenFileName = modeName
        ? `${collection.name.toLowerCase()}-${modeName}.tokens.json`
        : `${collection.name.toLowerCase()}.tokens.json`;

      if (!tokens[tokenFileName]) {
        tokens[tokenFileName] = {};
      }

      let tokenGroup: TokenGroup = tokens[tokenFileName];

      // In Figma, variables can be organized by adding them to groups within a collection.
      // Here's how that looks in Figma's UI:
      //
      // color-collection/
      // ├─ parent-group/
      // │  ├─ child-group-1/
      // │  │  ├─ variable-1
      // │  │  ├─ variable-2
      // │  ├─ child-group-2/
      // │  │  ├─ variable-3
      //
      // In our API response, a Figma variable's name includes the group(s) it is part of,
      // separated by a `/`. `parent-group/child-group-1/variable-1` would be the full name
      // for `variable-1` in the example above.
      //
      // To make it easier to do a diff between Figma's UI and our generated
      // token JSON files, we put them in a similar format, where each group is a separate
      // key.
      //
      // {
      //   "parent-group": {
      //     "child-group": {
      //       "variable-1": #000000;
      //     }
      //   }
      // }
      //
      // To do this, we break the full name into parts separated by `/`.
      const parts = variable.name.split('/');

      for (const part of parts.values()) {
        if (!(part in tokenGroup) || isDesignToken(tokenGroup[part])) {
          tokenGroup[part] = {};
        }

        if (!tokenGroup[part]) {
          throw new Error(
            `Part "${part}" in "${JSON.stringify(tokenGroup)}" does not exist.`,
          );
        }

        tokenGroup = tokenGroup[part];
      }

      const $type = getTokenTypeFromVariable({
        scopes: variable.scopes,
        variable,
      });

      const token = {
        $type,
        $value: getTokenValueFromVariable({
          $type,
          modeId: mode.modeId,
          scopes: variable.scopes,
          variable,
          variables,
        }),
        $description: variable.description,
        $extensions: {
          'com.figma': {
            hiddenFromPublishing: variable.hiddenFromPublishing,
            scopes: variable.scopes,
            codeSyntax: variable.codeSyntax,
            mode: mode.name,
          },
        },
      } as Extract<DesignToken, { $type: typeof $type }>;

      // As mentioned above, the groups of a variable, separated by a `/`, are used as keys.
      //
      // Going back to the example above of the `parent-group/child-group-1/variable-1`
      // full name, `parent-group` and `child-group-1` will be nested keys in the object,
      // with `variable-1` holding the actual token value.
      //
      // Now that we have our token constructed, we simply need to grab the last
      // segment (`variable-1`) and write our token to it.
      const lastPart = parts.at(-1);

      if (!lastPart) {
        throw new Error(`Empty token name for variable "${variable.id}".`);
      }

      tokenGroup[lastPart] = token;
    }
  }

  return {
    deletedButReferencedVariableNames,
    tokens,
  };
}

/**
 * Converts a Figma variable's `resolvedType` to a Design Token `$type`.
 */
function getTokenTypeFromVariable({
  scopes,
  variable,
}: {
  scopes: VariableScope[];
  variable: LocalVariable;
}) {
  switch (variable.resolvedType) {
    case 'COLOR': {
      return 'color';
    }
    case 'FLOAT': {
      // Checking `scopes.includes('FONT_WEIGHT')` would
      // be great, but unfortunately our font-weight scopes
      // are coming back as `FONT_STYLE` from Figma's API.
      // They're scoped as "Font Weight" in Figma's UI though.
      // We'll keep looking into why that is.
      //
      // For now, we have to rely on `FONT_STYLE` and the
      // variable name starting with `weight/` to determine
      // if it is a weight and then manually remap the type.
      if (
        scopes.includes('FONT_STYLE') &&
        variable.name.toLowerCase().startsWith('weight/')
      ) {
        return 'fontWeight';
      }

      // `line-height` and `opacity` CSS properties are numbers¹.
      // There are more number types, of course, but we don't have needs
      // for them at the moment.
      //
      // 1: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#numbers
      if (scopes.includes('LINE_HEIGHT') || scopes.includes('OPACITY')) {
        return 'number';
      }

      // Unitless CSS values are numeric values without a specific unit of
      // measurement (like px, em, rem, etc.). They are typically used as
      // multipliers or ratios.
      //
      // `font-weight`, `opacity,` and `line-height` are currently the only
      // variables that are unitless from Figma. All other scopes that are
      // numbers should be converted from pixels to rems.
      //
      // As time goes on, we may collect additional unitless CSS values
      // that come back as a FLOAT from Figma. When that is the case, we'll
      // need to update this `case` block to handle these new units.
      //
      // Because we've handled fontWeight and other unitless cases above,
      // it's safe to assume that if we land here, we want these values in
      // rems and thus, can use the `dimension` type.
      return 'dimension';
    }
    case 'STRING': {
      if (scopes.includes('FONT_FAMILY')) {
        return 'fontFamily';
      }

      return 'string';
    }

    default: {
      throw new Error(
        `Could not convert Figma's "${variable.resolvedType}" resolvedType to a Design Token $type.`,
      );
    }
  }
}
