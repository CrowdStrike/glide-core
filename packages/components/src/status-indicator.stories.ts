import './status-indicator.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Status Indicator',
  tags: ['autodocs'],
  render: (arguments_) => html`
    <cs-status-indicator variant=${arguments_.variant}></cs-status-indicator>
  `,
  args: {
    variant: 'failed',
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
          detail: 'Sets the size of the icon.',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Failed: StoryObj = {
  args: {
    variant: 'failed',
  },
};

export const Idle: StoryObj = {
  args: {
    variant: 'idle',
  },
};

export const InProgress: StoryObj = {
  args: {
    variant: 'in-progress',
  },
};

export const Queued: StoryObj = {
  args: {
    variant: 'queued',
  },
};

export const Scheduled: StoryObj = {
  args: {
    variant: 'scheduled',
  },
};

export const Success: StoryObj = {
  args: {
    variant: 'success',
  },
};

export const WarningCritical: StoryObj = {
  args: {
    variant: 'warning-critical',
  },
};

export const WarningHigh: StoryObj = {
  args: {
    variant: 'warning-high',
  },
};

export const WarningInformational: StoryObj = {
  args: {
    variant: 'warning-informational',
  },
};

export const WarningLow: StoryObj = {
  args: {
    variant: 'warning-low',
  },
};

export const WarningMedium: StoryObj = {
  args: {
    variant: 'warning-medium',
  },
};

export const WarningZero: StoryObj = {
  args: {
    variant: 'warning-zero',
  },
};

export const CustomSize: StoryObj = {
  render: (arguments_) => html`
    <cs-status-indicator
      style="--size: 2rem;"
      variant=${arguments_.variant}
    ></cs-status-indicator>
  `,
};
