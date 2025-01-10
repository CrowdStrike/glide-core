/** @type { import('@storybook/web-components-vite').StorybookConfig } */

import { mergeConfig } from 'vite';

const config = {
  stories: ['../src/*.stories.ts'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
  },
  managerHead: process.env.BASE_URL
    ? (head) => `
          <base href="/${process.env.BASE_URL}/" />
          ${head}
        `
    : undefined,
  docs: {
    defaultName: 'Overview',
  },
  staticDirs: ['./assets'],
  viteFinal(config) {
    return mergeConfig(config, {
      build: {
        minify: false,
        terserOptions: {
          // So `event.target` and `event.srcElement` in the Actions tab aren't mangled.
          keep_classnames: true,
        },
      },
    });
  },
};

export default config;
