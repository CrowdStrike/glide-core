import './icons/storybook.js';
import './menu.button.js';
import './menu.link.js';
import './split-button.js';
import './split-container.js';
import './split-link.js';

import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Split Button',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<div
        style="height: 13rem; display: flex; align-items: center; justify-content: center;"
      >
        ${story()}
      </div>`,
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A split button provides a primary action and a menu of alternate actions.',
      },
    },
  },
  render: (arguments_) => html`
    <glide-core-split-container
      ?open=${arguments_.open || nothing}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement']}
    >
      <glide-core-split-button slot="primary-action">
        Button
      </glide-core-split-button>

      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `,
  args: {
    open: false,
    size: 'large',
    variant: 'primary',
    disabled: false,
    'menu-label': 'Button menu',
    'menu-placement': 'bottom-end',
    'slot="primary-action"': '',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary"' },
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
    'menu-label': {
      control: { type: 'text' },
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string', detail: 'The menu button`s aria-label.' },
      },
    },
    'menu-placement': {
      control: { type: 'select' },
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
        'top-start',
        'top-end',
      ],
      table: {
        defaultValue: { summary: '"bottom-end"' },
        type: {
          summary:
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start"| "top-end"',
        },
      },
    },
    'slot="primary-action"': {
      table: {
        type: { summary: 'GlideCoreSplitButton | GlideCoreSplitLink' },
      },
      type: { name: 'function', required: true },
    },
  },
};

export default meta;

export const Primary: StoryObj = {};

export const PrimaryWithPrefixIcon: StoryObj = {
  render: (arguments_) => html`
    <glide-core-split-container
      ?open=${arguments_.open || nothing}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement']}
    >
      <glide-core-split-button slot="primary-action">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
        Button
      </glide-core-split-button>
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `,
};

export const PrimaryWithSizeSmall: StoryObj = {
  args: {
    variant: 'primary',
    size: 'small',
  },
};

export const PrimaryWithLink: StoryObj = {
  render: (arguments_) => html`
    <glide-core-split-container
      ?open=${arguments_.open || nothing}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement']}
    >
      <glide-core-split-link slot="primary-action" url="/">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
        Button
      </glide-core-split-link>
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
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
  render: (arguments_) => html`
    <glide-core-split-container
      ?open=${arguments_.open || nothing}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement']}
    >
      <glide-core-split-button slot="primary-action">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
        Button
      </glide-core-split-button>
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `,
};

export const SecondaryWithSizeSmall: StoryObj = {
  args: {
    variant: 'secondary',
    size: 'small',
  },
};

export const SecondaryWithLink: StoryObj = {
  args: {
    variant: 'secondary',
  },
  render: (arguments_) => html`
    <glide-core-split-container
      ?open=${arguments_.open || nothing}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement']}
    >
      <glide-core-split-link slot="primary-action" url="/">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
        Button
      </glide-core-split-link>
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `,
};
