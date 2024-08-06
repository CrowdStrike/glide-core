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
    '<glide-core-tree-item-menu>.placement': 'bottom-start',
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
        <glide-core-tree-item label="Back home" remove-indentation>
          <glide-core-example-icon
            slot="prefix"
            name="arrow-left"
          ></glide-core-example-icon>
        </glide-core-tree-item>
        <glide-core-tree-item
          label="Branch"
          expanded
          ?non-collapsible=${arguments_[
            '<glide-core-tree-item>.non-collapsible'
          ] || nothing}
        >
          <glide-core-example-icon
            slot="prefix"
            name="share"
          ></glide-core-example-icon>
          <glide-core-tree-item
            label=${arguments_['<glide-core-tree-item>.label']}
            ?selected=${arguments_['<glide-core-tree-item>.selected'] ||
            nothing}
            ?remove-indentation=${arguments_[
              '<glide-core-tree-item>.remove-indentation'
            ] || nothing}
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
            <glide-core-tree-item-menu
              slot="menu"
              placement=${arguments_['<glide-core-tree-item-menu>.placement']}
            >
              ${treeItemMenu}
            </glide-core-tree-item-menu>
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
    '<glide-core-tree-item-menu>.placement': {
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

export const TreeItemWithChildItemsNonCollapsible: StoryObj = {
  name: 'Tree Item (With Child Items Non-Collapsible)',
  args: {
    '<glide-core-tree-item>.expanded': true,
    '<glide-core-tree-item>.non-collapsible': true,
    '<glide-core-tree-item>.remove-indentation': true,
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
    '<glide-core-tree-item>.non-collapsible': {
      control: { type: 'boolean' },
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
        disable: true,
      },
    },
  },
  render: (arguments_) => html`
    <glide-core-tree>
      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        ?expanded=${arguments_['<glide-core-tree-item>.expanded'] || nothing}
        ?non-collapsible=${arguments_[
          '<glide-core-tree-item>.non-collapsible'
        ] || nothing}
        ?remove-indentation=${arguments_[
          '<glide-core-tree-item>.remove-indentation'
        ] || nothing}
      >
        <glide-core-example-icon
          slot="prefix"
          name="share"
        ></glide-core-example-icon>
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
          <glide-core-tree-item-menu slot="menu" placement=${
            arguments_['<glide-core-tree-item-menu>.placement']
          }>
            ${treeItemMenu}
          </glide-core-tree-item-menu>
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
          <glide-core-tree-item-menu slot="menu" placement=${
            arguments_['<glide-core-tree-item-menu>.placement']
          }>
            ${treeItemMenu}
          </glide-core-tree-item-menu>
        </glide-core-tree-item></glide-core-tree-item>
      </glide-core-tree>
    </div>
  `,
};

const treeItemMenu = html`
  <glide-core-menu-link label="Edit" url="/edit">
    <glide-core-example-icon
      slot="icon"
      name="pencil"
    ></glide-core-example-icon>
  </glide-core-menu-link>

  <glide-core-menu-link label="Move" url="/move">
    <glide-core-example-icon slot="icon" name="move"></glide-core-example-icon>
  </glide-core-menu-link>

  <glide-core-menu-link label="Share" url="/share">
    <glide-core-example-icon slot="icon" name="share"></glide-core-example-icon>
  </glide-core-menu-link>

  <glide-core-menu-link label="Settings" url="/settings">
    <glide-core-example-icon
      slot="icon"
      name="settings"
    ></glide-core-example-icon>
  </glide-core-menu-link>
`;
