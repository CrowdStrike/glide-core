import { globby } from 'globby';
import { minifyHTMLLiteralsPlugin } from 'esbuild-plugin-minify-html-literals';
import { parse as parsePath } from 'node:path';
import esbuild from 'esbuild';

const entryPoints = await globby(['src/*', '!dist']).then((paths) => {
  return paths.map((path) => {
    const { name } = parsePath(path);

    return {
      in: path,
      out: name,
    };
  });
});

await esbuild.build({
  entryPoints,
  minify: true,
  outbase: '.',
  outdir: './dist',
  plugins: [
    minifyHTMLLiteralsPlugin({
      minifyOptions: {
        // Some of our classes are being removed because CleanCSS, which this plugin uses,
        // doesn't support CSS Nesting: https://github.com/clean-css/clean-css/issues/1254.
        minifyCSS: false,
      },
    }),
  ],
});
