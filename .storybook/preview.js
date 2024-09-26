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
    controls: {
      disableSave: true,
    },
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

          let $parent = $component.parent();

          // Remove elements that wrap the component. Often these are used for styling
          // or form submission and don't concern the reader.
          while ($parent.length > 0) {
            if (!$parent.prop('tagName')?.startsWith('GLIDE-CORE')) {
              $parent.find('> :first-child').unwrap();
            }

            $parent = $parent.parent();
          }

          // Now go through all the arguments. If the argument's value is at its default,
          // then remove it so people don't copy unnecessary code.
          //
          // As an aside, the reason arguments are set to their defaults in stories is so
          // the default value is selected in the controls table.
          for (const [argument, value] of Object.entries(context.args)) {
            const { defaultValue } = context.argTypes[argument].table ?? {};

            // "<glide-core-split-button-primary-button>.label"
            const isSubcomponent = argument.startsWith('<');

            if (isSubcomponent) {
              if (defaultValue && value === context.initialArgs[argument]) {
                // <glide-core-split-button-primary-button>.label" → "label"
                const argumentWithoutSubcomponent = argument.slice(
                  argument.indexOf('.') + 1,
                  argument.length,
                );

                // "<glide-core-split-button-primary-button>.label" → "glide-core-split-button-primary-button"
                const selector = argument.slice(1, argument.indexOf('>'));

                $(selector).removeAttr(argumentWithoutSubcomponent);
              }
            } else if (
              defaultValue &&
              value === context.initialArgs[argument]
            ) {
              $component.removeAttr(argument);
            }
          }

          // Petty perhaps. But the idea is to strip from example code absolutely everything
          // that isn't strictly relevant, however insignificant, so what's actually important
          // shines through.
          $('glide-core-example-icon').removeAttr('name');

          // Now strip out the rest. These are elements inside component slots used primarily
          // for styling.
          $('*').each(function () {
            const $element = $(this);

            const isCoreElement = $element
              .prop('tagName')
              .startsWith('GLIDE-CORE');

            const isSlotted = $element.attr('slot');
            const isScriptTag = $element.prop('tagName') === 'SCRIPT';
            const isStyleTag = $element.prop('tagName') === 'STYLE';
            const isKbdTag = $element.prop('tagName') === 'KBD'; // Tooltip

            if (isScriptTag) {
              if ($element.attr('type') === 'ignore') {
                // Scripts with `type="ignore"` exist to show consumers what needs
                // to be imported. `"ignore"` is just a hack to prevent the script
                // from executing and won't show up in the code example.
                $element.removeAttr('type');
              }
            } else if (isStyleTag) {
              $element.remove();
            } else if (
              !isCoreElement &&
              !isSlotted &&
              !isScriptTag &&
              !isKbdTag
            ) {
              if ($element.children().length === 0) {
                $element.replaceWith($element.text());
              } else {
                // It's possible the element has Glide Core elements as children. We
                // don't want to remove those. So we unwrap it and continue iterating.
                $element.find('> :first-child').unwrap();
              }
            }
          });

          if (context.componentId === 'tooltip') {
            // https://github.com/CrowdStrike/glide-core/pull/400#discussion_r1775956358
            $component.attr('shortcut', JSON.stringify(context.args.shortcut));
          }

          const html = $.html().trim();

          // For boolean attributes. Cheerio always sets them to an empty string and
          // blows up when they're set to `undefined`. Couldn't find a better way.
          return html.replace('=""', '');
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
