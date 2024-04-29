import './button.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A button element with optional slots for icons.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      >${arguments_['slot="default"']}</cs-button
    >
  `,
  args: {
    disabled: false,
    variant: 'primary',
    size: 'large',
    'slot="default"': 'Button',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary" | "tertiary"' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'small'],
      table: {
        defaultValue: {
          summary: '"large"',
        },
        type: { summary: '"large" | "small"' },
      },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  args: {
    variant: 'primary',
  },
};

export const PrimaryWithPrefixIcon: StoryObj = {
  args: {
    variant: 'primary',
  },

  name: 'Primary (With Prefix Icon)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="prefix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const PrimaryWithSuffixIcon: StoryObj = {
  name: 'Primary (With Suffix Icon)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="suffix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const PrimaryWithPrefixAndSuffixIcons: StoryObj = {
  name: 'Primary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="prefix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>

      <svg
        slot="suffix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const Secondary: StoryObj = {
  args: {
    variant: 'secondary',
  },
};

export const SecondaryWithPrefixIcon: StoryObj = {
  args: {
    variant: 'secondary',
  },
  name: 'Secondary (With Prefix Icon)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="prefix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const SecondaryWithSuffixIcon: StoryObj = {
  args: {
    variant: 'secondary',
  },
  name: 'Secondary (With Suffix Icon)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="suffix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const SecondaryWithPrefixAndSuffixIcons: StoryObj = {
  args: {
    variant: 'secondary',
  },
  name: 'Secondary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="prefix"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm11-2v4M8 3v4m-5 3h18M7.858 13.954h.1m4.342 0h.1m4.3 0h.1M7.827 17.4h.1m4.373 0h.1m4.269 0h.1"
        ></path>
      </svg>

      <svg
        slot="suffix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const Tertiary: StoryObj = {
  args: {
    variant: 'tertiary',
  },
};

export const TertiaryWithPrefixIcon: StoryObj = {
  args: {
    variant: 'tertiary',
  },
  name: 'Tertiary (With Prefix Icon)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="prefix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const TertiaryWithSuffixIcon: StoryObj = {
  args: {
    variant: 'tertiary',
  },
  name: 'Tertiary (With Suffix Icon)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="suffix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};

export const TertiaryWithPrefixAndSuffixIcons: StoryObj = {
  args: {
    variant: 'tertiary',
  },
  name: 'Tertiary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <cs-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <svg
        slot="prefix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>

      <svg
        slot="suffix"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6,9.1,9,12l3,2.9L15,12l3-2.9" />
      </svg>
    </cs-button>
  `,
};
