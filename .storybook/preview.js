/** @type { import('@storybook/web-components').Preview } */

import '../src/styles/fonts.css';
import '../src/styles/variables.css';
import './overrides.css';
import { create } from '@storybook/theming';
import { html } from 'lit';

export default {
  tags: ['autodocs'],
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
      disableSaveFromUI: true,
    },
    docs: {
      // TODO: New with 8.5.0 but not working. Set to `true` and retest with each release.
      codePanel: false,
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
                );

                // "<glide-core-split-button-primary-button>.label" → "glide-core-split-button-primary-button"
                const selector = argumentKey.slice(1, argumentKey.indexOf('>'));

                for (const $subcomponent of $container.querySelectorAll(
                  selector,
                )) {
                  const value = $subcomponent.getAttribute(
                    argumentKeyWithoutSubcomponent,
                  );

                  // People using Storybook often interact with form controls and inspect their
                  // `value` using DevTools. However, without a `value` on each Checkbox, for
                  // example, Checkbox Group's `value` will be an empty string, leading to confusion
                  // or a bug report. So `value` is always left alone.
                  if (
                    value === argumentValue &&
                    argumentKeyWithoutSubcomponent !== 'value'
                  ) {
                    $subcomponent.removeAttribute(
                      argumentKeyWithoutSubcomponent,
                    );
                  }
                }
              }
            } else if (
              defaultValue &&
              argumentValue === context.initialArgs[argumentKey] &&
              argumentKey !== 'value'
            ) {
              $component?.removeAttribute(argumentKey);
            }
          }

          // Now strip out the rest. These are elements inside component slots used primarily
          // for styling.
          for (const $element of $container.querySelectorAll('*')) {
            const isCoreElement = $element.tagName.startsWith('GLIDE-CORE');
            const isSlotted = Boolean($element.slot);
            const isScriptTag = $element.tagName === 'SCRIPT';
            const isStyleTag = $element.tagName === 'STYLE';

            // IDs are only for internal use and so are removed. You'll find comments in
            // the Radio Group and Tree stories explaining why they're needed.
            $element.removeAttribute('id');

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

          if (context.componentId === 'checkbox-group') {
            // `toString()` is used instead of `JSON.stringify()` to make the
            // comparison slightly easier to read.
            const isCheckboxGroupValueChanged =
              context.args.value.toString() !==
              context.initialArgs.value.toString();

            if (isCheckboxGroupValueChanged) {
              $component.setAttribute(
                'value',
                JSON.stringify(context.args.value),
              );
            }
          }

          if (
            context.componentId === 'drawer' &&
            $component.getAttribute('style') === ''
          ) {
            $component.removeAttribute('style');
          }

          if (context.componentId === 'form-controls-layout') {
            const isDropdownValueChanged =
              context.args['<glide-core-dropdown>.value'].toString() !==
              context.initialArgs['<glide-core-dropdown>.value'].toString();

            if (isDropdownValueChanged) {
              $component
                .querySelector('glide-core-dropdown')
                .setAttribute(
                  'value',
                  JSON.stringify(context.args['<glide-core-dropdown>.value']),
                );
            }

            const isCheckboxGroupValueChanged =
              context.args['<glide-core-checkbox-group>.value'].toString() !==
              context.initialArgs[
                '<glide-core-checkbox-group>.value'
              ].toString();

            if (isCheckboxGroupValueChanged) {
              $component
                .querySelector('glide-core-checkbox-group')
                .setAttribute(
                  'value',
                  JSON.stringify(
                    context.args['<glide-core-checkbox-group>.value'],
                  ),
                );
            }

            for (const $option of $component.querySelectorAll(
              'glide-core-dropdown-option',
            )) {
              $option.removeAttribute('aria-selected');
            }
          }

          if (context.componentId === 'dropdown') {
            const isDropdownValueChanged =
              context.args.value.toString() !==
              context.initialArgs.value.toString();

            if (isDropdownValueChanged) {
              $component.setAttribute(
                'value',
                JSON.stringify(context.args.value),
              );
            }

            for (const $option of $component.querySelectorAll(
              'glide-core-dropdown-option',
            )) {
              $option.removeAttribute('aria-selected');
            }
          }

          if (context.componentId === 'radio-group') {
            for (const $radio of $component.querySelectorAll(
              'glide-core-radio-group-radio',
            )) {
              $radio.removeAttribute('aria-checked');
              $radio.removeAttribute('aria-disabled');
              $radio.removeAttribute('aria-label');
            }
          }

          if (
            context.componentId === 'tab-group' &&
            $component.getAttribute('style') === ''
          ) {
            $component.removeAttribute('style');
          }

          if (context.componentId === 'tooltip') {
            const isTooltipShortChanged =
              context.args.shortcut?.toString() !==
              context.initialArgs.shortcut?.toString();

            if (isTooltipShortChanged) {
              $component.setAttribute(
                'shortcut',
                JSON.stringify(context.args.shortcut),
              );
            }
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
};
