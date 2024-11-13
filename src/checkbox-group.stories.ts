import './checkbox.js';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Checkbox Group',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<form action="/" style="width: max-content;">
        <script type="ignore">
          import '@crowdstrike/glide-core/checkbox-group.js';
          import '@crowdstrike/glide-core/checkbox.js';
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
  args: {
    label: 'Label',
    'slot="default"': '',
    'addEventListener(event, handler)': '',
    'checkValidity()': '',
    disabled: false,
    'hide-label': false,
    name: '',
    'reportValidity()': '',
    required: false,
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    'slot="description"': '',
    'slot="tooltip"': '',
    value: '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'slot="default"': {
      control: false,
      table: {
        type: { summary: 'GlideCoreCheckbox' },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input" | "invalid", handler: (event: Event) => void) => void',
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
    name: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
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
    value: {
      control: false,
      table: {
        defaultValue: { summary: '[]' },
        type: {
          summary: 'string[]',
        },
      },
    },
  },
  play(context) {
    const checkboxGroup = context.canvasElement.querySelector(
      'glide-core-checkbox-group',
    );

    if (
      context.name.includes('Error') &&
      checkboxGroup instanceof GlideCoreCheckboxGroup
    ) {
      checkboxGroup.reportValidity();

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
        <glide-core-checkbox-group
          label=${arguments_.label || nothing}
          name=${arguments_.name || nothing}
          ?disabled=${arguments_.disabled}
          ?hide-label=${arguments_['hide-label'] || nothing}
          ?required=${arguments_.required}
        >
          <glide-core-checkbox label="One"></glide-core-checkbox>
          <glide-core-checkbox label="Two"></glide-core-checkbox>
          <glide-core-checkbox label="Three"></glide-core-checkbox>

          ${
            arguments_['slot="description"']
              ? html`<div slot="description">
                  ${unsafeHTML(arguments_['slot="description"'])}
                </div>`
              : nothing
          }
          ${
            arguments_['slot="tooltip"']
              ? html`<div slot="tooltip">
                  ${unsafeHTML(arguments_['slot="tooltip"'])}
                </div>`
              : nothing
          }
        </glide-core-checkbox-group>
      </form>`;
  },
};

export default meta;

export const CheckboxGroup: StoryObj = {
  tags: ['!autodocs'],
};

export const WithError: StoryObj = {
  args: {
    required: true,
  },
};
