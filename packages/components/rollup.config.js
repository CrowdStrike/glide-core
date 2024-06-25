import { globby } from 'globby';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const inputs = await globby(['src/**/*.ts', '!**/*stories*', '!**/*test*']);

export default {
  input: inputs,
  output: {
    dir: 'dist',
  },
  plugins: [typescript({ outDir: 'dist' }), terser({ keep_classnames: true })],
};
