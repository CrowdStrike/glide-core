import './accordion.js';
// import '@crowdstrike/glide-icons/editor/bezier-curve-01/line.js';
// import '@crowdstrike/glide-icons/editor/pencil-line/line.js';
// import '@crowdstrike/glide-icons/general/settings-02/line.js';
import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Glide/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An Accordion component.',
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
      defaultValue: { summary: false },
      table: {
        type: { summary: 'boolean' },
      },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | html' },
      },
      type: { name: 'string', required: true },
    },
    'slot="prefix"': {
      table: {
        type: {
          summary: 'html',
          detail: 'Add a prefix, leading icon to the Accordion.',
        },
      },
    },
    'slot="suffix"': {
      table: {
        type: {
          summary: 'html',
          detail: 'Add any number of suffix, trailing icons to the Accordion.',
        },
      },
    },
    'addEventListener(event)': {
      table: {
        type: {
          summary: 'method',
          detail: 'event: "cs-toggle"',
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
      <cs-icon-editor-bezier-curve-01-line
        slot="prefix"
      ></cs-icon-editor-bezier-curve-01-line>

      ${arguments_['slot="default"']}
    </cs-accordion>`,
};

export const WithSuffix: StoryObj = {
  name: 'With Suffix',
  render: (arguments_) =>
    html` <cs-accordion label=${arguments_.label} ?open=${arguments_.open}>
      <cs-icon-editor-bezier-curve-01-line
        slot="prefix"
      ></cs-icon-editor-bezier-curve-01-line>

      ${arguments_['slot="default"']}

      <cs-icon-editor-pencil-line-line
        slot="suffix"
        label="Edit"
      ></cs-icon-editor-pencil-line-line>
      <cs-icon-general-settings-02-line
        slot="suffix"
        label="Settings"
      ></cs-icon-general-settings-02-line>
    </cs-accordion>`,
};
