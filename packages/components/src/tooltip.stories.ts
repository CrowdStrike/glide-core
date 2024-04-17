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
    'slot="default"': 'Content <kbd>CMD + K</kbd>',
    'slot="target"': '',
  },
  argTypes: {
    'slot="default"': {
      control: { type: '' },
      table: {
        type: { summary: 'Element | string' },
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
  },
  render: (arguments_) => html`
    <div
      style="align-items: center; display: flex; height: 125px; justify-content: center;"
    >
      <cs-tooltip>
        ${unsafeHTML(arguments_['slot="default"'])}

        <button
          slot="target"
          style="background: none; border: none; line-height: 0; padding: 0;"
        >
          <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
            <path
              d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </cs-tooltip>
    </div>
  `,
};

export default meta;

export const Tooltip: StoryObj = {};
