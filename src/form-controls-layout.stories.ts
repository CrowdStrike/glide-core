import './form-controls-layout.js';
import './radio-group.js';
import './radio-group.radio.js';
import './toasts.js';
import './toasts.toast.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreInput from './input.js';
import GlideCoreTextarea from './textarea.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Form Controls Layout',
  tags: ['autodocs'],
  decorators: [
    (story) => html`
      <form action="/" style="height: 16rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/form-controls-layout.js';
        </script>

        ${story()}
      </form>

      <glide-core-toasts></glide-core-toasts>
    `,
  ],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    split: 'left',
    '<glide-core-checkbox-group>.value': [],
    '<glide-core-dropdown>.open': false,
    '<glide-core-dropdown>.value': [],
    '<glide-core-input>.value': '',
    '<glide-core-textarea>.value': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: {
          summary:
            'GlideCoreCheckbox | GlideCoreCheckboxGroup | GlideCoreDropdown | GlideCoreInput | GlideCoreTextArea',
        },
      },
      type: { name: 'function', required: true },
    },
    split: {
      control: { type: 'radio' },
      options: ['left', 'middle'],
      table: {
        defaultValue: { summary: '"left"' },
        type: { summary: '"left" | "middle"' },
      },
    },
    '<glide-core-checkbox-group>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown>.open': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-input>.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-textarea>.value': {
      table: {
        disable: true,
      },
    },
  },
  play(context) {
    const checkboxGroup = context.canvasElement.querySelector(
      'glide-core-checkbox-group',
    );

    if (checkboxGroup instanceof GlideCoreCheckboxGroup) {
      checkboxGroup.addEventListener('change', (event: Event) => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-checkbox-group>.value': checkboxGroup.value,
          },
        });

        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });

      checkboxGroup.addEventListener('input', (event: Event) => {
        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });
    }

    const dropdown = context.canvasElement.querySelector('glide-core-dropdown');

    const option = context.canvasElement.querySelector(
      'glide-core-dropdown-option',
    );

    if (dropdown instanceof GlideCoreDropdown) {
      dropdown.addEventListener('change', (event: Event) => {
        if (option) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              '<glide-core-dropdown>.value': dropdown.value,
            },
          });
        }

        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });

      dropdown.addEventListener('input', (event: Event) => {
        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });

      const observer = new MutationObserver(() => {
        if (dropdown instanceof GlideCoreDropdown) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              '<glide-core-dropdown>.open': dropdown.open,
            },
          });
        }
      });

      observer.observe(dropdown, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }

    const input = context.canvasElement.querySelector('glide-core-input');

    if (input instanceof GlideCoreInput) {
      input.addEventListener('change', (event: Event) => {
        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });

      input.addEventListener('input', (event: Event) => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-input>.value': input.value,
          },
        });

        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });
    }

    const textarea = context.canvasElement.querySelector('glide-core-textarea');

    if (textarea instanceof GlideCoreTextarea) {
      textarea.addEventListener('change', (event: Event) => {
        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });

      textarea.addEventListener('input', (event: Event) => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-textarea>.value': textarea.value,
          },
        });

        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    return html`
      <glide-core-form-controls-layout split=${arguments_.split}>
        <glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            ?checked=${arguments_['<glide-core-checkbox-group>.value'].includes(
              'one',
            )}
          ></glide-core-checkbox>
          <glide-core-checkbox
            label="Two"
            value="two"
            ?checked=${arguments_['<glide-core-checkbox-group>.value'].includes(
              'two',
            )}
          ></glide-core-checkbox>
          <glide-core-checkbox
            label="Three"
            value="three"
            ?checked=${arguments_['<glide-core-checkbox-group>.value'].includes(
              'three',
            )}
          ></glide-core-checkbox>
        </glide-core-checkbox-group>

        <glide-core-dropdown
          label="Label"
          placeholder="Placeholder"
          ?open=${arguments_['<glide-core-dropdown>.open']}
        >
          <glide-core-dropdown-option
            label="One"
            value="one"
            ?selected=${arguments_['<glide-core-dropdown>.value'].includes(
              'one',
            )}
          ></glide-core-dropdown-option>

          <glide-core-dropdown-option
            label="Two"
            value="two"
            ?selected=${arguments_['<glide-core-dropdown>.value'].includes(
              'two',
            )}
          ></glide-core-dropdown-option>

          <glide-core-dropdown-option
            label="Three"
            value="three"
            ?selected=${arguments_['<glide-core-dropdown>.value'].includes(
              'three',
            )}
          ></glide-core-dropdown-option>
        </glide-core-dropdown>

        <glide-core-input
          label="Label"
          placeholder="Placeholder"
          value=${arguments_['<glide-core-input>.value'] || nothing}
        ></glide-core-input>

        <glide-core-textarea
          label="Label"
          placeholder="Placeholder"
          value=${arguments_['<glide-core-textarea>.value'] || nothing}
        ></glide-core-textarea>
      </glide-core-form-controls-layout>
    `;
  },
};

export default meta;

export const FormControlsLayout: StoryObj = {};
