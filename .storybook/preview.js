/** @type { import('@storybook/web-components').Preview } */

import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import './overrides.css';
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
          if (!code) {
            return;
          }

          const $fragment = document.createDocumentFragment();
          const $container = document.createElement('div');

          $fragment.append($container);
          $container.innerHTML = code;

          const $component = $container.querySelector(
            `glide-core-${context.componentId.replace(' ', '-').toLowerCase()}`,
          );

          // Now go through all the arguments. If the argument's value is at its default,
          // then remove it so people don't copy unnecessary code.
          //
          // As an aside, the reason arguments are set to their defaults in stories is so
          // the default value is selected in the controls table.
          for (const [argumentKey, argumentValue] of Object.entries(
            context.args,
          )) {
            const { defaultValue } = context.argTypes[argumentKey].table ?? {};

            // "<glide-core-split-button-primary-button>.label"
            const isSubcomponent = argumentKey.startsWith('<');

            if (isSubcomponent) {
              if (
                defaultValue &&
                argumentValue === context.initialArgs[argumentKey]
              ) {
                // <glide-core-split-button-primary-button>.label" → "label"
                const argumentKeyWithoutSubcomponent = argumentKey.slice(
                  argumentKey.indexOf('.') + 1,
                  argumentKey.length,
                );

                // "<glide-core-split-button-primary-button>.label" → "glide-core-split-button-primary-button"
                const selector = argumentKey.slice(1, argumentKey.indexOf('>'));

                for (const $subcomponent of $container.querySelectorAll(
                  selector,
                )) {
                  const value = $subcomponent.getAttribute(
                    argumentKeyWithoutSubcomponent,
                  );

                  if (value === argumentValue) {
                    $subcomponent.removeAttribute(
                      argumentKeyWithoutSubcomponent,
                    );
                  }
                }
              }
            } else if (
              defaultValue &&
              argumentValue === context.initialArgs[argumentKey]
            ) {
              $component.removeAttribute(argumentKey);
            }
          }

          // Now strip out the rest. These are elements inside component slots used primarily
          // for styling.
          for (const $element of $container.querySelectorAll('*')) {
            const isCoreElement = $element.tagName.startsWith('GLIDE-CORE');
            const isSlotted = Boolean($element.slot);
            const isScriptTag = $element.tagName === 'SCRIPT';
            const isStyleTag = $element.tagName === 'STYLE';

            if (isScriptTag) {
              if ($element.type === 'ignore') {
                // Scripts with `type="ignore"` exist to show consumers what needs
                // to be imported. `"ignore"` is just a hack to prevent the script
                // from executing and shouldn't show up in the code example.
                $element.removeAttribute('type');
              }
            } else if (isStyleTag) {
              $element.remove();
            } else if (!isCoreElement && !isSlotted && !isScriptTag) {
              if ($element.children.length === 0) {
                // `<div style="margin: 0.625rem;">Panel</div>` → `Panel`
                $element.replaceWith($element.textContent);
              } else {
                // It's possible the element has Glide Core elements as children. We
                // don't want to remove those. So we unwrap it and continue iterating.
                $element.replaceWith(...$element.childNodes);
              }
            }
          }

          if (context.componentId === 'tooltip') {
            // https://github.com/CrowdStrike/glide-core/pull/400#discussion_r1775956358
            $component.setAttribute(
              'shortcut',
              JSON.stringify(context.args.shortcut),
            );
          }

          // Clean up boolean attributes before returning: `disabled=""` → `disabled`.
          return $container.innerHTML.replaceAll('=""', '');
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
