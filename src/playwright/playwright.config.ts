import os from 'node:os';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import { type CoverageReporterOptions } from './coverage-reporter.js';

// `playwright.config.ts` instead of simply `config.ts` so it gets picked up by
// Playwright Test For VS Code.

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // 0.2, the default, produces too many false negatives. 0, on the other
      // hand, produces too many false positives. The idea is for this number
      // to be as close to 0 as possible without any false positives.
      threshold: 0.03,
    },
  },
  failOnFlakyTests: Boolean(process.env.CI),
  fullyParallel: true,
  testDir: path.join(process.cwd(), 'src'),
  outputDir: path.join(process.cwd(), 'dist', 'playwright'),
  projects: [
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
        if (process.env.CI) {
          return true;
        }

        // For testing a specific browser locally.
        if (process.env.PLAYWRIGHT_BROWSER) {
          return device.toLowerCase().includes(process.env.PLAYWRIGHT_BROWSER);
        }

        return device === 'Desktop Chrome';
      })
      .map(({ device, channel }) => {
        return {
          name: 'functionality',
          testMatch: [
            // Migrated
            'src/*.test.accessibility.ts',
            'src/*.*.test.accessibility.ts',
            'src/button.test.*.ts',
          ],
          testIgnore: ['src/*.test.visuals.ts'],
          use: {
            ...devices[device],
            channel,
          },
        };
      }),

    // Visual tests are their own project because testing every browser would be quite
    // expensive: both in CI and for PR reviewers inspecting the visual report. And,
    // while testing visuals in every browser would be useful, it's not nearly as
    // useful as testing functionality.
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
    [
      './coverage-reporter.ts',
      {
        include: [
          // Migrated
          'src/button.ts',
        ],

        outputDir: 'coverage-report',

        // - 'text-summary' and 'text` for terminals.
        // - 'html' for the browser.
        // - 'lcov' for editor extensions and tooling generally.
        // - 'json' for `merge-coverage-reports.ts`.
        reporters: [
          ['text-summary'],
          ['text'],
          ['html'],
          ['lcov'],
          ['json', { file: 'coverage.json' }],
        ],

        thresholds: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      } satisfies CoverageReporterOptions,
    ],
  ],
  retries: process.env.CI ? 1 : 0,
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
