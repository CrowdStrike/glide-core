import './dropdown.option.js';
import './icons/storybook.js';
import { html, nothing } from 'lit-html';
import CsDropdown from './dropdown.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dropdown with an optional tooltip. \n\n Participates in forms and validation via `FormData` and various methods. Always call `setCustomValidity()` after render to set a validation message.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    disabled: false,
    label: 'Label',
    open: false,
    orientation: 'horizontal',
    name: 'name',
    placeholder: 'Placeholder',
    required: false,
    size: 'large',
    value: '',
  },
  argTypes: {
    ['slot="default"']: {
      table: {
        type: { summary: 'CsDropdownOption' },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input", listener: (event: CustomEvent<string[]>)) => void) => void \n\n// `event.detail` is an array of selected option values.',
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
    'setCustomValidity(message)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(message: string) => void \n\n// https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity',
        },
      },
      type: { name: 'function' },
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
    open: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
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
    placeholder: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    required: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'],
      table: {
        defaultValue: { summary: '"large"' },
        type: { summary: '"small" | "large"' },
      },
    },
    value: {
      table: {
        defaultValue: { summary: '[]' },
        type: {
          summary: 'readonly string[]',
        },
      },
      type: { name: 'function' },
    },
  },
  play(context) {
    const dropdown = context.canvasElement.querySelector('cs-dropdown');

    const isErrorStory = [
      'Single Selection (Horizontal With Error)',
      'Single Selection (Vertical With Error)',
    ].includes(context.name);

    if (isErrorStory && dropdown instanceof CsDropdown) {
      dropdown.setCustomValidity('Validation message');
      dropdown.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;
    }
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="height: 11rem;">
      <cs-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
      >
        <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
        <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
        <cs-dropdown-option label="Three" value="three"></cs-dropdown-option>
        <cs-dropdown-option label="Four" value="four"></cs-dropdown-option>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </cs-dropdown>
    </form>`;
  },
};

export default meta;

export const SingleSelectionHorizontal: StoryObj = {};

export const SingleSelectionHorizontalWithIcon: StoryObj = {
  name: 'Single Selection (Horizontal With Icon)',
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="height: 11rem;">
      <cs-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
      >
        <cs-dropdown-option label="Edit" value="edit">
          <cs-example-icon slot="icon" name="pencil"></cs-example-icon>
        </cs-dropdown-option>

        <cs-dropdown-option label="Move" value="move">
          <cs-example-icon slot="icon" name="move"></cs-example-icon>
        </cs-dropdown-option>

        <cs-dropdown-option label="Share" value="share">
          <cs-example-icon slot="icon" name="share"></cs-example-icon>
        </cs-dropdown-option>

        <cs-dropdown-option label="Settings" value="settings">
          <cs-example-icon slot="icon" name="settings"></cs-example-icon>
        </cs-dropdown-option>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </cs-dropdown>
    </form>`;
  },
};

export const SingleSelectionHorizontalWithTooltip: StoryObj = {
  args: {
    ['slot="tooltip"']: 'Tooltip',
  },
  name: 'Single Selection (Horizontal With Tooltip)',
};

export const SingleSelectionHorizontalWithError: StoryObj = {
  args: {
    required: true,
  },
  name: 'Single Selection (Horizontal With Error)',
};

export const SingleSelectionVerticalWithIcon: StoryObj = {
  args: {
    orientation: 'vertical',
  },
  name: 'Single Selection (Vertical With Icon)',
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="height: 11rem;">
      <cs-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
      >
        <cs-dropdown-option label="Edit" value="edit">
          <cs-dropdown-option label="Edit" value="edit">
            <cs-example-icon slot="icon" name="pencil"></cs-example-icon>
          </cs-dropdown-option>

          <cs-dropdown-option label="Move" value="move">
            <cs-example-icon slot="icon" name="move"></cs-example-icon>
          </cs-dropdown-option>

          <cs-dropdown-option label="Share" value="share">
            <cs-example-icon slot="icon" name="share"></cs-example-icon>
          </cs-dropdown-option>

          <cs-dropdown-option label="Settings" value="settings">
            <cs-example-icon slot="icon" name="settings"></cs-example-icon>
          </cs-dropdown-option>
        </cs-dropdown-option>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </cs-dropdown>
    </form>`;
  },
};

export const SingleSelectionVerticalWithTooltip: StoryObj = {
  args: {
    ['slot="tooltip"']: 'Tooltip',
    orientation: 'vertical',
  },
  name: 'Single Selection (Vertical With Tooltip)',
};

export const SingleSelectionVerticalWithError: StoryObj = {
  args: {
    orientation: 'vertical',
    required: true,
  },
  name: 'Single Selection (Vertical With Error)',
};
