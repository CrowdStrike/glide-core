import { defineConfig } from '@playwright/test';

export default defineConfig({
  snapshotPathTemplate: './dist/playwright/{testFilePath}/{arg}{ext}',
  testDir: './src/',
  testMatch: /.*\.test\.visuals\.ts/,
  use: {
    baseURL: 'http://localhost:6006',
  },
  webServer: {
    command: 'pnpm start',
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:6006',
  },
});
