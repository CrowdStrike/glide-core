import './accordion.js';
import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An Accordion component with optional slots for icons.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-accordion label=${arguments_.label} ?open=${arguments_.open}
      >${arguments_['slot="default"']}</cs-accordion
    >
  `,
  args: {
    label: 'Accordion',
    open: false,
    'slot="default"': 'Inner content',
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
      defaultValue: { summary: false },
      table: {
        type: { summary: 'boolean' },
      },
    },
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string | html' },
      },
      type: { name: 'string', required: true },
    },
    'slot="prefix"': {
      table: {
        type: {
          summary: 'html',
          detail: 'Add a prefix, leading icon to the Accordion.',
        },
      },
    },
    'slot="suffix"': {
      table: {
        type: {
          summary: 'html',
          detail: 'Add any number of suffix, trailing icons to the Accordion.',
        },
      },
    },
    'addEventListener(event)': {
      table: {
        type: {
          summary: 'method',
          detail: 'event: "toggle"',
        },
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {};

export const WithPrefixIcon: StoryObj = {
  name: 'Default (With Prefix Icon)',
  render: (arguments_) =>
    html` <cs-accordion label=${arguments_.label} ?open=${arguments_.open}>
      <svg
        slot="prefix"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          d="M10 5H6m5.932 7H18.5a3.5 3.5 0 000-7H14m-4 14H5.5a3.5 3.5 0 010-7h3.408M18 19h-4"
        ></path>
        <circle cx="4" cy="5" r="2"></circle>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M14.231 9.701L11.932 12l2.299 2.299"></path>
        <circle cx="12" cy="19" r="2"></circle>
        <circle cx="20" cy="19" r="2"></circle>
      </svg>

      ${arguments_['slot="default"']}
    </cs-accordion>`,
};

export const WithSuffix: StoryObj = {
  name: 'Default (With Suffix Icons)',
  render: (arguments_) =>
    html` <cs-accordion label=${arguments_.label} ?open=${arguments_.open}>
      ${arguments_['slot="default"']}

      <svg
        slot="suffix"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        ></path>
      </svg>

      <svg
        slot="suffix"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        ></path>
      </svg>
    </cs-accordion>`,
};

export const WithPrefixAndSuffix: StoryObj = {
  name: 'Default (With Prefix & Suffix Icons)',
  render: (arguments_) =>
    html` <cs-accordion label=${arguments_.label} ?open=${arguments_.open}>
      <svg
        slot="prefix"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <path
          d="M10 5H6m5.932 7H18.5a3.5 3.5 0 000-7H14m-4 14H5.5a3.5 3.5 0 010-7h3.408M18 19h-4"
        ></path>
        <circle cx="4" cy="5" r="2"></circle>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M14.231 9.701L11.932 12l2.299 2.299"></path>
        <circle cx="12" cy="19" r="2"></circle>
        <circle cx="20" cy="19" r="2"></circle>
      </svg>

      ${arguments_['slot="default"']}

      <svg
        slot="suffix"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        ></path>
      </svg>

      <svg
        slot="suffix"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        ></path>
      </svg>
    </cs-accordion>`,
};
