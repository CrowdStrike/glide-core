/** @type { import('@storybook/web-components').Preview } */

import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import './overrides.css';

import { create } from '@storybook/theming/create';

export default {
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
