import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { defaultReporter } from '@web/test-runner';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { playwrightLauncher } from '@web/test-runner-playwright';
import rollupPluginCommonjs from '@rollup/plugin-commonjs';

export default {
  browsers: [playwrightLauncher()],
  // Half the available cores locally to leave room for work unrelated to testing.
  concurrency: process.env.CI ? os.cpus().length : os.cpus().length / 2,
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.ts'],
    report: true,
    exclude: [
      'src/translations/*',

      // Juice not worth the squeeze. Testing this wouldn't add much given the
      // test code would look more or less like the code that's under test.
      // Testing whether the center of an element was clicked, for example, would
      // require the same `Math.ceil(x + width / 2)` and `Math.ceil(y + height / 2)`
      // calculations that are in the library itself.
      'src/library/mouse.ts',

      // Migrated
      'src/accordion.ts',
      'src/button.ts',
      'src/checkbox.ts',
      'src/drawer.ts',
      'src/icon-button.ts',
      'src/inline-alert.ts',
      'src/spinner.ts',
      'src/select.ts',
      'src/tag.ts',
    ],
    reportDir: 'dist/web-test-runner-coverage',
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  files: [
    'src/**/*.test.*.ts',
    'src/**/*.test.ts',
    '!**/eslint/**',
    '!**/icons/**',
    '!**/stylelint/**',
    '!**/translations/**',
    '!src/**/*.test.visuals.ts',

    // Migrated
    '!src/**/*.*.test.accessibility.ts',
    '!src/**/*.test.accessibility.ts',
    '!src/accordion.test.*.ts',
    '!src/button.test.*.ts',
    '!src/checkbox.test.*.ts',
    '!src/drawer.test.*.ts',
    '!src/icon-button.test.*.ts',
    '!src/inline-alert.test.*.ts',
    '!src/select.test.*.ts',
    '!src/spinner.test.*.ts',
    '!src/tag.test.*.ts',
  ],
  nodeResolve: {
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

      // The default, `true`, doesn't play well with Axe Core, which our
      // `expect(host).to.be.accessible()` assertions use.
      strictRequires: 'auto',
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
      : [defaultReporter(), 'lcov'],

  // If a test suite takes longer than this, it's almost certainly hanging and
  // won't finish. 2 minutes is the default.
  testsFinishTimeout: process.env.CI ? 180_000 : 60_000,

  testRunnerHtml(testFramework) {
    return `<html>
      <body>
        <link href="./src/styles/fonts.css" rel="stylesheet">
        <link href="./src/styles/variables/color-light.css" rel="stylesheet">
        <link href="./src/styles/variables/color-dark.css" rel="stylesheet">
        <link href="./src/styles/variables/animation.css" rel="stylesheet">
        <link href="./src/styles/variables/duration.css" rel="stylesheet">
        <link href="./src/styles/variables/miscellaneous.css" rel="stylesheet">
        <link href="./src/styles/variables/rounding.css" rel="stylesheet">
        <link href="./src/styles/variables/spacing.css" rel="stylesheet">
        <link href="./src/styles/variables/stroke.css" rel="stylesheet">
        <link href="./src/styles/variables/typography.css" rel="stylesheet">
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`;
  },
};
