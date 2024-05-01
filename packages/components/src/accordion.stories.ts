import './accordion.js';
import './icons/storybook.js';
import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [(story) => html`<div style="height: 6rem;">${story()}</div>`],
  title: 'Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An Accordion component with optional slots for icons.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-accordion label=${arguments_.label} ?open=${arguments_.open}
      >${arguments_['slot="default"']}</cs-accordion
    >
  `,
  args: {
    label: 'Accordion',
    open: false,
    'slot="default"': 'Inner content',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    open: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    'slot="prefix"': {
      table: {
        type: {
          summary: 'Element',
          detail: 'Add a prefix, leading icon to the Accordion.',
        },
      },
    },
    'slot="suffix"': {
      table: {
        type: {
          summary: 'Element',
          detail: 'Add any number of suffix, trailing icons to the Accordion.',
        },
      },
    },
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "toggle", listener: (event: CustomEvent<{ newState: "open" | "closed", oldState: "open" | "closed" }>) => void) => void',
        },
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {};

export const WithPrefixIcon: StoryObj = {
  name: 'Default (With Prefix Icon)',
  render: (arguments_) =>
    html` <cs-accordion label=${arguments_.label} ?open=${arguments_.open}>
      <cs-example-icon slot="prefix" name="share"></cs-example-icon>

      ${arguments_['slot="default"']}
    </cs-accordion>`,
};

export const WithSuffix: StoryObj = {
  name: 'Default (With Suffix Icons)',
  render: (arguments_) =>
    html` <cs-accordion label=${arguments_.label} ?open=${arguments_.open}>
      ${arguments_['slot="default"']}

      <cs-example-icon slot="suffix" name="pencil"></cs-example-icon>
      <cs-example-icon slot="suffix" name="settings"></cs-example-icon>
    </cs-accordion>`,
};

export const WithPrefixAndSuffix: StoryObj = {
  name: 'Default (With Prefix & Suffix Icons)',
  render: (arguments_) =>
    html` <cs-accordion label=${arguments_.label} ?open=${arguments_.open}>
      <cs-example-icon slot="prefix" name="share"></cs-example-icon>

      ${arguments_['slot="default"']}

      <cs-example-icon slot="suffix" name="pencil"></cs-example-icon>
      <cs-example-icon slot="suffix" name="settings"></cs-example-icon>
    </cs-accordion>`,
};
