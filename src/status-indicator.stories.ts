import './status-indicator.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Status Indicator',
  tags: ['autodocs'],
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/status-indicator.js';
    </script>

    <glide-core-status-indicator
      style=${ifDefined(
        arguments_['--size'] ? `--size: ${arguments_['--size']};` : undefined,
      )}
      variant=${arguments_.variant}
    ></glide-core-status-indicator>
  `,
  args: {
    variant: 'idle',
    '--size': '',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'failed',
        'idle',
        'in-progress',
        'queued',
        'scheduled',
        'success',
        'warning-critical',
        'warning-high',
        'warning-informational',
        'warning-low',
        'warning-medium',
        'warning-zero',
      ],
      table: {
        defaultValue: {
          summary: '"idle"',
        },
        type: {
          summary:
            '"failed"| "idle" | "in-progress" | "queued" | "scheduled" | "success" | "warning-critical" | "warning-high" | "warning-informational" | "warning-low" | "warning-medium" | "warning-zero"',
        },
      },
    },
    '--size': {
      table: {
        type: {
          summary: 'CSS custom property',
        },
      },
    },
  },
};

export default meta;

export const StatusIndicator: StoryObj = {
  tags: ['!dev'],
};
