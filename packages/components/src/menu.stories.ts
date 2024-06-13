import './icons/storybook.js';
import './menu.button.js';
import './menu.js';
import './menu.link.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import CsButton from './button.js';
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
        type: { summary: 'GlideCoreMenuLink | CsMenuButton' },
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
    const links = context.canvasElement.querySelectorAll(
      'glide-core-menu-link',
    );

    for (const link of links) {
      // Prevent navigation. The URLs don't go anywhere.
      link.addEventListener('click', (event) => event.preventDefault());
    }

    // eslint-disable-next-line no-underscore-dangle
    let arguments_: Meta['args'] = context.args;

    addons.getChannel().addListener('storyArgsUpdated', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      arguments_ = event.args as typeof context.args;
    });

    context.canvasElement?.addEventListener('click', () => {
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
    return html`<div
      style="height: 13rem; display: flex; align-items: center; justify-content: center;"
    >
      <glide-core-menu
        placement=${arguments_.placement}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
        <glide-core-menu-link label="Two" url="/two"> </glide-core-menu-link>
        <!--
          If an option does not have an associated url,
          you can use <glide-core-menu-button> and provide your own click handler
        -->
        <glide-core-menu-button label="Three"> </glide-core-menu-button>

        <glide-core-button slot="target" variant="secondary">
          Target
        </glide-core-button>
      </glide-core-menu>
    </div>`;
  },
};

export default meta;

export const Menu: StoryObj = {};

export const MenuWithIcon: StoryObj = {
  name: 'Menu (With Icon)',
  render(arguments_, context) {
    context.canvasElement.addEventListener('click', (event) => {
      if (event.target instanceof CsButton) {
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

    return html`<div
      style="height: 100vh; display: flex; align-items: center; justify-content: center;"
    >
      <glide-core-menu
        placement=${arguments_.placement}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <glide-core-menu-link label="Edit" url="/edit">
          <glide-core-example-icon
            slot="icon"
            name="pencil"
          ></glide-core-example-icon>
        </glide-core-menu-link>

        <glide-core-menu-link label="Move" url="/move">
          <glide-core-example-icon
            slot="icon"
            name="move"
          ></glide-core-example-icon>
        </glide-core-menu-link>

        <glide-core-menu-link label="Share" url="/share">
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-menu-link>

        <glide-core-menu-link label="Settings" url="/settings">
          <glide-core-example-icon
            slot="icon"
            name="settings"
          ></glide-core-example-icon>
        </glide-core-menu-link>

        <glide-core-button slot="target" variant="secondary">
          Target
        </glide-core-button>
      </glide-core-menu>
    </div>`;
  },
};
