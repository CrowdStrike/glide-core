import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreToggle from './toggle.js';

const meta: Meta = {
  title: 'Toggle',
  decorators: [
    withActions,
    (story) =>
      html`<script type="ignore">
          import '@crowdstrike/glide-core/toggle.js';
        </script>

        ${story()} `,
  ],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'addEventListener(event, handler)': '',
    checked: false,
    disabled: false,
    'hide-label': false,
    orientation: 'horizontal',
    'slot="description"': '',
    summary: '',
    tooltip: '',
    version: '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input", handler: (event: Event) => void): void',
        },
      },
      type: { name: 'function' },
    },
    checked: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    'hide-label': {
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
    tooltip: {
      table: {
        type: { summary: 'string' },
      },
    },
    summary: {
      table: {
        type: { summary: 'string' },
      },
    },
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-toggle')
      ?.addEventListener('change', (event) => {
        if (event.target instanceof GlideCoreToggle) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              checked: event.target.checked,
            },
          });
        }
      });
  },

  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
    return html`<glide-core-toggle
      label=${arguments_.label || nothing}
      orientation=${arguments_.orientation || nothing}
      summary=${arguments_.summary || nothing}
      tooltip=${arguments_.tooltip || nothing}
      ?checked=${arguments_.checked}
      ?disabled=${arguments_.disabled}
      ?hide-label=${arguments_['hide-label'] || nothing}
    >
      ${arguments_['slot="description"']
        ? html`<div slot="description">
            ${unsafeHTML(arguments_['slot="description"'])}
          </div>`
        : nothing}
    </glide-core-toggle>`;
  },
};

export default meta;

export const Toggle: StoryObj = {};
