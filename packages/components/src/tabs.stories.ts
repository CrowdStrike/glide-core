import './tab.group.js';
import './tab.js';
import './tab.panel.js';

import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Place `<cs-tab>`s and `<cs-panel>`s inside a `<cs-tab-group>` to present a collection of tabs with their respective panels.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-tab-group variant=${arguments_.variant}>
      <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
      <cs-tab slot="nav" panel="2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" slot="icon">
          <path
            d="M4 13L9 18L20 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>With icon</span>
      </cs-tab>
      <cs-tab slot="nav" panel="3" disabled>Disabled</cs-tab>

      <cs-tab-panel name="1"
        ><div style="margin:10px">Content for tab 1</div></cs-tab-panel
      >
      <cs-tab-panel name="2"
        ><div style="margin:10px">Content for tab 2</div></cs-tab-panel
      >
      <cs-tab-panel name="3"
        ><div style="margin:10px">Content for tab 3</div></cs-tab-panel
      >
    </cs-tab-group>
  `,
  args: {
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'vertical'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary" | "vertical"' },
      },
    },
    'addEventListener(event)': {
      control: { type: '' },
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "tab-show", listener: (event: CustomEvent<{ panel: string }>) => void',
        },
      },
    },
  },
};

export default meta;

export const Primary: StoryObj = {
  name: 'Tabs',
};

export const Secondary: StoryObj = {
  name: 'Tabs (With Variant Secondary)',
  args: {
    variant: 'secondary',
  },
};

export const Vertical: StoryObj = {
  name: 'Tabs (With Variant Vertical)',
  args: {
    variant: 'vertical',
  },
};
