import os from 'node:os';
import path from 'node:path';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // 0.2, the default, produces too many false negatives. 0, on the other
      // hand, produces too many false positives. The idea is for this number
      // to be as close to 0 as possible without any false positives.
      threshold: 0.03,
    },
  },
  fullyParallel: true,
  testDir: path.join(process.cwd(), 'src'),
  outputDir: path.join(process.cwd(), 'dist', 'playwright'),
  projects: [
    {
      name: 'functionality',
      testMatch: ['src/*.test.accessibility.ts'],

      use: {
        // - https://playwright.dev/docs/browsers#chromium-new-headless-mode
        // - https://developer.chrome.com/blog/chrome-headless-shell
        channel: 'chromium',
      },
    },
    {
      name: 'lint rules',
      testMatch: [
        'src/eslint/rules/*.test.ts',
        'src/stylelint/rules/*.test.ts',
      ],

      // 30 seconds is the default. Each test should take much less than a second.
      // Something has gone wrong if one takes longer. So we fail fast to give
      // developers feedback quickly.
      timeout: 1000,
    },
    // Visual tests are their own project because testing every browser would be quite
    // expensive: both in CI and for PR reviewers inspecting the visual report. And,
    // while testing every browser would be useful, it's not nearly as useful as
    // testing functionality.
    {
      name: 'visuals',

      // Outside of `./dist/playwright` because Playwright wipes that directory on start.
      snapshotPathTemplate: path.join(
        process.cwd(),
        'dist',
        'playwright-baseline-screenshots',
        '{arg}{ext}',
      ),

      testMatch: ['src/*.test.visuals.ts'],

      // 30 seconds is the default. Each test should only take a second or two.
      // Something has gone wrong if one takes longer. So we fail fast to give
      // developers feedback quickly.
      timeout: 5000,

      use: {
        // - https://playwright.dev/docs/browsers#chromium-new-headless-mode
        // - https://developer.chrome.com/blog/chrome-headless-shell
        channel: 'chromium',
      },
    },
  ],
  reporter: [
    // - 'list' for terminals.
    // - 'blob' for `pnpm exec playwright merge-reports`.
    ['list'],
    [
      'blob',
      {
        outputDir: path.join(
          process.cwd(),
          'dist',
          'playwright',
          'test-report',
        ),
      },
    ],
  ],
  use: {
    baseURL: 'http://localhost:6006/iframe.html',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
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
