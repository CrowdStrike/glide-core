import { globby } from 'globby';
import { minifyHTMLLiterals } from 'minify-literals';
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

          const result = await minifyHTMLLiterals(file, {
            minifyOptions: {
              // Some of our classes were being removed because CleanCSS, which this plugin uses,
              // doesn't support CSS Nesting: https://github.com/clean-css/clean-css/issues/1254.
              minifyCSS: false,
            },
          });

          return {
            // `null` happens when there's no HTML as with `styles.ts`.
            contents: result === null ? file : result.code,
            loader: 'ts',
          };
        });
      },
    },
  ],
});
