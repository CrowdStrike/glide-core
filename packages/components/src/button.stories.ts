import './button.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A button with optional slots for icons.',
      },
    },
  },
  render: (arguments_) => html`
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      >${arguments_['slot="default"']}</glide-core-button
    >
  `,
  args: {
    'slot="default"': 'Button',
    disabled: false,
    variant: 'primary',
    size: 'large',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
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
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="prefix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};

export const PrimaryWithSuffixIcon: StoryObj = {
  name: 'Primary (With Suffix Icon)',
  render: (arguments_) => html`
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="suffix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};

export const PrimaryWithPrefixAndSuffixIcons: StoryObj = {
  name: 'Primary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="prefix"
        name="calendar"
      ></glide-core-example-icon>
      <glide-core-example-icon
        slot="suffix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
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
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="prefix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};

export const SecondaryWithSuffixIcon: StoryObj = {
  args: {
    variant: 'secondary',
  },
  name: 'Secondary (With Suffix Icon)',
  render: (arguments_) => html`
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="suffix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};

export const SecondaryWithPrefixAndSuffixIcons: StoryObj = {
  args: {
    variant: 'secondary',
  },
  name: 'Secondary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="prefix"
        name="calendar"
      ></glide-core-example-icon>
      <glide-core-example-icon
        slot="suffix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
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
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="prefix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};

export const TertiaryWithSuffixIcon: StoryObj = {
  args: {
    variant: 'tertiary',
  },
  name: 'Tertiary (With Suffix Icon)',
  render: (arguments_) => html`
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="suffix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};

export const TertiaryWithPrefixAndSuffixIcons: StoryObj = {
  args: {
    variant: 'tertiary',
  },
  name: 'Tertiary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <glide-core-button
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="prefix"
        name="calendar"
      ></glide-core-example-icon>
      <glide-core-example-icon
        slot="suffix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};
