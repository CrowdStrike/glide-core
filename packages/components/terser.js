import { readFile, writeFile } from 'node:fs/promises';
import { globby } from 'globby';
import { minify } from 'terser';
import { minifyHTMLLiterals } from 'minify-literals';

const paths = await globby([
  'dist/**/*.js',
  '!**/.storybook/**',
  '!**/*stories*',
  '!**/*test*',
  '!**/cem-analyzer-plugins/**',
  '!**/coverage/**',
  '!**/eslint/**',
  '!**/figma/**',
  '!**/stylelint/**',
  '!**/ts-morph*/**',
]);

await paths.map(async (path) => {
  const unminified = await readFile(path, 'utf8');

  const { code } = await minify(unminified, {
    // Consumers expect unmangled class names in error messages when our
    // required attribute and slot assertions throw.
    keep_classnames: true,
  });

  const result = await minifyHTMLLiterals(code, {
    minifyOptions: {
      // Some of our classes were being removed because CleanCSS, which this plugin uses,
      // doesn't support CSS Nesting: https://github.com/clean-css/clean-css/issues/1254.
      minifyCSS: false,
    },
  });

  // `null` happens when there's no HTML as with `*.styles.ts`.
  await writeFile(path, result === null ? code : result.code);
});
