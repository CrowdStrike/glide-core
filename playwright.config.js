import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  reporter: process.env.CI ? 'blob' : 'html',
  snapshotPathTemplate: './dist/snapshots/{arg}{ext}',
  testDir: './src/',
  testMatch: /.*\.test\.visuals\.ts/,
  use: {
    baseURL: 'http://localhost:6006',
  },
  webServer: {
    command: 'pnpm start:development:storybook',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:6006',
  },
});
