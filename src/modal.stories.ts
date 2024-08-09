import './button.js';
import './icons/storybook.js';
import './menu.button.js';
import './menu.js';
import './menu.js';
import './menu.link.js';
import './menu.options.js';
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

    const modal = context.canvasElement.querySelector('glide-core-modal');

    button?.addEventListener('click', () => modal?.showModal());
  },
  render: (arguments_) => html`
    <glide-core-modal
      label=${arguments_.label}
      ?show-back-button=${arguments_['show-back-button'] || nothing}
      size=${arguments_.size ?? nothing}
    >
      ${arguments_['slot="default"']}
      <glide-core-menu>
        <glide-core-menu-options>
          <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
          <glide-core-menu-link label="Two" url="/two"> </glide-core-menu-link>
          <!--
          If an option does not have an associated url,
          you can use <glide-core-menu-button> and provide your own click handler
        -->
          <glide-core-menu-button label="Three"> </glide-core-menu-button>
        </glide-core-menu-options>

        <glide-core-button slot="target" variant="secondary">
          Target
        </glide-core-button>
      </glide-core-menu>

      <glide-core-button slot="secondary" variant="tertiary"
        >Secondary</glide-core-button
      >
      <glide-core-button slot="primary">Primary</glide-core-button>
    </glide-core-modal>
    <glide-core-button data-open>Open</glide-core-button>
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
    <glide-core-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}
      <glide-core-button slot="secondary" variant="tertiary"
        >Secondary</glide-core-button
      >
      <glide-core-button slot="primary">Primary</glide-core-button>
    </glide-core-modal>

    <glide-core-button data-open>Open</glide-core-button>
  `,
};

export const HeaderActions: StoryObj = {
  name: 'Modal (With Header Actions)',
  render: (arguments_) => html`
    <glide-core-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}
      <!-- Only "glide-core-modal-icon-button" components should be used with header-actions -->
      <glide-core-modal-icon-button slot="header-actions" label="Edit">
        <glide-core-example-icon name="pencil"></glide-core-example-icon>
      </glide-core-modal-icon-button>
      <glide-core-modal-icon-button slot="header-actions" label="Settings">
        <glide-core-example-icon name="settings"></glide-core-example-icon>
      </glide-core-modal-icon-button>
      <glide-core-button slot="secondary" variant="tertiary"
        >Secondary</glide-core-button
      >
      <glide-core-button slot="primary">Primary</glide-core-button>
    </glide-core-modal>

    <glide-core-button data-open>Open</glide-core-button>
  `,
};

export const HeaderActionsWithBackButton: StoryObj = {
  name: 'Modal (With Header Actions and Back Button)',
  render: (arguments_) => html`
    <glide-core-modal label=${arguments_.label} show-back-button>
      ${arguments_['slot="default"']}
      <!-- Only "glide-core-modal-icon-button" components should be used with header-actions -->
      <glide-core-modal-icon-button slot="header-actions" label="Edit">
        <glide-core-example-icon name="pencil"></glide-core-example-icon>
      </glide-core-modal-icon-button>
      <glide-core-modal-icon-button slot="header-actions" label="Settings">
        <glide-core-example-icon name="settings"></glide-core-example-icon>
      </glide-core-modal-icon-button>
      <glide-core-button slot="secondary" variant="tertiary"
        >Secondary</glide-core-button
      >
      <glide-core-button slot="primary">Primary</glide-core-button>
    </glide-core-modal>

    <glide-core-button data-open>Open</glide-core-button>
  `,
};

export const TertiaryButton: StoryObj = {
  name: 'Modal (With Tertiary Content Button)',
  render: (arguments_) => html`
    <glide-core-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}
      <glide-core-button slot="tertiary" variant="tertiary"
        >Tertiary</glide-core-button
      >
      <glide-core-button slot="secondary" variant="tertiary"
        >Secondary</glide-core-button
      >
      <glide-core-button slot="primary">Primary</glide-core-button>
    </glide-core-modal>

    <glide-core-button data-open>Open</glide-core-button>
  `,
};

export const TertiaryIcon: StoryObj = {
  name: 'Modal (With Tertiary Content Icon)',
  render: (arguments_) => html`
    <glide-core-modal label=${arguments_.label}>
      ${arguments_['slot="default"']}
      <!--
          The rendering of the tooltip placement is incorrect in this story due to the way Storybook scales the
          content inside of the doc block. To view the correct placement of the tooltip, we recommend navigating to
          the individual story instead.
        -->
      <glide-core-modal-tertiary-icon
        slot="tertiary"
        label="Information"
        tooltip-placement="right"
      >
        <glide-core-example-icon name="info"></glide-core-example-icon>
      </glide-core-modal-tertiary-icon>
      <glide-core-button slot="tertiary" variant="tertiary"
        >Tertiary</glide-core-button
      >
      <glide-core-button slot="secondary" variant="tertiary"
        >Secondary</glide-core-button
      >
      <glide-core-button slot="primary">Primary</glide-core-button>
    </glide-core-modal>

    <glide-core-button data-open>Open</glide-core-button>
  `,
};
