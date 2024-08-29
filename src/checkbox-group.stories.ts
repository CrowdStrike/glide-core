import './checkbox.js';
import { html, nothing } from 'lit';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Checkbox Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox group with a label and optional description and tooltip. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    'addEventListener(event, listener)': '',
    'checkValidity()': '',
    disabled: false,
    'hide-label': false,
    name: '',
    'reportValidity()': '',
    required: false,
    'slot="description"': html`
      <span>Description with</span>
      <a
        href="#"
        style="text-decoration:none;color:var(--glide-core-text-link);"
        >link</a
      >
    `,
    'slot="tooltip"': '',
    value: '',
  },
  argTypes: {
    'slot="default"': {
      control: false,
      table: {
        type: { summary: 'GlideCoreCheckbox' },
      },
      type: { name: 'function', required: true },
    },
    'slot="description"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
    },
    'slot="tooltip"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'HTMLKBDElement | string' },
      },
    },
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
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity',
        },
      },
    },
    'reportValidity()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '() => boolean \n\n// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity',
        },
      },
    },
    'hide-label': {
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
    required: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    value: {
      control: false,
      table: {
        defaultValue: { summary: '[]' },
        type: {
          summary: 'readonly string[]',
        },
      },
    },
  },
  play(context) {
    const checkboxGroup = context.canvasElement.querySelector(
      'glide-core-checkbox-group',
    );

    const isErrorStory = [
      'Horizontal (With Error)',
      'Vertical (With Error)',
    ].includes(context.name);

    if (isErrorStory && checkboxGroup instanceof GlideCoreCheckboxGroup) {
      checkboxGroup.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }
  },
  render(arguments_) {
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/checkbox-group.js';
        import '@crowdstrike/glide-core/checkbox.js';
      </script>

      <form style="padding: 1.5rem;">
        <glide-core-checkbox-group
          label=${arguments_.label || nothing}
          name=${arguments_.name || nothing}
          ?disabled=${arguments_.disabled}
          ?hide-label=${arguments_['hide-label'] || nothing}
          ?required=${arguments_.required}
        >
          <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
          <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
          <glide-core-checkbox
            label="Three"
            value="three"
          ></glide-core-checkbox>

          <div slot="description">${arguments_['slot="description"']}</div>
          ${arguments_['slot="tooltip"']
            ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
            : ''}
        </glide-core-checkbox-group>
      </form>`;
  },
};

export default meta;

export const Vertical: StoryObj = {};

export const VerticalWithTooltip: StoryObj = {
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
