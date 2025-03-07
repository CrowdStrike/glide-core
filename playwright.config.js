import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  outputDir: './dist/playwright',
  reporter: process.env.CI ? 'blob' : 'line',

  // For whatever reason, Playwright can't find snapshots that exist
  // in an subdirectory of `outputDir`. So they're at the top level.
  snapshotPathTemplate: './dist/playwright-baseline-screenshots/{arg}{ext}',

  testDir: './src/',
  testMatch: /.*\.test\.visuals\.ts/,

  // 30 seconds is the default. Each test should only take a couple seconds.
  // Something has gone wrong if one takes longer. So we fail fast to give
  // developers feedback.
  timeout: 5000,

  use: {
    baseURL: 'http://localhost:6006/iframe.html',
  },
  webServer: {
    command: 'pnpm start:development:storybook',
    reuseExistingServer: true,
    url: 'http://localhost:6006',
  },
});
