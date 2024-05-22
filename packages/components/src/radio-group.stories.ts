import './radio-group.js';
import './radio.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Radio Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A radio group.',
      },
    },
  },
  render: () => html`
    <cs-radio-group label="label-group">
      <cs-radio value="value-1" name="option-1">Option 1</cs-radio>
      <cs-radio value="value-2" name="option-2">Option 2</cs-radio>
      <cs-radio value="value-3" name="option-3">Option 3</cs-radio>
      <div slot="description">Description</div>
    </cs-radio-group>
  `,
  args: {},
  argTypes: {},
};

export default meta;

export const Default: StoryObj = {
  name: 'Radio Group',
};
