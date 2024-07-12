import './checkbox.js';
import './form-layout.js';
import './input.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Form Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'TODO',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    split: 'left',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'One or more Glide Core form controls' },
      },
      type: { name: 'function', required: true },
    },
    split: {
      control: { type: 'radio' },
      options: ['left', 'middle'],
      table: {
        defaultValue: { summary: '"left"' },
        type: { summary: '"left" | "middle"' },
      },
      type: { name: 'string', required: true },
    },
  },
  render(arguments_) {
    return html`
      <glide-core-form-layout split=${arguments_.split}>
        <glide-core-input
          label="Label Label Label Label Label Label"
          placeholder="Placeholder"
        ></glide-core-input>

        <glide-core-input
          label="Label"
          placeholder="Placeholder"
        ></glide-core-input>

        <glide-core-input
          label="Label"
          placeholder="Placeholder"
        ></glide-core-input>
      </glide-core-form-layout>
    `;
  },
};

export default meta;

export const SingleSelectionHorizontal: StoryObj = {
  name: 'Default',
};
