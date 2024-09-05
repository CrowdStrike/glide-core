import './icons/storybook.js';
import './input.js';
import { html, nothing } from 'lit';
import GlideCoreInput, { SUPPORTED_TYPES } from './input.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An input with a label and optional description and tooltip. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'addEventListener(event, listener)': '',
    autocapitalize: 'on',
    'checkValidity()': '',
    clearable: false,
    disabled: false,
    'hide-label': false,
    maxlength: '',
    name: '',
    orientation: 'horizontal',
    placeholder: 'Placeholder',
    readonly: false,
    'reportValidity()': '',
    required: false,
    'slot="description"': 'Description',
    'slot="tooltip"': '',
    spellcheck: 'false',
    type: 'text',
    value: '',
  },
  play(context) {
    const input = context.canvasElement.querySelector('glide-core-input');

    if (context.name.includes('Error') && input instanceof GlideCoreInput) {
      input.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }
  },
  render: (arguments_) => {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/input.js';
      </script>

      <div style="height: 5rem;">
        <glide-core-input
          autocapitalize=${arguments_.autocapitalize || nothing}
          label=${arguments_.label || nothing}
          maxlength=${arguments_.maxlength || nothing}
          name=${arguments_.name || nothing}
          orientation=${arguments_.orientation}
          placeholder=${arguments_.placeholder || nothing}
          spellcheck=${arguments_.spellcheck || nothing}
          type=${arguments_.type || nothing}
          value=${arguments_.value || nothing}
          ?hide-label=${arguments_['hide-label']}
          ?clearable=${arguments_.clearable}
          ?password-toggle=${arguments_.passwordToggle || nothing}
          ?required=${arguments_.required}
          ?readonly=${arguments_.readonly}
          ?disabled=${arguments_.disabled}
        >
          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
            : ''}
          ${arguments_['slot="description"']
            ? html`<div slot="description">
                ${arguments_['slot="description"']}
              </div>`
            : ''}
        </glide-core-input>
      </div>
    `;
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [...SUPPORTED_TYPES],
      table: {
        defaultValue: {
          summary: '"text"',
        },
        type: {
          summary: SUPPORTED_TYPES.map((type) => {
            return `"${type}"`;
          }).join(' | '),
        },
      },
    },
    value: {
      control: 'text',
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'hide-label': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    placeholder: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Placeholder' },
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
    readonly: {
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
    spellcheck: {
      control: 'radio',
      defaultValue: '"false"',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
        type: { summary: '"true" | "false"' },
      },
    },
    autocapitalize: {
      control: { type: 'select' },
      options: ['on', 'off', 'none', 'sentences', 'words', 'characters'],
      table: {
        defaultValue: {
          summary: '"on"',
        },
        type: {
          summary:
            '"on" | "off" | "none" | "sentences" | "words" | "characters"',
        },
      },
    },
    maxlength: {
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    'slot="tooltip"': {
      table: {
        type: { summary: 'HTMLKBDElement | string' },
      },
    },
    'slot="description"': {
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
            'event: "change" | "input" | "invalid", listener: (event: Event) => void',
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
  },
};

export default meta;

export const Input: StoryObj = {
  tags: ['!autodocs'],
};

export const WithError: StoryObj = {
  args: {
    required: true,
  },
};

export const WithIcons: StoryObj = {
  render: (arguments_) => {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/input.js';
      </script>

      <div style="height: 5rem;">
        <glide-core-input
          type=${arguments_.type}
          value=${arguments_.value}
          label=${arguments_.label}
          placeholder=${arguments_.placeholder || nothing}
          ?hide-label=${arguments_['hide-label']}
          ?clearable=${arguments_.clearable}
          ?password-toggle=${arguments_.passwordToggle || nothing}
          orientation=${arguments_.orientation}
          ?required=${arguments_.required}
          ?readonly=${arguments_.readonly}
          ?disabled=${arguments_.disabled}
          maxlength=${arguments_.maxlength || nothing}
        >
          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
            : ''}

          <glide-core-example-icon
            slot="prefix"
            name="pencil"
          ></glide-core-example-icon>
          <glide-core-example-icon
            slot="suffix"
            name="share"
          ></glide-core-example-icon>
        </glide-core-input>
      </div>
    `;
  },
};
