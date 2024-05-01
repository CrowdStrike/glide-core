import './icon-button.js';
import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Icon Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A button element with a default slot for an icon.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-icon-button
      label=${arguments_.label}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        height="16"
        width="16"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
        />
      </svg>
    </cs-icon-button>
  `,
  args: {
    disabled: false,
    label: 'For screenreaders',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'Element', detail: 'The icon.' },
      },
      type: { name: 'string', required: true },
    },
    disabled: {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'boolean',
        },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary" | "tertiary"' },
      },
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: StoryObj = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: StoryObj = {
  args: {
    variant: 'tertiary',
  },
};
