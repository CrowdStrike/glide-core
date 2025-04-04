import os from 'node:os';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      threshold: 0, // 0.2 by default.
    },
  },
  fullyParallel: true,
  globalSetup: './playwright.setup.js',
  outputDir: './dist/playwright',
  projects: [
    {
      name: 'aria',
      snapshotPathTemplate: './src/aria-snapshots/{arg}{ext}',
      testMatch: /.*\.test\.aria\.ts/,
    },
    {
      name: 'visuals',

      // For whatever reason, Playwright can't find snapshots that exist
      // in an subdirectory of `outputDir`. So they're at the top level.
      snapshotPathTemplate: './dist/playwright-baseline-screenshots/{arg}{ext}',

      testMatch: /.*\.test\.visuals\.ts/,

      // 30 seconds is the default. Each test should only take a couple seconds.
      // Something has gone wrong if one takes longer. So we fail fast to give
      // developers feedback.
      timeout: 5000,
    },
  ],
  reporter: process.env.CI ? 'blob' : 'line',
  testDir: './src/',
  use: {
    baseURL: 'http://localhost:6006/iframe.html',
  },
  webServer: {
    command: 'pnpm start:development:storybook',
    reuseExistingServer: true,
    url: 'http://localhost:6006',
  },
  workers: process.env.CI ? os.cpus().length : os.cpus().length / 2,
});
