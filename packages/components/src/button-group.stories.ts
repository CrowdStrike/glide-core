import './button-group-button.js';
import './button-group.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A custom-built button group.',
      },
    },
  },
  render: () => html`
    <cs-button-group label="label" id="my-test">
      <cs-button-group-button value="1">Button 1</cs-button-group-button>
      <cs-button-group-button value="2">Button 2</cs-button-group-button>
      <cs-button-group-button value="3">Button 3</cs-button-group-button>
    </cs-button-group>
  `,
  args: {},
  argTypes: {},
};

export default meta;

export const Primary: StoryObj = {};
