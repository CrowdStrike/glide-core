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
      <script type="ignore">
        import '@crowdstrike/glide-core/form-controls-layout.js';
      </script>

      <form style="height: 16rem;">
        <glide-core-form-controls-layout split=${arguments_.split}>
          <glide-core-checkbox-group label="Label">
            <glide-core-checkbox label="One"></glide-core-checkbox>
            <glide-core-checkbox label="Two"></glide-core-checkbox>
            <glide-core-checkbox label="Three"></glide-core-checkbox>
          </glide-core-checkbox-group>

          <glide-core-dropdown label="Label" placeholder="Placeholder">
            <glide-core-dropdown-option
              label="One"
            ></glide-core-dropdown-option>
            <glide-core-dropdown-option
              label="Two"
            ></glide-core-dropdown-option>
            <glide-core-dropdown-option
              label="Three"
            ></glide-core-dropdown-option>
          </glide-core-dropdown>

          <glide-core-input
            label="Label "
            placeholder="Placeholder"
          ></glide-core-input>

          <glide-core-textarea
            label="Label"
            placeholder="Placeholder"
          ></glide-core-textarea>
        </glide-core-form-controls-layout>
      </form>
    `;
  },
};

export default meta;

export const FormControlsLayout: StoryObj = {};
