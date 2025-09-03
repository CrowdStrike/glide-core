import './icons/storybook.js';
import './icon-button.js';
import './option.js';
import './options.js';
import './options.group.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { withActions } from '@storybook/addon-actions/decorator';
import MenuComponent from './menu.js';
import SelectComponent from './select.js';

const meta: Meta = {
  title: 'Select',
  decorators: [withActions],
  parameters: {
    actions: {
      handles: ['change', 'input', 'toggle'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    'slot="target"': '',
    'addEventListener(event, handler)': '',
    'checkValidity()': '',
    disabled: false,
    loading: false,
    multiple: false,
    name: '',
    offset: 4,
    open: false,
    placement: 'bottom-start',
    'reportValidity()': '',
    required: false,
    'setValidity(flags, message)': '',
    value: [],
    version: '',
    '<glide-core-options>[slot="default"]': '',
    '<glide-core-options>.version': '',
    '<glide-core-options-group>.label': 'A',
    '<glide-core-options-group>.hide-label': false,
    '<glide-core-option>.label': 'One',
    '<glide-core-option>.addEventListener(event, handler)': '',
    '<glide-core-option>.description': '',
    '<glide-core-option>.disabled': false,
    '<glide-core-option>.one.selected': false,
    '<glide-core-option>[slot="content"]': '',
    '<glide-core-option>[slot="icon"]': '',
    '<glide-core-option>[slot="submenu"]': '',
    '<glide-core-option>[slot="submenu"].open': '',
    '<glide-core-option>.value': 'one',
    '<glide-core-option>.version': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'Element' },
      },
      type: { name: 'function', required: true },
    },
    'slot="target"': {
      table: {
        type: {
          summary: 'Element',
          detail: `
// The element to which Select will anchor. Can be any focusable element.
//
// If you want Select to be filterable, put an Input in this slot. Listen for Input's "input"
// event, then add and remove Option(s) from Select's default slot based on Input's value.
`,
        },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input" | "toggle", handler: (event: Event) => void): void',
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
        type: {
          summary: 'boolean',
          detail: `
// This attribute only affects whether Select's \`value\` is included in a form submission. You
// provide and manage Select's target. So it's up to you to also disable your target when you
// disable Select.
`,
        },
      },
    },
    loading: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail: `
// Add this attribute when asynchronously updating Options' default slot. Remove it after the slot
// has been updated.
`,
        },
      },
    },
    multiple: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
        },
      },
    },
    name: {
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
    },
    offset: {
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    open: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
        'top-start',
        'top-end',
      ],
      table: {
        defaultValue: { summary: '"bottom-start"' },
        type: {
          summary:
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start" | "top-end"',
        },
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
    'setValidity(flags, message)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '((flags?: ValidityStateFlags, message?: string) => void): void',
        },
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
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-options>[slot="default"]': {
      name: 'slot="default"',
      control: false,
      table: {
        category: 'Options',
        type: {
          summary: 'Option',
        },
      },
      type: { name: 'function' },
    },
    '<glide-core-options>.version': {
      control: false,
      name: 'version',
      table: {
        category: 'Options',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-options-group>.label': {
      name: 'label',
      table: {
        category: 'Options Group',
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-options-group>.hide-label': {
      name: 'hide-label',
      table: {
        category: 'Options Group',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-options-group>.version': {
      control: false,
      name: 'version',
      table: {
        category: 'Options Group',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-option>.label': {
      name: 'label',
      table: {
        category: 'Option',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-option>.addEventListener(event, handler)': {
      name: 'addEventListener(event, handler)',
      control: false,
      table: {
        category: 'Option',
        type: {
          summary: 'method',
          detail: '(event: "click", handler: (event: Event) => void): void',
        },
      },
    },
    '<glide-core-option>.description': {
      name: 'description',
      table: {
        category: 'Option',
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    '<glide-core-option>.disabled': {
      name: 'disabled',
      table: {
        category: 'Option',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-option>.one.selected': {
      name: 'selected',
      table: {
        category: 'Option',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-option>.two.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-option>.three.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-option>[slot="content"]': {
      name: 'slot="content"',
      control: false,
      table: {
        category: 'Option',
        type: {
          summary: 'Element | Text',
          detail: `
// This is the unhappy path. It's the escape hatch where you can render arbitrary content and lay it out
// however you need to.
//
// If you go this route, \`slot="icon"\` and \`slot="submenu"\` will become unavailable. And the \`label\`
// and \`description\` attributes won't be rendered.
//
// The \`label\` attribute is still required. We'll show it in a tooltip when your content overflows. If you
// need a second line of text in the tooltip, you can provide it via the \`description\` attribute.
`,
        },
      },
      type: { name: 'function' },
    },
    '<glide-core-option>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Option',
        type: {
          summary: 'Element',
        },
      },
      type: { name: 'function' },
    },
    '<glide-core-option>[slot="submenu"]': {
      name: 'slot="submenu"',
      control: false,
      table: {
        category: 'Option',
        type: {
          summary: 'Menu',
        },
      },
      type: { name: 'function' },
    },
    '<glide-core-option>[slot="submenu"].open': {
      table: {
        disable: true,
      },
    },
    '<glide-core-option>.value': {
      name: 'value',
      table: {
        category: 'Option',
        defaultValue: { summary: '""' },
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    '<glide-core-option>.version': {
      control: false,
      name: 'version',
      table: {
        category: 'Option',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
  },
  play(context) {
    const option = context.canvasElement.querySelector('glide-core-option');

    context.canvasElement
      .querySelector('glide-core-select')
      ?.addEventListener('change', (event: Event) => {
        if (option && event.target instanceof SelectComponent) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              value: event.target.value,
            },
          });
        }
      });

    context.canvasElement
      .querySelector('glide-core-select')
      ?.addEventListener('toggle', (event: Event) => {
        const isFromSubMenu =
          event.target instanceof Element &&
          event.target.closest('glide-core-option');

        if (event.target instanceof SelectComponent && !isFromSubMenu) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              open: event.target.open,
              value: event.target.value,
            },
          });
        }
      });

    context.canvasElement
      .querySelector('glide-core-menu')
      ?.addEventListener('toggle', (event: Event) => {
        if (event.target instanceof MenuComponent) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              '<glide-core-option>[slot="submenu"].open': event.target.open,
            },
          });
        }
      });

    context.canvasElement
      .querySelector('form')
      ?.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // We reload the page to give the impression of a submission while keeping
        // the user on the same page.
        window.location.reload();
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    return html`<glide-core-select
      name=${arguments_.name || nothing}
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?disabled=${arguments_.disabled}
      ?loading=${arguments_.loading}
      ?multiple=${arguments_.multiple}
      ?open=${arguments_.open}
      ?required=${arguments_.required}
      .value=${arguments_.value}
    >
      <glide-core-icon-button label="Toggle" slot="target">
        <glide-core-example-icon name="chevron-down"></glide-core-example-icon>
      </glide-core-icon-button>

      <glide-core-options>
        <glide-core-option
          label=${arguments_['<glide-core-option>.label']}
          description=${arguments_['<glide-core-option>.description'] ||
          nothing}
          value=${arguments_['<glide-core-option>.value'] || nothing}
          ?disabled=${arguments_['<glide-core-option>.disabled']}
          ?selected=${arguments_.value.includes(
            arguments_['<glide-core-option>.value'],
          )}
        >
          <glide-core-menu
            slot="submenu"
            ?open=${arguments_['<glide-core-option>[slot="submenu"].open']}
          >
            <glide-core-example-icon
              slot="target"
              name="three-dots"
            ></glide-core-example-icon>

            <glide-core-options>
              <glide-core-option label="Four"></glide-core-option>
              <glide-core-option label="Five"></glide-core-option>
              <glide-core-option label="Six"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option
          label="Two"
          value="two"
          ?selected=${arguments_.value.includes('two')}
        ></glide-core-option>
        <glide-core-option
          label="Three"
          value="three"
          ?selected=${arguments_.value.includes('three')}
        ></glide-core-option>
      </glide-core-options>
    </glide-core-select>`;
  },
};

