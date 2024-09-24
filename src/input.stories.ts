import './icons/storybook.js';
import './input.js';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreInput, { SUPPORTED_TYPES } from './input.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Input',
  tags: ['autodocs'],
  decorators: [(story) => html`<div style="height: 5rem;">${story()}</div>`],
  parameters: {
    docs: {
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
    'click()': '',
    disabled: false,
    'focus(options)': '',
    'hide-label': false,
    maxlength: '',
    name: '',
    orientation: 'horizontal',
    placeholder: 'Placeholder',
    readonly: false,
    'reportValidity()': '',
    required: false,
    'slot="description"': '',
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
        import '@crowdstrike/glide-core/input.js';
      </script>

      <div style="height: 4rem;">
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
          ${arguments_['slot="description"']
            ? html`<div slot="description">
                ${unsafeHTML(arguments_['slot="description"'])}
              </div>`
            : ''}
          ${arguments_['slot="tooltip"']
            ? html`<div slot="tooltip">
                ${unsafeHTML(arguments_['slot="tooltip"'])}
              </div>`
            : ''}
        </glide-core-input>
      </div>
    `;
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
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
          detail: '() => boolean',
        },
      },
    },
    'click()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'focus(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(options?: FocusOptions) => void',
        },
      },
    },
    'hide-label': {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    maxlength: {
      control: 'number',
      table: {
        type: { summary: 'number' },
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
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    readonly: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
    spellcheck: {
      control: 'radio',
      defaultValue: '"false"',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
        type: { summary: '"true" | "false"' },
      },
    },
    'slot="tooltip"': {
      table: {
        type: { summary: 'Element' },
      },
    },
    'slot="description"': {
      table: {
        type: { summary: 'Element' },
      },
    },
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
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
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
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/input.js';
      </script>

      <glide-core-input
        label=${arguments_.label}
        maxlength=${arguments_.maxlength || nothing}
        orientation=${arguments_.orientation}
        placeholder=${arguments_.placeholder || nothing}
        type=${arguments_.type}
        value=${arguments_.value}
        ?clearable=${arguments_.clearable}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label']}
        ?password-toggle=${arguments_.passwordToggle || nothing}
        ?readonly=${arguments_.readonly}
        ?required=${arguments_.required}
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
    `;
  },
};
