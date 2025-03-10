import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import yoctoSpinner from 'yocto-spinner';
import { type TokenGroup } from './types.js';
import isDesignToken from './is-design-token.js';

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
export default async (directory: string) => {
  const spinner = yoctoSpinner({
    text: 'Converting tokens to CSS variables…\n',
  }).start();

  let files: string[];

  try {
    files = await readdir(directory);
  } catch (error) {
    spinner.error(`Failed to read the tokens directory "${directory}".`);
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

      const fileContent = await readFile(path.join(directory, file), 'utf8');

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
    if (isDesignToken(value)) {
      // Skip tokens with empty or undefined scopes.
      // If the scope is empty, it's an extended style.
      // Extended styles are local to a component and not
      // meant for global use.
      //
      // These are similar in concept to our "private"-prefixed
      // CSS variables in code, but on the Figma side.
      if (!value.$extensions?.['com.figma']?.scopes?.length) {
        continue;
      }

      let cssValue: string;

      switch (value.$type) {
        case 'color':
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
        case 'fontFamily': {
          cssValue = `"${value.$value}"`;
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

      cssVariables.push(`${prefix}-${key.toLowerCase()}: ${cssValue};`);
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
