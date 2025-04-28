import './inline-alert.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Inline Alert',
  decorators: [
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/inline-alert.js';
      </script>

      ${story()}
    `,
  ],
  args: {
    'slot="default"': 'Content',
    variant: 'informational',
    version: '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
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
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
  },
  render(arguments_) {
    return html`
      <glide-core-inline-alert
        variant=${arguments_.variant === 'informational'
          ? nothing
          : arguments_.variant}
        ?removable=${arguments_.removable}
      >
        ${arguments_['slot="default"']}
      </glide-core-inline-alert>
    `;
  },
};

export default meta;

export const InlineAlert: StoryObj = {};
