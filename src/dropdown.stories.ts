import './dropdown.option.js';
import './icons/storybook.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreDropdown from './dropdown.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Dropdown',
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
    placeholder: 'Placeholder',
    'slot="default"': '',
    '<glide-core-dropdown-option>.label': 'One',
    'addEventListener(event, listener)': '',
    'checkValidity()': '',
    'click()': '',
    disabled: false,
    'focus(options)': '',
    filterable: false,
    'hide-label': false,
    multiple: false,
    name: '',
    open: false,
    orientation: 'horizontal',
    readonly: false,
    'reportValidity()': '',
    required: false,
    'select-all': false,
    size: 'large',
    'slot="tooltip"': '',
    'slot="description"': '',
    value: '',
    variant: '',
    '<glide-core-dropdown-option>.value': 'one',
    '<glide-core-dropdown-option>.selected': false,
    '<glide-core-dropdown-option>[slot="icon"]': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreDropdownOption' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-dropdown-option>.label': {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input" | "invalid", listener: (event: Event)) => void) => void',
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
    filterable: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail:
            '// Dropdown will be filterable regardless of this attribute when there are more than 10 options',
        },
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
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    multiple: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    name: {
      table: {
        type: { summary: 'string' },
      },
    },
    open: {
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
    placeholder: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
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
    'select-all': {
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
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'],
      table: {
        defaultValue: { summary: '"large"' },
        type: { summary: '"small" | "large"' },
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
    variant: {
      control: { type: 'select' },
      options: ['', 'quiet'],
      table: {
        type: { summary: '"quiet"' },
      },
    },
    '<glide-core-dropdown-option>.value': {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    '<glide-core-dropdown-option>.selected': {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-dropdown-option>[slot="icon"]': {
      control: false,
      table: {
        type: {
          summary: 'Element',
          detail: '// Unsupported with `multiple`',
        },
      },
    },
  },
  play(context) {
    const dropdown = context.canvasElement.querySelector('glide-core-dropdown');

    if (
      context.name.includes('Error') &&
      dropdown instanceof GlideCoreDropdown
    ) {
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

    const observer = new MutationObserver((entries) => {
      const hasOpenChanged = entries.some(
        ({ attributeName }) => attributeName === 'open',
      );

      if (hasOpenChanged) {
        addons.getChannel().emit(STORY_ARGS_UPDATED, {
          storyId: context.id,
          args: {
            ...arguments_,
            open: context.canvasElement.querySelector<GlideCoreDropdown>(
              'glide-core-dropdown',
            )?.open,
          },
        });
      }
    });

    if (dropdown) {
      observer.observe(dropdown, { attributes: true });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, unicorn/explicit-length-check */
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/dropdown.js';
        import '@crowdstrike/glide-core/dropdown.option.js';
      </script>

      <form action="/" style="display: block; width: max-content;">
        <glide-core-dropdown
          label=${arguments_.label || nothing}
          name=${arguments_.name || nothing}
          orientation=${arguments_.orientation || nothing}
          placeholder=${arguments_.placeholder || nothing}
          size=${arguments_.size || nothing}
          variant=${arguments_.variant || nothing}
          ?disabled=${arguments_.disabled}
          ?filterable=${arguments_.filterable}
          ?hide-label=${arguments_['hide-label'] || nothing}
          ?multiple=${arguments_.multiple}
          ?open=${arguments_.open}
          ?readonly=${arguments_.readonly}
          ?required=${arguments_.required}
          ?select-all=${arguments_['select-all']}
        >
          <glide-core-dropdown-option
            label=${arguments_['<glide-core-dropdown-option>.label'] || nothing}
            value=${arguments_['<glide-core-dropdown-option>.value'] || nothing}
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

          <div slot="description">
            ${unsafeHTML(arguments_['slot="description"'])}
          </div>
          ${arguments_['slot="tooltip"']
            ? html`<div slot="tooltip">
                ${unsafeHTML(arguments_['slot="tooltip"'])}
              </div>`
            : ''}
        </glide-core-dropdown>
      </form>`;
  },
};

export default meta;

export const Dropdown: StoryObj = {
  tags: ['!autodocs'],
};

export const WithError: StoryObj = {
  args: {
    required: true,
  },
};

export const WithIcons: StoryObj = {
  args: {
    '<glide-core-dropdown-option>.label': 'Edit',
    '<glide-core-dropdown-option>.value': 'edit',
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/dropdown.js';
        import '@crowdstrike/glide-core/dropdown.option.js';
      </script>

      <form action="/" style="display: block; width: max-content;">
        <glide-core-dropdown
          label=${arguments_.label}
          name=${arguments_.name}
          orientation=${arguments_.orientation}
          placeholder=${arguments_.placeholder}
          size=${arguments_.size}
          variant=${arguments_.variant}
          ?disabled=${arguments_.disabled}
          ?filterable=${arguments_.filterable}
          ?hide-label=${arguments_['hide-label'] || nothing}
          ?multiple=${arguments_.multiple}
          ?open=${arguments_.open}
          ?readonly=${arguments_.readonly}
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

          <glide-core-dropdown-option label="Move">
            <glide-core-example-icon
              slot="icon"
              name="move"
            ></glide-core-example-icon>
          </glide-core-dropdown-option>

          <glide-core-dropdown-option label="Share">
            <glide-core-example-icon
              slot="icon"
              name="share"
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
