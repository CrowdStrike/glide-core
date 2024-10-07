import './icon-button.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Icon Button',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/icon-button.js';
        </script>

        ${story()}
      </form>`,
  ],
  render(arguments_) {
    return html`
      <glide-core-icon-button
        label=${arguments_.label || nothing}
        variant=${arguments_.variant || nothing}
        ?disabled=${arguments_.disabled}
      >
        <glide-core-example-icon name="clipboard"></glide-core-example-icon>
      </glide-core-icon-button>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    disabled: false,
    variant: 'primary',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
      type: { name: 'string', required: true },
    },
    'slot="default"': {
      table: {
        type: { summary: 'Element', detail: 'An icon' },
      },
      type: { name: 'function', required: true },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'primary',
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

export const IconButton: StoryObj = {};
