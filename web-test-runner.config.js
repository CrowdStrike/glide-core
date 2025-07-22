import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
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
      // Juice not worth the squeeze. Testing this wouldn't add much given the
      // test code would look more or less like the code that's under test.
      // Testing whether the center of an element was clicked, for example, would
      // require the same `Math.ceil(x + width / 2)` and `Math.ceil(y + height / 2)`
      // calculations that are in the library itself.
      'src/library/mouse.ts',

      // Not much to test. Also untestable.
      'src/library/shadow-root-mode.ts',
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
    '!src/**/*.*.test.aria.ts',
    '!src/**/*.*.test.visuals.ts',
    '!src/**/*.test.aria.ts',
    '!src/**/*.test.visuals.ts',
  ],
  nodeResolve: {
    browser: true,

    // https://lit.dev/docs/tools/development#development-and-production-builds
    exportConditions: ['production'],
  },
  plugins: [
    {
      // Useful when you have a suspicion that a test is failing because there's visual
      // discrepancy between the test locally versus in CI. Screenshots are written to a
      // directory named "web-test-runner-debugging-screenshots", which is uploaded as an
      // artifact.
      //
      // Import `executeServerCommand` in your test suite, then call that function in
      // tests wherever you need to take a screenshot.
      //
      // Keep in mind that `executeServerCommand()` is asynchronous. So, if the
      // discrepancy is due to a timing issue, then calling `executeServerCommand()`
      // may be just enough of a delay to overcome the issue, in which case the
      // discrepancy may exist but may not show up in your screenshot.
      //
      // Usage:
      //
      // 1. `import { executeServerCommand } from '@web/test-runner-commands'`
      // 2. `await executeServerCommand('debugging-screenshot', 'screenshot')`
      name: 'debugging-screenshot',
      async executeCommand({ payload, session }) {
        if (!payload) {
          throw new Error(
            '`payload` is required and should be a string. Use it to give your screenshot a name.',
          );
        }

        const screenshot = await session.browser
          .getPage(session.id)
          .screenshot();

        mkdirSync('dist/web-test-runner-debugging-screenshots', {
          recursive: true,
        });

        writeFileSync(
          path.join(
            import.meta.dirname,
            'dist/web-test-runner-debugging-screenshots',
            `${payload}.png`,
          ),
          screenshot,
        );

        return true;
      },
    },
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
  testsFinishTimeout: process.env.CI ? 120_000 : 60_000,

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
