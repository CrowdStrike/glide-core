import './icons/storybook.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import GlideCoreAccordion from './accordion.js';

const meta: Meta = {
  title: 'Accordion',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/accordion.js';
      </script>

      ${story()}
    `,
  ],
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
  play(context) {
    context.canvasElement
      .querySelector('glide-core-accordion')
      ?.addEventListener('toggle', (event) => {
        if (event.target instanceof GlideCoreAccordion) {
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
      <glide-core-accordion
        label=${arguments_.label || nothing}
        ?open=${arguments_.open}
      >
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
    version: '',
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
          detail: '(event: "toggle", handler: (event: Event) => void): void',
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
};

export default meta;

export const Accordion: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  render(arguments_) {
    return html`<glide-core-accordion
      label=${arguments_.label || nothing}
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
