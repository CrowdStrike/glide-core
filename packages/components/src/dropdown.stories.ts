import './dropdown.option.js';
import './icons/storybook.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreDropdown from './dropdown.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Dropdown',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dropdown with optional description and tooltip. Participates in forms and validation via `FormData` and various methods.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    'slot="default"': '',
    '<glide-core-dropdown-option>.label': 'One',
    '<glide-core-dropdown-option>.value': 'one',
    '<glide-core-dropdown-option>.selected': false,
    '<glide-core-dropdown-option>[slot="icon"]': '',
    'hide-label': false,
    disabled: false,
    open: false,
    orientation: 'horizontal',
    multiple: false,
    name: 'name',
    required: false,
    'select-all': false,
    size: 'large',
    value: '',
    variant: '',
    'slot="tooltip"': '',
    'slot="description"': 'Description',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreDropdownOption' },
      },
      type: { name: 'function', required: true },
    },
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
    '<glide-core-dropdown-option>.label': {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-dropdown-option>.value': {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    '<glide-core-dropdown-option>.selected': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-dropdown-option>[slot="icon"]': {
      table: {
        type: {
          summary: 'HTMLElement',
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
    'hide-label': {
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
    multiple: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
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
    'select-all': {
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
    variant: {
      control: { type: 'select' },
      options: ['', 'quiet'],
      table: {
        type: { summary: '"quiet"' },
      },
    },
  },
  play(context) {
    const dropdown = context.canvasElement.querySelector('glide-core-dropdown');

    const isErrorStory = [
      'Single Selection (Horizontal With Error)',
      'Single Selection (Vertical With Error)',
    ].includes(context.name);

    if (isErrorStory && dropdown instanceof GlideCoreDropdown) {
      dropdown.reportValidity();

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

    context.canvasElement?.addEventListener('click', () => {
      addons.getChannel().emit(STORY_ARGS_UPDATED, {
        storyId: context.id,
        args: {
          ...arguments_,
          open: context.canvasElement.querySelector('glide-core-dropdown')
            ?.open,
        },
      });
    });
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="display: inline-block; height: 12rem;">
      <glide-core-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        variant=${arguments_.variant || nothing}
        ?disabled=${arguments_.disabled}
        ?hide-label=${arguments_['hide-label'] || nothing}
        ?multiple=${arguments_.multiple}
        ?open=${arguments_.open}
        ?required=${arguments_.required}
        ?select-all=${arguments_['select-all']}
      >
        <glide-core-dropdown-option
          label=${arguments_['<glide-core-dropdown-option>.label']}
          value=${arguments_['<glide-core-dropdown-option>.value']}
          ?selected=${arguments_['<glide-core-dropdown-option>.selected']}
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Two"
          value="two"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Three"
          value="three"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Four"
          value="four"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Five"
          value="five"
        ></glide-core-dropdown-option>

        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </glide-core-dropdown>
    </form>`;
  },
};

export default meta;

export const SingleSelectionHorizontal: StoryObj = {
  name: 'Single Selection (Horizontal)',
};

export const SingleSelectionHorizontalWithIcon: StoryObj = {
  name: 'Single Selection (Horizontal With Icon)',
  args: {
    '<glide-core-dropdown-option>.label': 'Edit',
    '<glide-core-dropdown-option>.value': 'edit',
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="display: inline-block; height: 12rem;">
      <glide-core-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        variant=${arguments_.variant || nothing}
        ?hide-label=${arguments_['hide-label'] || nothing}
        ?multiple=${arguments_.multiple}
        ?open=${arguments_.open}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
        ?select-all=${arguments_['select-all']}
      >
        <glide-core-dropdown-option
          label=${arguments_['<glide-core-dropdown-option>.label']}
          value=${arguments_['<glide-core-dropdown-option>.value']}
          ?selected=${arguments_['<glide-core-dropdown-option>.selected']}
        >
          <glide-core-example-icon
            slot="icon"
            name="pencil"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <glide-core-dropdown-option label="Move" value="move">
          <glide-core-example-icon
            slot="icon"
            name="move"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <glide-core-dropdown-option label="Share" value="share">
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <glide-core-dropdown-option label="Settings" value="settings">
          <glide-core-example-icon
            slot="icon"
            name="settings"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </glide-core-dropdown>
    </form>`;
  },
};

export const SingleSelectionHorizontalWithTooltip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
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
    '<glide-core-dropdown-option>.label': 'Edit',
    '<glide-core-dropdown-option>.value': 'edit',
  },
  name: 'Single Selection (Vertical With Icon)',
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="display: inline-block; height: 12rem;">
      <glide-core-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        variant=${arguments_.variant || nothing}
        ?hide-label=${arguments_['hide-label'] || nothing}
        ?multiple=${arguments_.multiple}
        ?open=${arguments_.open}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
        ?select-all=${arguments_['select-all']}
      >
        <glide-core-dropdown-option
          label=${arguments_['<glide-core-dropdown-option>.label']}
          value=${arguments_['<glide-core-dropdown-option>.value']}
          ?selected=${arguments_['<glide-core-dropdown-option>.selected']}
        >
          <glide-core-example-icon
            slot="icon"
            name="pencil"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <glide-core-dropdown-option label="Move" value="move">
          <glide-core-example-icon
            slot="icon"
            name="move"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <glide-core-dropdown-option label="Share" value="share">
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <glide-core-dropdown-option label="Settings" value="settings">
          <glide-core-example-icon
            slot="icon"
            name="settings"
          ></glide-core-example-icon>
        </glide-core-dropdown-option>

        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </glide-core-dropdown>
    </form>`;
  },
};

export const SingleSelectionVerticalWithTooltip: StoryObj = {
  args: {
    'slot="tooltip"': 'Tooltip',
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

export const SingleSelectionHorizontalWithFiltering: StoryObj = {
  name: 'Single Selection (Horizontal With Filtering)',
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="display: inline-block; height: 12rem;">
      <glide-core-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        variant=${arguments_.variant || nothing}
        ?hide-label=${arguments_['hide-label'] || nothing}
        ?multiple=${arguments_.multiple}
        ?open=${arguments_.open}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
        ?select-all=${arguments_['select-all']}
      >
        <glide-core-dropdown-option
          label=${arguments_['<glide-core-dropdown-option>.label']}
          value=${arguments_['<glide-core-dropdown-option>.value']}
          ?selected=${arguments_['<glide-core-dropdown-option>.selected']}
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Two"
          value="two"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Three"
          value="three"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Four"
          value="four"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Five"
          value="five"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Six"
          value="six"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Seven"
          value="seven"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Eight"
          value="eight"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Nine"
          value="nine"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Ten"
          value="ten"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Eleven"
          value="eleven"
        ></glide-core-dropdown-option>

        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </glide-core-dropdown>
    </form>`;
  },
};

export const MultipleSelectionHorizontal: StoryObj = {
  args: {
    multiple: true,
    'select-all': true,
  },
  name: 'Multiple Selection (Horizontal)',
};

export const MultipleSelectionHorizontalWithFiltering: StoryObj = {
  args: {
    multiple: true,
    'select-all': true,
  },
  name: 'Multiple Selection (Horizontal With Filtering)',
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<form style="display: inline-block; height: 12rem;">
      <glide-core-dropdown
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        orientation=${arguments_.orientation || nothing}
        placeholder=${arguments_.placeholder || nothing}
        size=${arguments_.size || nothing}
        variant=${arguments_.variant || nothing}
        ?hide-label=${arguments_['hide-label'] || nothing}
        ?multiple=${arguments_.multiple}
        ?open=${arguments_.open}
        ?disabled=${arguments_.disabled}
        ?required=${arguments_.required}
        ?select-all=${arguments_['select-all']}
      >
        <glide-core-dropdown-option
          label=${arguments_['<glide-core-dropdown-option>.label']}
          value=${arguments_['<glide-core-dropdown-option>.value']}
          ?selected=${arguments_['<glide-core-dropdown-option>.selected']}
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Two"
          value="two"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Three"
          value="three"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Four"
          value="four"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Five"
          value="five"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Six"
          value="six"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Seven"
          value="seven"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Eight"
          value="eight"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Nine"
          value="nine"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Ten"
          value="ten"
        ></glide-core-dropdown-option>

        <glide-core-dropdown-option
          label="Eleven"
          value="eleven"
        ></glide-core-dropdown-option>

        <div slot="description">${arguments_['slot="description"']}</div>

        ${arguments_['slot="tooltip"']
          ? html`<div slot="tooltip">${arguments_['slot="tooltip"']}</div>`
          : ''}
      </glide-core-dropdown>
    </form>`;
  },
};
