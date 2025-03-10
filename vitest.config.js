import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./vitest.setup.js'],
    include: ['**/eslint/**/*.test.ts', '**/stylelint/**/*.test.ts'],
  },
});
