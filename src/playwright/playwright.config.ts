// `playwright.config.ts` instead of simply `config.ts` so it gets picked up by
// Playwright Test For VS Code.

import os from 'node:os';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import { type CoverageReporterOptions } from './coverage-reporter.js';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // 0.2, the default, produces too many false negatives. 0, on the other
      // hand, produces too many false positives. The idea is for this number
      // to be as close to 0 as possible without any false negatives.
      threshold: 0.03,
    },
  },
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
    },
    ...['webkit', 'firefox', 'chromium']
      .filter((browser) => {
        if (process.env.CI) {
          return true;
        }

        // For testing a specific browser locally.
        if (process.env.PLAYWRIGHT_BROWSER) {
          return process.env.PLAYWRIGHT_BROWSER === browser;
        }

        return browser === 'chromium';
      })
      .map((browser) => {
        return {
          name: 'functionality',
          // "accessibility" tests really aren't functionality tests in the same way that
          // other functionality tests are. Labeling them as such is somewhat of a misnomer.
          //
          // But, if we were to put accessibility tests into their own project, CI would get
          // a lot more complicated because we'd have two more jobs. And we'd have to merge
          // coverage reports from disparate jobs.
          testMatch: [
            // Migrated
            'src/*.test.accessibility.ts',
            'src/accordion.test.*.ts',
            'src/button.test.*.ts',
            'src/button-group.test.*.ts',
            'src/button-group.button.test.*.ts',
            'src/checkbox.test.*.ts',
            'src/checkbox-group.test.*.ts',
            'src/drawer.test.*.ts',
            'src/icon-button.test.*.ts',
            'src/inline-alert.test.*.ts',
            'src/input.test.*.ts',
            'src/label.test.*.ts',
            'src/link.test.*.ts',
            'src/menu.test.miscellaneous.ts',
            'src/modal.test.*.ts',
            'src/modal.icon-button.test.*.ts',
            'src/option.test.*.ts',
            'src/options.test.*.ts',
            'src/options.group.test.*.ts',
            'src/popover.test.*.ts',
            'src/popover.container.test.*.ts',
            'src/radio-group.test.*.ts',
            'src/radio-group.radio.test.*.ts',
            'src/select.test.*.ts',
            'src/spinner.test.*.ts',
            'src/split-button.test.*.ts',
            'src/split-button.secondary-button.test.*.ts',
            'src/split-button.primary-button.test.*.ts',
            'src/split-button.primary-link.test.*.ts',
            'src/tag.test.*.ts',
            'src/toast.test.*.ts',
            'src/toast.toasts.test.*.ts',
            'src/toggle.test.*.ts',
            'src/tooltip.test.*.ts',
            'src/tooltip.container.test.*.ts',
          ],
          testIgnore: ['src/*.test.visuals.ts'],

          use:
            browser === 'webkit'
              ? {
                  ...devices['Desktop Safari'],
                }
              : browser === 'firefox'
                ? {
                    ...devices['Desktop Firefox'],
                  }
                : {
                    ...devices['Desktop Chromium'],
                    // - https://playwright.dev/docs/browsers#chromium-new-headless-mode
                    // - https://developer.chrome.com/blog/chrome-headless-shell
                    channel: 'chromium',
                  },
        };
      }),

    // Visual tests are their own project because testing every browser would be quite
    // expensive: both in CI and for PR reviewers inspecting the visual report. And,
    // while testing visuals in every browser would be useful, it's not nearly as
    // useful as testing functionality.
    {
      name: 'visuals',

      // We've found that elements that have nested popovers that are positioned using
      // Floating UI can vary slightly in CI from run to run. For example, Menu and
      // Select's sub-Menus may be positioned slightly to the left or right from one run
      // to the next.
      //
      // We could use `maxDiffPixelRatio` in those tests. But it would have to be set
      // pretty high and would lead to false negatives. So we retry.
      //
      // TODO: Try removing this when we move from Floating UI to Anchor Positioning,
      //       which we can do as soon as Firefox supports it.
      retries: 5,

      // Outside of `./dist/playwright` because Playwright wipes that directory on start.
      snapshotPathTemplate: path.join(
        process.cwd(),
        'dist',
        'playwright-baseline-screenshots',
        '{arg}{ext}',
      ),

      testMatch: ['src/*.test.visuals.ts'],
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
          'src/accordion.ts',
          'src/button.ts',
          'src/button-group.ts',
          'src/button-group.button.ts',
          'src/checkbox.ts',
          'src/checkbox-group.ts',
          'src/drawer.ts',
          'src/icon-button.ts',
          'src/inline-alert.ts',
          'src/input.ts',
          'src/label.ts',
          'src/link.ts',
          'src/modal.ts',
          'src/modal.icon-button.ts',
          'src/option.ts',
          'src/options.ts',
          'src/options.group.ts',
          'src/popover.ts',
          'src/popover.container.ts',
          'src/radio-group.ts',
          'src/radio-group.radio.ts',
          'src/select.ts',
          'src/spinner.ts',
          'src/split-button.ts',
          'src/split-button.secondary-button.ts',
          'src/split-button.primary-button.ts',
          'src/split-button.primary-link.ts',
          'src/tag.ts',
          'src/toast.ts',
          'src/toast.toasts.ts',
          'src/toggle.ts',
          'src/tooltip.ts',
          'src/tooltip.container.ts',
        ],

        outputDir: 'coverage-report',

        // - 'text-summary' and 'text` for terminals.
        // - 'html' for the browser.
        // - 'lcov' for editor extensions and tooling generally.
        // - 'json' for `merge-coverage-reports/run.ts`.
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
  use: {
    baseURL: 'http://localhost:6006/iframe.html',
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
  },
  webServer: process.env.PLAYWRIGHT_NO_WEBSERVER
    ? undefined
    : [
        // For visual tests.
        {
          name: 'Storybook',
          command: 'pnpm start:development:storybook',
          reuseExistingServer: true,
          url: 'http://localhost:6006',
        },
        // For functionality tests.
        {
          name: 'Vite',
          command: 'pnpm test:development:playwright:vite',
          reuseExistingServer: true,
          url: 'http://localhost:6009/src/playwright/index.html',
        },
      ],
  workers: process.env.CI ? os.cpus().length : os.cpus().length / 2,
});
