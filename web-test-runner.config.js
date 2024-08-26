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
    return log.type === 'error' && log.args.at(0)?.includes('node_modules/ow')
      ? false
      : true;
  },
  browsers: [
    // https://github.com/modernweb-dev/web/issues/2588
    playwrightLauncher(),
  ],
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.ts'],
    report: true,
    exclude: [
      // Has an untestable condition that returns based on `window.location`.
      // It's excluded so we don't have to reduce our coverage thresholds.
      'src/library/ow.ts',

      // Istanbul claims it has a branch that's missing coverage even though
      // there are no branches in this file. It's excluded so we don't have
      // to reduce our coverage thresholds.
      'src/library/expect-argument-error.ts',
    ],
    reportDir: 'dist/coverage',
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  files: ['src/**/*.test.ts', 'src/**/*.test.*.ts', '!**/eslint/**'],
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
    // Some modules still use CommonJS-style exports. This plugin handles them.
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
    {
      // In the test environment, we set `prefers-reduced-motion: reduce`
      // as tests shouldn't need to rely on animations to finish before
      // interacting with a component. Doing so leads to hardcoded
      // waits, which extends testing time and doesn't actually provide
      // any value.
      //
      // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
      name: 'prefers-reduced-motion-plugin',
      transform(context) {
        if (context.path.includes('.test.')) {
          const emulateMediaScript = `
            import { emulateMedia } from '@web/test-runner-commands';

            before(async () => {
              await emulateMedia({ reducedMotion: 'reduce' });
            });
          `;

          return {
            body: `${emulateMediaScript}\n${context.body}`,
            map: context.map,
          };
        }

        return context.body;
      },
    },
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
  testRunnerHtml(testFramework) {
    return `<html>
      <body>
        <link href="./dist/styles/fonts.css" rel="stylesheet">
        <link href="./dist/styles/variables.css" rel="stylesheet">
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`;
  },
};
