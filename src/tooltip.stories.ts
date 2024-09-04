import './button.js';
import './icons/storybook.js';
import './tooltip.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import focusOutline from './styles/focus-outline.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tooltip that positions itself.',
      },
    },
  },
  args: {
    'slot="default"': 'Tooltip <kbd>CMD + K</kbd>',
    'slot="target"': '',
    disabled: false,
    offset: '4',
    open: false,
    placement: 'bottom',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: {
          summary: 'HTMLKBDElement | string',
          detail: '// The content of the tooltip',
        },
      },
      type: { name: 'string', required: true },
    },
    'slot="target"': {
      table: {
        type: {
          summary: 'Element',
          detail: '// The element to which the tooltip should anchor',
        },
      },
      type: { name: 'function', required: true },
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail: `// Never show the tooltip. Useful when you have markup conditionally rendering Tooltip. Instead, always render Tooltip and simply disable it when appropriate.`,
        },
      },
    },
    offset: {
      control: 'number',
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    open: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail:
            '// Force tooltip visibility. Useful when the tooltip should be visible based on something other than hover or focus.',
        },
      },
    },
    placement: {
      control: { type: 'radio' },
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        defaultValue: { summary: '"bottom"' },
        type: {
          summary: '"top" | "right" | "bottom" | "left"',
          detail:
            '// Tooltip will try to move itself to the opposite of this value if it results in an overflow.\n// For example, if "bottom" results in an overflow Tooltip will try "top" but not "right" or "left".',
        },
      },
    },
  },
  render: (arguments_) => {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tooltip.js';
      </script>

      <div
        style="align-items: center; display: flex; height: 8rem; justify-content: center;"
      >
        <glide-core-tooltip
          offset=${arguments_.offset}
          placement=${arguments_.placement}
          ?disabled=${arguments_.disabled}
          ?open=${arguments_.open}
        >
          ${unsafeHTML(arguments_['slot="default"'])}

          <glide-core-example-icon
            name="info"
            slot="target"
            tabindex="0"
          ></glide-core-example-icon>
        </glide-core-tooltip>
      </div>

      <style>
        [slot="target"] {
          border-radius: 0.0625rem;
          display: inline-flex;
          &:focus-visible {${focusOutline};}
        }
      </style>
    `;
  },
};

export default meta;

export const Tooltip: StoryObj = {
  tags: ['!dev'],
};
