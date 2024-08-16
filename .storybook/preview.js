/** @type { import('@storybook/web-components').Preview } */

import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import './overrides.css';
import * as cheerio from 'cheerio';
import { create } from '@storybook/theming';
import { html } from 'lit';

export default {
  decorators: [
    (story, context) => {
      const selectedTheme = context.globals.theme || 'light';

      if (selectedTheme === 'dark') {
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('theme-dark');
      }

      if (selectedTheme === 'light') {
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.add('theme-light');
      }

      return html`${story()}`;
    },
  ],
  globalTypes: {
    theme: {
      description: 'Sets the global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark (beta)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
      source: {
        format: 'html',
        transform(code, context) {
          // https://github.com/cheeriojs/cheerio/issues/1031#issuecomment-748677236
          const $ = cheerio.load(code, null, false);

          const $component = $(
            `glide-core-${context.componentId.replace(' ', '-').toLowerCase()}`,
          );

          // TODO: fix this
          let $element = $component;

          while ($element.length > 0) {
            if (!$element.parent().prop('tagName')?.startsWith('GLIDE-CORE')) {
              $element.unwrap();
            }

            $element = $element.parent();
          }

          // TODO: explain
          // TODO: handle split container case
          for (const [argument, value] of Object.entries(context.args)) {
            const { defaultValue } = context.argTypes[argument].table ?? {};

            if (defaultValue && value === context.initialArgs[argument]) {
              $component.removeAttr(argument);
            }
          }

          $('glide-core-example-icon').removeAttr('name');

          // TODO: say why. tooltip
          $('style').remove();

          return $.html().trim();
        },
      },
      theme: create({
        base: 'light',
        fontBase: '"Nunito", sans-serif',
        fontCode: 'monospace',
      }),
    },
  },
  tags: ['autodocs'],
};
