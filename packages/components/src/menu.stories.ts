import '@crowdstrike/glide-components/button/button.js';
import '@crowdstrike/glide-components/menu/link.js';
import '@crowdstrike/glide-components/menu/menu.js';
import '@crowdstrike/glide-icons/editor/move/line.js';
import '@crowdstrike/glide-icons/general/edit-03/line.js';
import '@crowdstrike/glide-icons/general/settings-01/line.js';
import '@crowdstrike/glide-icons/general/share-04/line.js';
import { html, nothing } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Glide/Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A custom-built menu.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    ['slot="default"']: '',
    ['slot="target"']: '',
    open: false,
    size: 'large',
  },
  argTypes: {
    ['slot="default"']: {
      control: { type: '' },
      table: {
        type: { summary: '<cs-menu-link> | <cs-menu-button>' },
      },
      type: { name: 'string', required: true },
    },
    ['slot="target"']: {
      control: { type: '' },
      table: {
        type: { summary: 'A focusable element' },
      },
      type: { name: 'string', required: true },
    },
    open: {
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'select' },
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
    return html`<div style="height: 125px;">
      <cs-menu
        label=${arguments_.label || nothing}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <cs-menu-link label="One" url="/one"> </cs-menu-link>
        <cs-menu-link label="Two" url="/two"> </cs-menu-link>
        <cs-menu-link label="Three" url="/three"> </cs-menu-link>

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
    /* eslint-disable unicorn/explicit-length-check */
    return html`<div style="height: 125px;">
      <cs-menu
        label=${arguments_.label || nothing}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <cs-menu-link label="Edit" url="/edit">
          <cs-icon-general-edit-03-line
            slot="icon"
          ></cs-icon-general-edit-03-line>
        </cs-menu-link>

        <cs-menu-link label="Move" url="/move">
          <cs-icon-editor-move-line slot="icon"></cs-icon-editor-move-line>
        </cs-menu-link>

        <cs-menu-link label="Share" url="/share">
          <cs-icon-general-share-04-line
            slot="icon"
          ></cs-icon-general-share-04-line>
        </cs-menu-link>

        <cs-menu-link label="Settings" url="/settings">
          <cs-icon-general-settings-01-line
            slot="icon"
          ></cs-icon-general-settings-01-line>
        </cs-menu-link>

        <cs-button slot="target" variant="secondary"> Target </cs-button>
      </cs-menu>
    </div>`;
  },
};
