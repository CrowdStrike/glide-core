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
  render: () => {
    return html`
      <form style="padding: 1.5rem;">
        <cs-radio-group label="Label" name="option">
          <cs-radio value="value-1">Option 1</cs-radio>
          <cs-radio value="value-2">Option 2</cs-radio>
          <cs-radio value="value-3">Option 3</cs-radio>
          <div slot="description">Description</div>
          <span slot="tooltip">Tooltip</span>
        </cs-radio-group>
      </form>
    `;
  },
  args: {},
  argTypes: {},
};

export default meta;

export const Default: StoryObj = {
  name: 'Radio Group',
};
