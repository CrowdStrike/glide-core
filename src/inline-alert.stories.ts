import './inline-alert.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Inline Alert',
  tags: ['autodocs'],
  decorators: [
    (story) => html`
      <div style="height: 6rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/inline-alert.js';
        </script>

        ${story()}
      </div>
    `,
  ],
  args: {
    'slot="default"': 'Content',
    'addEventListener(event, handler)': '',
    removable: false,
    variant: 'informational',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(event: "remove", handler: (event: Event) => void) => void',
        },
      },
    },
    removable: {
      defaultValue: { summary: 'false' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    variant: {
      control: { type: 'radio' },
      options: ['informational', 'medium', 'high', 'critical'],
      table: {
        defaultValue: {
          summary: `"informational"`,
        },
        type: {
          summary: `"informational" | "medium" | "high" | "critical"`,
        },
      },
    },
  },
  render(arguments_) {
    return html`
      <glide-core-inline-alert
        variant=${arguments_.variant}
        ?removable=${arguments_.removable}
      >
        ${arguments_['slot="default"']}
      </glide-core-inline-alert>
    `;
  },
};

export default meta;

export const InlineAlert: StoryObj = {};
