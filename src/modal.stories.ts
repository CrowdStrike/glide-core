import './button.js';
import './icons/storybook.js';
import './modal.js';
import './modal.tertiary-icon.js';
import './toasts.js';
import './toasts.toast.js';
import './tooltip.js';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Modal',
  tags: ['autodocs'],
  decorators: [
    (story) => html`
      ${story()}
      <glide-core-toasts></glide-core-toasts>
    `,
  ],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-button')
      ?.addEventListener('click', () => {
        context.canvasElement.querySelector('glide-core-modal')?.showModal();
      });

    context.canvasElement
      .querySelector('glide-core-modal')
      ?.addEventListener('close', (event: Event) => {
        context.canvasElement.querySelector('glide-core-toasts')?.add({
          label: `Event: “${event.type}”`,
          description: 'See the console for details.',
          variant: 'informational',
        });

        // eslint-disable-next-line no-console
        console.log(event);
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-button label="Open"></glide-core-button>

      <glide-core-modal
        label=${arguments_.label || nothing}
        size=${arguments_.size}
        ?back-button=${arguments_['back-button']}
      >
        ${unsafeHTML(arguments_['slot="default"'])}

        <glide-core-button label="Primary" slot="primary"></glide-core-button>

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': 'Content',
    'addEventListener(event, handler)': '',
    'back-button': false,
    'close()': '',
    'showModal()': '',
    size: 'medium',
    'slot="header-actions"': '',
    'slot="primary"': '',
    'slot="secondary"': '',
    'slot="tertiary"': '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'slot="default"': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(event: "close", handler: (event: Event) => void): void',
        },
      },
    },
    'back-button': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: {
          detail:
            '// Adds a button to the header that will close Modal on click',
          summary: 'boolean',
        },
      },
    },
    'close()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    'showModal()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large', 'xlarge'],
      table: {
        defaultValue: {
          summary: '"medium"',
        },
        type: { summary: '"small" | "medium" | "large" | "xlarge"' },
      },
    },
    'slot="header-actions"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreModalIconButton',
        },
      },
    },
    'slot="primary"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreButton',
        },
      },
    },
    'slot="secondary"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreButton',
        },
      },
    },
    'slot="tertiary"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreButton | GlideCoreModalTertiaryIcon',
        },
      },
    },
  },
};

export default meta;

export const Modal: StoryObj = {
  tags: ['!autodocs'],
};

export const WithHeaderActions: StoryObj = {
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
        import '@crowdstrike/glide-core/modal.icon-button.js';
      </script>

      <glide-core-button label="Open"></glide-core-button>

      <glide-core-modal label=${arguments_.label}>
        ${arguments_['slot="default"']}

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>

        <!-- Only "glide-core-modal-icon-button" components should be used with header-actions -->
        <glide-core-modal-icon-button slot="header-actions" label="Edit">
          <glide-core-example-icon name="edit"></glide-core-example-icon>
        </glide-core-modal-icon-button>

        <glide-core-modal-icon-button slot="header-actions" label="Settings">
          <glide-core-example-icon name="settings"></glide-core-example-icon>
        </glide-core-modal-icon-button>
      </glide-core-modal>
    `;
  },
};

export const WithTertiaryButton: StoryObj = {
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-button label="Open"></glide-core-button>

      <glide-core-modal label=${arguments_.label}>
        ${arguments_['slot="default"']}

        <glide-core-button label="Primary" slot="primary"></glide-core-button>

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>

        <glide-core-button
          label="Tertiary"
          slot="tertiary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
};

export const WithTertiaryIconAndButton: StoryObj = {
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
        import '@crowdstrike/glide-core/modal.tertiary-icon.js';
      </script>

      <glide-core-button label="Open"></glide-core-button>

      <glide-core-modal label=${arguments_.label}>
        ${arguments_['slot="default"']}

        <glide-core-button label="Primary" slot="primary"></glide-core-button>

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>

        <glide-core-modal-tertiary-icon
          slot="tertiary"
          label="Information"
          tooltip-placement="right"
        >
          <glide-core-example-icon name="info"></glide-core-example-icon>
        </glide-core-modal-tertiary-icon>

        <glide-core-button
          label="Tertiary"
          slot="tertiary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
};
