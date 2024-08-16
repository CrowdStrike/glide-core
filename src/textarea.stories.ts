import { html, nothing } from 'lit';
import GlideCoreTextarea from './textarea.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Textarea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A textarea with a label and optional description. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const textarea = context.canvasElement.querySelector('glide-core-textarea');

    if (
      context.name === 'With Error' &&
      textarea instanceof GlideCoreTextarea
    ) {
      textarea.reportValidity();
      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }
  },
  args: {
    label: 'Label',
    value: '',
    placeholder: 'Placeholder',
    'hide-label': false,
    orientation: 'horizontal',
    required: false,
    rows: 2,
    readonly: false,
    disabled: false,
    maxlength: '',
    'slot="description"': 'Description',
    name: '',
    'slot="tooltip"': '',
  },
  argTypes: {
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    value: {
      control: 'text',
      table: {
        type: { summary: 'string' },
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
        type: { summary: 'string' },
      },
    },
    'hide-label': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
    rows: {
      control: 'number',
      table: {
        defaultValue: { summary: '2' },
        type: { summary: 'number' },
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
    name: {
      control: 'text',
      table: {
        type: { summary: 'string' },
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
  },
  render: (arguments_) => {
    return html`<form>
      <glide-core-textarea
        value=${arguments_.value || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation}
        placeholder=${arguments_.placeholder}
        rows=${arguments_.rows}
        ?hide-label=${arguments_['hide-label']}
        ?required=${arguments_.required}
        label=${arguments_.label}
        ?readonly=${arguments_.readonly}
        ?disabled=${arguments_.disabled}
        maxlength=${arguments_.maxlength || nothing}
      >
        ${arguments_['slot="tooltip"']
          ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
          : ''}
        ${arguments_['slot="description"']
          ? html`<div slot="description">
              ${arguments_['slot="description"']}
            </div>`
          : ''}
      </glide-core-textarea>
    </form>`;
  },
};

export default meta;

export const Default: StoryObj = {};

export const Required: StoryObj = {
  args: {
    required: true,
  },
};

export const Vertical: StoryObj = {
  args: {
    orientation: 'vertical',
  },
};

export const Readonly: StoryObj = {
  args: {
    readonly: true,
  },
};

export const Disabled: StoryObj = {
  args: {
    disabled: true,
  },
};

export const Placeholder: StoryObj = {
  args: {
    placholder: 'Placeholder...',
    value: '',
  },
};

export const MaxLength: StoryObj = {
  args: {
    maxlength: 20,
  },
};

export const Description: StoryObj = {
  render: (arguments_) => {
    return html`<form>
      <glide-core-textarea
        value=${arguments_.value}
        name=${arguments_.name}
        orientation=${arguments_.orientation}
        placeholder=${arguments_.placeholder}
        rows=${arguments_.rows || nothing}
        ?hide-label=${arguments_['hide-label']}
        ?required=${arguments_.required}
        label=${arguments_.label}
        ?readonly=${arguments_.readonly}
        ?disabled=${arguments_.disabled}
        maxlength=${arguments_.maxlength}
      >
        ${arguments_['slot="tooltip"']
          ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
          : ''}

        <div slot="description">
          Text description... <a href="#">With link!</a>
        </div>
      </glide-core-textarea>
    </form>`;
  },
};

export const WithError: StoryObj = {
  name: 'With Error',
  args: {
    required: true,
    value: '',
  },
};

export const Tooltip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
  },
};
