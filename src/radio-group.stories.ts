import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreRadioGroupRadio from './radio-group.radio.js';
import GlideCoreRadioGroup from './radio-group.js';

const meta: Meta = {
  title: 'Radio Group',
  decorators: [
    withActions,
    (story) =>
      html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/radio-group.js';
          import '@crowdstrike/glide-core/radio-group.radio.js';
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
      if (event.target instanceof GlideCoreRadioGroupRadio) {
        // The only public property we have to go off with Radio is `label`.
        // But `label` is a moving target because it can be changed via a control.
        // Thus `id`, which is stripped from the code example by `preview.js`.
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            value: radioGroup.value,
            '<glide-core-radio-group-radio>.one.checked':
              event.target.id === 'one',
            '<glide-core-radio-group-radio>.two.checked':
              event.target.id === 'two',
            '<glide-core-radio-group-radio>.three.checked':
              event.target.id === 'three',
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
        orientation=${arguments_.orientation}
        tooltip=${arguments_.tooltip || nothing}
        value=${arguments_.value || nothing}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
      >
        <glide-core-radio-group-radio
          label=${arguments_['<glide-core-radio-group-radio>.label'] || nothing}
          id="one"
          value=${arguments_['<glide-core-radio-group-radio>.value'] || nothing}
          ?checked=${arguments_['<glide-core-radio-group-radio>.one.checked']}
          ?disabled=${arguments_['<glide-core-radio-group-radio>.one.disabled']}
        ></glide-core-radio-group-radio>

        <glide-core-radio-group-radio
          label="Two"
          id="two"
          value="two"
          ?checked=${arguments_['<glide-core-radio-group-radio>.two.checked']}
        ></glide-core-radio-group-radio>

        <glide-core-radio-group-radio
          label="Three"
          id="three"
          value="three"
          ?checked=${arguments_['<glide-core-radio-group-radio>.three.checked']}
        ></glide-core-radio-group-radio>

        ${arguments_['slot="description"']
          ? html`<div slot="description">
              ${unsafeHTML(arguments_['slot="description"'])}
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
    orientation: 'horizontal',
    'reportValidity()': '',
    required: false,
    'resetValidityFeedback()': '',
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    'slot="description"': '',
    tooltip: '',
    value: 'one',
    version: '',
    '<glide-core-radio-group-radio>.label': 'One',
    '<glide-core-radio-group-radio>.one.checked': true,
    '<glide-core-radio-group-radio>.one.disabled': false,
    '<glide-core-radio-group-radio>.value': 'one',
    '<glide-core-radio-group-radio>.version': '',
    '<glide-core-radio-group-radio>.two.checked': false,
    '<glide-core-radio-group-radio>.three.checked': false,
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
    orientation: {
      control: false,
      defaultValue: 'horizontal',
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: '"horizontal"' },
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
          summary: import.meta.env.VITE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-radio-group-radio>.label': {
      name: 'label',
      table: {
        category: 'Radio Group Radio',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-radio-group-radio>.one.checked': {
      name: 'checked',
      table: {
        category: 'Radio Group Radio',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-radio-group-radio>.one.disabled': {
      name: 'disabled',
      table: {
        category: 'Radio Group Radio',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-radio-group-radio>.value': {
      name: 'value',
      table: {
        category: 'Radio Group Radio',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    '<glide-core-radio-group-radio>.version': {
      name: 'version',
      control: false,
      table: {
        category: 'Radio Group Radio',
        defaultValue: {
          summary: import.meta.env.VITE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-radio-group-radio>.two.checked': {
      table: {
        disable: true,
      },
    },
    '<glide-core-radio-group-radio>.three.checked': {
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
    '<glide-core-radio-group-radio>.one.checked': false,
    required: true,
    value: '',
  },
};
