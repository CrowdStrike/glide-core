import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreToggle from './toggle.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A toggle with a label and optional tooltip, summary, and description.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'addEventListener(event, listener)': '',
    checked: false,
    disabled: false,
    'hide-label': false,
    orientation: 'horizontal',
    'slot="description"': 'Description',
    'slot="tooltip"': '',
    summary: 'Summary',
  },
  argTypes: {
    'slot="tooltip"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'HTMLKBDElement | string' },
      },
    },
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input", listener: (event: Event) => void) => void',
        },
      },
      type: { name: 'function' },
    },
    'hide-label': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    checked: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    summary: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  play(context) {
    // eslint-disable-next-line no-underscore-dangle
    let arguments_: Meta['args'] = context.args;

    addons.getChannel().addListener('storyArgsUpdated', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      arguments_ = event.args as typeof context.args;
    });

    context.canvasElement
      .querySelector('glide-core-toggle')
      ?.addEventListener('change', (event) => {
        if (event.target instanceof GlideCoreToggle) {
          addons.getChannel().emit(STORY_ARGS_UPDATED, {
            storyId: context.id,
            args: {
              ...arguments_,
              checked: event.target.checked,
            },
          });
        }
      });
  },

  render(arguments_) {
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/toggle.js';
      </script>

      <glide-core-toggle
        label=${arguments_.label || nothing}
        orientation=${arguments_.orientation || nothing}
        summary=${arguments_.summary || nothing}
        ?checked=${arguments_.checked}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label'] || nothing}
      >
        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
          : ''}
      </glide-core-toggle>`;
  },
};

export default meta;

export const Toggle: StoryObj = {};
