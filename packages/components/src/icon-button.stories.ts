import './icon-button.js';
import './icons/storybook.js';
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
      <cs-example-icon name="clipboard"></cs-example-icon>
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
