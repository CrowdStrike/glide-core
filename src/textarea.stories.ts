import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreTextarea from './textarea.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Textarea',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<form action="/" style="min-height: 6rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/textarea.js';
        </script>

        ${story()}
      </form>`,
  ],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const textarea = context.canvasElement.querySelector('glide-core-textarea');

    if (context.name.includes('Error')) {
      textarea?.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }

    textarea?.addEventListener('input', (event: Event) => {
      if (event.currentTarget instanceof GlideCoreTextarea) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            value: event.currentTarget.value,
          },
        });
      }
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
    placeholder: 'Placeholder',
    readonly: false,
    'reportValidity()': '',
    required: false,
    rows: 2,
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    'slot="description"': '',
    'slot="tooltip"': '',
    spellcheck: 'false',
    value: '',
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
            'event: "change" | "input" | "invalid", handler: (event: Event) => void',
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
          detail: '() => boolean',
        },
      },
    },
    required: {
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
    'setCustomValidity(message)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(message: string) => void',
        },
      },
    },
    'setValidity(flags, message)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(flags?: ValidityStateFlags, message?: string) => void',
        },
      },
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
    spellcheck: {
      control: 'radio',
      defaultValue: '"true"',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
        type: { summary: '"true" | "false"' },
      },
    },
    value: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
  },
  render(arguments_) {
    return html`
      <glide-core-textarea
        autocapitalize=${arguments_.autocapitalize}
        autocomplete=${arguments_.autocomplete}
        label=${arguments_.label || nothing}
        maxlength=${arguments_.maxlength || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation}
        placeholder=${arguments_.placeholder || nothing}
        rows=${arguments_.rows}
        spellcheck=${arguments_.spellcheck}
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
        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
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
