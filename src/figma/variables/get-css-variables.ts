import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import yoctoSpinner from 'yocto-spinner';
import { type TokenGroup } from './types.js';
import isDesignToken from './is-design-token.js';
import { extendedVariables, tokensDirectory } from './constants.js';

/**
 * Reads the `.tokens.json` files generated from the previous step to
 * generate CSS variables, grouped by collection and mode,
 * from all of the Design Tokens. This function will return an
 * object in the following pattern:
 *
 * {
 *   "collection-1-mode-1": [
 *     "variable-1: #000000",
 *     "variable-2: #000001",
 *   ],
 *   "collection-1-mode-2": [
 *     "variable-1: #000000",
 *     "variable-2: #000001",
 *   ],
 *   "collection-2": [
 *     "variable-1: #ffffff,
 *     "variable-2: #000001,
 *   ]
 * }
 *
 * Each variable follows this naming convention to align with Design:
 *
 * --glide-core-{collection}-{category*}-{scope*}-{property}-{variant*}--{state*}
 *   * = optional
 *
 */
export default async () => {
  const spinner = yoctoSpinner({
    text: 'Converting tokens to CSS variables…\n',
  }).start();

  let files: string[];

  try {
    files = await readdir(tokensDirectory);
  } catch (error) {
    spinner.error(`Failed to read the tokens directory "${tokensDirectory}".`);
    throw error;
  }

  try {
    const variablesByCollection: Record<string, string[]> = {};

    for (const file of files) {
      // We follow the naming convention outlined by the
      // W3C draft by applying `.tokens.json` as the file extension.
      // It's safe to drop the extension completely at this point.
      const fileName = file.replace('.tokens.json', '');

      // Variable names should include the Figma collection they
      // are a part of.
      //
      // Because our temporary files are stored by collection,
      // we can use the file name to extract the collection and include
      // it in our variable name to match the naming convention
      // outlined at the top of this file.
      //
      // A dash is used to separate a collection from its mode
      // (e.g., {collection}-{mode}) from the previous step,
      // so we can safely split on it here to get the collection name.
      const tokenCollectionName = file.includes('-')
        ? fileName.split('-').at(0)
        : fileName;

      if (!tokenCollectionName) {
        throw new Error(
          `Could not determine the collection from the file "${file}".`,
        );
      }

      const fileContent = await readFile(
        path.join(tokensDirectory, file),
        'utf8',
      );

      const tokens = JSON.parse(fileContent.toString()) as TokenGroup;

      const variables = generateCSSVariablesFromTokens({
        prefix: `--glide-core-${tokenCollectionName}`,
        tokens,
      });

      variablesByCollection[fileName] = variables;
    }

    spinner.success('Tokens successfully converted to CSS variables.');

    return variablesByCollection;
  } catch (error) {
    spinner.error('An error occurred converting the tokens to CSS variables.');
    throw error;
  }
};

/**
 * Loops over every Design Token, looks at its `$type`, and determines
 * how to create a CSS property and value from it.
 */
function generateCSSVariablesFromTokens({
  prefix,
  tokens,
}: {
  prefix: string;
  tokens: TokenGroup;
}): string[] {
  const cssVariables: string[] = [];

  for (const [key, value] of Object.entries(tokens)) {
    // Design Token names can contain spaces, which don't
    // translate to CSS custom properties. We'll use a `-`
    // instead as our separator.
    const formattedPrefix = prefix.replaceAll(' ', '-');
    const variableName = `${formattedPrefix}-${key.toLowerCase()}`;

    if (isDesignToken(value)) {
      let isExtendedVariable = false;

      // When the scope is empty, it's an extended variable.
      // Extended variables are local to a component and not
      // meant for global use.
      //
      // These variables are similar in concept to our
      // "private"-prefixed CSS variables in code, but on
      // the Figma side.
      //
      // Some extended styles we need to make accessible
      // to our code to develop components and features.
      // These unique cases should be included in the
      // `extendedVariables` array in `constants.ts`.
      // When the variable is included, we generate a
      // "private"-prefixed CSS variable for them.
      //
      // These private variables are not meant to be used
      // outside of this repository.
      if (!value.$extensions?.['com.figma']?.scopes?.length) {
        const extendedVariable = extendedVariables.find((variable) =>
          variableName.endsWith(
            // Our `extendedVariables` array matches the naming
            // conventions of Figma for convenience. But this
            // means we need to format those variables so
            // that they can be translated to CSS custom
            // properties. We do this by replacing the invalid
            // characters with a `-` instead.
            variable.toLowerCase().replaceAll('/', '-').replaceAll(' ', '-'),
          ),
        );

        if (!extendedVariable) {
          continue;
        }

        isExtendedVariable = true;
      }

      let cssValue: string;

      switch (value.$type) {
        case 'color':
        case 'fontFamily':
        case 'string': {
          cssValue = value.$value;
          break;
        }
        case 'dimension': {
          const dimension = value.$value;
          cssValue = `${dimension.value}${dimension.unit}`;
          break;
        }
        case 'number':
        case 'fontWeight': {
          cssValue = value.$value.toString();
          break;
        }

        default: {
          // This shouldn't happen given all of the checks prior to this point.
          //
          // But why `JSON.stringify()`? It may not be needed, but if `value` happened
          // to be an object at this point, without `JSON.stringify()` we'd get
          // `[object Object]` logged. It's safer to always stringify.
          throw new Error(`Unknown $type for "${JSON.stringify(value)}".`);
        }
      }

      const variablePrefix = isExtendedVariable
        ? formattedPrefix.replace('--glide-core-', '--glide-core-private-')
        : formattedPrefix;

      cssVariables.push(`${variablePrefix}-${key.toLowerCase()}: ${cssValue};`);
    } else if (typeof value === 'object') {
      // Why wouldn't `value` be a Design Token?
      //
      // It's the start of our Token Group.
      // Remember how we store tokens:
      //
      // {
      //   "group": {
      //     "token-1": {
      //       "$type": "color",
      //       "$value": "#000000"
      //     }
      //   }
      // }
      //
      // At this stage in the process, we are at the `group` level.
      // We need to go one layer deeper to get to our actual
      // token, so we recursively call this function to
      // get there.
      cssVariables.push(
        ...generateCSSVariablesFromTokens({
          tokens: value,
          prefix: `${prefix}-${key.toLowerCase()}`,
        }),
      );
    }
  }

  return cssVariables;
}
