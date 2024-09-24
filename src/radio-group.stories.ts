import './radio-group.js';
import './radio.js';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreRadioGroup from './radio-group.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Radio Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
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
      context.name.includes('Error') &&
      radioGroup instanceof GlideCoreRadioGroup
    ) {
      radioGroup.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/radio-group.js';
        import '@crowdstrike/glide-core/radio.js';
      </script>

      <form action="/">
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
          <glide-core-radio label="Two"></glide-core-radio>
          <glide-core-radio label="Three"></glide-core-radio>

          <div slot="description">
            ${unsafeHTML(arguments_['slot="description"'])}
          </div>
          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">
                ${unsafeHTML(arguments_['slot="tooltip"'])}
              </span>`
            : ''}
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
    'reportValidity()': '',
    required: false,
    'slot="description"': '',
    'slot="tooltip"': '',
    value: '',
    '<glide-core-radio>.checked': true,
    '<glide-core-radio>.value': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreRadio' },
      },
      type: { name: 'function', required: true },
    },
    'slot="description"': {
      table: {
        type: { summary: 'Element' },
      },
    },
    'slot="tooltip"': {
      table: {
        type: { summary: 'Element' },
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
          detail: '() => boolean',
        },
      },
    },
    'reportValidity()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => boolean',
        },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    name: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    required: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    value: {
      table: {
        defaultValue: { summary: '""' },
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
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

export const RadioGroup: StoryObj = {
  tags: ['!autodocs'],
};

export const WithError: StoryObj = {
  args: {
    '<glide-core-radio>.checked': false,
    required: true,
    value: '',
  },
};
