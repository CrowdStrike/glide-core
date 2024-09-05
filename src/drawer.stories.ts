import './button.js';
import './drawer.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import ow from './library/ow.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [(story) => html`<div style="height: 12.5rem;">${story()}</div>`],
  title: 'Drawer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A drawer for arbitrary content.',
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

    const button = context.canvasElement.querySelector('glide-core-button');
    const drawer = context.canvasElement.querySelector('glide-core-drawer');

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
    <script type="ignore">
      import '@crowdstrike/glide-core/drawer.js';
    </script>

    <glide-core-drawer
      label=${arguments_.label}
      ?pinned=${arguments_.pinned}
      style="${ifDefined(
        arguments_['--width']
          ? `--width: ${arguments_['--width']};`
          : undefined,
      )}"
    >
      ${arguments_['slot="default"']}
    </glide-core-drawer>
    <glide-core-button>Toggle</glide-core-button>

    <style>
      glide-core-drawer div {
        padding: 0.5rem;
      }
    </style>
  `,
  args: {
    label: 'Label',
    'slot="default"': '',
    'addEventListener(event, listener)': '',
    'close()': '',
    'open()': '',
    pinned: false,
    '--width': '',
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
      control: false,
      table: {
        type: {
          summary: 'method',
        },
      },
    },
    'close()': {
      control: false,
      table: {
        type: {
          summary: 'method',
        },
      },
    },
    label: {
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
          detail: '// For screenreaders',
        },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "open" | "close", listener: (event: Event) => void) => void',
        },
      },
    },
    pinned: {
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '--width': {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'CSS custom property',
          detail: '// The width of the drawer',
        },
      },
    },
  },
};

export default meta;

export const Drawer: StoryObj = {};
