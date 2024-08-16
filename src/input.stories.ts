import './icons/storybook.js';
import './input.js';
import { html, nothing } from 'lit';
import Input, { SUPPORTED_TYPES } from './input.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An input with a label and optional description. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    type: 'text',
    value: 'Value',
    placeholder: 'Placeholder...',
    clearable: false,
    'hide-label': false,
    orientation: 'horizontal',
    required: false,
    'slot="tooltip"': '',
    'slot="description"': 'Description',
    readonly: false,
    disabled: false,
    name: 'name',
    autocapitalize: 'on',
    spellcheck: 'true',
    maxlength: '',
  },
  play(context) {
    const input = context.canvasElement.querySelector('glide-core-input');

    const isErrorStory = context.name === 'With Error';

    if (isErrorStory && input instanceof Input) {
      input.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }
  },
  render: (arguments_) => {
    return html`
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
          spellcheck=${arguments_.spellcheck || nothing}
          autocapitalize=${arguments_.autocapitalize || nothing}
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
      defaultValue: '"true"',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"true"' },
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
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    'slot="description"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | html' },
      },
    },
    'addEventListener(event)': {
      table: {
        type: {
          summary: 'method',
          detail:
            'event: "change" | "input" | "invalid", listener: (event: Event) => void',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Default: StoryObj = {};

export const Password: StoryObj = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: false,
    clearable: true,
    passwordToggle: true,
    value: '',
  },
};

export const WithError: StoryObj = {
  args: {
    required: true,
    value: '',
  },
  name: 'With Error',
};

export const Description: StoryObj = {
  render: (arguments_) => {
    return html`
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
          <div slot="description">
            Test description ... <a href="#">With link!</a>
          </div>
        </glide-core-input>
      </div>
    `;
  },
};

export const Readonly: StoryObj = {
  args: {
    readonly: true,
    value: 'Some example text',
  },
};

export const Disabled: StoryObj = {
  args: {
    disabled: true,
    value: 'Some example text',
  },
};

export const Placeholder: StoryObj = {
  args: {
    placholder: 'Placeholder...',
    value: '',
  },
};

export const Clearable: StoryObj = {
  args: {
    clearable: true,
  },
};

export const SuffixIcon: StoryObj = {
  render: (arguments_) => {
    return html`
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
          <div slot="suffix">
            <glide-core-example-icon
              slot="suffix"
              name="share"
            ></glide-core-example-icon>
          </div>
          >
        </glide-core-input>
      </div>
    `;
  },
};

export const PrefixIcon: StoryObj = {
  render: (arguments_) => {
    return html`
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

          <div slot="prefix">
            <glide-core-example-icon
              slot="prefix"
              name="pencil"
            ></glide-core-example-icon>
          </div>
        </glide-core-input>
      </div>
    `;
  },
};

export const SearchType: StoryObj = {
  args: {
    type: 'search',
  },
};

export const MaxLength: StoryObj = {
  args: {
    maxlength: 20,
    'slot="description"': undefined,
  },
};

export const MaxLengthAndDescription: StoryObj = {
  name: 'Max Length (With Description)',
  args: {
    maxlength: 20,
    'slot="description"': 'Description here lives alongside maxlength',
  },
};

export const Tooltip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
  },
};