export default meta;

export const Select: StoryObj = {
  decorators: [
    (story) => html`
      <form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/select.js';
          import '@crowdstrike/glide-core/options.js';
          import '@crowdstrike/glide-core/option.js';
          import '@crowdstrike/glide-core/menu.js';
        </script>

        ${story()}
      </form>
    `,
  ],
};

export const WithGroups: StoryObj = {
  decorators: [
    (story) => html`
      <form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/select.js';
          import '@crowdstrike/glide-core/options.js';
          import '@crowdstrike/glide-core/options.group.js';
          import '@crowdstrike/glide-core/option.js';
          import '@crowdstrike/glide-core/menu.js';
        </script>

        ${story()}
      </form>
    `,
  ],
  render(arguments_) {
    return html`<glide-core-select
      name=${arguments_.name || nothing}
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?disabled=${arguments_.disabled}
      ?loading=${arguments_.loading}
      ?multiple=${arguments_.multiple}
      ?open=${arguments_.open}
      ?required=${arguments_.required}
      .value=${arguments_.value}
    >
      <glide-core-icon-button label="Toggle" slot="target">
        <glide-core-example-icon name="chevron-down"></glide-core-example-icon>
      </glide-core-icon-button>

      <glide-core-options>
        <glide-core-options-group
          label=${arguments_['<glide-core-options-group>.label']}
          ?hide-label=${arguments_['<glide-core-options-group>.hide-label']}
        >
          <glide-core-option
            label=${arguments_['<glide-core-option>.label']}
            description=${arguments_['<glide-core-option>.description'] ||
            nothing}
            value=${arguments_['<glide-core-option>.value'] || nothing}
            ?disabled=${arguments_['<glide-core-option>.disabled']}
            ?selected=${arguments_.value.includes(
              arguments_['<glide-core-option>.value'],
            )}
          >
            <glide-core-menu
              slot="submenu"
              ?open=${arguments_['<glide-core-option>[slot="submenu"].open']}
            >
              <glide-core-example-icon
                slot="target"
                name="three-dots"
              ></glide-core-example-icon>

              <glide-core-options>
                <glide-core-option label="Ten"></glide-core-option>
                <glide-core-option label="Eleven"></glide-core-option>
                <glide-core-option label="Twelve"></glide-core-option>
              </glide-core-options>
            </glide-core-menu>
          </glide-core-option>

          <glide-core-option
            label="Two"
            value="two"
            ?selected=${arguments_.value.includes('two')}
          ></glide-core-option>
          <glide-core-option
            label="Three"
            value="three"
            ?selected=${arguments_.value.includes('three')}
          ></glide-core-option>
        </glide-core-options-group>

        <glide-core-options-group
          label="B"
          ?hide-label=${arguments_['<glide-core-options-group>.hide-label']}
        >
          <glide-core-option
            label="Four"
            value="four"
            ?selected=${arguments_.value.includes('four')}
          ></glide-core-option>
          <glide-core-option
            label="Five"
            value="five"
            ?selected=${arguments_.value.includes('five')}
          ></glide-core-option>
          <glide-core-option
            label="Six"
            value="six"
            ?selected=${arguments_.value.includes('six')}
          ></glide-core-option>
        </glide-core-options-group>

        <glide-core-options-group
          label="C"
          ?hide-label=${arguments_['<glide-core-options-group>.hide-label']}
        >
          <glide-core-option
            label="Seven"
            value="seven"
            ?selected=${arguments_.value.includes('seven')}
          ></glide-core-option>
          <glide-core-option
            label="Eight"
            value="eight"
            ?selected=${arguments_.value.includes('eight')}
          ></glide-core-option>
          <glide-core-option
            label="Nine"
            value="nine"
            ?selected=${arguments_.value.includes('nine')}
          ></glide-core-option>
        </glide-core-options-group>
      </glide-core-options>
    </glide-core-select>`;
  },
};

