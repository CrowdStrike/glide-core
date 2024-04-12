import './button.js';
import './drawer.js';
import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [(story) => html`<div style="height: 12.5rem;">${story()}</div>`],
  title: 'Drawer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A Drawer element with a default slot for content.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    let isOpen = false;

    const button = context.canvasElement.querySelector('cs-button');
    const drawer = context.canvasElement.querySelector('cs-drawer');

    if (!button || !drawer) {
      return;
    }

    button.addEventListener('click', () => {
      if (isOpen) {
        drawer?.close();
        return;
      }

      drawer?.open();
    });

    drawer.addEventListener('open', () => (isOpen = true));

    drawer.addEventListener('close', () => (isOpen = false));
  },
  render: (arguments_) => html`
    <cs-button>Toggle</cs-button>

    <cs-drawer>
      <div style="padding: 0.5rem">${arguments_['slot="default"']}</div>
    </cs-drawer>
  `,
  args: {
    'slot="default"': 'Drawer content',
  },
  argTypes: {
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | html' },
      },
      type: { name: 'string', required: true },
    },
    'open()': {
      table: {
        type: {
          summary: 'method',
          detail: 'Opens the Drawer.',
        },
      },
    },
    'close()': {
      table: {
        type: {
          summary: 'method',
          detail: 'Closes the Drawer.',
        },
      },
    },
    'addEventListener(event)': {
      control: { type: '' },
      table: {
        type: {
          summary: 'method',
          detail: 'event: "open" | "close"',
        },
      },
    },
    '--cs-drawer-width': {
      control: { type: '' },
      table: {
        type: {
          summary: 'css property',
          detail: 'Sets the width of the Drawer.',
        },
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {};

export const WithCSSVariable: StoryObj = {
  name: 'Custom Width',
  render: () => html`
    <cs-button data-trigger>Open/Close</cs-button>

    <!-- Use the the following CSS variable to adjust the width of the Drawer -->
    <cs-drawer style="--cs-drawer-width: 20rem;">
      <div style="padding: 0.5rem">Width of 20rem</div>
    </cs-drawer>
  `,
};
