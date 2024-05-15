import './button.js';
import './icons/storybook.js';
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
        type: { summary: '"bottom" | "left" | "right" | "top"' },
      },
    },
  },
  render: (arguments_) => {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <div
        style="align-items: center; display: flex; height: 8rem; justify-content: center;"
      >
        <cs-tooltip placement=${arguments_.placement}>
          ${unsafeHTML(arguments_['slot="default"'])}

          <span
            slot="target"
            style="border-radius: 50%; display: inline-block; line-height: 0; outline-offset: 1px;"
            tabindex="0"
          >
            <cs-example-icon name="info"></cs-example-icon>
          </span>
        </cs-tooltip>
      </div>
    `;
  },
};

export default meta;

export const Tooltip: StoryObj = {};
