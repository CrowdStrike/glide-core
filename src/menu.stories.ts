import './button.js';
import './icons/storybook.js';
import './menu.button.js';
import './menu.link.js';
import './menu.options.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { withActions } from '@storybook/addon-actions/decorator';
import GlideCoreMenu from './menu.js';

const meta: Meta = {
  title: 'Menu',
  tags: ['autodocs'],
  decorators: [
    withActions,
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
    actions: {
      // Menu Button and Link are selected so "click" events from Menu's target
      // aren't picked up, muddying the Actions tab.
      handles: [
        'click glide-core-menu-button',
        'click glide-core-menu-link',
        'toggle',
      ],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    'slot="target"': '',
    'addEventListener(event, handler)': '',
    offset: 4,
    open: false,
    placement: 'bottom-start',
    size: 'large',
    '<glide-core-menu-options>[slot="default"]': '',
    '<glide-core-menu-button>.label': 'One',
    '<glide-core-menu-button>.disabled': false,
    '<glide-core-menu-link>.label': 'Three',
    '<glide-core-menu-link>.disabled': false,
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
        type: {
          summary: 'Element',
          detail:
            'The element to which the menu will anchor, which can be any focusable element',
        },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "click" | "toggle", handler: (event: Event) => void): void',
        },
      },
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
    '<glide-core-menu-options>[slot="default"]': {
      name: 'slot="default"',
      control: false,
      table: {
        category: 'Menu Options',
        type: {
          summary: 'GlideCoreMenuButton | GlideCoreMenuLink',
        },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-menu-button>.label': {
      name: 'label',
      table: {
        category: 'Menu Button',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-menu-button>.disabled': {
      name: 'disabled',
      table: {
        category: 'Menu Button',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-menu-link>.label': {
      name: 'label',
      table: {
        category: 'Menu Link',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-menu-link>.disabled': {
      name: 'disabled',
      table: {
        category: 'Menu Link',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
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

    menu?.addEventListener('click', (event: Event) => {
      const isLink =
        event.target instanceof Element &&
        event.target.closest('glide-core-menu-link');

      if (isLink && window.top) {
        event.preventDefault();

        // The Storybook user expects to navigate when the link is clicked but
        // doesn't expect to be redirected to the first story. So we refresh the
        // page to give the impression of a navigation while keeping the user
        // on the same page.
        window.top.location.reload();
      }
    });
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
          ?disabled=${arguments_['<glide-core-menu-button>.disabled']}
        ></glide-core-menu-button>
        <glide-core-menu-button label="Two"></glide-core-menu-button>
        <glide-core-menu-link
          label=${arguments_['<glide-core-menu-link>.label']}
          url=${arguments_['<glide-core-menu-link>.url']}
          ?disabled=${arguments_['<glide-core-menu-link>.disabled']}
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
        <glide-core-menu-button
          label="Edit"
          ?disabled=${arguments_['<glide-core-menu-button>.disabled']}
        >
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

        <glide-core-menu-link
          label="Share"
          url="/"
          ?disabled=${arguments_['<glide-core-menu-link>.disabled']}
        >
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`;
  },
};
