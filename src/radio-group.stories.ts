import './radio-group.js';
import './radio.js';
import { html, nothing } from 'lit';
import GlideCoreRadioGroup from './radio-group.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Radio Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A radio group with a label, and optional tooltip and description. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  play: (context) => {
    const radioGroup = context.canvasElement.querySelector(
      'glide-core-radio-group',
    );

    if (
      context.name === 'Vertical (With Error)' &&
      radioGroup instanceof GlideCoreRadioGroup
    ) {
      radioGroup.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }
  },

  render: (arguments_) => {
    return html`
      <form style="padding: 1.5rem;">
        <glide-core-radio-group
          label=${arguments_.label}
          name=${arguments_.name || nothing}
          value=${arguments_.value}
          ?disabled=${arguments_.disabled}
          ?required=${arguments_.required}
        >
          <glide-core-radio value="one" label="One" checked></glide-core-radio>
          <glide-core-radio value="two" label="Two"></glide-core-radio>
          <glide-core-radio value="three" label="Three"></glide-core-radio>

          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
            : ''}
          <div slot="description">${arguments_['slot="description"']}</div>
        </glide-core-radio-group>
      </form>
    `;
  },
  args: {
    label: 'Label',
    'slot="tooltip"': '',
    'slot="description"': 'Description',
    disabled: false,
    name: '',
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
      type: { name: 'string' },
    },
    name: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    required: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    value: {
      control: 'text',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      type: { name: 'function' },
    },
    'addEventListener(event)': {
      table: {
        type: {
          summary: 'method',
          detail: 'event: "change" | "input", listener: (event: Event) => void',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Vertical: StoryObj = {};

export const VerticalWithToolip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
  },
  name: 'Vertical (With Tooltip)',
};

export const VerticalWithError: StoryObj = {
  args: {
    required: true,
    value: '',
  },
  name: 'Vertical (With Error)',
  render: (arguments_) => {
    return html`
      <form style="padding: 1.5rem;">
        <glide-core-radio-group
          label=${arguments_.label}
          name=${arguments_.name}
          value=${arguments_.value}
          ?disabled=${arguments_.disabled}
          ?required=${arguments_.required}
        >
          <glide-core-radio value="one" label="One"></glide-core-radio>
          <glide-core-radio value="two" label="Two"></glide-core-radio>
          <glide-core-radio value="three" label="Three"></glide-core-radio>

          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
            : ''}
          <div slot="description">${arguments_['slot="description"']}</div>
        </glide-core-radio-group>
      </form>
    `;
  },
};
