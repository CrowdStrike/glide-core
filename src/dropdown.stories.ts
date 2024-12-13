import './dropdown.option.js';
import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreDropdown from './dropdown.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Dropdown',
  tags: ['autodocs'],
  decorators: [
    (story) => {
      return html`<form action="/" style="padding-bottom: 1.5rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/dropdown.js';
          import '@crowdstrike/glide-core/dropdown.option.js';
        </script>

        ${story()}
      </form>`;
    },
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
    placeholder: 'Placeholder',
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
    readonly: false,
    'reportValidity()': '',
    required: false,
    'select-all': false,
    'setCustomValidity(message)': '',
    'setValidity(flags, message)': '',
    size: 'large',
    'slot="description"': '',
    'slot="icon:<value>"': '',
    'slot="tooltip"': '',
    value: [],
    variant: '',
    '<glide-core-dropdown-option>.label': 'One',
    '<glide-core-dropdown-option>.addEventListener(event, handler)': false,
    '<glide-core-dropdown-option>.disabled': false,
    '<glide-core-dropdown-option>.editable': false,
    '<glide-core-dropdown-option>.one.selected': false,
    '<glide-core-dropdown-option>.two.selected': false,
    '<glide-core-dropdown-option>.three.selected': false,
    '<glide-core-dropdown-option>[slot="icon"]': '',
    '<glide-core-dropdown-option>.value': 'one',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    placeholder: {
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
    'slot="tooltip"': {
      table: {
        type: { summary: 'Element' },
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
    '<glide-core-dropdown-option>.value': {
      name: 'value',
      table: {
        category: 'Dropdown Option',
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
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

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }

    if (dropdown instanceof GlideCoreDropdown) {
      dropdown.addEventListener('change', () => {
        const options = context.canvasElement.querySelectorAll(
          'glide-core-dropdown-option',
        );

        if (option) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              value: dropdown.value,
              '<glide-core-dropdown-option>.one.selected':
                dropdown.value.includes(options[0].value),
              '<glide-core-dropdown-option>.two.selected':
                dropdown.value.includes(options[1].value),
              '<glide-core-dropdown-option>.three.selected':
                dropdown.value.includes(options[2].value),
            },
          });
        }
      });

      const observer = new MutationObserver(() => {
        if (dropdown instanceof GlideCoreDropdown) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              open: dropdown.open,
            },
          });
        }
      });

      observer.observe(dropdown, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }

    const option = context.canvasElement.querySelector(
      'glide-core-dropdown-option',
    );

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
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, unicorn/explicit-length-check */
    return html`<glide-core-dropdown
      add-button-label=${arguments_['add-button-label'] || nothing}
      label=${arguments_.label || nothing}
      name=${arguments_.name || nothing}
      orientation=${arguments_.orientation}
      placeholder=${arguments_.placeholder || nothing}
      size=${arguments_.size}
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
        value=${arguments_['<glide-core-dropdown-option>.value'] || nothing}
        ?disabled=${arguments_['<glide-core-dropdown-option>.disabled']}
        ?editable=${arguments_['<glide-core-dropdown-option>.editable']}
        ?selected=${arguments_['<glide-core-dropdown-option>.one.selected']}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>

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
      control: false,
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-dropdown-option>.value': {
      control: false,
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-call, unicorn/explicit-length-check */
    return html`<glide-core-dropdown
      add-button-label=${arguments_['add-button-label'] || nothing}
      label=${arguments_.label || nothing}
      name=${arguments_.name || nothing}
      orientation=${arguments_.orientation}
      placeholder=${arguments_.placeholder}
      size=${arguments_.size}
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
      ${arguments_['slot="tooltip"']
        ? html`<div slot="tooltip">
            ${unsafeHTML(arguments_['slot="tooltip"'])}
          </div>`
        : nothing}
    </glide-core-dropdown>`;
  },
};
