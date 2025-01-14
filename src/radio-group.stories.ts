import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreRadio from './radio-group.radio.js';
import GlideCoreRadioGroup from './radio-group.js';

const meta: Meta = {
  title: 'Radio Group',
  tags: ['autodocs'],
  decorators: [
    withActions,
    (story) =>
      html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/radio-group.js';
          import '@crowdstrike/glide-core/radio.js';
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
  play: (context) => {
    const radioGroup = context.canvasElement.querySelector(
      'glide-core-radio-group',
    );

    if (
      context.name.includes('Error') &&
      radioGroup instanceof GlideCoreRadioGroup
    ) {
      radioGroup.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }

    radioGroup?.addEventListener('change', (event: Event) => {
      if (event.target instanceof GlideCoreRadio) {
        // The only public property we have to go off with Radio is `label`.
        // But `label` is a moving target because it can be changed via a control.
        // Thus `id`, which is stripped from the code example by `preview.js`.
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            value: radioGroup.value,
            '<glide-core-radio>.one.checked': event.target.id === 'one',
            '<glide-core-radio>.two.checked': event.target.id === 'two',
            '<glide-core-radio>.three.checked': event.target.id === 'three',
          },
        });
      }
    });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-radio-group
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        value=${arguments_.value || nothing}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
      >
        <glide-core-radio
          label=${arguments_['<glide-core-radio>.label'] || nothing}
          id="one"
          value=${arguments_['<glide-core-radio>.value'] || nothing}
          ?checked=${arguments_['<glide-core-radio>.one.checked']}
          ?disabled=${arguments_['<glide-core-radio>.one.disabled']}
        ></glide-core-radio>
        <glide-core-radio
          label="Two"
          id="two"
          value="two"
          ?checked=${arguments_['<glide-core-radio>.two.checked']}
        ></glide-core-radio>
        <glide-core-radio
          label="Three"
          id="three"
          value="three"
          ?checked=${arguments_['<glide-core-radio>.three.checked']}
        ></glide-core-radio>

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
      </glide-core-radio-group>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    'addEventListener(event, handler)': '',
    'checkValidity()': '',
    disabled: false,
    name: '',
    'reportValidity()': '',
    required: false,
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    'slot="description"': '',
    'slot="tooltip"': '',
    value: 'one',
    '<glide-core-radio>.label': 'One',
    '<glide-core-radio>.one.checked': true,
    '<glide-core-radio>.one.disabled': false,
    '<glide-core-radio>.value': 'one',
    '<glide-core-radio>.two.checked': false,
    '<glide-core-radio>.three.checked': false,
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreRadio' },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input" | "invalid, handler: (event: Event)) => void) => void',
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
    name: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
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
    'slot="tooltip"': {
      table: {
        type: { summary: 'Element' },
      },
    },
    value: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
    '<glide-core-radio>.label': {
      name: 'label',
      table: {
        category: 'Radio',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-radio>.one.checked': {
      name: 'checked',
      table: {
        category: 'Radio',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-radio>.one.disabled': {
      name: 'disabled',
      table: {
        category: 'Radio',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-radio>.value': {
      name: 'value',
      table: {
        category: 'Radio',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    '<glide-core-radio>.two.checked': {
      table: {
        disable: true,
      },
    },
    '<glide-core-radio>.three.checked': {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

export const RadioGroup: StoryObj = {
  tags: ['!autodocs'],
};

export const WithError: StoryObj = {
  args: {
    '<glide-core-radio>.one.checked': false,
    required: true,
    value: '',
  },
};
