import './checkbox.js';
import { html, nothing } from 'lit';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Checkbox Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox group with a label and optional tooltip and description. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'slot="description"': 'Description',
    disabled: false,
    'hide-label': false,
    name: 'name',
    required: false,
    value: '',
  },
  argTypes: {
    'checkValidity()': {
      table: {
        type: {
          summary: 'method',
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity',
        },
      },
      type: { name: 'function' },
    },
    'reportValidity()': {
      table: {
        type: {
          summary: 'method',
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity',
        },
      },
      type: { name: 'function' },
    },
    'hide-label': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    name: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    value: {
      table: {
        defaultValue: { summary: '[]' },
        type: {
          summary: 'readonly string[]',
        },
      },
      type: { name: 'function' },
    },
  },
  play(context) {
    const checkboxGroup = context.canvasElement.querySelector(
      'glide-core-checkbox-group',
    );

    const isErrorStory = [
      'Horizontal (With Error)',
      'Vertical (With Error)',
    ].includes(context.name);

    if (isErrorStory && checkboxGroup instanceof GlideCoreCheckboxGroup) {
      checkboxGroup.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }
  },
  render(arguments_) {
    return html`<form style="padding: 1.5rem;">
      <glide-core-checkbox-group
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label'] || nothing}
        ?required=${arguments_.required}
      >
        <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
        <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
        <glide-core-checkbox label="Three" value="three"></glide-core-checkbox>

        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
          : ''}
      </glide-core-checkbox-group>
    </form>`;
  },
};

export default meta;

export const Vertical: StoryObj = {};

export const VerticalWithToolip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
    orientation: 'vertical',
  },
  name: 'Vertical (With Tooltip)',
};

export const VerticalWithError: StoryObj = {
  args: {
    orientation: 'vertical',
    required: true,
  },
  name: 'Vertical (With Error)',
};
