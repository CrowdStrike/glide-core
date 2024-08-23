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
          'A text area with a label and optional description and tooltip. Participates in forms and validation via `FormData` and various methods.',
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
    'addEventListener(event, listener)': '',
    autocapitalize: 'on',
    'checkValidity()': '',
    disabled: false,
    'hide-label': false,
    maxlength: '',
    name: '',
    orientation: 'horizontal',
    placeholder: 'Placeholder',
    readonly: false,
    'reportValidity()': '',
    required: false,
    rows: 2,
    'slot="description"': 'Description',
    'slot="tooltip"': '',
    spellcheck: 'false',
    value: '',
  },
  argTypes: {
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
        defaultValue: { summary: '""' },
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
        type: { summary: 'HTMLKBDElement | string' },
      },
    },
    'slot="description"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
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
  render: (arguments_) => {
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/textarea.js';
      </script>

      <form>
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

export const WithError: StoryObj = {
  name: 'With Error',
  args: {
    required: true,
    value: '',
  },
};

export const Description: StoryObj = {
  render: (arguments_) => {
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/textarea.js';
      </script>

      <form>
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
    'slot="description"': undefined,
  },
};

export const MaxLengthAndDescription: StoryObj = {
  name: 'Max Length (With Description)',
  args: {
    maxlength: 20,
    'slot="description"': 'Description',
  },
};

export const Tooltip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
  },
};
