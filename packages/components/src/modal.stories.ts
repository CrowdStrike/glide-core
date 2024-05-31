import './button.js';
import './icons/storybook.js';
import './modal.js';
import './modal.tertiary-icon.js';
import './tooltip.js';
import { html, nothing } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Modal',
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
      ?show-back-button=${arguments_['show-back-button'] || nothing}
      size=${arguments_.size ?? nothing}
    >
      ${arguments_['slot="default"']}

      <cs-button slot="secondary" variant="tertiary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>
    <cs-button data-open>Open Modal ${arguments_.size}</cs-button>
  `,
  args: {
    label: 'Basic Modal',
    size: 'medium',
    'slot="default"': 'Modal content area',
    'show-back-button': false,
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
      type: 'function',
      table: {
        type: {
          summary: 'method',
          detail: 'event: "close", listener: (event: Event) => void',
        },
      },
    },
    'showModal()': {
      type: 'function',
      table: {
        type: {
          summary: 'method',
          detail: 'Opens the Modal.',
        },
      },
    },
    'close()': {
      type: 'function',
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
  name: 'Modal (With Back Button)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}
      <cs-button slot="secondary" variant="tertiary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const HeaderActions: StoryObj = {
  name: 'Modal (With Header Actions)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}
      <!-- Only "cs-modal-icon-button" components should be used with header-actions -->
      <cs-modal-icon-button slot="header-actions" label="Edit">
        <cs-example-icon name="pencil"></cs-example-icon>
      </cs-modal-icon-button>
      <cs-modal-icon-button slot="header-actions" label="Settings">
        <cs-example-icon name="settings"></cs-example-icon>
      </cs-modal-icon-button>
      <cs-button slot="secondary" variant="tertiary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const HeaderActionsWithBackButton: StoryObj = {
  name: 'Modal (With Header Actions and Back Button)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}
      <!-- Only "cs-modal-icon-button" components should be used with header-actions -->
      <cs-modal-icon-button slot="header-actions" label="Edit">
        <cs-example-icon name="pencil"></cs-example-icon>
      </cs-modal-icon-button>
      <cs-modal-icon-button slot="header-actions" label="Settings">
        <cs-example-icon name="settings"></cs-example-icon>
      </cs-modal-icon-button>
      <cs-button slot="secondary" variant="tertiary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const TertiaryButton: StoryObj = {
  name: 'Modal (With Tertiary Content Button)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}
      <cs-button slot="tertiary" variant="tertiary">Tertiary</cs-button>
      <cs-button slot="secondary" variant="tertiary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};

export const TertiaryIcon: StoryObj = {
  name: 'Modal (With Tertiary Content Icon)',
  render: (arguments_) => html`
    <cs-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}
      <!--
          The rendering of the tooltip placement is incorrect in this story due to the way Storybook scales the
          content inside of the doc block. To view the correct placement of the tooltip, we recommend navigating to
          the individual story instead.
        -->
      <cs-modal-tertiary-icon
        slot="tertiary"
        label="Information"
        tooltip-placement="right"
      >
        <cs-example-icon name="info"></cs-example-icon>
      </cs-modal-tertiary-icon>
      <cs-button slot="tertiary" variant="tertiary">Tertiary</cs-button>
      <cs-button slot="secondary" variant="tertiary">Secondary</cs-button>
      <cs-button slot="primary">Primary</cs-button>
    </cs-modal>

    <cs-button data-open>Open Modal</cs-button>
  `,
};
