import './tab.group.js';
import './tab.js';
import './tab.panel.js';

import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Place `<glide-core-tab>`s and `<glide-core-panel>`s inside a `<glide-core-tab-group>` to present a collection of tabs with their respective panels.',
      },
    },
  },
  render: () => html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          slot="icon"
        >
          <path
            d="M4 13L9 18L20 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>With icon</span>
      </glide-core-tab>
      <glide-core-tab slot="nav" panel="3" disabled>Disabled</glide-core-tab>

      <glide-core-tab-panel name="1"
        ><div style="margin: 0.625rem">
          Content for tab 1
        </div></glide-core-tab-panel
      >
      <glide-core-tab-panel name="2"
        ><div style="margin: 0.625rem">
          Content for tab 2
        </div></glide-core-tab-panel
      >
      <glide-core-tab-panel name="3"
        ><div style="margin: 0.625rem">
          Content for tab 3
        </div></glide-core-tab-panel
      >
    </glide-core-tab-group>
  `,
  argTypes: {
    'addEventListener(event)': {
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "tab-show", listener: (event: CustomEvent<{ panel: string }>) => void',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  name: 'Tabs',
};

export const Overflow: StoryObj = {
  name: 'Tabs (With Overflow)',
  render: () => html`
    <div style="width: 25rem;">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            slot="icon"
          >
            <path
              d="M4 13L9 18L20 7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>With icon</span>
        </glide-core-tab>
        <glide-core-tab slot="nav" panel="3" disabled>Disabled</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>
        <glide-core-tab slot="nav" panel="7">Tab 7</glide-core-tab>
        <glide-core-tab slot="nav" panel="8">Tab 8</glide-core-tab>
        <glide-core-tab slot="nav" panel="9">Tab 9</glide-core-tab>
        <glide-core-tab slot="nav" panel="10">Tab 10</glide-core-tab>
        <glide-core-tab slot="nav" panel="11">Tab 11</glide-core-tab>

        <glide-core-tab-panel name="1"
          ><div style="margin:10px">
            Content for tab 1
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="2"
          ><div style="margin:10px">
            Content for tab 2
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="3"
          ><div style="margin:10px">
            Content for tab 3
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="4"
          ><div style="margin:10px">
            Content for tab 4
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="5"
          ><div style="margin:10px">
            Content for tab 5
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="6"
          ><div style="margin:10px">
            Content for tab 6
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="7"
          ><div style="margin:10px">
            Content for tab 7
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="8"
          ><div style="margin:10px">
            Content for tab 8
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="9"
          ><div style="margin:10px">
            Content for tab 9
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="10"
          ><div style="margin:10px">
            Content for tab 10
          </div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="11"
          ><div style="margin:10px">
            Content for tab 11
          </div></glide-core-tab-panel
        >
      </glide-core-tab-group>
    </div>
  `,
};
