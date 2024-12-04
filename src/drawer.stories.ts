import './button.js';
import './drawer.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreDrawer from './drawer.js';
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
    const drawer = context.canvasElement.querySelector('glide-core-drawer');

    button?.addEventListener('click', () => {
      if (drawer?.open) {
        drawer.close();
      } else {
        drawer?.show();
      }
    });

    const observer = new MutationObserver(() => {
      if (drawer instanceof GlideCoreDrawer) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            open: drawer.open,
          },
        });
      }
    });

    if (drawer) {
      observer.observe(drawer, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-drawer
        label=${arguments_.label}
        ?open=${arguments_.open}
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
    open: false,
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
    open: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
