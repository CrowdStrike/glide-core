import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit-html';
import CsToggle from './toggle.js';
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
    },
  },
  args: {
    ['slot="description"']: 'Description',
    ['slot="tooltip"']: '',
    checked: false,
    disabled: false,
    label: 'Label',
    orientation: 'horizontal',
    summary: 'Summary',
  },
  argTypes: {
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input",  listener: (event: Event) => void) => void\n\n // Dispatched when checked or unchecked.',
        },
      },
      type: { name: 'function' },
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

  render(arguments_, context) {
    context.canvasElement.addEventListener('change', (event) => {
      if (event.target instanceof CsToggle) {
        addons.getChannel().emit(STORY_ARGS_UPDATED, {
          storyId: context.id,
          args: {
            ...arguments_,
            checked: event.target.checked,
          },
        });
      }
    });

    return html`<form style="padding: 1.5rem;">
      <cs-toggle
        label=${arguments_.label || nothing}
        orientation=${arguments_.orientation || nothing}
        summary=${arguments_.summary || nothing}
        ?checked=${arguments_.checked}
        ?disabled=${arguments_.disabled}
      >
        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
          : ''}
      </cs-toggle>
    </form>`;
  },
};

export default meta;

export const Horizontal: StoryObj = {};

export const HorizontalWithTooltip: StoryObj = {
  args: {
    ['slot="tooltip"']: 'Tooltip',
  },
  name: 'Horizontal (With Tooltip)',
};

export const Vertical: StoryObj = {
  args: {
    orientation: 'vertical',
  },
};

export const VerticalWithToolip: StoryObj = {
  args: {
    ['slot="tooltip"']: 'Tooltip',
    orientation: 'vertical',
  },
  name: 'Vertical (With Tooltip)',
};
