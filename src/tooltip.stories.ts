import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import GlideCoreTooltip from './tooltip.js';
import focusOutline from './styles/focus-outline.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tooltip',
  tags: ['autodocs'],
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
          height: '8rem',
          justifyContent: 'center',
        })}
      >
        <style>
          [slot="target"] {
            border-radius: 50%;
            display: inline-flex;
            outline-offset: 1px;

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
    'slot="default"': 'Content',
    'slot="target"': '',
    'addEventListener(event, handler)': '',
    disabled: false,
    offset: 4,
    open: false,
    placement: 'bottom',
    shortcut: [],
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
          detail: '// The element to which the tooltip will anchor',
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
            '// Force visibility of the tooltip. Useful when it should be visible based on something other than hover or focus.',
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
    shortcut: {
      table: {
        defaultValue: { summary: '[]' },
        type: {
          summary: 'string[]',
        },
      },
    },
  },
  play(context) {
    const tooltip = context.canvasElement.querySelector('glide-core-tooltip');

    const observer = new MutationObserver(() => {
      if (tooltip instanceof GlideCoreTooltip) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            open: tooltip.open,
          },
        });
      }
    });

    if (tooltip) {
      observer.observe(tooltip, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }
  },
  render(arguments_) {
    // A `<span>` is used instead of a `<button>` for VoiceOver, so
    // "button" isn't read aloud, implying the target can be interacted
    // with via click.

    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-tooltip
        offset=${arguments_.offset}
        placement=${arguments_.placement}
        ?disabled=${arguments_.disabled}
        ?open=${arguments_.open}
        .shortcut=${arguments_.shortcut}
      >
        ${unsafeHTML(arguments_['slot="default"'])}

        <span tabindex="0" slot="target">
          <glide-core-example-icon name="info"></glide-core-example-icon>
        </span>
      </glide-core-tooltip>
    `;
  },
};

export default meta;

export const Tooltip: StoryObj = {};
