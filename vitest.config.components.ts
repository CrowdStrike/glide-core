import { type Reporter } from 'vitest/reporters';
import { defineConfig } from 'vitest/config';
import chalk from 'chalk';
import plugin from './vitest.plugin.js';

class CustomReporter implements Reporter {
  // This seems to be the only lifecycle method that's called once
  // every time Vitest starts, restarts, and every time the test are
  // rerun
  onPathsCollected() {
    // We stop Vitest from opening the browser automatically. But, oddly,
    // Vitest doesn't print the URL of its UI. So we have to do so ourselves.
    // eslint-disable-next-line no-console
    console.log(`UI: ${chalk.bgBlue('http://localhost:63315')}`);
  }
}

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      // We find the browser opening automatically every time Vitest
      // is started to be pretty annoying.
      headless: true,
      instances: [{ browser: 'chromium' }],
      name: 'chromium',
      provider: 'playwright',
      // When `headless: true`, Vitest doesn't automatically inject its
      // UI into the page it serves.
      ui: true,
    },
    coverage: {
      enabled: true,
      include: ['src/button.ts', 'src/drawer.ts'],
      provider: 'v8',
      reporter: process.env.NODE_ENV === 'production' ? ['text'] : ['html'],
      reportsDirectory: './dist/coverage',
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
    include: ['src/*.vitest.*.ts', 'src/*.*.vitest.*.ts'],
    name: 'components',
    onConsoleLog(log) {
      if (log.includes('https://lit.dev/msg/dev-mode')) {
        return false;
      }
    },
    reporters:
      process.env.NODE_ENV === 'production'
        ? ['basic']
        : [new CustomReporter(), 'dot'],
    setupFiles: ['./vitest.setup.components.ts'],
    // 15000 by default. Most tests should finish in under 100.
    testTimeout: 1000,
  },
  plugins: [plugin()],
});
