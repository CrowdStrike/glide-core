import './inline-alert.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Inline Alert',
  tags: ['autodocs'],
  decorators: [(story) => html` ${story()} `],
  args: {
    variant: 'informational',
    removable: false,
    'slot="default"': 'Label',
    'addEventListener(event, handler)': '',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['informational', 'medium', 'high', 'critical'],
      table: {
        defaultValue: {
          summary: `"informational"`,
        },
        type: {
          summary: `"informational"  | "medium" | "high" | "critical"`,
        },
      },
    },
    removable: {
      defaultValue: { summary: 'false' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    'slot="default"': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      type: {
        name: 'function',
      },
      table: {
        type: {
          summary: 'method',
          detail: '(event: "remove", handler: (event: Event) => void) => void',
        },
      },
    },
  },
  render(arguments_) {
    return html`
      <div style="display: inline-flex; flex-direction: column; gap: 1rem;">
        <glide-core-inline-alert
          variant=${arguments_.variant}
          ?removable=${arguments_.removable}
        >
          ${arguments_['slot="default"']}
        </glide-core-inline-alert>
        <glide-core-inline-alert
          variant="medium"
          ?removable=${arguments_.removable}
        >
          ${arguments_['slot="default"']}
        </glide-core-inline-alert>
        <glide-core-inline-alert
          variant="high"
          ?removable=${arguments_.removable}
        >
          ${arguments_['slot="default"']}
        </glide-core-inline-alert>
        <glide-core-inline-alert
          variant="critical"
          ?removable=${arguments_.removable}
        >
          ${arguments_['slot="default"']}
        </glide-core-inline-alert>
      </div>
    `;
  },
};

export default meta;

export const InlineAlert: StoryObj = {};
