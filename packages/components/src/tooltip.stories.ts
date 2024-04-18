import './button.js';
import './tooltip.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
    placement: 'right',
  },
  argTypes: {
    'slot="default"': {
      control: { type: '' },
      table: {
        type: { summary: 'Element' },
      },
      type: { name: 'string', required: true },
    },
    'slot="target"': {
      control: { type: '' },
      table: {
        type: { summary: 'Element', detail: 'Any focusable element.' },
      },
      type: { name: 'string', required: true },
    },
    placement: {
      control: { type: 'select' },
      options: ['bottom', 'left', 'right', 'top'],
      table: {
        defaultValue: { summary: '"right"' },
        type: { summary: '"bottom" | "left" | "right" | "top"' },
      },
    },
  },
  render: (arguments_) => html`
    <div
      style="align-items: center; display: flex; height: 8rem; justify-content: center;"
    >
      <cs-tooltip placement=${arguments_.placement}>
        ${unsafeHTML(arguments_['slot="default"'])}

        <span
          slot="target"
          style="display: inline-block; line-height: 0;"
          tabindex="0"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="16"
            viewBox="0 0 24 24"
            width="16"
          >
            <path
              d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </cs-tooltip>
    </div>
  `,
};

export default meta;

export const Tooltip: StoryObj = {};
