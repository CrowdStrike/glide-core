import './icons/storybook.js';
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
        component: 'A set of tabs with panels.',
      },
    },
  },
  render: () => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/tab.group.js';
      import '@crowdstrike/glide-core/tab.panel.js';
      import '@crowdstrike/glide-core/tab.js';
    </script>

    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab</glide-core-tab>

      <glide-core-tab slot="nav" panel="2">
        <glide-core-example-icon
          slot="icon"
          name="checkmark"
        ></glide-core-example-icon>

        With Icon
      </glide-core-tab>

      <glide-core-tab slot="nav" panel="3" disabled>Disabled</glide-core-tab>

      <glide-core-tab-panel name="1">
        <div style="margin: 0.625rem">Tab</div>
      </glide-core-tab-panel>
      <glide-core-tab-panel name="2">
        <div style="margin: 0.625rem">With Icon</div>
      </glide-core-tab-panel>
      <glide-core-tab-panel name="3">
        <div style="margin: 0.625rem">Disabled</div>
      </glide-core-tab-panel>
    </glide-core-tab-group>
  `,
  argTypes: {
    'addEventListener(event, listener)': {
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

export const Tabs: StoryObj = {
  tags: ['!autodocs', '!dev'],
};

export const WithOverflow: StoryObj = {
  render: () => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/tab.group.js';
      import '@crowdstrike/glide-core/tab.panel.js';
      import '@crowdstrike/glide-core/tab.js';
    </script>

    <div style="width: 25rem;">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>

        <glide-core-tab slot="nav" panel="2">
          <glide-core-example-icon
            slot="icon"
            name="checkmark"
          ></glide-core-example-icon>

          With Icon
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
          ><div style="margin:10px">Tab 1</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="2"
          ><div style="margin:10px">Tab 2</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="3"
          ><div style="margin:10px">Tab 3</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="4"
          ><div style="margin:10px">Tab 4</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="5"
          ><div style="margin:10px">Tab 5</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="6"
          ><div style="margin:10px">Tab 6</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="7"
          ><div style="margin:10px">Tab 7</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="8"
          ><div style="margin:10px">Tab 8</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="9"
          ><div style="margin:10px">Tab 9</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="10"
          ><div style="margin:10px">Tab 10</div></glide-core-tab-panel
        >
        <glide-core-tab-panel name="11"
          ><div style="margin:10px">Tab 11</div></glide-core-tab-panel
        >
      </glide-core-tab-group>
    </div>
  `,
};
