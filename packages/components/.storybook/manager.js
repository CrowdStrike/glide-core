import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import GlideCoreLogo from './assets/glide-core.png';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandImage: GlideCoreLogo,
    brandTitle: 'Glide Core',
    fontBase: '"Nunito", sans-serif',
    fontCode: 'monospace',
  }),
});
