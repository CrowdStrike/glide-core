import './button.js';
import './icons/storybook.js';
import './menu.button.js';
import './menu.js';
import './menu.link.js';
import './menu.options.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreMenu from './menu.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Menu',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<script type="ignore">
          import '@crowdstrike/glide-core/menu.js';
          import '@crowdstrike/glide-core/menu.options.js';
          import '@crowdstrike/glide-core/menu.link.js';
          import '@crowdstrike/glide-core/menu.button.js';
        </script>

        ${story()}`,
  ],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    'slot="target"': '',
    offset: 4,
    open: false,
    placement: 'bottom-start',
    size: 'large',
    '<glide-core-menu-button>.label': 'One',
    '<glide-core-menu-link>.label': 'Three',
    '<glide-core-menu-link>.url': '/',
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
    offset: {
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    open: {
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
    '<glide-core-menu-button>.label': {
      name: 'label',
      table: {
        category: 'Menu Button',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-menu-link>.label': {
      name: 'label',
      table: {
        category: 'Menu Link',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-menu-link>.url': {
      name: 'url',
      table: {
        category: 'Menu Link',
        type: { summary: 'string' },
      },
    },
  },
  play(context) {
    const menu = context.canvasElement.querySelector('glide-core-menu');

    const observer = new MutationObserver(() => {
      if (menu instanceof GlideCoreMenu) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            open: menu.open,
          },
        });
      }
    });

    if (menu) {
      observer.observe(menu, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<glide-core-menu
      offset=${arguments_.offset}
      placement=${arguments_.placement}
      size=${arguments_.size || nothing}
      ?open=${arguments_.open}
    >
      <glide-core-button label="Target" slot="target"></glide-core-button>

      <glide-core-menu-options>
        <glide-core-menu-button
          label=${arguments_['<glide-core-menu-button>.label']}
        ></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
        <glide-core-menu-link
          label=${arguments_['<glide-core-menu-link>.label']}
          url=${arguments_['<glide-core-menu-link>.url']}
        ></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`;
  },
};

export default meta;

export const Menu: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_) {
    return html`<glide-core-menu
      offset=${arguments_.offset}
      placement=${arguments_.placement}
      size=${arguments_.size || nothing}
      ?open=${arguments_.open}
    >
      <glide-core-button label="Target" slot="target"></glide-core-button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Edit">
          <glide-core-example-icon
            slot="icon"
            name="edit"
          ></glide-core-example-icon>
        </glide-core-menu-button>

        <glide-core-menu-button label="Move">
          <glide-core-example-icon
            slot="icon"
            name="move"
          ></glide-core-example-icon>
        </glide-core-menu-button>

        <glide-core-menu-link label="Share" url="/">
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`;
  },
};
