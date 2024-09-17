import './icons/storybook.js';
import './menu.button.js';
import './menu.js';
import './menu.link.js';
import './menu.options.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreButton from './button.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A basic menu.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    'slot="target"': '',
    open: false,
    placement: 'bottom-start',
    size: 'large',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreMenuOptions' },
      },
      type: { name: 'function', required: true },
    },
    'slot="target"': {
      table: {
        type: { summary: 'Element', detail: 'Any focusable element.' },
      },
      type: { name: 'function', required: true },
    },
    open: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
        'top-start',
        'top-end',
      ],
      table: {
        defaultValue: { summary: '"bottom-start"' },
        type: {
          summary:
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start"| "top-end"',
        },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'],
      table: {
        defaultValue: { summary: '"large"' },
        type: { summary: '"small" | "large"' },
      },
    },
  },
  play(context) {
    // eslint-disable-next-line no-underscore-dangle
    let arguments_: Meta['args'] = context.args;

    addons.getChannel().addListener('storyArgsUpdated', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      arguments_ = event.args as typeof context.args;
    });

    context.canvasElement.addEventListener('click', () => {
      addons.getChannel().emit(STORY_ARGS_UPDATED, {
        storyId: context.id,
        args: {
          ...arguments_,
          open: context.canvasElement.querySelector('glide-core-menu')?.open,
        },
      });
    });
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/menu.js';
        import '@crowdstrike/glide-core/menu.options.js';
        import '@crowdstrike/glide-core/menu.link.js';
        import '@crowdstrike/glide-core/menu.button.js';
      </script>

      <glide-core-menu
        placement=${arguments_.placement}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <glide-core-button slot="target"> Target </glide-core-button>

        <glide-core-menu-options>
          <glide-core-menu-link label="One" url="/"></glide-core-menu-link>
          <glide-core-menu-link label="Two" url="/"></glide-core-menu-link>
          <glide-core-menu-button label="Three"></glide-core-menu-button>
        </glide-core-menu-options>
      </glide-core-menu>`;
  },
};

export default meta;

export const Menu: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_, context) {
    context.canvasElement.addEventListener('click', (event) => {
      if (event.target instanceof GlideCoreButton) {
        const menu = context.canvasElement.querySelector('glide-core-menu');

        if (menu) {
          addons.getChannel().emit(STORY_ARGS_UPDATED, {
            storyId: context.id,
            args: {
              ...arguments_,
              open: menu.open,
            },
          });
        }
      }
    });

    return html`<script type="ignore">
        import '@crowdstrike/glide-core/menu.js';
        import '@crowdstrike/glide-core/menu.options.js';
        import '@crowdstrike/glide-core/menu.link.js';
        import '@crowdstrike/glide-core/menu.button.js';
      </script>

      <glide-core-menu
        placement=${arguments_.placement}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <glide-core-menu-options>
          <glide-core-menu-link label="Edit">
            <glide-core-example-icon
              slot="icon"
              name="pencil"
            ></glide-core-example-icon>
          </glide-core-menu-link>

          <glide-core-menu-link label="Move">
            <glide-core-example-icon
              slot="icon"
              name="move"
            ></glide-core-example-icon>
          </glide-core-menu-link>

          <glide-core-menu-link label="Share">
            <glide-core-example-icon
              slot="icon"
              name="share"
            ></glide-core-example-icon>
          </glide-core-menu-link>

          <glide-core-menu-link label="Settings">
            <glide-core-example-icon
              slot="icon"
              name="settings"
            ></glide-core-example-icon>
          </glide-core-menu-link>
        </glide-core-menu-options>

        <glide-core-button slot="target"> Target </glide-core-button>
      </glide-core-menu>`;
  },
};
