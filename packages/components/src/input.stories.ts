import './icons/storybook.js';
import './input.js';
import { html, nothing } from 'lit-html';
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
    },
  },
  args: {
    label: 'Label',
    type: 'text',
    value: 'Value',
    placeholder: 'Placeholder...',
    clearable: false,
    'hide-label': false,
    'label-position': 'left',
    required: false,
    'slot="tooltip"': '',
    'slot="description"': 'Description',
    readonly: false,
    disabled: false,
    name: 'name',
    autocapitalize: 'on',
    spellcheck: 'true',
    'max-character-count': '',
  },
  play(context) {
    const input = context.canvasElement.querySelector('cs-input');

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
      <div style="height: 4rem;">
        <cs-input
          type=${arguments_.type}
          value=${arguments_.value}
          label=${arguments_.label}
          placeholder=${arguments_.placeholder || nothing}
          ?hide-label=${arguments_['hide-label']}
          ?clearable=${arguments_.clearable}
          ?password-toggle=${arguments_.passwordToggle || nothing}
          label-position=${arguments_['label-position']}
          ?required=${arguments_.required}
          ?readonly=${arguments_.readonly}
          ?disabled=${arguments_.disabled}
          max-character-count=${arguments_['max-character-count'] || nothing}
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
        </cs-input>
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
    'label-position': {
      control: 'radio',
      defaultValue: 'left',
      options: ['left', 'top'],
      table: {
        defaultValue: { summary: '"left"' },
        type: { summary: '"left" | "top"' },
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
    'max-character-count': {
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
      <div style="height: 4rem;">
        <cs-input
          type=${arguments_.type}
          value=${arguments_.value}
          label=${arguments_.label}
          placeholder=${arguments_.placeholder || nothing}
          ?hide-label=${arguments_['hide-label']}
          ?clearable=${arguments_.clearable}
          ?password-toggle=${arguments_.passwordToggle || nothing}
          label-position=${arguments_['label-position']}
          ?required=${arguments_.required}
          ?readonly=${arguments_.readonly}
          ?disabled=${arguments_.disabled}
          max-character-count=${arguments_['max-character-count'] || nothing}
        >
          <div slot="description">
            Test description ... <a href="#">With link!</a>
          </div>
        </cs-input>
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
      <div style="height: 4rem;">
        <cs-input
          type=${arguments_.type}
          value=${arguments_.value}
          label=${arguments_.label}
          placeholder=${arguments_.placeholder || nothing}
          ?hide-label=${arguments_['hide-label']}
          ?clearable=${arguments_.clearable}
          ?password-toggle=${arguments_.passwordToggle || nothing}
          label-position=${arguments_['label-position']}
          ?required=${arguments_.required}
          ?readonly=${arguments_.readonly}
          ?disabled=${arguments_.disabled}
          max-character-count=${arguments_['max-character-count'] || nothing}
        >
          <div slot="suffix">
            <cs-example-icon slot="suffix" name="share"></cs-example-icon>
          </div>
          >
        </cs-input>
      </div>
    `;
  },
};

export const PrefixIcon: StoryObj = {
  render: (arguments_) => {
    return html`
      <div style="height: 4rem;">
        <cs-input
          type=${arguments_.type}
          value=${arguments_.value}
          label=${arguments_.label}
          placeholder=${arguments_.placeholder || nothing}
          ?hide-label=${arguments_['hide-label']}
          ?clearable=${arguments_.clearable}
          ?password-toggle=${arguments_.passwordToggle || nothing}
          label-position=${arguments_['label-position']}
          ?required=${arguments_.required}
          ?readonly=${arguments_.readonly}
          ?disabled=${arguments_.disabled}
          max-character-count=${arguments_['max-character-count'] || nothing}
        >
          ${arguments_['slot="tooltip"']
            ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
            : ''}

          <div slot="prefix">
            <cs-example-icon slot="prefix" name="pencil"></cs-example-icon>
          </div>
        </cs-input>
      </div>
    `;
  },
};

export const SearchType: StoryObj = {
  args: {
    type: 'search',
  },
};

export const MaxCharacterCount: StoryObj = {
  args: {
    'max-character-count': 20,
    'slot="description"': undefined,
  },
};

export const MaxCharacterCountAndDescription: StoryObj = {
  name: 'Max Character Count (With Description)',
  args: {
    'max-character-count': 20,
    'slot="description"':
      'Description here lives alongside max character count',
  },
};

export const Tooltip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
  },
};
