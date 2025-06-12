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
    '<glide-core-option>[slot="default"]': '',
    '<glide-core-option>.disabled': false,
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
          detail:
            'The element to which the menu will anchor. Can be any focusable element',
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
      type: { name: 'function', required: true },
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
    '<glide-core-option>[slot="default"]': {
      name: 'slot="default"',
      control: false,
      table: {
        category: 'Option',
        type: {
          summary: 'Element | Text',
        },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-option>.disabled': {
      name: 'disabled',
      table: {
        category: 'Option',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
        <glide-core-option label=${arguments_['<glide-core-option>.label']}>
          <div
            slot="content"
            style="display: flex; inline-size: 100%; justify-content: space-between;"
          >
            ${arguments_['<glide-core-option>.label']}

            <glide-core-menu open>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                slot="target"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.6665 8C6.6665 7.26362 7.26346 6.66667 7.99984 6.66667C8.73622 6.66667 9.33317 7.26362 9.33317 8C9.33317 8.73638 8.73622 9.33333 7.99984 9.33333C7.26346 9.33333 6.6665 8.73638 6.6665 8Z"
                  fill="#212121"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.6665 3.33333C6.6665 2.59695 7.26346 2 7.99984 2C8.73622 2 9.33317 2.59695 9.33317 3.33333C9.33317 4.06971 8.73622 4.66667 7.99984 4.66667C7.26346 4.66667 6.6665 4.06971 6.6665 3.33333Z"
                  fill="#212121"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.6665 12.6667C6.6665 11.9303 7.26346 11.3333 7.99984 11.3333C8.73622 11.3333 9.33317 11.9303 9.33317 12.6667C9.33317 13.403 8.73622 14 7.99984 14C7.26346 14 6.6665 13.403 6.6665 12.6667Z"
                  fill="#212121"
                />
              </svg>

              <glide-core-options>
                <glide-core-option label="One"> </glide-core-option>
                <glide-core-option label="Two"></glide-core-option>
                <glide-core-option label="Three"></glide-core-option>
              </glide-core-options>
            </glide-core-menu>
          </div>
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
          ?disabled=${arguments_['<glide-core-option>.disabled']}
        >
          <glide-core-example-icon
            slot="icon"
            name="edit"
          ></glide-core-example-icon>
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
