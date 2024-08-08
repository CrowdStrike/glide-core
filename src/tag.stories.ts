import './icons/storybook.js';
import './tag.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tag component to categorize information.',
      },
    },
  },
  render: (arguments_) => html`
    <glide-core-tag
      removable-label=${arguments_['removable-label'] || nothing}
      size=${arguments_.size}
    >
      ${arguments_['slot="default"']}
    </glide-core-tag>
  `,
  args: {
    'slot="default"': 'Tag',
    'removable-label': '',
    size: 'medium',
  },
  argTypes: {
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string', detail: 'The content of the Tag.' },
      },
      type: { name: 'string', required: true },
    },
    'slot="prefix"': {
      table: {
        type: {
          summary: 'Element',
          detail: 'Add a prefix, a leading icon to the Tag.',
        },
      },
      type: {
        name: 'function',
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: {
          summary: 'medium',
        },
        type: {
          summary: '"small" | "medium" | "large"',
          detail: "The Tag's size",
        },
      },
    },
    'removable-label': {
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
          detail:
            'Adds a button to the Tag that removes it from the DOM when an accessible label is provided.',
        },
      },
    },
    'addEventListener(event)': {
      type: {
        name: 'function',
      },
      table: {
        type: {
          summary: 'method',
          detail: 'event: "remove", listener: (event: Event) => void',
        },
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  name: 'Tag',
};

export const DefaultWithPrefixIcon: StoryObj = {
  name: 'Tag (With Prefix Icon)',
  render: (arguments_) => html`
    <glide-core-tag>
      <span slot="prefix">
        <glide-core-example-icon name="drag-dots"></glide-core-example-icon>
      </span>
      ${arguments_['slot="default"']}</glide-core-tag
    >
  `,
};

export const Removable: StoryObj = {
  name: 'Tag (With Removable Label)',
  render: (arguments_) => html`
    <glide-core-tag removable-label="Tag">
      ${arguments_['slot="default"']}</glide-core-tag
    >
  `,
};

export const RemovableWithIcon: StoryObj = {
  name: 'Tag (With Removable Label and Prefix Icon)',
  render: (arguments_) => html`
    <glide-core-tag removable-label="Tag">
      <span slot="prefix">
        <glide-core-example-icon name="drag-dots"></glide-core-example-icon>
      </span>
      ${arguments_['slot="default"']}</glide-core-tag
    >
  `,
};
