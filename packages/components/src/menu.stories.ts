import './button.js';
import './icon-button.js';
import './icons/storybook.js';
import './menu.button.js';
import './menu.js';
import './menu.link.js';
import { html, nothing } from 'lit-html';
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
    open: false,
    size: 'large',
  },
  argTypes: {
    ['slot="default"']: {
      table: {
        type: { summary: 'CsMenuLink | CsMenuButton' },
      },
      type: { name: 'function', required: true },
    },
    ['slot="target"']: {
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
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<div style="height: 8rem;">
      <cs-menu size=${arguments_.size || nothing} ?open=${arguments_.open}>
        <cs-menu-link
          label="One One OneOneOne OneOne OneOne OneOneOne OneOne OneOneOneOneOne OneOne OneOneOneOneOne OneOne OneOneOneOneOne OneOne OneOne"
          url="/one"
        >
        </cs-menu-link>
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
  render(arguments_) {
    return html`<div style="height: 10rem;">
      <cs-menu size=${arguments_.size || nothing} ?open=${arguments_.open}>
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

export const TonyTest: StoryObj = {
  name: 'Tony',
  render() {
    return html`<cs-menu size="large">
        <cs-menu-button label="Rename">
          <cs-example-icon slot="icon" name="pencil"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Delete">
          <cs-example-icon slot="icon" name="calendar"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Move">
          <cs-example-icon slot="icon" name="move"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Duplicate">
          <cs-example-icon slot="icon" name="clipboard"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Export">
          <cs-example-icon slot="icon" name="share"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Add to Favorites">
          <cs-example-icon slot="icon" name="share"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Settings">
          <cs-example-icon slot="icon" name="settings"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Performance">
          <cs-example-icon slot="icon" name="drag-dots"></cs-example-icon>
        </cs-menu-button>

        <cs-icon-button
          slot="target"
          label="For screenreaders"
          variant="tertiary"
        >
          <cs-example-icon name="caret-down"></cs-example-icon>
        </cs-icon-button>
      </cs-menu>

      <cs-menu size="large" style="position: relative">
        <cs-menu-button label="Rename">
          <cs-example-icon slot="icon" name="pencil"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Delete">
          <cs-example-icon slot="icon" name="calendar"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Move">
          <cs-example-icon slot="icon" name="move"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Duplicate">
          <cs-example-icon slot="icon" name="clipboard"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Export">
          <cs-example-icon slot="icon" name="share"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Add to Favorites">
          <cs-example-icon slot="icon" name="share"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Settings">
          <cs-example-icon slot="icon" name="settings"></cs-example-icon>
        </cs-menu-button>
        <cs-menu-button label="Performance">
          <cs-example-icon slot="icon" name="drag-dots"></cs-example-icon>
        </cs-menu-button>

        <cs-icon-button
          slot="target"
          label="For screenreaders"
          variant="tertiary"
        >
          <cs-example-icon name="caret-down"></cs-example-icon>
        </cs-icon-button>
      </cs-menu>`;
  },
};
