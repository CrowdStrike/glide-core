import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/eslint/**/*.test.ts'],
    name: 'lint-rules',
    setupFiles: ['./vitest.setup.lint-rules.ts'],
  },
});
