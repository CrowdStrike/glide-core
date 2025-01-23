import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import logo from './assets/logo.png';

addons.setConfig({
  // We've found people trigger shortcuts accidentally more than not.
  enableShortcuts: false,
  theme: create({
    base: 'dark',
    brandImage: logo,
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
