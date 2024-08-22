import './button.js';
import './icons/storybook.js';
import './modal.js';
import './modal.js';
import './modal.tertiary-icon.js';
import './tooltip.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dialog that interrupts interaction with the rest of the page.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const button =
      context.canvasElement.querySelector<HTMLButtonElement>(
        'glide-core-button',
      );

    button?.addEventListener('click', () => {
      context.canvasElement.querySelector('glide-core-modal')?.showModal();
    });
  },
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/modal.js';
    </script>

    <glide-core-button>Open</glide-core-button>

    <glide-core-modal
      label=${arguments_.label}
      ?show-back-button=${arguments_['show-back-button'] || nothing}
      size=${arguments_.size ?? nothing}
    >
      ${arguments_['slot="default"']}

      <glide-core-button slot="primary">Primary</glide-core-button>

      <glide-core-button slot="secondary" variant="tertiary">
        Secondary
      </glide-core-button>
    </glide-core-modal>
  `,
  args: {
    label: 'Label',
    'slot="default"': 'Content',
    'addEventListener(event, listener)': '',
    'close()': '',
    'show-back-button': false,
    'showModal()': '',
    size: 'medium',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
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
    'show-back-button': {
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
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, listener)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: 'event: "close", listener: (event: Event) => void',
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
    'close()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
  },
};

export default meta;

export const Modal: StoryObj = {};

export const WithBackButton: StoryObj = {
  name: 'Modal (With Back Button)',
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/modal.js';
    </script>

    <glide-core-button>Open</glide-core-button>

    <glide-core-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}

      <glide-core-button slot="primary">Primary</glide-core-button>

      <glide-core-button slot="secondary" variant="tertiary">
        Secondary
      </glide-core-button>
    </glide-core-modal>
  `,
};

export const HeaderActions: StoryObj = {
  name: 'Modal (With Header Actions)',
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/modal.js';
      import '@crowdstrike/glide-core/modal.icon-button.js';
    </script>

    <glide-core-button>Open</glide-core-button>

    <glide-core-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}

      <glide-core-button slot="secondary" variant="tertiary">
        Secondary
      </glide-core-button>

      <!-- Only "glide-core-modal-icon-button" components should be used with header-actions -->
      <glide-core-modal-icon-button slot="header-actions" label="Edit">
        <glide-core-example-icon name="pencil"></glide-core-example-icon>
      </glide-core-modal-icon-button>

      <glide-core-modal-icon-button slot="header-actions" label="Settings">
        <glide-core-example-icon name="settings"></glide-core-example-icon>
      </glide-core-modal-icon-button>
    </glide-core-modal>
  `,
};

export const HeaderActionsWithBackButton: StoryObj = {
  name: 'Modal (With Header Actions and Back Button)',
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/modal.js';
      import '@crowdstrike/glide-core/modal.icon-button.js';
    </script>

    <glide-core-button>Open</glide-core-button>

    <glide-core-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}

      <glide-core-button slot="primary">Primary</glide-core-button>

      <glide-core-button slot="secondary" variant="tertiary">
        Secondary
      </glide-core-button>

      <!-- Only "glide-core-modal-icon-button" components should be used with header-actions -->
      <glide-core-modal-icon-button slot="header-actions" label="Edit">
        <glide-core-example-icon name="pencil"></glide-core-example-icon>
      </glide-core-modal-icon-button>

      <glide-core-modal-icon-button slot="header-actions" label="Settings">
        <glide-core-example-icon name="settings"></glide-core-example-icon>
      </glide-core-modal-icon-button>
    </glide-core-modal>
  `,
};

export const TertiaryButton: StoryObj = {
  name: 'Modal (With Tertiary Content Button)',
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/modal.js';
    </script>

    <glide-core-button>Open</glide-core-button>

    <glide-core-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}

      <glide-core-button slot="primary">Primary</glide-core-button>

      <glide-core-button slot="secondary" variant="tertiary">
        Secondary
      </glide-core-button>

      <glide-core-button slot="tertiary" variant="tertiary">
        Tertiary
      </glide-core-button>
    </glide-core-modal>
  `,
};

export const TertiaryIcon: StoryObj = {
  name: 'Modal (With Tertiary Content Icon)',
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/modal.js';
      import '@crowdstrike/glide-core/modal.tertiary-icon.js';
    </script>

    <glide-core-button>Open</glide-core-button>

    <glide-core-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}

      <glide-core-button slot="primary">Primary</glide-core-button>

      <glide-core-button slot="secondary" variant="tertiary">
        Secondary
      </glide-core-button>

      <glide-core-modal-tertiary-icon
        slot="tertiary"
        label="Information"
        tooltip-placement="right"
      >
        <glide-core-example-icon name="info"></glide-core-example-icon>
      </glide-core-modal-tertiary-icon>

      <glide-core-button slot="tertiary" variant="tertiary">
        Tertiary
      </glide-core-button>
    </glide-core-modal>
  `,
};
