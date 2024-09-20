import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreCheckbox from './checkbox.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    summary: 'Summary',
    'addEventListener(event, listener)': '',
    checked: false,
    'checkValidity()': '',
    'click()': '',
    disabled: false,
    'focus(options)': '',
    'hide-label': false,
    indeterminate: false,
    name: '',
    orientation: 'horizontal',
    'reportValidity()': '',
    required: false,
    'slot="description"': '',
    'slot="tooltip"': '',
    value: '',
  },
  argTypes: {
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input" | "invalid", listener: (event: Event) => void) => void',
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
    checked: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
    indeterminate: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          detail:
            '// Unlike with `<select>`, `indeterminate` is both a property and an attribute. It behaves like `checked` and remains at its initial value unless changed using `setAttribute`.',
          summary: 'boolean',
        },
      },
    },
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    name: {
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
    summary: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    value: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
  },
  play(context) {
    const checkbox = context.canvasElement.querySelector('glide-core-checkbox');

    if (
      context.name.includes('Error') &&
      checkbox instanceof GlideCoreCheckbox
    ) {
      checkbox.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }

    // eslint-disable-next-line no-underscore-dangle
    let arguments_: Meta['args'] = context.args;

    addons.getChannel().addListener('storyArgsUpdated', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      arguments_ = event.args as typeof context.args;
    });

    context.canvasElement
      .querySelector('glide-core-checkbox')
      ?.addEventListener('change', (event) => {
        if (event.target instanceof GlideCoreCheckbox) {
          addons.getChannel().emit(STORY_ARGS_UPDATED, {
            storyId: context.id,
            args: {
              ...arguments_,
              checked: event.target.checked,
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/checkbox.js';
      </script>

      <form action="/">
        <glide-core-checkbox
          label=${arguments_.label || nothing}
          name=${arguments_.name || nothing}
          orientation=${arguments_.orientation || nothing}
          summary=${arguments_.summary || nothing}
          value=${arguments_.value || nothing}
          ?checked=${arguments_.checked}
          ?disabled=${arguments_.disabled}
          ?hide-label=${arguments_['hide-label'] || nothing}
          ?indeterminate=${arguments_.indeterminate}
          ?required=${arguments_.required}
        >
          <div slot="description">
            ${unsafeHTML(arguments_['slot="description"'])}
          </div>
          ${arguments_['slot="tooltip"']
            ? html`<div slot="tooltip">
                ${unsafeHTML(arguments_['slot="tooltip"'])}
              </div>`
            : ''}
        </glide-core-checkbox>
      </form>`;
  },
};

export default meta;

export const Checkbox: StoryObj = {
  tags: ['!autodocs'],
};

export const WithError: StoryObj = {
  args: {
    required: true,
  },
};
