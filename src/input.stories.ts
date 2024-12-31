import './icons/storybook.js';
import './input.js';
import './toasts.js';
import './toasts.toast.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreInput, { SUPPORTED_TYPES } from './input.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Input',
  tags: ['autodocs'],
  decorators: [
    (story) => html`
      <form action="/" style="height: 4rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/input.js';
        </script>

        ${story()}
      </form>

      <glide-core-toasts></glide-core-toasts>
    `,
  ],
  parameters: {
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
    pattern: '',
    placeholder: 'Placeholder',
    readonly: false,
    'reportValidity()': '',
    required: false,
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    'slot="description"': '',
    'slot="prefix-icon"': '',
    'slot="suffix-icon"': '',
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

    if (input instanceof GlideCoreInput) {
      input.addEventListener('change', (event: Event) => {
        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });

      input.addEventListener('input', (event: Event) => {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            value: input.value,
          },
        });

        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });

      input.addEventListener('invalid', (event: Event) => {
        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-input
        autocapitalize=${arguments_.autocapitalize}
        autocomplete=${arguments_.autocomplete}
        label=${arguments_.label || nothing}
        maxlength=${arguments_.maxlength || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation}
        pattern=${arguments_.pattern || nothing}
        placeholder=${arguments_.placeholder || nothing}
        spellcheck=${arguments_.spellcheck}
        type=${arguments_.type || nothing}
        value=${arguments_.value || nothing}
        ?clearable=${arguments_.clearable}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label']}
        ?password-toggle=${arguments_.passwordToggle}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
      >
        ${arguments_['slot="description"']
          ? html`<div slot="description">
              ${unsafeHTML(arguments_['slot="description"'])}
            </div>`
          : nothing}
        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">
              ${unsafeHTML(arguments_['slot="tooltip"'])}
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
          detail: '() => boolean',
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
          detail: '() => boolean',
        },
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
    'slot="tooltip"': {
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
      <glide-core-input
        autocapitalize=${arguments_.autocapitalize}
        autocomplete=${arguments_.autocomplete}
        label=${arguments_.label || nothing}
        maxlength=${arguments_.maxlength || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation}
        placeholder=${arguments_.placeholder || nothing}
        spellcheck=${arguments_.spellcheck}
        type=${arguments_.type}
        value=${arguments_.value || nothing}
        ?clearable=${arguments_.clearable}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label']}
        ?password-toggle=${arguments_.passwordToggle || nothing}
        ?required=${arguments_.required}
        ?readonly=${arguments_.readonly}
      >
        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : nothing}

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
