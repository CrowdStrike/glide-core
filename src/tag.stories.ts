import './icons/storybook.js';
import './tag.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tag',
  tags: ['autodocs'],
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/tag.js';
    </script>

    <glide-core-tag
      removable-label=${arguments_['removable-label'] || nothing}
      size=${arguments_.size}
    >
      ${arguments_['slot="default"']}
    </glide-core-tag>
  `,
  args: {
    'slot="default"': 'Tag',
    'addEventListener(event, listener)': '',
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
    'addEventListener(event, listener)': {
      type: {
        name: 'function',
      },
      table: {
        type: {
          summary: 'method',
          detail: '(event: "remove", listener: (event: Event) => void) => void',
        },
      },
    },
  },
};

export default meta;

export const Tag: StoryObj = {
  tags: ['!autodocs', '!dev'],
};

export const WithIcon: StoryObj = {
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/tag.js';
    </script>

    <glide-core-tag>
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        name="drag-dots"
        slot="prefix"
      ></glide-core-example-icon>
    </glide-core-tag>
  `,
};
