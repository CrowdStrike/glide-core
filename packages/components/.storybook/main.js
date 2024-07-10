/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../src/*.stories.ts'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
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
};

export default config;
