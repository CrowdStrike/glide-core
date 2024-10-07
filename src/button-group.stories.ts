import './button-group.button.js';
import './button-group.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import { when } from 'lit/directives/when.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button Group',
  tags: ['autodocs'],
  decorators: [
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/button-group.js';
        import '@crowdstrike/glide-core/button-group.button.js';
      </script>

      ${story()}
    `,
  ],
  render(arguments_) {
    return html`
      <glide-core-button-group
        label=${arguments_.label || nothing}
        orientation=${arguments_.orientation || nothing}
        variant=${arguments_.variant || nothing || nothing}
      >
        ${when(
          arguments_.variant === 'icon-only',
          () => {
            return html`<glide-core-button-group-button
                label=${arguments_['<glide-core-button-group-button>.label'] ||
                nothing}
                value=${arguments_['<glide-core-button-group-button>.value'] ||
                nothing}
                ?disabled=${arguments_[
                  '<glide-core-button-group-button>.disabled'
                ]}
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.selected'
                ]}
              >
                <glide-core-example-icon
                  slot="icon"
                  name="info"
                ></glide-core-example-icon>
              </glide-core-button-group-button>

              <glide-core-button-group-button label="Two">
                <glide-core-example-icon
                  slot="icon"
                  name="edit"
                ></glide-core-example-icon>
              </glide-core-button-group-button>

              <glide-core-button-group-button label="Three">
                <glide-core-example-icon
                  slot="icon"
                  name="calendar"
                ></glide-core-example-icon>
              </glide-core-button-group-button>`;
          },
          () => {
            return html`<glide-core-button-group-button
                label=${arguments_['<glide-core-button-group-button>.label'] ||
                nothing}
                value=${arguments_['<glide-core-button-group-button>.value'] ||
                nothing}
                ?disabled=${arguments_[
                  '<glide-core-button-group-button>.disabled'
                ]}
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.selected'
                ]}
              >
              </glide-core-button-group-button>

              <glide-core-button-group-button
                label="Two"
              ></glide-core-button-group-button>

              <glide-core-button-group-button
                label="Three"
              ></glide-core-button-group-button>`;
          },
        )}
      </glide-core-button-group>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    'addEventListener(event, listener)': '',
    orientation: 'horizontal',
    variant: '',
    '<glide-core-button-group-button>.label': 'One',
    '<glide-core-button-group-button>.disabled': false,
    '<glide-core-button-group-button>.selected': true,
    '<glide-core-button-group-button>[slot="icon"]': '',
    '<glide-core-button-group-button>.value': '',
  },
  argTypes: {
    label: {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
    },
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreButtonGroupButton' },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: 'event: "change" | "input", listener: (event: Event) => void',
        },
      },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: '"horizontal"',
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['', 'icon-only'],
      table: {
        type: { summary: '"icon-only"' },
      },
    },
    '<glide-core-button-group-button>.label': {
      name: 'label',
      table: {
        category: 'Button Group Button',
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-button-group-button>.disabled': {
      name: 'disabled',
      defaultValue: { summary: 'false' },
      table: {
        category: 'Button Group Button',
      },
    },
    '<glide-core-button-group-button>.selected': {
      name: 'selected',
      defaultValue: { summary: 'false' },
      table: {
        category: 'Button Group Button',
      },
    },
    '<glide-core-button-group-button>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Button Group Button',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-button-group-button>.value': {
      name: 'value',
      table: {
        category: 'Button Group Button',
        type: {
          summary: 'string',
          detail:
            '// Set `value` when you need something other than button `label`s to identify the selected button',
        },
      },
    },
  },
};

export default meta;

export const ButtonGroup: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-button-group
        label=${arguments_.label}
        orientation=${arguments_.orientation}
        variant=${arguments_.variant || nothing}
      >
        <glide-core-button-group-button
          label=${arguments_['<glide-core-button-group-button>.label']}
          value=${arguments_['<glide-core-button-group-button>.value']}
          ?disabled=${arguments_['<glide-core-button-group-button>.disabled']}
          ?selected=${arguments_['<glide-core-button-group-button>.selected']}
        >
          <glide-core-example-icon
            slot="icon"
            name="info"
          ></glide-core-example-icon>
        </glide-core-button-group-button>

        <glide-core-button-group-button label="Two">
          <glide-core-example-icon
            slot="icon"
            name="edit"
          ></glide-core-example-icon>
        </glide-core-button-group-button>

        <glide-core-button-group-button label="Three">
          <glide-core-example-icon
            slot="icon"
            name="calendar"
          ></glide-core-example-icon>
        </glide-core-button-group-button>
      </glide-core-button-group>
    `;
  },
};
