import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import InputComponent from './input.js';

const meta: Meta = {
  title: 'Input',
  decorators: [
    withActions,
    (story) =>
      html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/input.js';
        </script>

        ${story()}
      </form>`,
  ],
  parameters: {
    actions: {
      handles: ['change', 'input', 'invalid'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'addEventListener(event, handler)': '',
    autocapitalize: 'on',
    autocomplete: 'on',
    'checkValidity()': '',
    clearable: false,
    disabled: false,
    'hide-label': false,
    maxlength: '',
    name: '',
    orientation: 'horizontal',
    'password-toggle': false,
    pattern: '',
    placeholder: '',
    readonly: false,
    'reportValidity()': '',
    required: false,
    'resetValidityFeedback()': '',
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    'slot="description"': '',
    'slot="prefix-icon"': '',
    'slot="suffix-icon"': '',
    tooltip: '',
    spellcheck: 'false',
    type: 'text',
    value: '',
    version: '',
  },
  play(context) {
    const input = context.canvasElement.querySelector('glide-core-input');

    if (context.name.includes('Error') && input instanceof InputComponent) {
      input.reportValidity();

      // `reportValidity()` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }

    if (input instanceof InputComponent) {
      input.addEventListener('input', () => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            value: input.value,
          },
        });
      });
    }

    context.canvasElement
      .querySelector('form')
      ?.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // We reload the page to give the impression of a submission while keeping
        // the user on the same page.
        window.location.reload();
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-input
        autocapitalize=${arguments_.autocapitalize === 'on'
          ? nothing
          : arguments_.autocapitalize}
        autocomplete=${arguments_.autocomplete === 'on'
          ? nothing
          : arguments_.autocomplete}
        label=${arguments_.label || nothing}
        maxlength=${arguments_.maxlength || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation === 'horizontal'
          ? nothing
          : arguments_.orientation}
        pattern=${arguments_.pattern || nothing}
        placeholder=${arguments_.placeholder || nothing}
        spellcheck=${arguments_.spellcheck === 'false'
          ? nothing
          : arguments_.spellcheck}
        tooltip=${arguments_.tooltip || nothing}
        type=${arguments_.type === 'text' ? nothing : arguments_.type}
        value=${arguments_.value || nothing}
        ?clearable=${arguments_.clearable}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label']}
        ?password-toggle=${arguments_['password-toggle']}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
      >
        ${arguments_['slot="description"']
          ? html`<div slot="description">
              ${unsafeHTML(arguments_['slot="description"'])}
            </div>`
          : nothing}
      </glide-core-input>
    `;
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input" | "invalid", handler: (event: Event) => void): void',
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
    autocomplete: {
      control: { type: 'select' },
      options: ['on', 'off'],
      table: {
        defaultValue: {
          summary: '"on"',
        },
        type: {
          summary: '"on" | "off"',
        },
      },
    },
    'checkValidity()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(): boolean',
        },
      },
    },
    clearable: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
    name: {
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
    'password-toggle': {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    pattern: {
      table: {
        type: {
          summary: 'string',
          detail: `// Unlike \`<input>\`, \`pattern\` affects validity regardless if \`required\` is present`,
        },
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
          detail: '(): boolean',
        },
      },
    },
    'resetValidityFeedback()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: `
(): void

// Clears the validity feedback message and styling while maintaining the state of the component's\n// \`validity\` property.
          `,
        },
      },
    },
    'setCustomValidity(message)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(message: string): void',
        },
      },
    },
    'setValidity(flags, message)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(flags?: ValidityStateFlags, message?: string): void',
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
    'slot="description"': {
      table: {
        type: { summary: 'Element' },
      },
    },
    'slot="prefix-icon"': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    'slot="suffix-icon"': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    tooltip: {
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: { type: 'select' },
      options: [
        'color',
        'date',
        'email',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
      ],
      table: {
        defaultValue: {
          summary: '"text"',
        },
        type: {
          summary:
            'color | date | email | number | password | search | tel | text | time | url',
        },
      },
    },
    value: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
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
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-input
        autocapitalize=${arguments_.autocapitalize === 'on'
          ? nothing
          : arguments_.autocapitalize}
        autocomplete=${arguments_.autocomplete === 'on'
          ? nothing
          : arguments_.autocomplete}
        label=${arguments_.label || nothing}
        maxlength=${arguments_.maxlength || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation === 'horizontal'
          ? nothing
          : arguments_.orientation}
        pattern=${arguments_.pattern || nothing}
        placeholder=${arguments_.placeholder || nothing}
        spellcheck=${arguments_.spellcheck === 'false'
          ? nothing
          : arguments_.spellcheck}
        tooltip=${arguments_.tooltip || nothing}
        type=${arguments_.type === 'text' ? nothing : arguments_.type}
        value=${arguments_.value || nothing}
        ?clearable=${arguments_.clearable}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label']}
        ?password-toggle=${arguments_['password-toggle']}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
      >
        <glide-core-example-icon
          slot="prefix-icon"
          name="edit"
        ></glide-core-example-icon>
        <glide-core-example-icon
          slot="suffix-icon"
          name="share"
        ></glide-core-example-icon>
      </glide-core-input>
    `;
  },
};
