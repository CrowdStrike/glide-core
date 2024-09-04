import './accordion.js';
import './icons/storybook.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [(story) => html`<div style="height: 6rem;">${story()}</div>`],
  title: 'Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An accordion with optional icons.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    // eslint-disable-next-line no-underscore-dangle
    let arguments_: Meta['args'] = context.args;

    addons.getChannel().addListener('storyArgsUpdated', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      arguments_ = event.args as typeof context.args;
    });

    context.canvasElement
      .querySelector('glide-core-accordion')
      ?.addEventListener('toggle', (event) => {
        if (event instanceof CustomEvent) {
          addons.getChannel().emit(STORY_ARGS_UPDATED, {
            storyId: context.id,
            args: {
              ...arguments_,
              // Our events are untyped at the moment. So `detail` is typed as `any`.
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              open: event.detail.newState === 'open',
            },
          });
        }
      });
  },
  render: (arguments_) => {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/accordion.js';
      </script>

      <glide-core-accordion label=${arguments_.label} ?open=${arguments_.open}
        >${arguments_['slot="default"']}</glide-core-accordion
      >
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': 'Content',
    'addEventListener(event, listener)': '',
    open: false,
    'slot="prefix"': '',
    'slot="suffix"': '',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    open: {
      control: 'boolean',
      defaultValue: { summary: 'false' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    'slot="prefix"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
          detail: '// An optional icon to display before the label',
        },
      },
    },
    'slot="suffix"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
          detail: '// Optional icons to display after the label',
        },
      },
    },
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "toggle", listener: (event: CustomEvent<{ newState: "open" | "closed", oldState: "open" | "closed" }>) => void) => void',
        },
      },
    },
  },
};

export default meta;

export const Accordion: StoryObj = {
  tags: ['!autodocs', '!dev'],
};

export const WithIcons: StoryObj = {
  render: (arguments_) => {
    return html`<script type="ignore">
        import '@crowdstrike/glide-core/accordion.js';
      </script>

      <glide-core-accordion label=${arguments_.label} ?open=${arguments_.open}>
        ${arguments_['slot="default"']}

        <glide-core-example-icon
          slot="prefix"
          name="share"
        ></glide-core-example-icon>
        <glide-core-example-icon
          slot="suffix"
          name="pencil"
        ></glide-core-example-icon>
        <glide-core-example-icon
          slot="suffix"
          name="settings"
        ></glide-core-example-icon>
      </glide-core-accordion>`;
  },
};
