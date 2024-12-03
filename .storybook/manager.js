import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import GlideCoreLogo from './assets/glide-core.png';

addons.setConfig({
  enableShortcuts: false, // We found people triggered shortcuts accidentally more than not.
  theme: create({
    base: 'dark',
    brandImage: GlideCoreLogo,
    brandTitle: 'Glide Core',
    fontBase: '"Nunito", sans-serif',
    fontCode: 'monospace',
  }),
  toolbar: {
    fullscreen: {
      hidden: true, // Just clutter. Rarely used.
    },
  },
});
