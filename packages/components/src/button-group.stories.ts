import './button-group.button.js';
import './button-group.js';
import './icons/storybook.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A button group allowing for text and icon content.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-button-group
      label=${arguments_.label}
      orientation=${arguments_.orientation}
    >
      <cs-button-group-button value="button-1" selected
        >Button 1</cs-button-group-button
      >
      <cs-button-group-button value="button-2">Button 2</cs-button-group-button>
      <cs-button-group-button value="button-3">Button 3</cs-button-group-button>
    </cs-button-group>
  `,
  args: {
    label: 'Group label',
    'slot="default"': '',
    variant: '',
    orientation: 'horizontal',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: '<cs-button-group-button>' },
      },
      type: { name: 'function', required: true },
    },
    label: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'A screen reader label for the group' },
      },
    },
    variant: {
      table: {
        type: { summary: '"icon-only" | undefined' },
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
    'addEventListener(event)': {
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "change" | "input", listener: (event: CustomEvent<{ value: string }>) => void',
        },
      },
      type: { name: 'function' },
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
    <cs-button-group
      label=${arguments_.label}
      orientation=${arguments_.orientation}
    >
      <cs-button-group-button value="button-1" selected>
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 1
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 2
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 3
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithOrientationVerticalPrefixIcon: StoryObj = {
  name: 'Button Group (With Orientation Vertical and Prefix Icon)',
  args: {
    orientation: 'vertical',
  },
  render: (arguments_) => html`
    <cs-button-group
      label=${arguments_.label}
      orientation=${arguments_.orientation}
    >
      <cs-button-group-button value="button-1" selected>
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 1
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 2
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 3
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithVariantIconOnly: StoryObj = {
  name: 'Button Group (With Variant Icon Only)',
  render: (arguments_) => html`
    <cs-button-group
      label=${arguments_.label}
      variant="icon-only"
      orientation=${arguments_.orientation}
    >
      <cs-button-group-button value="button-1" selected>
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 1
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 2
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 3
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithOrientationVerticalOnlyIcon: StoryObj = {
  name: 'Button Group (With Orientation Vertical and Variant Only Icon)',
  args: {
    orientation: 'vertical',
  },
  render: (arguments_) => html`
    <cs-button-group
      label=${arguments_.label}
      orientation=${arguments_.orientation}
      variant="icon-only"
    >
      <cs-button-group-button value="button-1" selected>
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 1
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 2
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <cs-example-icon slot="prefix" name="info"></cs-example-icon>
        Button 3
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithNoneSelected: StoryObj = {
  name: 'Button Group (With None Selected)',
  render: (arguments_) => html`
    <cs-button-group label=${arguments_.label}>
      <cs-button-group-button value="button-1">Button 1</cs-button-group-button>
      <cs-button-group-button value="button-2">Button 2</cs-button-group-button>
      <cs-button-group-button value="button-3">Button 3</cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithSelected: StoryObj = {
  name: 'Button Group (With Second Button Selected)',
  render: (arguments_) => html`
    <cs-button-group label=${arguments_.label}>
      <cs-button-group-button value="button-1">Button 1</cs-button-group-button>
      <cs-button-group-button value="button-2" selected
        >Button 2</cs-button-group-button
      >
      <cs-button-group-button value="button-3">Button 3</cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithDisabled: StoryObj = {
  name: 'Button Group (With Disabled)',
  render: (arguments_) => html`
    <cs-button-group label=${arguments_.label}>
      <cs-button-group-button value="button-1" disabled
        >Button 1</cs-button-group-button
      >
      <cs-button-group-button value="button-2" selected
        >Button 2</cs-button-group-button
      >
      <cs-button-group-button value="button-3">Button 3</cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithOneButton: StoryObj = {
  name: 'Button Group (With One Button)',
  render: (arguments_) => html`
    <cs-button-group label=${arguments_.label}>
      <cs-button-group-button value="button">Button</cs-button-group-button>
    </cs-button-group>
  `,
};
