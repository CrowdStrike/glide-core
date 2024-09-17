import './icon-button.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Icon Button',
  tags: ['autodocs'],
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/icon-button.js';
      </script>

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
    'click()': '',
    disabled: false,
    'focus(options)': '',
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
    'click()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
    },
    'focus(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(options?: FocusOptions) => void',
        },
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
