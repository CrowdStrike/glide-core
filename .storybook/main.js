/** @type { import('@storybook/web-components-vite').StorybookConfig } */

import { mergeConfig } from 'vite';
import packageJson from '../package.json';

const config = {
  stories: ['../src/*.stories.ts'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-toolbars',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
  },
  managerHead: process.env.BASE_URL
    ? (head) => {
        return `
          <base href="/${process.env.BASE_URL}/" />
          ${head}
        `;
      }
    : undefined,
  docs: {
    defaultName: 'Overview',
  },
  staticDirs: ['./assets'],
  env(config) {
    return {
      ...config,
      // We can't import `package.json` directly into stories because Storybook's
      // Babel doesn't support import attributes. So, instead, each story picks
      // up the version from `import.meta.env.VITE_CORE_VERSION`. For security,
      // Vite requires variables to be prefixed with "VITE" before it'll expose
      // them to the browser.
      VITE_CORE_VERSION: packageJson.version,
    };
  },
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
