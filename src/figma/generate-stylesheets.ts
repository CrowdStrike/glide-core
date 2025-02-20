import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import yoctoSpinner from 'yocto-spinner';
import { type TokenGroup } from './types.js';
import isToken from './is-token.js';

/**
 * Reads the `.tokens.json` files generated from the previous step
 * to generate CSS stylesheets, grouped by collection and mode,
 * from all of the design tokens.
 *
 * Each variable follows this naming convention to align with design:
 *
 * --glide-core-{collection}-{category*}-{scope*}-{property}-{variant*}--{state*}
 *   * = optional
 *
 */
export default async ({
  outputDirectory,
  tokensDirectory,
}: {
  outputDirectory: string;
  tokensDirectory: string;
}) => {
  const spinner = yoctoSpinner({
    text: 'Converting tokens to stylesheets…\n',
  }).start();

  try {
    const files = await readdir(tokensDirectory);

    for (const file of files) {
      // We follow the naming convention outlined by the
      // W3C draft by applying `.tokens.json` as the file extension.
      // At this stage it is safe to drop the extension completely
      // as we only care about the file name from this point
      // on.
      const fileName = file.replace('.tokens.json', '');

      // Variable names should include the Figma collection they
      // are a part of.
      //
      // Because our temporary files are stored by collection,
      // we can use the file name to extract the collection and include
      // it in our variable name to match the naming convention
      // outlined at the top of this file.
      //
      // Dashes are used to separate a collection from its mode
      // (e.g., {collection}-{mode}) from the previous step,
      // so we can safely split on the dash here to get what we're after.
      const tokenCollectionName = file.includes('-')
        ? fileName.split('-').at(0)
        : fileName;

      if (!tokenCollectionName) {
        throw new Error(
          `Could not determine the collection from the file "${file}"`,
        );
      }

      const fileContent = await readFile(
        path.join(tokensDirectory, file),
        'utf8',
      );

      const tokens = JSON.parse(fileContent.toString()) as TokenGroup;

      const cssVariables = generateCSSVariablesFromTokens({
        prefix: `--glide-core-${tokenCollectionName}`,
        tokens,
      });

      let generatedContent = '/* Generated file. Do not edit directly. */';

      // We need to handle the CSS generation for our color collections
      // quite a bit differently from the other stylesheets. Light and dark
      // stylesheets use the same variable names, but different variable
      // values. They also set `color-scheme` and use different selectors
      // between light and dark modes.
      if (file.startsWith('color-')) {
        const theme = fileName.replace('color-', '');

        if (theme === 'light') {
          generatedContent += `\n:root,\n:host,\n.theme-light {\n  color-scheme: light;\n  ${cssVariables.join('\n  ')}\n}\n`;
        }

        if (theme === 'dark') {
          generatedContent += `\n:host,\n.theme-dark {\n  color-scheme: dark;\n  ${cssVariables.join('\n  ')}\n}\n`;
        }
      } else {
        // All non-color collections simply target `:root`.
        generatedContent += `\n:root {\n  ${cssVariables.join('\n  ')}\n}\n`;
      }

      const cssPath = path.join(
        process.cwd(),
        `./${outputDirectory}/${fileName}.css`,
      );

      const directory = path.dirname(cssPath);

      await mkdir(directory, { recursive: true });

      await writeFile(cssPath, generatedContent, 'utf8');
    }

    spinner.success(
      `Stylesheets have been written to the "${outputDirectory}" directory.`,
    );
  } catch (error) {
    spinner.error('An error occurred generating the stylesheets.');
    throw error;
  }
};

/**
 * Loops over every design token, looks at the `$type`, and determines
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
    if (isToken(value)) {
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
          if (typeof value.$value !== 'string') {
            throw new TypeError(
              `Unexpected value type for color/string: ${JSON.stringify(value.$value)}`,
            );
          }

          cssValue = value.$value;
          break;
        }
        case 'dimension': {
          if (typeof value.$value !== 'object') {
            throw new TypeError(
              `Unexpected value type for dimension: ${JSON.stringify(value.$value)}`,
            );
          }

          const dimension = value.$value;
          cssValue = `${dimension.value}${dimension.unit}`;
          break;
        }
        case 'number':
        case 'fontWeight': {
          if (typeof value.$value !== 'number') {
            throw new TypeError(
              `Unexpected value type for number/fontWeight: ${JSON.stringify(value.$value)}`,
            );
          }

          cssValue = value.$value.toString();
          break;
        }
        case 'fontFamily': {
          if (typeof value.$value !== 'string') {
            throw new TypeError(
              `Unexpected value type for fontFamily: ${typeof value.$value}`,
            );
          }

          cssValue = `"${value.$value}"`;
          break;
        }

        default: {
          cssValue = JSON.stringify(value.$value);
        }
      }

      cssVariables.push(`${prefix}-${key.toLowerCase()}: ${cssValue};`);
    } else if (typeof value === 'object') {
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
