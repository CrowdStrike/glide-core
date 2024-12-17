import './button.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  tags: ['autodocs'],
  decorators: [
    (story) => html`
      <form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/button.js';
        </script>

        ${story()}
      </form>
    `,
  ],
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, unicorn/explicit-length-check */
    return html`
      <glide-core-button
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        size=${arguments_.size || nothing}
        type=${arguments_.type || nothing}
        value=${arguments_.value || nothing}
        variant=${arguments_.variant || nothing}
        ?disabled=${arguments_.disabled || nothing}
      >
        ${unsafeHTML(arguments_['slot="default"'])}
      </glide-core-button>
    `;
  },
  args: {
    label: 'Label',
    disabled: false,
    name: '',
    size: 'large',
    'slot="prefix-icon"': '',
    'slot="suffix-icon"': '',
    type: 'button',
    value: '',
    variant: 'primary',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    name: {
      table: {
        defaultValue: {
          summary: '""',
        },
      },
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
    'slot="prefix-icon"': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    'slot="suffix-icon"': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'reset', 'submit'],
      table: {
        defaultValue: {
          summary: '"button"',
        },
        type: { summary: '"button" | "reset" | "submit"' },
      },
    },
    value: {
      table: {
        defaultValue: {
          summary: '""',
        },
        type: { summary: 'string' },
      },
    },
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
  },
};

export default meta;

export const Button: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-button
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        size=${arguments_.size || nothing}
        type=${arguments_.type || nothing}
        value=${arguments_.value || nothing}
        variant=${arguments_.variant || nothing}
        ?disabled=${arguments_.disabled}
      >
        ${arguments_['slot="default"']}

        <glide-core-example-icon
          slot="prefix-icon"
          name="calendar"
        ></glide-core-example-icon>

        <glide-core-example-icon
          slot="suffix-icon"
          name="edit"
        ></glide-core-example-icon>
      </glide-core-button>
    `;
  },
};
