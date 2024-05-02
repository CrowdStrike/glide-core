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
    type: 'text',
    value: 'Value',
    placeholder: 'Placeholder...',
    clearable: false,
    label: 'Label',
    hideLabel: false,
    labelPosition: 'left',
    required: false,
    ['slot="description"']: 'Description',
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
      <cs-input
        type=${arguments_.type}
        value=${arguments_.value}
        label=${arguments_.label}
        placeholder=${arguments_.placeholder || nothing}
        ?hide-label=${arguments_.hideLabel}
        ?clearable=${arguments_.clearable}
        ?password-toggle=${arguments_.passwordToggle || nothing}
        label-position=${arguments_.labelPosition}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
        ?disabled=${arguments_.disabled}
        max-character-count=${arguments_.maxCharacterCount || nothing}
      >
        ${arguments_['slot="tooltip-description"']
          ? html`<div slot="tooltip-description">
              ${arguments_['slot="tooltip-description"']}
            </div>`
          : ''}
        ${arguments_['slot="tooltip-shortcut"']
          ? html`<div slot="tooltip-shortcut">
              ${arguments_['slot="tooltip-shortcut"']}
            </div>`
          : ''}
        ${arguments_['slot="description"']
          ? html`<div slot="description">
              ${arguments_['slot="description"']}
            </div>`
          : ''}
      </cs-input>
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
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Label' },
        type: { summary: 'string' },
      },
    },
    hideLabel: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    labelPosition: {
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
    ['slot="description"']: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | html' },
      },
    },
    'addEventListener(event)': {
      control: { type: 'object' },
      table: {
        type: {
          summary: 'method',
          detail: 'events: "change", "input", "invalid", "clear"',
        },
      },
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
      <cs-input
        type=${arguments_.type}
        value=${arguments_.value}
        label=${arguments_.label}
        placeholder=${arguments_.placeholder || nothing}
        ?hide-label=${arguments_.hideLabel}
        ?clearable=${arguments_.clearable}
        ?password-toggle=${arguments_.passwordToggle || nothing}
        label-position=${arguments_.labelPosition}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
        ?disabled=${arguments_.disabled}
        max-character-count=${arguments_.maxCharacterCount || nothing}
      >
        <div slot="description">
          Test description ... <a href="#">With link!</a>
        </div>
      </cs-input>
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
      <cs-input
        type=${arguments_.type}
        value=${arguments_.value}
        label=${arguments_.label}
        placeholder=${arguments_.placeholder || nothing}
        ?hide-label=${arguments_.hideLabel}
        ?clearable=${arguments_.clearable}
        ?password-toggle=${arguments_.passwordToggle || nothing}
        label-position=${arguments_.labelPosition}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
        ?disabled=${arguments_.disabled}
        max-character-count=${arguments_.maxCharacterCount || nothing}
      >
        <div slot="suffix">
          <cs-example-icon slot="suffix" name="share"></cs-example-icon>
        </div>
        >
      </cs-input>
    `;
  },
};

export const PrefixIcon: StoryObj = {
  render: (arguments_) => {
    return html`
      <cs-input
        type=${arguments_.type}
        value=${arguments_.value}
        label=${arguments_.label}
        placeholder=${arguments_.placeholder || nothing}
        ?hide-label=${arguments_.hideLabel}
        ?clearable=${arguments_.clearable}
        ?password-toggle=${arguments_.passwordToggle || nothing}
        label-position=${arguments_.labelPosition}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
        ?disabled=${arguments_.disabled}
        max-character-count=${arguments_.maxCharacterCount || nothing}
      >
        <div slot="prefix">
          <cs-example-icon slot="prefix" name="pencil"></cs-example-icon>
        </div>
        >
      </cs-input>
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
    maxCharacterCount: 20,
    ['slot="description"']: undefined,
  },
};

export const MaxCharacterCountAndDescription: StoryObj = {
  name: 'Max Character Count (With Description)',
  args: {
    maxCharacterCount: 20,
    ['slot="description"']:
      'Description here lives alongside max character count',
  },
};
