import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreToggle from './toggle.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Toggle',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<script type="ignore">
          import '@crowdstrike/glide-core/toggle.js';
        </script>

        ${story()} `,
  ],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'addEventListener(event, listener)': '',
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
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "change" | "input", listener: (event: Event) => void) => void',
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
    // eslint-disable-next-line no-underscore-dangle
    let arguments_: Meta['args'] = context.args;

    addons.getChannel().addListener(STORY_ARGS_UPDATED, (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      arguments_ = event.args as typeof context.args;
    });

    context.canvasElement
      .querySelector('glide-core-toggle')
      ?.addEventListener('change', (event) => {
        if (event.target instanceof GlideCoreToggle) {
          addons.getChannel().emit(STORY_ARGS_UPDATED, {
            storyId: context.id,
            args: {
              ...arguments_,
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
