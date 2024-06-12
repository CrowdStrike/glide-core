import './button.js';
import './drawer.js';
import { html } from 'lit';
import ow from './library/ow.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [
    (story) =>
      html`<div style="height: 12.5rem; position: relative; overflow: hidden;">
        ${story()}
      </div>`,
  ],
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
    const divs = document.querySelectorAll<HTMLElement>('.docs-story > div');

    for (const div of divs) {
      ow(div, ow.object.instanceOf(HTMLElement));

      // Pretty brittle. Prevents a layout shift when opening the drawer caused
      // by the addition of a horizontal scrollbar gutter.
      Object.assign(div.style, {
        overflow: 'hidden',
      });
    }

    const button = context.canvasElement.querySelector('cs-button');
    const drawer = context.canvasElement.querySelector('cs-drawer');
    let isOpen = false;

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
        type: { summary: 'Element | string' },
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
      type: { name: 'function' },
    },
    'close()': {
      table: {
        type: {
          summary: 'method',
          detail: 'Closes the Drawer.',
        },
      },
      type: { name: 'function' },
    },
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "open" | "close", listener: (event: Event) => void) => void',
        },
      },
      type: { name: 'function' },
    },
    '--width': {
      table: {
        type: {
          summary: 'CSS custom property',
          detail: 'Sets the width of the Drawer.',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Default: StoryObj = {};

export const WithCSSVariable: StoryObj = {
  name: 'Custom Width',
  render: () => html`
    <cs-button data-trigger>Open/Close</cs-button>

    <cs-drawer style="--width: 20rem;">
      <div style="padding: 0.5rem">Width of 20rem</div>
    </cs-drawer>
  `,
};
