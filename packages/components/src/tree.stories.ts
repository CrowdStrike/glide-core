import './tree.js';
import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tree',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tree element.',
      },
    },
  },
  render: () => html`
    <div style="max-width: 300px">
      <cs-tree>
        <cs-tree-item expanded label="Branch">
          ${prefixIcon}
          <cs-tree-item label="Leaf 1">${prefixIcon}</cs-tree-item>
          <cs-tree-item label="Sub-branch">
            ${prefixIcon}
            <cs-tree-item label="Sub-leaf 1">${prefixIcon}</cs-tree-item>
            <cs-tree-item label="Sub-leaf 2">
              ${prefixIcon} ${suffixIcon}
            </cs-tree-item>
            <cs-tree-item label="Sub-leaf 3"></cs-tree-item>
          </cs-tree-item>
          <cs-tree-item label="Leaf 2"></cs-tree-item>
        </cs-tree-item>
      </cs-tree>
    </div>
  `,
};

export default meta;

export const Primary: StoryObj = {};

const prefixIcon = html`
  <svg
    slot="prefix"
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
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
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
`;
