import './button.js';
import './icons/storybook.js';
import './options.js';
import './options.group.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { withActions } from '@storybook/addon-actions/decorator';
import Option from './option.js';
import MenuComponent from './menu.js';

const meta: Meta = {
  title: 'Menu',
  decorators: [withActions],
  parameters: {
    actions: {
      // "glide-core-option" is selected so "click" events from Menu's target aren't
      // picked up, muddying the Actions tab.
      handles: ['click glide-core-option', 'toggle'],
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
    loading: false,
    offset: 4,
    open: false,
    placement: 'bottom-start',
    version: '',
    '<glide-core-options>[slot="default"]': '',
    '<glide-core-options>.version': '',
    '<glide-core-options-group>.label': 'A',
    '<glide-core-options-group>.hide-label': false,
    '<glide-core-option>.label': 'One',
    '<glide-core-option>.addEventListener(event, handler)': '',
    '<glide-core-option>.description': '',
    '<glide-core-option>.disabled': false,
    '<glide-core-option>.href': '/',
    '<glide-core-option>[slot="content"]': '',
    '<glide-core-option>[slot="icon"]': '',
    '<glide-core-option>[slot="submenu"]': '',
    '<glide-core-option>.value': '',
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
// The element to which Menu will anchor. Can be any focusable element unless it's the target
// of a sub-Menu, in which case the element shouldn't be focusable.
//
// If you want Menu to be filterable, put an Input in this slot. Listen for Input's "input"
// event, then add and remove Option(s) from Menu's default slot based on Input's value.
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
          detail: '(event: "toggle", handler: (event: Event) => void): void',
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
    '<glide-core-option>.href': {
      name: 'href',
      table: {
        category: 'Option',
        type: { summary: 'string' },
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
    '<glide-core-option>.value': {
      name: 'value',
      table: {
        category: 'Option',
        defaultValue: {
          summary: '""',
        },
        type: {
          summary: 'string',
          detail:
            '// Set `value` when you need something other than `label` to identify which Option was clicked',
        },
      },
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
    context.canvasElement
      .querySelector('glide-core-menu')
      ?.addEventListener('toggle', (event: Event) => {
        const isSubmenu =
          event.target instanceof Element &&
          event.target.closest('glide-core-option');

        if (event.target instanceof MenuComponent && !isSubmenu) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              open: event.target.open,
            },
          });
        }
      });

    context.canvasElement
      .querySelector('glide-core-menu')
      ?.addEventListener('click', (event: Event) => {
        // If the URL is anything but `/`, then the user has changed the URL and wants
        // to navigate to it.
        if (
          event.target instanceof Option &&
          event.target.href === '/' &&
          window.top
        ) {
          event.preventDefault();
          // The Storybook user expects to navigate when the link is clicked but
          // doesn't expect to be redirected to the first story, which "/" would do.
          // So we refresh the page to give the impression of a navigation while keeping
          // the user on the same page.
          window.top.location.reload();
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`<glide-core-menu
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?loading=${arguments_.loading}
      ?open=${arguments_.open}
    >
      <glide-core-button label="Toggle" slot="target"></glide-core-button>

      <glide-core-options>
        <glide-core-option
          label=${arguments_['<glide-core-option>.label']}
          description=${arguments_['<glide-core-option>.description'] ||
          nothing}
          value=${arguments_['<glide-core-option>.value'] || nothing}
          ?disabled=${arguments_['<glide-core-option>.disabled']}
        >
          <glide-core-menu slot="submenu">
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

        <glide-core-option label="Two"></glide-core-option>
        <glide-core-option
          label="Three"
          href=${arguments_['<glide-core-option>.href'] || nothing}
        ></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`;
  },
};

export default meta;

export const Menu: StoryObj = {
  decorators: [
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/menu.js';
        import '@crowdstrike/glide-core/options.js';
        import '@crowdstrike/glide-core/option.js';
      </script>

      ${story()}
    `,
  ],
};

export const WithGroups: StoryObj = {
  decorators: [
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/menu.js';
        import '@crowdstrike/glide-core/options.js';
        import '@crowdstrike/glide-core/options.group.js';
        import '@crowdstrike/glide-core/option.js';
      </script>

      ${story()}
    `,
  ],
  render(arguments_) {
    return html`<glide-core-menu
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?loading=${arguments_.loading}
      ?open=${arguments_.open}
    >
      <glide-core-button label="Toggle" slot="target"></glide-core-button>

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
          >
            <glide-core-menu slot="submenu">
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

          <glide-core-option label="Two"></glide-core-option>
          <glide-core-option label="Three"></glide-core-option>
        </glide-core-options-group>

        <glide-core-options-group
          label="B"
          ?hide-label=${arguments_['<glide-core-options-group>.hide-label']}
        >
          <glide-core-option label="Four"></glide-core-option>
          <glide-core-option label="Five"></glide-core-option>
          <glide-core-option label="Six"></glide-core-option>
        </glide-core-options-group>

        <glide-core-options-group
          label="C"
          ?hide-label=${arguments_['<glide-core-options-group>.hide-label']}
        >
          <glide-core-option label="Seven"></glide-core-option>
          <glide-core-option label="Eight"></glide-core-option>
          <glide-core-option
            label="Nine"
            href=${arguments_['<glide-core-option>.href'] || nothing}
          ></glide-core-option>
        </glide-core-options-group>
      </glide-core-options>
    </glide-core-menu>`;
  },
};

export const WithIcons: StoryObj = {
  decorators: [
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/menu.js';
        import '@crowdstrike/glide-core/options.js';
        import '@crowdstrike/glide-core/option.js';
      </script>

      ${story()}
    `,
  ],
  args: {
    '<glide-core-option>.label': 'Edit',
  },
  render(arguments_) {
    return html`<glide-core-menu
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?loading=${arguments_.loading}
      ?open=${arguments_.open}
    >
      <glide-core-button label="Toggle" slot="target"></glide-core-button>

      <glide-core-options>
        <glide-core-option
          label=${arguments_['<glide-core-option>.label']}
          description=${arguments_['<glide-core-option>.description'] ||
          nothing}
          value=${arguments_['<glide-core-option>.value'] || nothing}
          ?disabled=${arguments_['<glide-core-option>.disabled']}
        >
          <glide-core-example-icon
            slot="icon"
            name="edit"
          ></glide-core-example-icon>

          <glide-core-menu slot="submenu">
            <glide-core-example-icon
              slot="target"
              name="three-dots"
            ></glide-core-example-icon>

            <glide-core-options>
              <glide-core-option label="Settings">
                <glide-core-example-icon
                  slot="icon"
                  name="settings"
                ></glide-core-example-icon>
              </glide-core-option>

              <glide-core-option label="Calendar">
                <glide-core-example-icon
                  slot="icon"
                  name="calendar"
                ></glide-core-example-icon>
              </glide-core-option>

              <glide-core-option label="Info">
                <glide-core-example-icon
                  slot="icon"
                  name="info"
                ></glide-core-example-icon>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Move">
          <glide-core-example-icon
            slot="icon"
            name="move"
          ></glide-core-example-icon>
        </glide-core-option>

        <glide-core-option
          label="Share"
          href=${arguments_['<glide-core-option>.href'] || nothing}
        >
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`;
  },
};
