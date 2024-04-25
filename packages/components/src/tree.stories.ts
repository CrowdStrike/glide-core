import './icon-button.js';
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
      control: { type: '' },
      table: {
        type: { summary: 'CsTreeItem' },
      },
      type: { name: 'string', required: true },
    },
    '<cs-tree-item>.selected': {
      control: { type: 'boolean' },
      table: {
        defaultValue: false,
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
      control: { type: '' },
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "item-selected", listener: (event: CustomEvent<{ item: CsTreeItem }>) => void',
        },
      },
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
        defaultValue: false,
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
        defaultValue: false,
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
        ${prefixIcon}
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
        ${suffixIcon}
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
          ${prefixIcon}
          ${suffixIcon}
        </cs-tree-item></cs-tree-item>
      </cs-tree>
    </div>
  `,
};

const prefixIcon = html`
  <svg
    slot="prefix"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
    />
  </svg>
`;

const suffixIcon = html`
  <svg
    slot="suffix"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
`;
