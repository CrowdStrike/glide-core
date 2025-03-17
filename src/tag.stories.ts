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
    disabled: false,
    removable: false,
    size: 'medium',
    'slot="icon"': '',
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
    'slot="icon"': {
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

export const WithIcon: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-tag
        label=${arguments_.label || nothing}
        size=${arguments_.size}
        ?disabled=${arguments_.disabled}
        ?removable=${arguments_.removable}
      >
        <glide-core-example-icon
          name="drag-dots"
          slot="icon"
        ></glide-core-example-icon>
      </glide-core-tag>
    `;
  },
};
