import { html, nothing } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Glide/Modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A Modal dialog component which interrupts interaction with the rest of the page.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const button =
      context.canvasElement.querySelector<HTMLButtonElement>('[data-open]');
    const modal = context.canvasElement.querySelector('cs-modal');

    button?.addEventListener('click', () => modal?.showModal());
  },
  render: (arguments_) => html`
    <cs-modal
      label=${arguments_.label}
      show-back-button=${arguments_['show-back-button'] || nothing}
      width=${arguments_.width || nothing}
    >
      ${arguments_['slot="default"']}

      <cs-button slot="secondary" variant="secondary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>
    <cs-button data-open>Open Modal ${arguments_.size}</cs-button>

    <!--
      <script>
          const button = document.querySelector('[data-open]');
          const modal = document.querySelector('cs-modal');

          button?.addEventListener('click', () => modal.showModal());
      </script>
    -->
  `,
  args: {
    label: 'Basic Modal',
    'show-back-button': false,
    'slot="default"': 'Modal content area',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: {
          summary: '"sm"',
        },
        type: { summary: '"sm" | "md" | "lg" | "xl"' },
      },
    },
    'show-back-button': {
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: {
          detail:
            'Adds a button in the Modal header that will close the dialog upon clicking it.',
          summary: 'boolean',
        },
      },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | html' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, listener)': {
      control: { type: 'object' },
      table: {
        type: {
          summary: 'method',
          detail: 'event: "close", listener: (event: Event) => void',
        },
      },
    },
    'showModal()': {
      table: {
        type: {
          summary: 'method',
          detail: 'Opens the Modal.',
        },
      },
    },
    'close()': {
      table: {
        type: {
          summary: 'method',
          detail: 'Closes the Modal.',
        },
      },
    },
  },
};

export default meta;

export const Modal: StoryObj = {};

export const WithBackButton: StoryObj = {
  name: 'Back Button',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}

      <cs-button slot="secondary" variant="secondary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const HeaderActions: StoryObj = {
  name: 'Header Actions',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}

      <!-- Only "cs-modal-icon-button" components should be used with header-actions -->
      <cs-modal-icon-button slot="header-actions">
        <!-- editor pencil icon -->
      </cs-modal-icon-button>
      <cs-modal-icon-button slot="header-actions">
        <!-- general settings icon -->
      </cs-modal-icon-button>

      <cs-button slot="secondary" variant="secondary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const HeaderActionsWithBackButton: StoryObj = {
  name: 'Header Actions (With Back Button)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}

      <!-- Only "cs-modal-icon-button" components should be used with header-actions -->
      <cs-modal-icon-button slot="header-actions">
        <!-- editor pencil icon -->
      </cs-modal-icon-button>
      <cs-modal-icon-button slot="header-actions">
        <!-- general settings icon -->
      </cs-modal-icon-button>

      <cs-button slot="secondary" variant="secondary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const TertiaryButton: StoryObj = {
  name: 'Tertiary Content (Button)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}

      <cs-button slot="tertiary" variant="secondary">Tertiary</cs-button>

      <cs-button slot="secondary" variant="secondary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const TertiaryIcon: StoryObj = {
  name: 'Tertiary Content (Icon)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}

      <span slot="tertiary">
        <!--
          The rendering of the tooltip placement is incorrect in this story due to the way Storybook scales the
          content inside of the doc block. To view the correct placement of the tooltip, we recommend navigating to
          the individual story instead.

          The "hoist" attribute here should not be needed for consumers in real applications. This is only applied
          to deal with the Storybook scaling mentioned above.
        -->
        <cs-tooltip hoist>
          <div slot="description">Information</div>

          <!-- Use the "cs-modal-tertiary-icon" component for accessibility and styling -->
          <cs-modal-tertiary-icon>
            <!-- general info icon -->
          </cs-modal-tertiary-icon>
        </cs-tooltip>
      </span>

      <cs-button slot="secondary" variant="secondary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};
