import './icons/storybook.js';
import './menu.button.js';
import './menu.js';
import './menu.link.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit-html';
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
        type: { summary: 'CsMenuLink | CsMenuButton' },
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
    const links = context.canvasElement.querySelectorAll('cs-menu-link');

    for (const link of links) {
      // Prevent navigation. The URLs don't go anywhere.
      link.addEventListener('click', (event) => event.preventDefault());
    }
  },
  render(arguments_, context) {
    context.canvasElement.addEventListener('click', (event) => {
      if (event.target instanceof CsButton) {
        const menu = context.canvasElement.querySelector('cs-menu');

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

    /* eslint-disable unicorn/explicit-length-check */
    return html`<div
      style="height: 13rem; display: flex; align-items: center; justify-content: center;"
    >
      <cs-menu
        placement=${arguments_.placement}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <cs-menu-link label="One" url="/one"> </cs-menu-link>
        <cs-menu-link label="Two" url="/two"> </cs-menu-link>
        <!--
          If an option does not have an associated url,
          you can use <cs-menu-button> and provide your own click handler
        -->
        <cs-menu-button label="Three"> </cs-menu-button>

        <cs-button slot="target" variant="secondary"> Target </cs-button>
      </cs-menu>
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
        const menu = context.canvasElement.querySelector('cs-menu');

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
      <cs-menu
        placement=${arguments_.placement}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <cs-menu-link label="Edit" url="/edit">
          <cs-example-icon slot="icon" name="pencil"></cs-example-icon>
        </cs-menu-link>

        <cs-menu-link label="Move" url="/move">
          <cs-example-icon slot="icon" name="move"></cs-example-icon>
        </cs-menu-link>

        <cs-menu-link label="Share" url="/share">
          <cs-example-icon slot="icon" name="share"></cs-example-icon>
        </cs-menu-link>

        <cs-menu-link label="Settings" url="/settings">
          <cs-example-icon slot="icon" name="settings"></cs-example-icon>
        </cs-menu-link>

        <cs-button slot="target" variant="secondary"> Target </cs-button>
      </cs-menu>
    </div>`;
  },
};
