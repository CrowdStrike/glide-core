import os from 'node:os';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // 0.2, the default, produces too many false negatives. 0, on the other
      // hand, produces too many false positives. The idea is for this number
      // to be as close to 0 as possible without any false positives.
      threshold: 0.03,
    },
  },
  failOnFlakyTests: process.env.CI,
  fullyParallel: true,
  globalSetup: './playwright.setup.js',
  outputDir: './dist/playwright',
  projects: [
    {
      name: 'aria',
      snapshotPathTemplate: './src/aria-snapshots/{arg}{ext}',
      testMatch: ['src/*.test.aria.ts'],
      timeout: 5000,
    },
    ...['Desktop Chrome', 'Desktop Firefox', 'Desktop Safari']
      .filter((browser) => {
        return process.env.CI || process.env.PLAYWRIGHT_ALL_BROWSERS
          ? true
          : browser === 'Desktop Chrome';
      })
      .map((browser) => {
        return {
          name: 'components',
          testMatch: ['src/button.test.*.ts'],
          testIgnore: ['src/*.test.aria.ts', 'src/*.test.visuals.ts'],
          timeout: 2500,
          use: {
            ...devices[browser],
          },
        };
      }),
    {
      name: 'visuals',

      // For whatever reason, Playwright can't find snapshots that exist
      // in an subdirectory of `outputDir`. So they're at the top level.
      snapshotPathTemplate: './dist/playwright-baseline-screenshots/{arg}{ext}',

      testMatch: ['src/*.test.visuals.ts'],

      // 30 seconds is the default. Each test should only take a couple seconds.
      // Something has gone wrong if one takes longer. So we fail fast to give
      // developers feedback.
      timeout: 5000,
    },
  ],
  testDir: './src/',
  reporter: process.env.CI
    ? [['blob']]
    : [
        ['line'],
        [
          './src/playwright/coverage-reporter.ts',
          // TODO: can i use ts-check here if i turn on check js?
          {
            include: ['src/button.ts'],
            reporters: [['text-summary'], ['text'], ['lcov'], ['html']],
            thresholds: {
              branches: 100,
              functions: 100,
              lines: 100,
              statements: 100,
            },
            outputDir: './dist/playwright/coverage',
          },
        ],
      ],
  use: {
    baseURL: 'http://localhost:6006/iframe.html',
    testIdAttribute: 'data-test',
  },
  webServer: {
    command: 'pnpm start:development:storybook',
    reuseExistingServer: true,
    url: 'http://localhost:6006',
  },
  workers: process.env.CI ? os.cpus().length : os.cpus().length / 2,
});
