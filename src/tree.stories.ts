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
      html`<div style="max-width: 18.75rem; height: 10rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/tree.js';
          import '@crowdstrike/glide-core/tree.item.js';
          import '@crowdstrike/glide-core/tree.item.menu.js';
          import '@crowdstrike/glide-core/tree.item.icon-button.js';
          import '@crowdstrike/glide-core/menu.link.js';
        </script>

        ${story()}
      </div>`,
  ],
  title: 'Tree',
  tags: ['autodocs'],
  args: {
    'slot="default"': '',
    'addEventListener(event, handler)': '',
    '<glide-core-tree-item>.label': 'Branch',
    '<glide-core-tree-item>.expanded': true,
    '<glide-core-tree-item>.non-collapsible': false,
    '<glide-core-tree-item>.remove-indentation': false,
    '<glide-core-tree-item>.selected': false,
    '<glide-core-tree-item-icon-button>.label': 'Settings',
    '<glide-core-tree-item-menu>.placement': 'bottom-start',
  },
  render(arguments_) {
    return html`<glide-core-tree>
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

        <glide-core-tree-item label="Hover menu and suffix icon">
          <glide-core-tree-item-icon-button
            slot="suffix"
            label=${arguments_['<glide-core-tree-item-icon-button>.label']}
          >
            <glide-core-example-icon name="settings"></glide-core-example-icon>
          </glide-core-tree-item-icon-button>

          <glide-core-tree-item-menu
            slot="menu"
            placement=${arguments_['<glide-core-tree-item-menu>.placement']}
          >
            <glide-core-menu-link label="Edit" url="/">
              <glide-core-example-icon
                slot="icon"
                name="edit"
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

        <glide-core-tree-item label="Custom suffix icon menu">
          <glide-core-tree-item-menu slot="suffix">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              slot="icon"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <glide-core-menu-link label="My link" url="#">
            </glide-core-menu-link>
            <glide-core-menu-link label="My other link" url="#">
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
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "item-selected", handler: (event: CustomEvent<{ item: GlideCoreTreeItem }>) => void',
        },
      },
    },
    '<glide-core-tree-item>.label': {
      name: 'label',
      table: {
        category: 'Tree Item',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-tree-item>.expanded': {
      name: 'expanded',
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.non-collapsible': {
      name: 'non-collapsible',
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.remove-indentation': {
      name: 'remove-indentation',
      control: { type: 'boolean' },
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.selected': {
      name: 'selected',
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item-icon-button>.label': {
      name: 'label',
      table: {
        category: 'Tree Item Icon Button',
        type: { summary: 'string', detail: '// For screenreaders' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-tree-item-menu>.placement': {
      name: 'placement',
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
        category: 'Tree Item Menu',
        defaultValue: { summary: '"bottom-start"' },
        type: {
          summary:
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start"| "top-end"',
        },
      },
    },
    '<glide-core-tree-item-menu>[slot="icon"]': {
      name: '[slot="icon"]',
      table: {
        category: 'Tree Item Menu',
        control: false,
        type: {
          summary: 'Element',
        },
      },
    },
  },
};

export default meta;

export const Tree: StoryObj = {};
