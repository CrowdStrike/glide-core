import './icon-button.js';
import './icons/storybook.js';
import './menu.link.js';
import './tree.item.icon-button.js';
import './tree.item.js';
import './tree.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [
    (story) =>
      html`<div style="max-width: 18.75rem; height: 8.5rem;">${story()}</div>`,
  ],
  title: 'Tree',
  tags: ['autodocs'],
  args: {
    'slot="default"': '',
    '<glide-core-tree-item>.label': 'Branch',
    '<glide-core-tree-item-icon-button>.label': 'Settings',
    'addEventListener(event, listener)': '',
    '<glide-core-tree-item>.expanded': true,
    '<glide-core-tree-item>.non-collapsible': false,
    '<glide-core-tree-item>.remove-indentation': false,
    '<glide-core-tree-item>.selected': false,
    '<glide-core-tree-item-menu>.placement': 'bottom-start',
  },
  render(arguments_) {
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/tree.js';
        import '@crowdstrike/glide-core/tree.item.js';
        import '@crowdstrike/glide-core/tree.item.menu.js';
        import '@crowdstrike/glide-core/tree.item.icon-button.js';
        import '@crowdstrike/glide-core/menu.link.js';
      </script>

      <glide-core-tree>
        <glide-core-tree-item
          label="Back"
          ?remove-indentation=${arguments_[
            '<glide-core-tree-item>.remove-indentation'
          ] || nothing}
        >
          <glide-core-example-icon
            slot="prefix"
            name="arrow-left"
          ></glide-core-example-icon>
        </glide-core-tree-item>

        <glide-core-tree-item
          label=${arguments_['<glide-core-tree-item>.label']}
          ?expanded=${arguments_['<glide-core-tree-item>.expanded'] || nothing}
          ?non-collapsible=${arguments_[
            '<glide-core-tree-item>.non-collapsible'
          ] || nothing}
          ?selected=${arguments_['<glide-core-tree-item>.selected'] || nothing}
        >
          <glide-core-example-icon
            slot="prefix"
            name="share"
          ></glide-core-example-icon>

          <glide-core-tree-item label="Leaf">
            <glide-core-tree-item-icon-button
              slot="suffix"
              label=${arguments_['<glide-core-tree-item-icon-button>.label']}
            >
              <glide-core-example-icon
                name="settings"
              ></glide-core-example-icon>
            </glide-core-tree-item-icon-button>

            <glide-core-tree-item-menu
              slot="menu"
              placement=${arguments_['<glide-core-tree-item-menu>.placement']}
            >
              <glide-core-menu-link label="Edit" url="/">
                <glide-core-example-icon
                  slot="icon"
                  name="pencil"
                ></glide-core-example-icon>
              </glide-core-menu-link>

              <glide-core-menu-link label="Move" url="/">
                <glide-core-example-icon
                  slot="icon"
                  name="move"
                ></glide-core-example-icon>
              </glide-core-menu-link>
            </glide-core-tree-item-menu>
          </glide-core-tree-item>

          <glide-core-tree-item label="Branch" expanded>
            <glide-core-tree-item label="Leaf"></glide-core-tree-item>
          </glide-core-tree-item>
        </glide-core-tree-item>
      </glide-core-tree>`;
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreTreeItem' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tree-item>.label': {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-tree-item-icon-button>.label': {
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "item-selected", listener: (event: CustomEvent<{ item: GlideCoreTreeItem }>) => void',
        },
      },
    },
    '<glide-core-tree-item>.expanded': {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.non-collapsible': {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.remove-indentation': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.selected': {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item-menu>.placement': {
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
  },
};

export default meta;

export const Tree: StoryObj = {};
