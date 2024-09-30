import './dropdown.option.js';
import './icons/storybook.js';
import { FORCE_RE_RENDER, STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { signal, watch } from '@lit-labs/preact-signals';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import GlideCoreDropdown from './dropdown.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const icon = signal<'edit' | 'move' | 'share' | null>(null);

const meta: Meta = {
  title: 'Dropdown',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<form action="/" style="display: block; width: max-content;">
        <script type="ignore">
          import '@crowdstrike/glide-core/dropdown.js';
          import '@crowdstrike/glide-core/dropdown.option.js';
        </script>

        ${story()}
      </form>`,
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
    'slot="description"': '',
    'slot="icon"': '',
    'slot="tooltip"': '',
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
    'slot="icon"': {
      table: {
        type: {
          summary: 'Element',
          detail: `
// An icon for the selected option. Only applicable when the \`multiple\` attribute 
// isn't present. 
// 
// Listen for "change" on Dropdown, then conditionally render the appropriate icon 
// based on Dropdown's \`value\`, where \`this.selectedValue\` is a property of your 
// component decorated with \`@state()\`. 
// 
// Your implementation will vary depending on your framework and how you manage icons.

\${choose(this.selectedValue,
  [
    ['edit', () => html\`<glide-core-example-icon slot="icon" name="edit"></glide-core-example-icon>>\`],
    ['move', () => html\`<glide-core-example-icon slot="icon" name="move"></glide-core-example-icon>\`],
    ['share', () => html\`<glide-core-example-icon slot="icon" name="share"></glide-core-example-icon>\`],
  ],
  () => nothing,
)}
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
        defaultValue: { summary: '""' },
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

      if (document.activeElement instanceof HTMLElement) {
        // Calling `reportValidity()` focuses the element. Focus is expected to be
        // on `document.body` on page load.
        document.activeElement.blur();
      }
    }

    // eslint-disable-next-line no-underscore-dangle
    let arguments_: Meta['args'] = context.args;

    addons.getChannel().addListener(STORY_ARGS_UPDATED, (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      arguments_ = event.args as typeof context.args;
    });

    const observer = new MutationObserver(() => {
      addons.getChannel().emit(STORY_ARGS_UPDATED, {
        storyId: context.id,
        args: {
          ...arguments_,
          open: dropdown?.open,
        },
      });
    });

    if (dropdown) {
      observer.observe(dropdown, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }

    dropdown?.addEventListener('change', (event) => {
      if (
        context.name.includes('Icon') &&
        event.target instanceof GlideCoreDropdown
      ) {
        // Casted both because `when` doesn't narrow and `event.target.value` is untyped.
        icon.value = event.target.value.at(0) as 'edit' | 'move' | 'share';

        // Forcing a re-render seems to be the only way to get the code example to
        // update after the change above.
        addons.getChannel().emit(FORCE_RE_RENDER);
      }
    });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, unicorn/explicit-length-check */
    return html`<glide-core-dropdown
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
    >
      <glide-core-dropdown-option
        label=${arguments_['<glide-core-dropdown-option>.label'] || nothing}
        value=${arguments_['<glide-core-dropdown-option>.value'] || nothing}
        ?selected=${arguments_['<glide-core-dropdown-option>.selected']}
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>

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
    >
      ${
        // @ts-expect-error - `values` isn't included in the type definition of `watch`.
        // But it's all we have to go off to conditionally render the icon.
        when(watch(icon).values.at(0).value, () => {
          return html`<glide-core-example-icon
            slot="icon"
            name=${watch(icon)}
          ></glide-core-example-icon>`;
        })
      }

      <glide-core-example-icon
        slot="icon"
        name=${watch(icon)}
      ></glide-core-example-icon>

      <glide-core-dropdown-option
        label="Edit"
        value="edit"
        ?selected=${arguments_['<glide-core-dropdown-option>.selected']}
      >
        <glide-core-example-icon
          slot="icon"
          name="edit"
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
