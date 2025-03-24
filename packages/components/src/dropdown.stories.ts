import './dropdown.option.js';
import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreDropdown from './dropdown.js';

const meta: Meta = {
  title: 'Dropdown',
  decorators: [
    withActions,
    (story) => {
      return html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/dropdown.js';
          import '@crowdstrike/glide-core/dropdown.option.js';
        </script>

        ${story()}
      </form>`;
    },
  ],
  parameters: {
    actions: {
      handles: ['change', 'input', 'invalid', 'toggle'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    'add-button-label': '',
    'addEventListener(event, handler)': '',
    'checkValidity()': '',
    disabled: false,
    filterable: false,
    'filter(query, options)': '',
    'hide-label': false,
    multiple: false,
    name: '',
    open: false,
    orientation: 'horizontal',
    placeholder: '',
    readonly: false,
    'reportValidity()': '',
    required: false,
    'resetValidityFeedback()': '',
    'select-all': false,
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    size: 'large',
    'slot="description"': '',
    'slot="icon:<value>"': '',
    tooltip: '',
    value: [],
    variant: '',
    version: '',
    '<glide-core-dropdown-option>.label': 'One',
    '<glide-core-dropdown-option>.addEventListener(event, handler)': false,
    '<glide-core-dropdown-option>.disabled': false,
    '<glide-core-dropdown-option>.editable': false,
    '<glide-core-dropdown-option>.one.selected': false,
    '<glide-core-dropdown-option>.two.selected': false,
    '<glide-core-dropdown-option>.three.selected': false,
    '<glide-core-dropdown-option>[slot="icon"]': '',
    '<glide-core-dropdown-option>.one.value': 'one',
    '<glide-core-dropdown-option>.two.value': 'two',
    '<glide-core-dropdown-option>.three.value': 'three',
    '<glide-core-dropdown-option>.one.version': '',
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
        type: { summary: 'GlideCoreDropdownOption' },
      },
      type: { name: 'function', required: true },
    },
    'add-button-label': {
      table: {
        type: { summary: 'string' },
      },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "add" | "change" | "input" | "invalid" | "toggle", handler: (event: Event) => void): void',
        },
      },
    },
    'checkValidity()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(): void',
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
    'filter(query, options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: `
async (query: string): Promise<GlideCoreDropdownOption[]> {
  const options = [...this.querySelectorAll('glide-core-dropdown-option)];

  return options.filter(({ label }) => {
    return label.toLowerCase().includes(query.toLowerCase().trim());
  });
}

// When overriding this method, return the options you want visible. The rest will be hidden.
//
// If you fetch when filtering, this is the place to do it. Just make sure you've updated
// Dropdown's default slot with the new set of options before you query-select and filter them.
`,
        },
      },
    },
    'hide-label': {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    multiple: {
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
    'select-all': {
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
    'slot="icon:<value>"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
          detail: `
// "<value>" should be equal to the \`value\` of each option. Dropdown will
// show the correct icon or icons based on which options are selected.

<glide-core-example-icon slot="icon:edit" name="edit"></glide-core-example-icon>
<glide-core-example-icon slot="icon:move" name="move"></glide-core-example-icon>
<glide-core-example-icon slot="icon:share" name="share"></glide-core-example-icon>
`,
        },
      },
    },
    tooltip: {
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'small'],
      table: {
        defaultValue: { summary: '"large"' },
        type: { summary: '"large" | "small"' },
      },
    },
    value: {
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
        type: { summary: '"quiet"', detail: '// Unsupported with `multiple`' },
      },
    },
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-dropdown-option>.label': {
      name: 'label',
      table: {
        category: 'Dropdown Option',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-dropdown-option>.addEventListener(event, handler)': {
      name: 'addEventListener(event, handler)',
      control: false,
      table: {
        category: 'Dropdown Option',
        type: {
          summary: 'method',
          detail: '(event: "edit", handler: (event: Event)) => void) => void',
        },
      },
    },
    '<glide-core-dropdown-option>.disabled': {
      name: 'disabled',
      table: {
        category: 'Dropdown Option',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-dropdown-option>.editable': {
      name: 'editable',
      table: {
        category: 'Dropdown Option',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-dropdown-option>.one.selected': {
      name: 'selected',
      table: {
        category: 'Dropdown Option',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-dropdown-option>.two.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown-option>.three.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown-option>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Dropdown Option',
        type: {
          summary: 'Element',
        },
      },
    },
    '<glide-core-dropdown-option>.one.value': {
      name: 'value',
      table: {
        category: 'Dropdown Option',
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    '<glide-core-dropdown-option>.two.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown-option>.three.value': {
      table: {
        disable: true,
      },
    },
    '<glide-core-dropdown-option>.one.version': {
      control: false,
      name: 'version',
      table: {
        category: 'Dropdown Option',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
  },
  play(context) {
    const dropdown = context.canvasElement.querySelector('glide-core-dropdown');

    const option = context.canvasElement.querySelector(
      'glide-core-dropdown-option',
    );

    if (
      context.name.includes('Error') &&
      dropdown instanceof GlideCoreDropdown
    ) {
      dropdown.reportValidity();

      // `reportValidity` scrolls the element into view, which means the "autodocs"
      // story upon load will be scrolled to the first error story. No good.
      document.documentElement.scrollTop = 0;

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }

    if (dropdown instanceof GlideCoreDropdown) {
      dropdown.addEventListener('change', () => {
        if (option) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              value: dropdown.value,
            },
          });
        }
      });

      const observer = new MutationObserver(() => {
        if (dropdown instanceof GlideCoreDropdown) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              // Storybook reverts arguments back to their initial values when the
              // above event is emitted unless the argument's value was changed via
              // a control. And, for whatever reason, only changes to Lit property
              // expressions cause a re-render and thus a reversion.
              //
              // Dropdown throws when `value` contains more than one value and `multiple`
              // isn't `true`. So `multiple` is preserved for visual tests and for when
              // users change its value via DevTools instead of a control.
              multiple: dropdown.multiple,
              open: dropdown.open,
              value: dropdown.value,
            },
          });
        }
      });

      observer.observe(dropdown, {
        attributes: true,
        attributeFilter: ['open', 'value'],
      });
    }

    if (option) {
      const observer = new MutationObserver(() => {
        if (dropdown instanceof GlideCoreDropdown) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              value: dropdown.value,
            },
          });
        }
      });

      observer.observe(option, {
        attributes: true,
        attributeFilter: ['value'],
      });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/prefer-nullish-coalescing */
    return html`<glide-core-dropdown
      add-button-label=${arguments_['add-button-label'] || nothing}
      label=${arguments_.label || nothing}
      name=${arguments_.name || nothing}
      orientation=${arguments_.orientation}
      placeholder=${arguments_.placeholder || nothing}
      size=${arguments_.size}
      tooltip=${arguments_.tooltip || nothing}
      variant=${arguments_.variant || nothing}
      ?disabled=${arguments_.disabled}
      ?filterable=${arguments_.filterable}
      ?hide-label=${arguments_['hide-label']}
      ?multiple=${arguments_.multiple}
      ?open=${arguments_.open}
      ?readonly=${arguments_.readonly}
      ?required=${arguments_.required}
      ?select-all=${arguments_['select-all']}
      .value=${arguments_.value}
    >
      <glide-core-dropdown-option
        label=${arguments_['<glide-core-dropdown-option>.label'] || nothing}
        value=${arguments_['<glide-core-dropdown-option>.one.value'] || nothing}
        ?disabled=${arguments_['<glide-core-dropdown-option>.disabled']}
        ?editable=${arguments_['<glide-core-dropdown-option>.editable']}
        ?selected=${arguments_.value.includes(
          arguments_['<glide-core-dropdown-option>.one.value'],
        )}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        ?selected=${arguments_.value.includes(
          arguments_['<glide-core-dropdown-option>.two.value'],
        )}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        ?selected=${arguments_.value.includes(
          arguments_['<glide-core-dropdown-option>.three.value'],
        )}
      ></glide-core-dropdown-option>

      ${arguments_['slot="description"']
        ? html`<div slot="description">
            ${unsafeHTML(arguments_['slot="description"'])}
          </div>`
        : nothing}
    </glide-core-dropdown>`;
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
  argTypes: {
    '<glide-core-dropdown-option>.label': {
      name: 'label',
      control: false,
      table: {
        category: 'Dropdown Option',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-dropdown-option>.one.value': {
      name: 'value',
      control: false,
      table: {
        category: 'Dropdown Option',
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`<glide-core-dropdown
      add-button-label=${arguments_['add-button-label'] || nothing}
      label=${arguments_.label || nothing}
      name=${arguments_.name || nothing}
      orientation=${arguments_.orientation}
      placeholder=${arguments_.placeholder}
      size=${arguments_.size}
      tooltip=${arguments_.tooltip || nothing}
      variant=${arguments_.variant || nothing}
      ?disabled=${arguments_.disabled}
      ?filterable=${arguments_.filterable}
      ?hide-label=${arguments_['hide-label']}
      ?multiple=${arguments_.multiple}
      ?open=${arguments_.open}
      ?readonly=${arguments_.readonly}
      ?required=${arguments_.required}
      ?select-all=${arguments_['select-all']}
      .value=${arguments_.value}
    >
      <glide-core-example-icon
        slot="icon:edit"
        name="edit"
      ></glide-core-example-icon>

      <glide-core-example-icon
        slot="icon:move"
        name="move"
      ></glide-core-example-icon>

      <glide-core-example-icon
        slot="icon:share"
        name="share"
      ></glide-core-example-icon>

      <glide-core-dropdown-option
        label="Edit"
        value="edit"
        ?disabled=${arguments_['<glide-core-dropdown-option>.disabled']}
        ?editable=${arguments_['<glide-core-dropdown-option>.editable']}
        ?selected=${arguments_['<glide-core-dropdown-option>.one.selected']}
      >
        <glide-core-example-icon
          slot="icon"
          name="edit"
        ></glide-core-example-icon>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Move"
        value="move"
        ?selected=${arguments_['<glide-core-dropdown-option>.two.selected']}
      >
        <glide-core-example-icon
          slot="icon"
          name="move"
        ></glide-core-example-icon>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Share"
        value="share"
        ?selected=${arguments_['<glide-core-dropdown-option>.three.selected']}
      >
        <glide-core-example-icon
          slot="icon"
          name="share"
        ></glide-core-example-icon>
      </glide-core-dropdown-option>

      ${arguments_['slot="description"']
        ? html`<div slot="description">
            ${unsafeHTML(arguments_['slot="description"'])}
          </div>`
        : nothing}
    </glide-core-dropdown>`;
  },
};
