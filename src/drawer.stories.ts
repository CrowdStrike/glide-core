import './button.js';
import './drawer.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import ow from './library/ow.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [
    (story) =>
      html`<div style="height: 12.5rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/drawer.js';
        </script>

        ${story()}
      </div>`,
  ],
  title: 'Drawer',
  tags: ['autodocs'],
  parameters: {
    docs: {
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
    let isOpen = false;

    button?.addEventListener('click', () => {
      const drawer = context.canvasElement.querySelector('glide-core-drawer');

      if (isOpen) {
        drawer?.close();
      } else {
        drawer?.show();
      }

      isOpen = !isOpen;
    });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-drawer
        label=${arguments_.label}
        ?pinned=${arguments_.pinned}
        style="${ifDefined(
          arguments_['--width']
            ? `--width: ${arguments_['--width']};`
            : undefined,
        )}"
      >
        ${unsafeHTML(arguments_['slot="default"'])}
      </glide-core-drawer>
      <glide-core-button label="Toggle"></glide-core-button>

      <style>
        glide-core-drawer div {
          padding: 0.5rem;
        }
      </style>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    'addEventListener(event, handler)': '',
    'close()': '',
    'show()': '',
    pinned: false,
    '--width': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    'show()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    'close()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    label: {
      table: {
        type: {
          summary: 'string',
          detail: '// For screenreaders',
        },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(event: "close", handler: (event: Event)) => void) => void',
        },
      },
    },
    pinned: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '--width': {
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
