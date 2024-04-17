import { mergeConfig } from 'vite';
import rollupPluginAlias from '@rollup/plugin-alias';

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
    autodocs: 'tag',
    defaultName: 'Overview',
  },
  staticDirs: ['./assets'],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        {
          ...rollupPluginAlias({
            entries: [
              // It's not strictly necessary to use the shim with Storybook. It does,
              // however, bring Storybook in line with how components that use Ow will
              // run for consumers.
              //
              // It also helps us catch the case where we add a new export to `./library.ow.js`
              // but forget to add it to `./library/ow.shim.js`. If we weren't using the
              // shim, we'd only find out about the missing export from consumers.
              { find: './library/ow.js', replacement: './library/ow.shim.js' },
            ],
          }),
          enforce: 'pre',
        },
      ],
    });
  },
};

export default config;
