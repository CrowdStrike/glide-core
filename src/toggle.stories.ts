import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import GlideCoreToggle from './toggle.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Toggle',
  tags: ['autodocs'],
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
    'slot="tooltip"': '',
    summary: '',
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
    'slot="tooltip"': {
      table: {
        type: { summary: 'Element' },
      },
    },
    summary: {
      table: {
        type: { summary: 'string' },
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
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`<glide-core-toggle
      label=${arguments_.label || nothing}
      orientation=${arguments_.orientation || nothing}
      summary=${arguments_.summary || nothing}
      ?checked=${arguments_.checked}
      ?disabled=${arguments_.disabled}
      ?hide-label=${arguments_['hide-label'] || nothing}
    >
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
    </glide-core-toggle>`;
  },
};

export default meta;

export const Toggle: StoryObj = {};
