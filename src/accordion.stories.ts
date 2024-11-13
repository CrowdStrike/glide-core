import './icons/storybook.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import GlideCoreAccordion from './accordion.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [
    (story) =>
      html`<div style="min-height: 6rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/accordion.js';
        </script>

        ${story()}
      </div>`,
  ],
  title: 'Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        autoplay: true,
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
      .querySelector('glide-core-accordion')
      ?.addEventListener('toggle', (event) => {
        if (event.target instanceof GlideCoreAccordion) {
          addons.getChannel().emit(STORY_ARGS_UPDATED, {
            storyId: context.id,
            args: {
              ...arguments_,
              // Our events are untyped at the moment. So `detail` is typed as `any`.
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              open: event.target.open,
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-accordion label=${arguments_.label} ?open=${arguments_.open}>
        ${unsafeHTML(arguments_['slot="default"'])}
      </glide-core-accordion>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': 'Content',
    'addEventListener(event, handler)': '',
    open: false,
    'slot="prefix-icon"': '',
    'slot="suffix-icons"': '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(event: "toggle", handler: (event: Event) => void) => void',
        },
      },
    },
    open: {
      defaultValue: { summary: 'false' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    'slot="prefix-icon"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
        },
      },
    },
    'slot="suffix-icons"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
        },
      },
    },
  },
};

export default meta;

export const Accordion: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  render(arguments_) {
    return html`<glide-core-accordion
      label=${arguments_.label}
      ?open=${arguments_.open}
    >
      ${unsafeHTML(arguments_['slot="default"'])}

      <glide-core-example-icon
        slot="prefix-icon"
        name="share"
      ></glide-core-example-icon>
      <glide-core-example-icon
        slot="suffix-icons"
        name="edit"
      ></glide-core-example-icon>
      <glide-core-example-icon
        slot="suffix-icons"
        name="settings"
      ></glide-core-example-icon>
    </glide-core-accordion>`;
  },
};
