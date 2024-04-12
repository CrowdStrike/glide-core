import { defaultReporter } from '@web/test-runner';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'node:url';
import { fromRollup } from '@web/dev-server-rollup';
import chalk from 'chalk';
import rollupIstanbulPlugin from 'rollup-plugin-istanbul';

export default {
  coverage: true,
  coverageConfig: {
    exclude: ['src/*.test.ts', 'src/*.test.*.ts'],
    include: ['src/*.ts'],
    // nativeInstrumentation: false,

    report: true,
    reportDir: 'dist/coverage',
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  files: ['src/*.test.ts', 'src/*.test.*.ts'],
  nodeResolve: {
    // https://lit.dev/docs/tools/development#development-and-production-builds
    exportConditions: ['production'],
  },
  plugins: [
    fromRollup(rollupIstanbulPlugin)({
      include: ['dist/*.ts'],
    }),
    esbuildPlugin({
      ts: true,
      // https://github.com/lit/lit/issues/3807#issuecomment-1513369439
      tsconfig: fileURLToPath(new URL('tsconfig.json', import.meta.url)),
    }),
  ],
  reporters:
    process.env.NODE_ENV === 'production'
      ? [defaultReporter()]
      : [
          defaultReporter(),
          'lcov',
          {
            start() {
              console.log(
                `Code coverage report: ${chalk.blue(
                  'http://localhost:8080',
                )}\n`,
              );
            },
            onTestRunStarted() {
              console.log(
                `Code coverage report: ${chalk.blue(
                  'http://localhost:8080',
                )}\n`,
              );
            },
          },
        ],
};
