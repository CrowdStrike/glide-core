import './button.js';
import './drawer.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Drawer',
  decorators: [
    withActions,
    (story) => html`
      <div style="height: 12rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/drawer.js';
        </script>

        ${story()}
      </div>
    `,
  ],
  parameters: {
    actions: {
      handles: ['toggle'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const divs = document.querySelectorAll<HTMLElement>('.docs-story > div');

    for (const div of divs) {
      // Pretty brittle. Prevents a layout shift when opening the drawer caused
      // by the addition of a horizontal scrollbar gutter.
      Object.assign(div.style, {
        overflow: 'hidden',
      });
    }

    const button = context.canvasElement.querySelector('glide-core-button');
    const drawer = context.canvasElement.querySelector('glide-core-drawer');

    button?.addEventListener('click', () => {
      if (drawer) {
        drawer.open = !drawer.open;

        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            open: drawer.open,
          },
        });
      }
    });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-drawer
        label=${arguments_.label || nothing}
        ?open=${arguments_.open}
        ?pinned=${arguments_.pinned}
        style=${styleMap({
          '--width': arguments_['--width'] || null,
        })}
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
    open: false,
    pinned: false,
    version: '',
    '--width': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
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
          detail: '(event: "toggle", handler: (event: Event)) => void): void',
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
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
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
