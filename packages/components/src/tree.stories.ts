import './icon-button.js';
import './icons/storybook.js';
import './tree.item.icon-button.js';
import './tree.item.js';
import './tree.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [
    (story) => html`<div style="max-width: 18.75rem;">${story()}</div>`,
  ],
  title: 'Tree',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tree element, containing a hierarchy of tree items',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    '<glide-core-tree-item>.label': 'Branch',
    '<glide-core-tree-item>.selected': false,
  },
  play(context) {
    const links = context.canvasElement.querySelectorAll(
      'glide-core-menu-link',
    );

    for (const link of links) {
      // Prevent navigation. The URLs don't go anywhere.
      link.addEventListener('click', (event) => event.preventDefault());
    }
  },
  render: (arguments_) => html`
    <div style="max-width: 18.75rem; height: 12rem;">
      <glide-core-tree>
        <glide-core-tree-item label="Branch" expanded>
          <glide-core-tree-item
            label=${arguments_['<glide-core-tree-item>.label']}
            ?selected=${arguments_['<glide-core-tree-item>.selected'] ||
            nothing}
          ></glide-core-tree-item>
          <glide-core-tree-item label="Leaf 2">
            <glide-core-example-icon
              slot="prefix"
              name="share"
            ></glide-core-example-icon>
            <glide-core-tree-item-icon-button slot="suffix">
              <glide-core-example-icon
                name="settings"
              ></glide-core-example-icon>
            </glide-core-tree-item-icon-button>
            ${treeItemMenu}
          </glide-core-tree-item>
          <glide-core-tree-item label="Sub-branch">
            <glide-core-tree-item label="Sub-leaf 1"></glide-core-tree-item>
            <glide-core-tree-item label="Sub-leaf 2"> </glide-core-tree-item>
            <glide-core-tree-item label="Sub-leaf 3"></glide-core-tree-item>
          </glide-core-tree-item>
        </glide-core-tree-item>
      </glide-core-tree>
    </div>
  `,
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreTreeItem' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tree-item>.selected': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.label': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event)': {
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "item-selected", listener: (event: CustomEvent<{ item: GlideCoreTreeItem }>) => void',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Tree: StoryObj = {
  args: {
    '<glide-core-tree-item>.label': 'Leaf 1',
  },
};

export const TreeItemDefault: StoryObj = {
  name: 'Tree Item (Default)',
  render: (arguments_) => html`
    <glide-core-tree>
      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        ?selected=${arguments_['<glide-core-tree-item>.selected'] || nothing}
        >
      </glide-core-tree-item></glide-core-tree-item>
    </glide-core-tree>
  `,
};

export const TreeItemSelected: StoryObj = {
  name: 'Tree Item (Selected)',
  args: {
    '<glide-core-tree-item>.selected': true,
  },
  render: (arguments_) => html`
    <glide-core-tree>
      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        ?selected=${arguments_['<glide-core-tree-item>.selected'] || nothing}
        >
      </glide-core-tree-item></glide-core-tree-item>
    </glide-core-tree>
  `,
};

export const TreeItemWithChildItemsCollapsed: StoryObj = {
  name: 'Tree Item (With Child Items Collapsed)',
  args: {
    '<glide-core-tree-item>.expanded': false,
  },
  argTypes: {
    '<glide-core-tree-item>.expanded': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.selected': {
      table: {
        disable: true,
      },
    },
  },
  render: (arguments_) => html`
    <glide-core-tree>
      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        ?expanded=${arguments_['<glide-core-tree-item>.expanded'] || nothing}
      >
        <glide-core-tree-item label="Leaf 1"></glide-core-tree-item>
        <glide-core-tree-item label="Leaf 2"> </glide-core-tree-item>
        <glide-core-tree-item label="Leaf 3"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `,
};

export const TreeItemWithChildItemsExpanded: StoryObj = {
  name: 'Tree Item (With Child Items Expanded)',
  args: {
    '<glide-core-tree-item>.expanded': true,
  },
  argTypes: {
    '<glide-core-tree-item>.expanded': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.selected': {
      table: {
        disable: true,
      },
    },
  },
  render: (arguments_) => html`
    <glide-core-tree>
      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        ?expanded=${arguments_['<glide-core-tree-item>.expanded'] || nothing}
      >
        <glide-core-tree-item label="Leaf 1"></glide-core-tree-item>
        <glide-core-tree-item label="Leaf 2"> </glide-core-tree-item>
        <glide-core-tree-item label="Leaf 3"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `,
};

export const TreeItemWithPrefixIcon: StoryObj = {
  name: 'Tree Item (With Prefix Icon)',
  render: (arguments_) => html`
    <glide-core-tree>
      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        ?selected=${arguments_['<glide-core-tree-item>.selected'] || nothing}
        >
        <glide-core-example-icon slot="prefix" name="share"></glide-core-example-icon>
      </glide-core-tree-item></glide-core-tree-item>
    </glide-core-tree>
  `,
};

export const TreeItemWithSuffixIconButton: StoryObj = {
  name: 'Tree Item (With Suffix Icon Button)',
  render: (arguments_) => html`
    <glide-core-tree>
      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        ?selected=${arguments_['<glide-core-tree-item>.selected'] || nothing}
        >
        <glide-core-tree-item-icon-button slot="suffix">
          <glide-core-example-icon name="settings"></glide-core-example-icon>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item></glide-core-tree-item>
    </glide-core-tree>
  `,
};

export const TreeItemWithMenu: StoryObj = {
  name: 'Tree Item (With Menu on hover)',
  render: (arguments_) => html`
    <div style="max-width: 18.75rem; height: 8rem;">
      <glide-core-tree>
        <glide-core-tree-item
          label=${arguments_['<glide-core-tree-item>.label']}
          ?selected=${arguments_['<glide-core-tree-item>.selected'] || nothing}
          >
          ${treeItemMenu}
        </glide-core-tree-item></glide-core-tree-item>
      </glide-core-tree>
    </div>
  `,
};

export const TreeItemWithPrefixSuffixAndMenu: StoryObj = {
  name: 'Tree Item (With Prefix, Suffix, and Menu)',
  render: (arguments_) => html`
   <div style="max-width: 18.75rem; height: 8rem;">
      <glide-core-tree>
        <glide-core-tree-item
          label=${arguments_['<glide-core-tree-item>.label']}
          ?selected=${arguments_['<glide-core-tree-item>.selected'] || nothing}
          >
          <glide-core-example-icon slot="prefix" name="share"></glide-core-example-icon>
          <glide-core-example-icon slot="suffix" name="settings"></glide-core-example-icon>
          ${treeItemMenu}
        </glide-core-tree-item></glide-core-tree-item>
      </glide-core-tree>
    </div>
  `,
};

const treeItemMenu = html`
  <glide-core-tree-item-menu slot="menu">
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
  </glide-core-tree-item-menu>
`;
