import { defaultReporter } from '@web/test-runner';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'node:url';
import { playwrightLauncher } from '@web/test-runner-playwright';
import chalk from 'chalk';

export default {
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: { headless: false },
    }),
  ],
  coverage: true,
  coverageConfig: {
    include: ['src/*.ts'],

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
