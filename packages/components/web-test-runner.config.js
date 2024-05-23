import { defaultReporter } from '@web/test-runner';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'node:url';
import { fromRollup } from '@web/dev-server-rollup';
import { playwrightLauncher } from '@web/test-runner-playwright';
import chalk from 'chalk';
import rollupPluginCommonjs from '@rollup/plugin-commonjs';

export default {
  filterBrowserLogs(log) {
    // Uncaught Ow errors are expected from "slotchange" handlers and shouldn't muddy the logs.
    return log.type === 'error' && log.args[0].includes('ow.ts') ? false : true;
  },
  browsers: [
    // https://github.com/modernweb-dev/web/issues/2588
    playwrightLauncher(),
  ],
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.ts'],
    report: true,
    // `ow.ts` has an untestable condition that returns based on `window.location`.
    // It's excluded so we don't have to reduce our coverage thresholds.
    exclude: ['src/library/ow.ts'],
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
              // eslint-disable-next-line no-console -- ok since this is a script run in the terminal
              console.log(
                `Code coverage report: ${chalk.bgBlue(
                  'http://localhost:8080',
                )}\n`,
              );
            },
            onTestRunStarted() {
              // eslint-disable-next-line no-console -- ok since this is a script run in the terminal
              console.log(
                `Code coverage report: ${chalk.bgBlue(
                  'http://localhost:8080',
                )}\n`,
              );
            },
          },
        ],
};
