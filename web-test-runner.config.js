import { fileURLToPath } from 'node:url';
import os from 'node:os';
import chalk from 'chalk';
import { defaultReporter } from '@web/test-runner';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { playwrightLauncher } from '@web/test-runner-playwright';
import rollupPluginCommonjs from '@rollup/plugin-commonjs';
import { globby } from 'globby';
import yargs from 'yargs';

const componentFiles = await globby([
  'src/**/*',
  '!**/*.stories.*',
  '!**/*.styles.*',
  '!**/*.test.*',
  '!**/cem-analyzer-plugins/**',
  '!**/eslint/**',
  '!**/figma/**',
  '!**/icons/**',
  '!**/library/**',
  '!**/styles/**',
  '!**/stylelint/**',
  '!**/translations/**',
  '!**/ts-morph/**',
]);

const yo = [];

for (const file of componentFiles) {
  const tests = await globby([
    `${file.replace('.ts', '')}.test.*`,
    '!**/*visuals*',
  ]);

  yo.push({
    component: file,
    tests: tests.map((files) => {
      return files;
    }),
  });
}

const testFiles = yo.flatMap(({ tests }) => tests);
const groups = [];

for (const [index, file] of testFiles.entries()) {
  const currentComponent = file.replace(/\.test.*/, '.ts'); // button.ts
  const previousComponent = testFiles[index - 1]?.replace(/\.test.*/, '.ts'); // checkbox.ts

  const isNextGroup =
    groups.at(-1)?.files.length >= Math.ceil(testFiles.length / 5) &&
    currentComponent !== previousComponent;

  if (groups.length === 0 || isNextGroup) {
    groups.push({
      name: String(groups.length + 1),
      files: [currentComponent, file],
    });
  } else {
    groups.at(-1).files.push(file);
  }
}

export default {
  browsers: [
    // https://github.com/modernweb-dev/web/issues/2588
    playwrightLauncher(),
  ],
  groups,
  concurrency: process.env.CI ? os.cpus().length : os.cpus.length / 2,
  coverage: true,
  coverageConfig: {
    include: yargs(process.argv).argv.group
      ? groups[yargs(process.argv).argv.group - 1].files
      : ['src/**/*.ts'],
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
    reportDir: 'dist/coverage',
    threshold: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  files: [
    'src/**/*.test.ts',
    'src/**/*.test.*.ts',
    '!**/eslint/**',
    '!**/icons/**',
    '!**/stylelint/**',
    '!**/translations/**',
    '!src/**/*.*.test.visuals.ts',
    '!src/**/*.test.visuals.ts',
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
      : [
          defaultReporter(),
          'lcov',
          {
            start() {
              // eslint-disable-next-line no-console
              console.log(
                `Code coverage report: ${chalk.bgBlue(
                  'http://localhost:8080',
                )}\n`,
              );
            },
            onTestRunStarted() {
              // eslint-disable-next-line no-console
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
        <link href="./src/styles/fonts.css" rel="stylesheet">
        <link href="./src/styles/variables/light.css" rel="stylesheet">
        <link href="./src/styles/variables/dark.css" rel="stylesheet">
        <link href="./src/styles/variables/miscellaneous.css" rel="stylesheet">
        <link href="./src/styles/variables/system.css" rel="stylesheet">
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`;
  },
};
