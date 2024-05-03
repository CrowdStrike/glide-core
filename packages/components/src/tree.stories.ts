import './icon-button.js';
import './icons/storybook.js';
import './tree.js';
import { html, nothing } from 'lit-html';
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
    },
  },
  args: {
    '<cs-tree-item>.selected': false,
    '<cs-tree-item>.label': 'Branch',
  },
  render: (arguments_) => html`
    <cs-tree>
      <cs-tree-item label="Branch" expanded>
        <cs-tree-item
          label=${arguments_['<cs-tree-item>.label']}
          ?selected=${arguments_['<cs-tree-item>.selected'] || nothing}
        ></cs-tree-item>
        <cs-tree-item label="Leaf 2"></cs-tree-item>
        <cs-tree-item label="Sub-branch">
          <cs-tree-item label="Sub-leaf 1"></cs-tree-item>
          <cs-tree-item label="Sub-leaf 2"> </cs-tree-item>
          <cs-tree-item label="Sub-leaf 3"></cs-tree-item>
        </cs-tree-item>
      </cs-tree-item>
    </cs-tree>
  `,
  argTypes: {
    ['slot="default"']: {
      table: {
        type: { summary: 'CsTreeItem' },
      },
      type: { name: 'function', required: true },
    },
    '<cs-tree-item>.selected': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<cs-tree-item>.label': {
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
            'event: "item-selected", listener: (event: CustomEvent<{ item: CsTreeItem }>) => void',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Tree: StoryObj = {
  args: {
    '<cs-tree-item>.label': 'Leaf 1',
  },
};

export const TreeItemDefault: StoryObj = {
  name: 'Tree Item (Default)',
  render: (arguments_) => html`
    <cs-tree>
      <cs-tree-item
        label=${arguments_['<cs-tree-item>.label']}
        ?selected=${arguments_['<cs-tree-item>.selected'] || nothing}
        >
      </cs-tree-item></cs-tree-item>
    </cs-tree>
  `,
};

export const TreeItemSelected: StoryObj = {
  name: 'Tree Item (Selected)',
  args: {
    '<cs-tree-item>.selected': true,
  },
  render: (arguments_) => html`
    <cs-tree>
      <cs-tree-item
        label=${arguments_['<cs-tree-item>.label']}
        ?selected=${arguments_['<cs-tree-item>.selected'] || nothing}
        >
      </cs-tree-item></cs-tree-item>
    </cs-tree>
  `,
};

export const TreeItemWithChildItemsCollapsed: StoryObj = {
  name: 'Tree Item (With Child Items Collapsed)',
  args: {
    '<cs-tree-item>.expanded': false,
  },
  argTypes: {
    '<cs-tree-item>.expanded': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<cs-tree-item>.selected': {
      table: {
        disable: true,
      },
    },
  },
  render: (arguments_) => html`
    <cs-tree>
      <cs-tree-item
        label=${arguments_['<cs-tree-item>.label']}
        ?expanded=${arguments_['<cs-tree-item>.expanded'] || nothing}
      >
        <cs-tree-item label="Leaf 1"></cs-tree-item>
        <cs-tree-item label="Leaf 2"> </cs-tree-item>
        <cs-tree-item label="Leaf 3"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
  `,
};

export const TreeItemWithChildItemsExpanded: StoryObj = {
  name: 'Tree Item (With Child Items Expanded)',
  args: {
    '<cs-tree-item>.expanded': true,
  },
  argTypes: {
    '<cs-tree-item>.expanded': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<cs-tree-item>.selected': {
      table: {
        disable: true,
      },
    },
  },
  render: (arguments_) => html`
    <cs-tree>
      <cs-tree-item
        label=${arguments_['<cs-tree-item>.label']}
        ?expanded=${arguments_['<cs-tree-item>.expanded'] || nothing}
      >
        <cs-tree-item label="Leaf 1"></cs-tree-item>
        <cs-tree-item label="Leaf 2"> </cs-tree-item>
        <cs-tree-item label="Leaf 3"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
  `,
};

export const TreeItemWithPrefixIcon: StoryObj = {
  name: 'Tree Item (With Prefix Icon)',
  render: (arguments_) => html`
    <cs-tree>
      <cs-tree-item
        label=${arguments_['<cs-tree-item>.label']}
        ?selected=${arguments_['<cs-tree-item>.selected'] || nothing}
        >
        <cs-example-icon slot="prefix" name="share"></cs-example-icon>
      </cs-tree-item></cs-tree-item>
    </cs-tree>
  `,
};

export const TreeItemWithSuffixIcon: StoryObj = {
  name: 'Tree Item (With Suffix Icon)',
  render: (arguments_) => html`
    <cs-tree>
      <cs-tree-item
        label=${arguments_['<cs-tree-item>.label']}
        ?selected=${arguments_['<cs-tree-item>.selected'] || nothing}
        >
        <cs-example-icon slot="suffix" name="settings"></cs-example-icon>
      </cs-tree-item></cs-tree-item>
    </cs-tree>
  `,
};

export const TreeItemWithPrefixSuffix: StoryObj = {
  name: 'Tree Item (With Prefix and Suffix)',
  render: (arguments_) => html`
   <div style="max-width: 18.75rem; height: 8rem;">
      <cs-tree>
        <cs-tree-item
          label=${arguments_['<cs-tree-item>.label']}
          ?selected=${arguments_['<cs-tree-item>.selected'] || nothing}
          >
          <cs-example-icon slot="prefix" name="share"></cs-example-icon>
          <cs-example-icon slot="suffix" name="settings"></cs-example-icon>
        </cs-tree-item></cs-tree-item>
      </cs-tree>
    </div>
  `,
};
