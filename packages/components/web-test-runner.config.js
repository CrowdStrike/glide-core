import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'node:url';

export default {
  files: ['**/*.test.ts', '**/*.test.*.ts', '!dist/**'],
  nodeResolve: {
    // https://lit.dev/docs/tools/development#development-and-production-builds
    exportConditions: ['production'],
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      // https://github.com/lit/lit/issues/3807#issuecomment-1513369439
      tsconfig: fileURLToPath(new URL('tsconfig.json', import.meta.url)),
    }),
  ],
};
