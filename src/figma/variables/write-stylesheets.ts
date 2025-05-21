import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import yoctoSpinner from 'yocto-spinner';
import { format } from 'prettier';
import { stylesheetsDirectory } from './constants.js';

/**
 * Writes CSS variables to the provided directory.
 */
export default async (cssVariables: Record<string, string[]>) => {
  if (!cssVariables) {
    throw new Error('There were no CSS variables to write.');
  }

  if (!stylesheetsDirectory) {
    throw new Error('A directory to write the stylesheets to is required.');
  }

  const spinner = yoctoSpinner({
    text: 'Converting variables to stylesheets…\n',
  }).start();

  for (const [collection, variables] of Object.entries(cssVariables)) {
    let cssContent = '/* Generated file. Do not edit directly. */';

    // We need to handle the CSS generation for our color collections
    // quite a bit differently from the other stylesheets. Light and dark
    // stylesheets use the same variable names, but different variable
    // values. They also set `color-scheme` and use different selectors
    // between light and dark modes.
    if (collection.startsWith('color-')) {
      const theme = collection.replace('color-', '');

      if (theme === 'light') {
        cssContent += `
          :root,
          :host,
          .theme-light {
            color-scheme: light;
            ${variables.join('\n  ')}
          }`;
      }

      if (theme === 'dark') {
        cssContent += `
          :host,
          .theme-dark {
            color-scheme: dark;
            ${variables.join('\n  ')}
          }`;
      }
    } else {
      // All non-color collections simply target `:root`.
      cssContent += `
        :root {
          ${variables.join('\n  ')}
        }`;
    }

    try {
      const formattedContent = await format(cssContent, {
        parser: 'css',
      });

      const cssPath = path.join(
        process.cwd(),
        `./${stylesheetsDirectory}/${collection}.css`,
      );

      const outputDirectory = path.dirname(cssPath);

      await mkdir(outputDirectory, { recursive: true });

      await writeFile(cssPath, formattedContent, 'utf8');
    } catch (error) {
      spinner.error('An error occurred generating the stylesheets.');
      throw error;
    }
  }

  spinner.success(
    `Stylesheets have been written to the "${stylesheetsDirectory}" directory.`,
  );
};
