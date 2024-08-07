import './checkbox-group.js';
import './dropdown';
import './form-controls-layout.js';
import './input.js';
import './radio-group.js';
import './radio.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Form Controls Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Aligns form control labels and the controls themselves in two columns. Only horizontal controls are supported.',
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
        type: {
          summary:
            'GlideCoreCheckbox | GlideCoreCheckboxGroup | GlideCoreDropdown | GlideCoreInput | GlideCoreTextArea',
        },
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
    },
  },
  render(arguments_) {
    return html`
      <form style="height: 15rem;">
        <glide-core-form-controls-layout split=${arguments_.split}>
          <glide-core-checkbox-group label="Label">
            <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
            <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>

            <glide-core-checkbox
              label="Three"
              value="three"
            ></glide-core-checkbox>
          </glide-core-checkbox-group>

          <glide-core-dropdown
            label="Label"
            name="name"
            placeholder="Placeholder"
            size="large"
          >
            <glide-core-dropdown-option
              label="One"
              value="one"
            ></glide-core-dropdown-option>

            <glide-core-dropdown-option
              label="Two"
              value="two"
            ></glide-core-dropdown-option>

            <glide-core-dropdown-option
              label="Three"
              value="three"
            ></glide-core-dropdown-option>
          </glide-core-dropdown>

          <glide-core-input
            label="Label "
            placeholder="Placeholder"
          ></glide-core-input>

          <glide-core-textarea
            placeholder="Placeholder"
            label="Label"
          ></glide-core-textarea>
        </glide-core-form-controls-layout>
      </form>
    `;
  },
};

export default meta;

export const SingleSelectionHorizontal: StoryObj = {
  name: 'Default',
};
