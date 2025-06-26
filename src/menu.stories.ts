import './button.js';
import './input.js';
import './icons/storybook.js';
import './options.js';
import './option.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { withActions } from '@storybook/addon-actions/decorator';
import MenuComponent from './menu.js';

// TODO: add detail to icon and submenu slots, and default slot.
// TODO: verify accessibility tree of a menu with an input
// TODO: comment somewhere about how default slot should not contain interactive elements other than Options

const meta: Meta = {
  title: 'Menu',
  decorators: [
    withActions,
    (story) =>
      html`<script type="ignore">
          import '@crowdstrike/glide-core/menu.js';
          import '@crowdstrike/glide-core/options.js';
          import '@crowdstrike/glide-core/option.js';
        </script>

        ${story()}`,
  ],
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
    '<glide-core-option>.label': 'One',
    '<glide-core-option>.disabled': false,
    '<glide-core-option>.href': '',
    '<glide-core-option>[slot="default"]': '',
    '<glide-core-option>[slot="icon"]': '',
    '<glide-core-option>[slot="submenu"]': '',
    '<glide-core-option>.version': '',
    '<glide-core-option>.value': '',
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
// The element to which the menu will anchor. Can be any focusable element.
//
// If you want Menu to be filterable, put an Input in this slot. Listen for Input's "input"
// event, then add and remove Options from Menu's default based on the Input's value.
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
            '(event: "click" | "toggle", handler: (event: Event) => void): void',
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
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start"| "top-end"',
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
    '<glide-core-option>.label': {
      name: 'label',
      table: {
        category: 'Option',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
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
    '<glide-core-option>[slot="default"]': {
      name: 'slot="default"',
      control: false,
      table: {
        category: 'Option',
        type: {
          summary: 'Element | Text',
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
    '<glide-core-option>.value': {
      name: 'value',
      table: {
        category: 'Option',
        defaultValue: {
          summary: '""',
        },
        type: {
          summary: 'string',
        },
      },
    },
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-menu')
      ?.addEventListener('toggle', (event: Event) => {
        // TODO: explain
        const isSubmenu =
          event.target instanceof Element &&
          event.target.closest('glide-core-menu');

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
        const optionLink =
          event.target instanceof Element &&
          event.target.closest('glide-core-option');

        // If the URL is anything but `/`, then the user has changed the URL and wants
        // to navigate to it.
        if (optionLink && optionLink.href === '/' && window.top) {
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
      <glide-core-input label="Toggle" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option
          label=${arguments_['<glide-core-option>.label']}
          href=${arguments_['<glide-core-option>.href'] || nothing}
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
        <glide-core-option label="Three" href="/"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`;
  },
};

export default meta;

export const Menu: StoryObj = {};

export const WithIcons: StoryObj = {
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
          label="Edit"
          href=${arguments_['<glide-core-option>.href'] || nothing}
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

        <glide-core-option label="Share" href="/">
          <glide-core-example-icon
            slot="icon"
            name="share"
          ></glide-core-example-icon>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`;
  },
};
