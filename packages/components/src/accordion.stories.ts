import './accordion.js';
import './icons/storybook.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [(story) => html`<div style="height: 6rem;">${story()}</div>`],
  title: 'Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An accordion component with optional slots for icons.',
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
      .querySelector('cs-accordion')
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
      <cs-accordion label=${arguments_.label} ?open=${arguments_.open}
        >${arguments_['slot="default"']}</cs-accordion
      >
    `;
  },
  args: {
    label: 'Accordion',
    'slot="default"': 'Inner content',
    open: false,
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
      table: {
        type: {
          summary: 'Element',
          detail: 'Add a prefix, leading icon to the Accordion.',
        },
      },
      type: { name: 'function' },
    },
    'slot="suffix"': {
      table: {
        type: {
          summary: 'Element',
          detail: 'Add any number of suffix, trailing icons to the Accordion.',
        },
      },
      type: { name: 'function' },
    },
    'addEventListener(event, listener)': {
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "toggle", listener: (event: CustomEvent<{ newState: "open" | "closed", oldState: "open" | "closed" }>) => void) => void',
        },
      },
      type: { name: 'function' },
    },
  },
};

export default meta;

export const Default: StoryObj = {};

export const WithPrefixIcon: StoryObj = {
  name: 'Default (With Prefix Icon)',
  render: (arguments_) => {
    return html` <cs-accordion
      label=${arguments_.label}
      ?open=${arguments_.open}
    >
      <cs-example-icon slot="prefix" name="share"></cs-example-icon>

      ${arguments_['slot="default"']}
    </cs-accordion>`;
  },
};

export const WithSuffix: StoryObj = {
  name: 'Default (With Suffix Icons)',
  render: (arguments_) => {
    return html` <cs-accordion
      label=${arguments_.label}
      ?open=${arguments_.open}
    >
      ${arguments_['slot="default"']}

      <cs-example-icon slot="suffix" name="pencil"></cs-example-icon>
      <cs-example-icon slot="suffix" name="settings"></cs-example-icon>
    </cs-accordion>`;
  },
};

export const WithPrefixAndSuffix: StoryObj = {
  name: 'Default (With Prefix & Suffix Icons)',
  render: (arguments_) => {
    return html` <cs-accordion
      label=${arguments_.label}
      ?open=${arguments_.open}
    >
      <cs-example-icon slot="prefix" name="share"></cs-example-icon>

      ${arguments_['slot="default"']}

      <cs-example-icon slot="suffix" name="pencil"></cs-example-icon>
      <cs-example-icon slot="suffix" name="settings"></cs-example-icon>
    </cs-accordion>`;
  },
};
