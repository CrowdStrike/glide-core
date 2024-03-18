import '../components/example-icon.js';
import '@crowdstrike/glide-core-components/button.js';
import { html, nothing } from 'lit-html';
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
      disabled=${arguments_.disabled || nothing}
      >${arguments_['slot="default"']}</cs-button
    >
  `,
  args: {
    disabled: false,
    variant: 'primary',
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
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | html' },
      },
      type: { name: 'string', required: true },
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  args: {
    variant: 'primary',
    size: 'large',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['large', 'small'],
      table: {
        defaultValue: {
          summary: '"large"',
        },
      },
    },
  },
};

export const PrimaryWithPrefixIcon: StoryObj = {
  name: 'Primary (With Prefix Icon)',
  render: (arguments_) => html`
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="prefix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
    </cs-button>
  `,
};

export const Small: StoryObj = {
  args: {
    size: 'small',
  },
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
};

export const PrimaryWithSuffixIcon: StoryObj = {
  name: 'Primary (With Suffix Icon)',
  render: (arguments_) => html`
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="suffix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
    </cs-button>
  `,
};

export const PrimaryWithPrefixAndSuffixIcons: StoryObj = {
  name: 'Primary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="prefix" name="grid"></cs-example-icon>
      <cs-example-icon slot="suffix" name="check-circle"></cs-example-icon>
      ${arguments_['slot="default"']}
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
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="prefix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
    </cs-button>
  `,
};

export const SecondaryWithSuffixIcon: StoryObj = {
  args: {
    variant: 'secondary',
  },
  name: 'Secondary (With Suffix Icon)',
  render: (arguments_) => html`
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="suffix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
    </cs-button>
  `,
};

export const SecondaryWithPrefixAndSuffixIcons: StoryObj = {
  args: {
    variant: 'secondary',
  },
  name: 'Secondary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="prefix" name="calendar"></cs-example-icon>
      <cs-example-icon slot="suffix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
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
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="prefix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
    </cs-button>
  `,
};

export const TertiaryWithSuffixIcon: StoryObj = {
  args: {
    variant: 'tertiary',
  },
  name: 'Tertiary (With Suffix Icon)',
  render: (arguments_) => html`
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="suffix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
    </cs-button>
  `,
};

export const TertiaryWithPrefixAndSuffixIcons: StoryObj = {
  args: {
    variant: 'tertiary',
  },
  name: 'Tertiary (With Prefix + Suffix Icons)',
  render: (arguments_) => html`
    <cs-button variant=${arguments_.variant} ?disabled=${arguments_.disabled}>
      <cs-example-icon slot="prefix" name="chevron-down"></cs-example-icon>
      <cs-example-icon slot="suffix" name="chevron-down"></cs-example-icon>
      ${arguments_['slot="default"']}
    </cs-button>
  `,
};
