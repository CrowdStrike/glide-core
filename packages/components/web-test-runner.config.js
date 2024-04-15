import { defaultReporter } from '@web/test-runner';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'node:url';
import { fromRollup } from '@web/dev-server-rollup';
import chalk from 'chalk';
import rollupPluginCommonjs from '@rollup/plugin-commonjs';

export default {
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.ts'],
    report: true,
    reportDir: 'dist/coverage',
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  files: ['src/**/*.test.ts', 'src/**/*.test.*.ts'],
  nodeResolve: {
    // Ow is an example of a module that supports both the browser and Node.js
    // and uses the `browser` field in `package.json` to switch between artifacts.
    // Setting `browser` here ensures that the field is used in resolution.
    //
    // - https://github.com/defunctzombie/package-browser-field-spec
    // - https://github.com/rollup/plugins/tree/master/packages/node-resolve#browser
    browser: true,

    // https://lit.dev/docs/tools/development#development-and-production-builds
    exportConditions: ['production'],
  },
  plugins: [
    // Some modules still use CommonJS-style exports. This plugin handles them
    // for us.
    //
    // https://github.com/modernweb-dev/web/issues/1700#issuecomment-1059441615
    fromRollup(rollupPluginCommonjs)({
      include: ['**/node_modules/**'],
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
