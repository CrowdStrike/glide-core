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
          'A radio group with a label and optional description and tooltip. Participates in forms and validation via `FormData` and various methods.',
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
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/radio-group.js';
        import '@crowdstrike/glide-core/radio.js';
      </script>

      <form style="padding: 1.5rem;">
        <glide-core-radio-group
          label=${arguments_.label || nothing}
          name=${arguments_.name || nothing}
          value=${arguments_.value || nothing}
          ?disabled=${arguments_.disabled}
          ?required=${arguments_.required}
        >
          <glide-core-radio
            label=${arguments_['<glide-core-radio>.label'] || nothing}
            value=${arguments_['<glide-core-radio>.value'] || nothing}
            ?checked=${arguments_['<glide-core-radio>.checked']}
          ></glide-core-radio>
          <glide-core-radio label="Two" value="two"></glide-core-radio>
          <glide-core-radio label="Three" value="three"></glide-core-radio>

          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">
                ${arguments_['slot="tooltip"']}
              </span>`
            : ''}

          <div slot="description">${arguments_['slot="description"']}</div>
        </glide-core-radio-group>
      </form>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    '<glide-core-radio>.label': 'One',
    'addEventListener(event, listener)': '',
    'checkValidity()': '',
    disabled: false,
    name: '',
    required: false,
    'slot="description"': 'Description',
    'slot="tooltip"': '',
    'reportValidity()': '',
    value: '',
    '<glide-core-radio>.checked': true,
    '<glide-core-radio>.value': 'one',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreRadio' },
      },
      type: { name: 'function', required: true },
    },
    'slot="description"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
    },
    'slot="tooltip"': {
      table: {
        type: { summary: 'Element | string' },
      },
    },
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input" | "invalid, listener: (event: Event)) => void) => void',
        },
      },
    },
    'checkValidity()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity',
        },
      },
    },
    'reportValidity()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity',
        },
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
    },
    '<glide-core-radio>.label': {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-radio>.value': {
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    '<glide-core-radio>.checked': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

export const Vertical: StoryObj = {};

export const VerticalWithTooltip: StoryObj = {
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
      <script type="ignore">
        import '@crowdstrike/glide-core/radio-group.js';
        import '@crowdstrike/glide-core/radio.js';
      </script>

      <form style="padding: 1.5rem;">
        <glide-core-radio-group
          label=${arguments_.label}
          name=${arguments_.name}
          value=${arguments_.value}
          ?disabled=${arguments_.disabled}
          ?required=${arguments_.required}
        >
          <glide-core-radio
            label=${arguments_['<glide-core-radio>.label'] || nothing}
            value=${arguments_['<glide-core-radio>.value'] || nothing}
            ?checked=${arguments_['<glide-core-radio>.checked']}
          ></glide-core-radio>
          <glide-core-radio label="Two"></glide-core-radio>
          <glide-core-radio label="Three"></glide-core-radio>

          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
            : ''}
          <div slot="description">${arguments_['slot="description"']}</div>
        </glide-core-radio-group>
      </form>
    `;
  },
};
