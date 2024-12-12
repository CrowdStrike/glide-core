import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCorePopover from './popover.js';
import focusOutline from './styles/focus-outline.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  decorators: [
    (story) =>
      html`<div
        style="align-items: center; display: flex; height: 10rem; justify-content: center;"
      >
        <style>
          [slot="target"] {
            background-color: transparent;
            border: none;
            border-radius: 50%;
            display: inline-flex;
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
    disabled: false,
    offset: 4,
    open: false,
    placement: 'bottom',
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
            '// The element to which the popover will anchor, which can be any focusable element',
        },
      },
      type: { name: 'function', required: true },
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
            '// The popover will try to move itself to the opposite of this value if not doing so would result in\n// overflow. For example, if "bottom" results in overflow Popover will try "top" but not "right"\n// or "left".',
        },
      },
    },
  },
  play(context) {
    const popover = context.canvasElement.querySelector('glide-core-popover');

    const observer = new MutationObserver(() => {
      if (popover instanceof GlideCorePopover) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            open: popover.open,
          },
        });
      }
    });

    if (popover) {
      observer.observe(popover, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-popover
        offset=${arguments_.offset}
        placement=${arguments_.placement}
        ?disabled=${arguments_.disabled}
        ?open=${arguments_.open}
      >
        <div
          style="align-items: center; display: flex; justify-content: center; width: 100%;"
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
