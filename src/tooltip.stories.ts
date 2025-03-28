import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreTooltip from './tooltip.js';
import focusOutline from './styles/focus-outline.js';

const meta: Meta = {
  title: 'Tooltip',
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
          }
        </style>

        <script type="ignore">
          import '@crowdstrike/glide-core/tooltip.js';
        </script>

        ${story()}
      </div>`,
  ],
  args: {
    label: 'Label',
    'slot="target"': '',
    'addEventListener(event, handler)': '',
    disabled: false,
    offset: 4,
    open: false,
    placement: 'bottom',
    'screenreader-hidden': false,
    shortcut: [],
    version: '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'slot="target"': {
      table: {
        type: {
          summary: 'Element',
          detail:
            '// The element to which the tooltip will anchor. Can be any element with an implicit or explicit ARIA role.',
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
          detail: `// The tooltip is never shown when disabled. Useful when you have markup conditionally rendering\n// Tooltip. Instead, always render Tooltip and set this attribute as needed.`,
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
            '// Force visibility of the tooltip. Useful when it should be visible based on something other than\n// hover or focus.',
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
            '// The tooltip will try to move itself to the opposite of this value if not doing so would result in\n// overflow. For example, if "bottom" results in overflow Tooltip will try "top" but not "right"\n// or "left".',
        },
      },
    },
    'screenreader-hidden': {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail: `// Screenreaders are able to read the entirety of the truncated text without the help of a tooltip\n// if it's truncated using CSS. Use this attribute to hide the tooltip from screenreaders so its text\n// isn't read in duplicate.`,
        },
      },
    },
    shortcut: {
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
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-tooltip')
      ?.addEventListener('toggle', (event: Event) => {
        if (event.target instanceof GlideCoreTooltip) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              open: event.target.open,

              // Storybook reverts arguments back to their initial values when the
              // above event is emitted unless the argument's value was changed via
              // a control. And, for whatever reason, only changes to Lit property
              // expressions cause a re-render and thus a reversion.
              //
              // So the current value of `shortcut` is preserved for visual tests and
              // for when users change its value via DevTools instead of a control.
              shortcut: event.target.shortcut,
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-tooltip
        label=${arguments_.label}
        offset=${arguments_.offset}
        placement=${arguments_.placement}
        ?disabled=${arguments_.disabled}
        ?open=${arguments_.open}
        ?screenreader-hidden=${arguments_['screenreader-hidden']}
        .shortcut=${arguments_.shortcut}
      >
        ${unsafeHTML(arguments_['slot="default"'])}

        <button aria-label="Tooltip:" slot="target">
          <glide-core-example-icon name="info"></glide-core-example-icon>
        </button>
      </glide-core-tooltip>
    `;
  },
};

export default meta;

export const Tooltip: StoryObj = {};
