import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import TextareaComponent from './textarea.js';

const meta: Meta = {
  title: 'Textarea',
  decorators: [
    withActions,
    (story) =>
      html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/textarea.js';
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
  play(context) {
    const textarea = context.canvasElement.querySelector('glide-core-textarea');

    if (
      context.name.includes('Error') &&
      textarea instanceof TextareaComponent
    ) {
      textarea.reportValidity();

      // `reportValidity()` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }

    if (textarea instanceof TextareaComponent) {
      textarea.addEventListener('input', () => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            value: textarea.value,
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
  args: {
    label: 'Label',
    'addEventListener(event, handler)': '',
    autocapitalize: 'on',
    autocomplete: 'on',
    'checkValidity()': '',
    disabled: false,
    'hide-label': false,
    maxlength: '',
    name: '',
    orientation: 'horizontal',
    placeholder: '',
    readonly: false,
    'reportValidity()': '',
    required: false,
    'resetValidityFeedback()': '',
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    'slot="description"': '',
    spellcheck: 'false',
    split: '',
    tooltip: '',
    value: '',
    version: '',
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
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: '"horizontal" | "vertical"' },
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
    placeholder: {
      table: {
        type: { summary: 'string' },
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
    required: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
    'slot="description"': {
      table: {
        type: { summary: 'Element' },
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
    split: {
      control: 'select',
      options: ['', 'left', 'middle', 'right'],
      table: {
        type: {
          summary: '"left" | "middle" | "right"',
          detail: `
// The split between the label and text area:
//
// - "left": 1/3 of the available space for the label. 2/3 for the text area.
// - "middle": 1/2 of the available space the label. 1/2 for the text area.
// - "right": 2/3 of the available space the label. 1/3 for the text area.
//
// Unsupported with \`orientation="vertical"\`.
`,
        },
      },
    },
    tooltip: {
      table: {
        type: { summary: 'string' },
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
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-textarea
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
        placeholder=${arguments_.placeholder || nothing}
        spellcheck=${arguments_.spellcheck === 'false'
          ? nothing
          : arguments_.spellcheck}
        split=${arguments_.split || nothing}
        tooltip=${arguments_.tooltip || nothing}
        value=${arguments_.value || nothing}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label']}
        ?readonly=${arguments_.readonly}
        ?required=${arguments_.required}
      >
        ${arguments_['slot="description"']
          ? html`<div slot="description">
              ${arguments_['slot="description"']}
            </div>`
          : nothing}
      </glide-core-textarea>
    `;
  },
};

export default meta;

export const Textarea: StoryObj = {
  tags: ['!autodocs'],
};

export const WithError: StoryObj = {
  args: {
    required: true,
  },
};
