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
  decorators: [
    (story) =>
      html`<div
        style="align-items: center; display: flex; height: 8rem; justify-content: center;"
      >
        <style>
          textarea {
            height: 6lh !important;
            width: 24rem !important;
          }

          [slot="target"] {
            border-radius: 0.0625rem;
            display: inline-flex;
            &:focus-visible {${focusOutline};}
          }
        </style>

        ${story()}
      </div>`,
  ],
  args: {
    'slot="default"': `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    'slot="target"': '',
    disabled: false,
    offset: 4,
    open: false,
    placement: 'bottom',
    shortcut: ['CMD', 'K'],
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: {
          summary: 'Element',
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
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail: `// The tooltip is never shown when disabled. Useful when you have markup conditionally rendering Tooltip.\n// Instead of that, always render Tooltip and simply disable it when appropriate.`,
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
    shortcut: {
      table: {
        defaultValue: { summary: '[]' },
        type: {
          summary: 'string[]',
        },
      },
    },
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tooltip.js';
      </script>

      <glide-core-tooltip
        offset=${arguments_.offset}
        placement=${arguments_.placement}
        .shortcut=${arguments_.shortcut}
        ?disabled=${arguments_.disabled}
        ?open=${arguments_.open}
      >
        ${unsafeHTML(arguments_['slot="default"'])}

        <glide-core-example-icon
          name="info"
          slot="target"
          tabindex="0"
          style="border-radius: 50%; outline-offset: 1px;"
        ></glide-core-example-icon>
      </glide-core-tooltip>
    `;
  },
};

export default meta;

export const Tooltip: StoryObj = {};
