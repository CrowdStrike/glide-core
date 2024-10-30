import './icons/storybook.js';
import './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tab Group',
  tags: ['autodocs'],
  decorators: [
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tab.group.js';
        import '@crowdstrike/glide-core/tab.panel.js';
        import '@crowdstrike/glide-core/tab.js';
      </script>

      ${story()}
    `,
  ],
  args: {
    'slot="default"': '',
    'slot="nav"': '',
    'addEventListener(event, listener)': '',
    sticky: false,
    '--padding-block-start': '',
    '--padding-inline': '',
    '<glide-core-tab>.panel': '',
    '<glide-core-tab>[slot="default"]': 'Tab',
    '<glide-core-tab>.active': true,
    '<glide-core-tab>.disabled': false,
    '<glide-core-tab>[slot="icon"]': '',
    '<glide-core-tab-panel>.name': '',
    '<glide-core-tab-panel>[slot="default"]': 'Panel',
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-tab-group
        ?sticky=${arguments_.sticky}
        style="${ifDefined(
          arguments_['--padding-inline'] && arguments_['--padding-block-start']
            ? `--padding-block-start: ${arguments_['--padding-block-start']}; --padding-inline: ${arguments_['--padding-inline']};`
            : arguments_['--padding-inline'] &&
                !arguments_['--padding-block-start']
              ? `--padding-inline: ${arguments_['--padding-inline']};`
              : arguments_['--padding-block-start'] &&
                  !arguments_['--padding-inline']
                ? `--padding-block-start: ${arguments_['--padding-block-start']};`
                : undefined,
        )}"
      >
        <glide-core-tab
          slot="nav"
          panel="1"
          ?active=${arguments_['<glide-core-tab>.active']}
        >
          ${unsafeHTML(arguments_['<glide-core-tab>[slot="default"]'])}
        </glide-core-tab>

        <glide-core-tab
          slot="nav"
          panel="2"
          ?disabled=${arguments_['<glide-core-tab>.disabled']}
        >
          With Icon

          <glide-core-example-icon
            slot="icon"
            name="checkmark"
          ></glide-core-example-icon>
        </glide-core-tab>

        <glide-core-tab-panel name="1">
          <div>
            ${unsafeHTML(arguments_['<glide-core-tab-panel>[slot="default"]'])}
          </div>
        </glide-core-tab-panel>
        <glide-core-tab-panel name="2">
          <div>With Icon</div>
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
    sticky: {
      name: 'sticky',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '--padding-block-start': {
      table: {
        type: {
          summary: 'CSS custom property',
          detail: '// The padding-block-start of the Tab Group.',
        },
      },
    },
    '--padding-inline': {
      table: {
        type: {
          summary: 'CSS custom property',
          detail:
            '// The padding-inline of the Tab Group. Also applied to each Tab Panel.',
        },
      },
    },
    '<glide-core-tab>.panel': {
      name: 'panel',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab>[slot="default"]': {
      name: 'slot="default"',
      control: 'text',
      table: {
        category: 'Tab',
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab>.active': {
      name: 'active',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tab>.disabled': {
      name: 'disabled',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tab>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-tab-panel>.name': {
      name: 'name',
      control: false,
      table: {
        category: 'Tab Panel',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab-panel>[slot="default"]': {
      name: 'slot="default"',
      control: 'text',
      table: {
        category: 'Tab Panel',
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
  },
};

export default meta;

export const Tabs: StoryObj = {};

export const WithOverflow: StoryObj = {
  render(arguments_) {
    return html`
      <div style="width: 25rem;">
        <glide-core-tab-group>
          <glide-core-tab
            slot="nav"
            panel="1"
            ?active=${arguments_['<glide-core-tab>.active']}
          >
            One
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="2"
            ?disabled=${arguments_['<glide-core-tab>.disabled']}
            >Two</glide-core-tab
          >
          <glide-core-tab slot="nav" panel="3">Three</glide-core-tab>
          <glide-core-tab slot="nav" panel="4">Four</glide-core-tab>
          <glide-core-tab slot="nav" panel="5">Five</glide-core-tab>
          <glide-core-tab slot="nav" panel="6">Six</glide-core-tab>
          <glide-core-tab slot="nav" panel="7">Seven</glide-core-tab>
          <glide-core-tab slot="nav" panel="8">Eight</glide-core-tab>
          <glide-core-tab slot="nav" panel="9">Nine</glide-core-tab>
          <glide-core-tab slot="nav" panel="10">Ten</glide-core-tab>

          <glide-core-tab-panel name="1">
            <div>One</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="2">
            <div>Two</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="3">
            <div>Three</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="4">
            <div>Four</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="5">
            <div>Five</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="6">
            <div>Six</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="7">
            <div>Seven</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="8">
            <div>Eight</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="9">
            <div>Nine</div>
          </glide-core-tab-panel>
          <glide-core-tab-panel name="10">
            <div>Ten</div>
          </glide-core-tab-panel>
        </glide-core-tab-group>
      </div>
    `;
  },
};
