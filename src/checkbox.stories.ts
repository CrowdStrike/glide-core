import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreCheckbox from './checkbox.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox with a label and optional tooltip, summary, and description. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'slot="tooltip"': '',
    'slot="description"': 'Description',
    checked: false,
    'hide-label': false,
    disabled: false,
    indeterminate: false,
    name: '',
    orientation: 'horizontal',
    summary: 'Summary',
    required: false,
    value: '',
  },
  argTypes: {
    'slot="description"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'function' },
    },
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input",  listener: (event: Event) => void) => void\n\n // Dispatched when checked or unchecked.',
        },
      },
      type: { name: 'function' },
    },
    'checkValidity()': {
      table: {
        type: {
          summary: 'method',
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity',
        },
      },
      type: { name: 'function' },
    },
    'reportValidity()': {
      table: {
        type: {
          summary: 'method',
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity',
        },
      },
      type: { name: 'function' },
    },
    'hide-label': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    checked: {
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
    indeterminate: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: {
          detail:
            'Unlike with `<select>`, `indeterminate` is both a property and an attribute. It behaves like `checked` and remains at its initial value unless changed using `setAttribute`.',
          summary: 'boolean',
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
    name: {
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
    required: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    summary: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  play(context) {
    const checkbox = context.canvasElement.querySelector('glide-core-checkbox');

    const isErrorStory = [
      'Horizontal (With Error)',
      'Vertical (With Error)',
    ].includes(context.name);

    if (isErrorStory && checkbox instanceof GlideCoreCheckbox) {
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
    return html`<form style="padding: 1.5rem;">
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
        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<span slot="tooltip">${arguments_['slot="tooltip"']}</span>`
          : ''}
      </glide-core-checkbox>
    </form>`;
  },
};

export default meta;

export const Horizontal: StoryObj = {};

export const HorizontalWithTooltip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
  },
  name: 'Horizontal (With Tooltip)',
};

export const HorizontalWithError: StoryObj = {
  args: {
    required: true,
  },
  name: 'Horizontal (With Error)',
};

export const Vertical: StoryObj = {
  args: {
    orientation: 'vertical',
  },
};

export const VerticalWithToolip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
    orientation: 'vertical',
  },
  name: 'Vertical (With Tooltip)',
};

export const VerticalWithError: StoryObj = {
  args: {
    orientation: 'vertical',
    required: true,
  },
  name: 'Vertical (With Error)',
};
