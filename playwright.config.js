import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  outputDir: './dist/playwright',
  reporter: process.env.CI ? 'blob' : 'line',
  testDir: './src/',
  // TODO: rename path: playwright-baseline-snapshots
  snapshotPathTemplate: './dist/playwright-baseline-screenshots/{arg}{ext}',

  // 30 seconds is the default. Each test should only take a couple seconds.
  // Something has gone wrong if one takes longer. So we fail fast to give
  // developers feedback.
  // TODO:
  timeout: 5000,
  projects: [
    {
      name: 'aria',
      // snapshotPathTemplate: './src/aria-snapshots/{arg}{ext}',
      testMatch: /.*\.test\.aria\.ts/,
      // TODO
      // timeout: 30_000,
    },
    {
      name: 'visuals',
      // snapshotPathTemplate: './dist/playwright-baseline-screenshots/{arg}{ext}',
      testMatch: /.*\.test\.visuals\.ts/,

      // 30 seconds is the default. Each test should only take a couple seconds.
      // Something has gone wrong if one takes longer. So we fail fast to give
      // developers feedback.
      // timeout: 5000,
    },
  ],

  use: {
    baseURL: 'http://localhost:6006/iframe.html',
  },
  webServer: {
    command: 'pnpm start:development:storybook',
    reuseExistingServer: true,
    url: 'http://localhost:6006',
  },
});
