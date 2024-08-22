import './button-group.button.js';
import './button-group.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import { when } from 'lit/directives/when.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A group of buttons that work like radios—with labels and optional icons.',
      },
    },
  },
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/button-group.js';
      import '@crowdstrike/glide-core/button-group.button.js';
    </script>

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
                slot="prefix"
                name="info"
              ></glide-core-example-icon>
            </glide-core-button-group-button>

            <glide-core-button-group-button label="Two" value="two">
              <glide-core-example-icon
                slot="prefix"
                name="info"
              ></glide-core-example-icon>
            </glide-core-button-group-button>

            <glide-core-button-group-button label="Three" value="three">
              <glide-core-example-icon
                slot="prefix"
                name="info"
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
              value="two"
            ></glide-core-button-group-button>

            <glide-core-button-group-button
              label="Three"
              value="three"
            ></glide-core-button-group-button>`;
        },
      )}
    </glide-core-button-group>
  `,
  args: {
    label: 'Label',
    'slot="default"': '',
    '<glide-core-button-group-button>.label': 'One',
    'addEventListener(event, listener)': '',
    orientation: 'horizontal',
    variant: '',
    '<glide-core-button-group-button>.disabled': false,
    '<glide-core-button-group-button>.selected': true,
    '<glide-core-button-group-button>.value': 'one',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreButtonGroupButton' },
      },
      type: { name: 'function', required: true },
    },
    label: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['', 'icon-only'],
      table: {
        type: { summary: '"icon-only"' },
      },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: '"horizontal"',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    '<glide-core-button-group-button>.label': {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    '<glide-core-button-group-button>.value': {
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
          detail:
            "// Set `value` when you need something other a button's `label` to identify the selected button.",
        },
      },
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
  },
};

export default meta;

export const Default: StoryObj = {
  name: 'Button Group',
};

export const DefaultWithOrientationVertical: StoryObj = {
  name: 'Button Group (With Orientation Vertical)',
  args: {
    orientation: 'vertical',
  },
};

export const DefaultWithPrefixIcon: StoryObj = {
  name: 'Button Group (With Prefix Icon)',
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/button-group.js';
      import '@crowdstrike/glide-core/button-group.button.js';
    </script>

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
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
      </glide-core-button-group-button>

      <glide-core-button-group-button label="Two" value="two">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
      </glide-core-button-group-button>

      <glide-core-button-group-button label="Three" value="three">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
      </glide-core-button-group-button>
    </glide-core-button-group>
  `,
};

export const DefaultWithOrientationVerticalPrefixIcon: StoryObj = {
  name: 'Button Group (With Orientation Vertical and Prefix Icon)',
  args: {
    orientation: 'vertical',
  },
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/button-group.js';
      import '@crowdstrike/glide-core/button-group.button.js';
    </script>

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
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
      </glide-core-button-group-button>

      <glide-core-button-group-button label="Two" value="two">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
      </glide-core-button-group-button>

      <glide-core-button-group-button label="Three" value="three">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>
      </glide-core-button-group-button>
    </glide-core-button-group>
  `,
};

export const DefaultWithIconOnly: StoryObj = {
  args: {
    variant: 'icon-only',
  },
  name: 'Button Group (With Icon Only)',
};

export const DefaultWithOrientationVerticalOnlyIcon: StoryObj = {
  name: 'Button Group (With Orientation Vertical and Variant Only Icon)',
  args: {
    orientation: 'vertical',
    variant: 'icon-only',
  },
};
