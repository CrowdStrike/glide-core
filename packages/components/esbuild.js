import { globby } from 'globby';
import { minifyHTMLLiterals } from 'minify-html-literals';
import { readFile } from 'node:fs/promises';
import esbuild from 'esbuild';

const entryPoints = await globby([
  'src/**/*.ts',
  '!**/*stories*',
  '!**/*test*',
]).then((paths) => {
  return paths.map((path) => {
    return {
      in: path,
      out: path.replace('src/', '').replace('.ts', ''),
    };
  });
});

await esbuild.build({
  entryPoints,
  minify: true,
  outbase: '.',
  outdir: './dist',
  plugins: [
    {
      name: 'transform',
      setup(build) {
        build.onLoad({ filter: /.*/ }, async ({ path }) => {
          const file = await readFile(path, 'utf8');

          const result = minifyHTMLLiterals(file, {
            minifyOptions: {
              // Some of our classes were being removed because CleanCSS, which this plugin uses,
              // doesn't support CSS Nesting: https://github.com/clean-css/clean-css/issues/1254.
              minifyCSS: false,
            },
          });

          // `null` happens when there's no HTML as with `styles.ts`.
          if (result === null) {
            return {
              contents: file,
              loader: 'ts',
            };
          }

          return {
            contents: result.code
              .replaceAll('./library/ow.js', './library/ow.shim.js')
              // eslint-disable-next-line unicorn/prefer-spread
              .concat(`\n//# sourceMappingURL=${result.map?.toUrl()}`),
            loader: 'ts',
          };
        });
      },
    },
  ],
});
