import os from 'node:os';
import { defineConfig, devices } from '@playwright/test';

// TODO: "full coverage report" should be shown in temrinal
// when running prod command or exec

// TODO: figure out why opening action in tab and interacting
// with component doesn't work

// TODO: why does visual test report have two tags for every test
// TODO: move storybook port into variable?
// TODO: add test report link to CI

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
  globalSetup: './src/playwright/setup.ts',
  outputDir: './dist/playwright',
  projects: [
    // TODO: say why separate projects. because of ./dist in UI
    {
      name: 'eslint',
      testMatch: ['src/eslint/rules/*.test.ts'],
    },
    {
      name: 'stylelint',
      testMatch: ['src/stylelint/rules/*.test.ts'],
    },
    ...[
      {
        device: 'Desktop Chrome',

        // - https://playwright.dev/docs/browsers#chromium-new-headless-mode
        // - https://developer.chrome.com/blog/chrome-headless-shell
        channel: 'chromium',
      },
      { device: 'Desktop Firefox' },
      { device: 'Desktop Safari' },
    ]
      .filter(({ device }) => {
        // `PLAYWRIGHT_ALL_BROWSERS` is for local use.
        return process.env.CI || process.env.PLAYWRIGHT_ALL_BROWSERS
          ? true
          : device === 'Desktop Chrome';
      })
      .map(({ device, channel }) => {
        return {
          name: 'functionality',
          testMatch: [
            'src/button.test.*.ts',
            'src/*.test.accessibility.ts',
            'src/*.*.test.accessibility.ts',
          ],
          testIgnore: ['src/*.test.visuals.ts'],
          use: {
            ...devices[device],
            channel,
          },
        };
      }),
    // Visual tests are their own project because testing very browser would be very
    // expensive: both in CI and for PR reviewers inspecting the visual report.
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

      use: {
        device: 'Desktop Chrome',

        // - https://playwright.dev/docs/browsers#chromium-new-headless-mode
        // - https://developer.chrome.com/blog/chrome-headless-shell
        channel: 'chromium',
      },
    },
  ],
  reporter: [
    // - 'blob' for the visual report.
    // - 'html' for the test report.
    // - 'list' for ?
    ...(process.env.CI
      ? [['blob'], ['list']]
      : [
          [
            'blob',
            { fileName: 'test-report.zip', outputDir: './dist/playwright' },
          ],
          ['list'],
        ]),
    [
      './src/playwright/coverage-reporter.ts',
      {
        include: ['src/button.ts'],

        // TODO: awkward
        // - 'text-summary' and 'text` for the terminal.
        // - 'lcov' for tooling.
        // - 'html' for the browser.
        reporters: [['text-summary'], ['text'], ['lcov'], ['html']],

        thresholds: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
        outputDir: './dist/playwright/coverage-report',
      },
    ],
  ],
  use: {
    baseURL: 'http://localhost:6006/iframe.html',
    testIdAttribute: 'data-test',
  },
  webServer: process.env.PLAYWRIGHT_NO_WEBSERVER
    ? undefined
    : {
        command: 'pnpm start:development:storybook',
        reuseExistingServer: true,
        url: 'http://localhost:6006',
      },
  workers: process.env.CI ? os.cpus().length : os.cpus().length / 2,
});
