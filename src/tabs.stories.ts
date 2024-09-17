import './icons/storybook.js';
import './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [(story) => html`<div style="width: 25rem;">${story()}</div>`],
  title: 'Tab Group',
  tags: ['autodocs'],
  args: {
    'slot="default"': '',
    'slot="nav"': '',
    '<glide-core-tab>[slot="default"]': 'Tab 1',
    '<glide-core-tab>.panel': '',
    '<glide-core-tab-panel>.name': '',
    'addEventListener(event, listener)': '',
    '<glide-core-tab>[slot="icon"]': '',
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tab.group.js';
        import '@crowdstrike/glide-core/tab.panel.js';
        import '@crowdstrike/glide-core/tab.js';
      </script>

      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">
          ${unsafeHTML(arguments_['<glide-core-tab>[slot="default"]'])}
        </glide-core-tab>

        <glide-core-tab slot="nav" panel="2">
          With Icon

          <glide-core-example-icon
            slot="icon"
            name="checkmark"
          ></glide-core-example-icon>
        </glide-core-tab>

        <glide-core-tab slot="nav" panel="3" disabled>
          Disabled
        </glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">
          <div style="margin: 0.625rem;">Tab 1</div>
        </glide-core-tab-panel>
        <glide-core-tab-panel name="2">
          <div style="margin: 0.625rem;">Tab 2</div>
        </glide-core-tab-panel>
        <glide-core-tab-panel name="3">
          <div style="margin: 0.625rem;">Tab 3</div>
        </glide-core-tab-panel>
        <glide-core-tab-panel name="4">
          <div style="margin: 0.625rem;">Tab 4</div>
        </glide-core-tab-panel>
        <glide-core-tab-panel name="5">
          <div style="margin: 0.625rem;">Tab 5</div>
        </glide-core-tab-panel>
        <glide-core-tab-panel name="6">
          <div style="margin: 0.625rem;">Tab 6</div>
        </glide-core-tab-panel>
      </glide-core-tab-group>
    `;
  },
  argTypes: {
    'slot="default"': {
      control: false,
      table: {
        type: { summary: 'GlideCoreTabPanel' },
      },
      type: { name: 'function', required: true },
    },
    'slot="nav"': {
      control: false,
      table: {
        type: { summary: 'GlideCoreTab' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab>[slot="default"]': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab>.panel': {
      control: false,
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab-panel>.name': {
      control: false,
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
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
    '<glide-core-tab>[slot="icon"]': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
  },
};

export default meta;

export const Tabs: StoryObj = {};
