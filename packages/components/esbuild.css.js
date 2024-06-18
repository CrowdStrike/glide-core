import { globby } from 'globby';
import esbuild from 'esbuild';

const entryPoints = await globby(['src/styles/*.css']).then((paths) => {
  return paths.map((path) => {
    return {
      in: path,
      out: path.replace('src/', '').replace('.css', ''),
    };
  });
});

await esbuild.build({
  entryPoints,
  bundle: true,
  minify: true,
  outbase: '.',
  outdir: './dist',
});
