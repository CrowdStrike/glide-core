import './menu.js';
import './tree-item.js';
import { html, nothing } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [
    (story) => html`<div style="max-width: 18rem;">${story()}</div>`,
  ],
  title: 'Tree Item',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A single node of a Tree',
      },
    },
  },
  args: {
    selected: false,
    label: 'Branch',
  },
  argTypes: {
    selected: {
      control: { type: 'boolean' },
      table: {
        defaultValue: false,
      },
    },
    label: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
  },
  render: (arguments_) => html`
    <cs-tree-item
      label=${arguments_.label}
      ?selected=${arguments_.selected || nothing}
      >
    </cs-tree-item></cs-tree-item>
  `,
};

export default meta;

export const Default: StoryObj = {};

export const Selected: StoryObj = {
  args: {
    selected: true,
  },
};

export const WithChildItemsCollapsed: StoryObj = {
  argTypes: {
    expanded: {
      control: { type: 'boolean' },
      table: {
        defaultValue: false,
      },
    },
  },
  render: (arguments_) => html`
    <cs-tree-item
      label=${arguments_.label}
      ?selected=${arguments_.selected || nothing}
      ?expanded=${arguments_.expanded || nothing}
    >
      <cs-tree-item label="Leaf 1"></cs-tree-item>
      <cs-tree-item label="Leaf 2"> </cs-tree-item>
      <cs-tree-item label="Leaf 3"></cs-tree-item>
    </cs-tree-item>
  `,
};

export const WithChildItemsExpanded: StoryObj = {
  args: {
    expanded: true,
  },
  argTypes: {
    expanded: {
      control: { type: 'boolean' },
      table: {
        defaultValue: false,
      },
    },
  },
  render: (arguments_) => html`
    <cs-tree-item
      label=${arguments_.label}
      ?selected=${arguments_.selected || nothing}
      ?expanded=${arguments_.expanded || nothing}
    >
      <cs-tree-item label="Leaf 1"></cs-tree-item>
      <cs-tree-item label="Leaf 2"> </cs-tree-item>
      <cs-tree-item label="Leaf 3"></cs-tree-item>
    </cs-tree-item>
  `,
};

export const WithPrefixIcon: StoryObj = {
  render: (arguments_) => html`
    <cs-tree-item
      label=${arguments_.label}
      ?selected=${arguments_.selected || nothing}
      >
      ${prefixIcon}
    </cs-tree-item></cs-tree-item>
  `,
};

export const WithSuffixIcon: StoryObj = {
  render: (arguments_) => html`
    <cs-tree-item
      label=${arguments_.label}
      ?selected=${arguments_.selected || nothing}
      >
      ${suffixIcon}
    </cs-tree-item></cs-tree-item>
  `,
};

export const WithMenu: StoryObj = {
  decorators: [
    (story) =>
      html`<div style="max-width: 300px; height: 125px;">${story()}</div>`,
  ],
  render: (arguments_) => html`
    <cs-tree-item
      label=${arguments_.label}
      ?selected=${arguments_.selected || nothing}
      >
      ${itemMenu}
    </cs-tree-item></cs-tree-item>
  `,
};

export const WithPrefixSuffixAndMenu: StoryObj = {
  decorators: [
    (story) =>
      html`<div style="max-width: 300px; height: 125px;">${story()}</div>`,
  ],
  name: 'With Prefix, Suffix, and Menu',
  render: (arguments_) => html`
    <cs-tree-item
      label=${arguments_.label}
      ?selected=${arguments_.selected || nothing}
      >
      ${prefixIcon}
      ${suffixIcon}
      ${itemMenu}
    </cs-tree-item></cs-tree-item>
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

const itemMenu = html` <cs-menu
  slot="menu"
  size="large"
  style="margin-bottom: -3px;"
>
  <cs-menu-button label="Edit">
    <svg
      slot="icon"
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
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  </cs-menu-button>

  <cs-menu-button label="Delete">
    <svg
      slot="icon"
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
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  </cs-menu-button>

  <cs-menu-button label="Settings">
    <svg
      slot="icon"
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
        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  </cs-menu-button>

  <cs-icon-button slot="target" label="menu" variant="tertiary">
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
      />
    </svg>
  </cs-icon-button>
</cs-menu>`;
