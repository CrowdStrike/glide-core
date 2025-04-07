import './icons/storybook.js';
import './tag.js';
import { html, nothing } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tag',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tag.js';
      </script>

      ${story()}
    `,
  ],
  parameters: {
    actions: {
      handles: ['remove'],
    },
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-tag
        label=${arguments_.label || nothing}
        color=${arguments_.color}
        size=${arguments_.size}
        ?disabled=${arguments_.disabled}
        ?removable=${arguments_.removable}
      >
        ${arguments_['slot="default"']}
      </glide-core-tag>
    `;
  },
  args: {
    label: 'Label',
    'addEventListener(event, handler)': '',
    color: '',
    disabled: false,
    removable: false,
    size: 'medium',
    'slot="prefix-icon"': '',
    'slot="suffix-icon"': '',
    version: '',
  },
  argTypes: {
    label: {
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      type: {
        name: 'function',
      },
      table: {
        type: {
          summary: 'method',
          detail: '(event: "remove", handler: (event: Event) => void): void',
        },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['', 'green', 'indigo', 'red'],
      table: {
        type: { summary: 'green | indigo | red' },
      },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    removable: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: {
          summary: '"medium"',
        },
        type: {
          summary: '"small" | "medium" | "large"',
        },
      },
    },
    'slot="prefix-icon"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
        },
      },
    },
    'slot="suffix-icon"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
        },
      },
    },
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
  },
};

export default meta;

export const Tag: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-tag
        label=${arguments_.label || nothing}
        color=${arguments_.color}
        size=${arguments_.size}
        ?disabled=${arguments_.disabled}
        ?removable=${arguments_.removable}
      >
        <glide-core-example-icon
          name="drag-dots"
          slot="prefix-icon"
        ></glide-core-example-icon>

        <glide-core-example-icon
          name="checkmark"
          slot="suffix-icon"
        ></glide-core-example-icon>
      </glide-core-tag>
    `;
  },
};