export const WithIcons: StoryObj = {
  decorators: [
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/select.js';
        import '@crowdstrike/glide-core/options.js';
        import '@crowdstrike/glide-core/option.js';
        import '@crowdstrike/glide-core/menu.js';
      </script>

      ${story()}
    `,
  ],
  render(arguments_) {
    return html`<glide-core-select
      name=${arguments_.name || nothing}
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?disabled=${arguments_.disabled}
      ?loading=${arguments_.loading}
      ?multiple=${arguments_.multiple}
      ?open=${arguments_.open}
      ?required=${arguments_.required}
      .value=${arguments_.value}
    >
      <glide-core-icon-button label="Toggle" slot="target">
        <glide-core-example-icon name="chevron-down"></glide-core-example-icon>
      </glide-core-icon-button>

      <glide-core-options>
        <glide-core-option
          label=${arguments_['<glide-core-option>.label']}
          description=${arguments_['<glide-core-option>.description'] ||
          nothing}
          value=${arguments_['<glide-core-option>.value'] || nothing}
          ?disabled=${arguments_['<glide-core-option>.disabled']}
          ?selected=${arguments_.value.includes(
            arguments_['<glide-core-option>.value'],
          )}
        >
          <glide-core-example-icon
            slot="icon"
            name="edit"
          ></glide-core-example-icon>

          <glide-core-menu
            slot="submenu"
            ?open=${arguments_['<glide-core-option>[slot="submenu"].open']}
          >
            <glide-core-example-icon
              slot="target"
              name="three-dots"
            ></glide-core-example-icon>

            <glide-core-options>
              <glide-core-option label="Four"></glide-core-option>
              <glide-core-option label="Five"></glide-core-option>
              <glide-core-option label="Six"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option
          label="Two"
          value="two"
          ?selected=${arguments_.value.includes('two')}
        >
          <glide-core-example-icon
            slot="icon"
            name="move"
          ></glide-core-example-icon>
        </glide-core-option>

        <glide-core-option
          label="Three"
          value="three"
          ?selected=${arguments_.value.includes('three')}
        >
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-option>
      </glide-core-options>
    </glide-core-select>`;
  },
};
