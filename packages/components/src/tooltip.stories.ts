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
    placement: 'bottom',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'Element' },
      },
      type: { name: 'function', required: true },
    },
    'slot="target"': {
      table: {
        type: { summary: 'Element', detail: 'Any focusable element.' },
      },
      type: { name: 'function', required: true },
    },
    placement: {
      control: { type: 'radio' },
      options: ['bottom', 'left', 'right', 'top'],
      table: {
        defaultValue: { summary: '"bottom"' },
        type: {
          summary: '"bottom" | "left" | "right" | "top"',
          detail:
            '// Tooltip will try to move itself to the opposite of this value if it results in an overflow.\n// For example, if "bottom" results in an overflow Tooltip will try "top" but not "right" or "left".',
        },
      },
    },
  },
  render: (arguments_) => {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <div
        style="align-items: center; display: flex; height: 8rem; justify-content: center;"
      >
        <glide-core-tooltip placement=${arguments_.placement}>
          ${unsafeHTML(arguments_['slot="default"'])}
          <span slot="target" class="icon" tabindex="0">
            <glide-core-example-icon name="info"></glide-core-example-icon>
          </span>
        </glide-core-tooltip>
      </div>

      <style>
        .icon {
          border-radius: 0.0625rem;
          display: inline-flex;
          /* Consumers are advised to implement a similar focus ring on a trigger element. */
          &:focus-visible {${focusOutline};}
        }
      </style>
    `;
  },
};

export default meta;

export const Tooltip: StoryObj = {};
