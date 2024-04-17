import './tab-group.js';
import './tab.js';

import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tab',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A single tab, to be rendered inside of a `<cs-tab-group>`',
      },
    },
  },
  render: (arguments_) => html`
    <cs-tab
      variant=${arguments_.variant}
      ?active=${arguments_.active}
      ?disabled=${arguments_.disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        slot="icon"
      >
        <path
          d="M4 13L9 18L20 7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>Tab 1</span>
    </cs-tab>
  `,
  args: {
    variant: 'primary',
    active: true,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'vertical'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary" | "vertical"' },
      },
    },
    active: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

export const Primary: StoryObj = {};

export const Secondary: StoryObj = {
  args: {
    variant: 'secondary',
  },
};

export const Vertical: StoryObj = {
  args: {
    variant: 'vertical',
  },
};
