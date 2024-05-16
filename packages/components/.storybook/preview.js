/** @type { import('@storybook/web-components').Preview } */
import './overrides.css';
import '@crowdstrike/glide-core-styles';
import { create } from '@storybook/theming/create';

const preview = {
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
      theme: create({
        base: 'light',
        fontBase: '"Nunito", sans-serif',
        fontCode: 'monospace',
      }),
    },
  },
};

export default preview;
