/** @type { import('@storybook/web-components-vite').StorybookConfig } */

import { mergeConfig } from 'vite';
import packageJson from '@/package.json';

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
    disableWhatsNewNotifications: true,
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
      // up the version from `import.meta.env.VITE_GLIDE_CORE_VERSION`. For security,
      // Vite requires variables to be prefixed with "VITE" before it'll expose
      // them to the browser.
      VITE_GLIDE_CORE_VERSION: packageJson.version,
    };
  },
  viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': new URL('..', import.meta.url).pathname,
          '@/src': new URL('../src', import.meta.url).pathname,
        },
      },
      build: {
        // So `event.target` and `event.srcElement` in the Actions tab aren't mangled.
        minify: false,
      },
      optimizeDeps: {
        // TODO
        //
        // This is a test to see if disabling Hot Module Reloading eliminates the Vite
        // cache misses we've been seeing in CI with Playwright tests. We'll need to keep
        // this in place for a while to see if it solves the problem. If it does, I'll
        // replace this comment with an explanation of the problem and why this solved it.
        noDiscovery: Boolean(process.env.CI),
      },
    });
  },
};

export default config;
