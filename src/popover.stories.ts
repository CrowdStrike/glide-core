import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import PopoverComponent from './popover.js';
import focusOutline from './styles/focus-outline.js';

const meta: Meta = {
  title: 'Popover',
  parameters: {
    actions: {
      handles: ['toggle'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  decorators: [
    withActions,
    (story) =>
      html`<div
        style=${styleMap({
          alignItems: 'center',
          display: 'flex',
          height: '7rem',
          justifyContent: 'center',
        })}
      >
        <style>
          [slot="target"] {
            background-color: transparent;
            border: none;
            border-radius: 50%;
            outline-offset: 1px;
            padding: 0;

            &:focus-visible {
              ${focusOutline};
            }

            &:hover {
              cursor: pointer;
            }
          }
        </style>

        <script type="ignore">
          import '@crowdstrike/glide-core/popover.js';
        </script>

        ${story()}
      </div>`,
  ],
  args: {
    'slot="default"': 'Content',
    'slot="target"': '',
    'addEventListener(event, handler)': '',
    disabled: false,
    offset: 4,
    open: false,
    placement: 'bottom',
    version: '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: {
          summary: 'Element | string',
        },
      },
      type: { name: 'string', required: true },
    },
    'slot="target"': {
      table: {
        type: {
          summary: 'Element',
          detail:
            '// The element to which Popover will anchor. Can be any focusable element.',
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
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail: `// The popover is never shown when disabled. Useful when you have markup conditionally rendering\n// Popover. Instead, always render Popover and set this attribute as needed.`,
        },
      },
    },
    offset: {
      control: 'number',
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    open: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail:
            '// Force visibility of the popover. Useful when it should be visible based on something other than a click.',
        },
      },
    },
    placement: {
      control: { type: 'radio' },
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        defaultValue: { summary: '"bottom"' },
        type: {
          summary: '"top" | "right" | "bottom" | "left"',
          detail:
            '// Popover will try to move itself to the opposite of this value if not doing so would result in\n// overflow. For example, if "bottom" results in overflow Popover will try "top" but not "right"\n// or "left".',
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
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-popover')
      ?.addEventListener('toggle', (event: Event) => {
        if (event.target instanceof PopoverComponent) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              open: event.target.open,
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-popover
        offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
        placement=${arguments_.placement === 'bottom'
          ? nothing
          : arguments_.placement}
        ?disabled=${arguments_.disabled}
        ?open=${arguments_.open}
      >
        <div
          style=${styleMap({
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          })}
        >
          ${unsafeHTML(arguments_['slot="default"'])}
        </div>

        <button slot="target">
          <glide-core-example-icon name="info"></glide-core-example-icon>
        </button>
      </glide-core-popover>
    `;
  },
};

export default meta;

export const Popover: StoryObj = {};
