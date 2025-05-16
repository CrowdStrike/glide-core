import esbuild from 'esbuild';
import { globby } from 'globby';

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
  outbase: '.',
  outdir: './dist',
});
