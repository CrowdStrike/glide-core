import './tag.js';
import { html, nothing } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tag component to categorize information.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-tag
      removable-label=${arguments_['removable-label'] || nothing}
      size=${arguments_['size']}
    >
      ${arguments_['slot="default"']}
    </cs-tag>
  `,
  args: {
    'slot="default"': 'Tag',
    'removable-label': '',
    size: 'medium',
  },
  argTypes: {
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'string', detail: 'The content of the Tag.' },
      },
      type: { name: 'string', required: true },
    },
    'slot="prefix"': {
      control: { type: '' },
      table: {
        type: {
          summary: 'Element',
          detail: 'Add a prefix, a leading icon to the Tag.',
        },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: {
          summary: 'medium',
        },
        type: {
          summary: '"small" | "medium" | "large"',
          detail: "The Tag's size",
        },
      },
    },
    'removable-label': {
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
          detail:
            'Adds a button to the Tag that removes it from the DOM when an accessible label is provided.',
        },
      },
    },
    'addEventListener(event)': {
      control: { type: '' },
      table: {
        type: {
          summary: 'method',
          detail: 'event: "remove", listener: (event: Event) => void',
        },
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  name: 'Tag',
};

export const DefaultWithPrefixIcon: StoryObj = {
  name: 'Tag (With Prefix Icon)',
  render: (arguments_) => html`
    <cs-tag>
      <span slot="prefix">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18C9.55228 18 10 18.4477 10 19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18Z"
            fill="#D9D9D9"
          />
          <path
            d="M9 11C9.55228 11 10 11.4477 10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11Z"
            fill="#D9D9D9"
          />
          <path
            d="M9 4C9.55228 4 10 4.44772 10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5C8 4.44772 8.44772 4 9 4Z"
            fill="#D9D9D9"
          />
          <path
            d="M16 18C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18Z"
            fill="#D9D9D9"
          />
          <path
            d="M16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11Z"
            fill="#D9D9D9"
          />
          <path
            d="M16 4C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6C15.4477 6 15 5.55228 15 5C15 4.44772 15.4477 4 16 4Z"
            fill="#D9D9D9"
          />
          <path
            d="M9 18C9.55228 18 10 18.4477 10 19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M9 11C9.55228 11 10 11.4477 10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M9 4C9.55228 4 10 4.44772 10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5C8 4.44772 8.44772 4 9 4Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M16 18C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M16 4C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6C15.4477 6 15 5.55228 15 5C15 4.44772 15.4477 4 16 4Z"
            stroke="#212121"
            stroke-width="2"
          />
        </svg>
      </span>
      ${arguments_['slot="default"']}</cs-tag
    >
  `,
};

export const Removable: StoryObj = {
  name: 'Tag (With Removable Label)',
  render: (arguments_) => html`
    <cs-tag removableLabel="Tag"> ${arguments_['slot="default"']}</cs-tag>
  `,
};

export const RemovableWithIcon: StoryObj = {
  name: 'Tag (With Removeable Label and Prefix Icon)',
  render: (arguments_) => html`
    <cs-tag removableLabel="Tag">
      <span slot="prefix">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18C9.55228 18 10 18.4477 10 19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18Z"
            fill="#D9D9D9"
          />
          <path
            d="M9 11C9.55228 11 10 11.4477 10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11Z"
            fill="#D9D9D9"
          />
          <path
            d="M9 4C9.55228 4 10 4.44772 10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5C8 4.44772 8.44772 4 9 4Z"
            fill="#D9D9D9"
          />
          <path
            d="M16 18C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18Z"
            fill="#D9D9D9"
          />
          <path
            d="M16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11Z"
            fill="#D9D9D9"
          />
          <path
            d="M16 4C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6C15.4477 6 15 5.55228 15 5C15 4.44772 15.4477 4 16 4Z"
            fill="#D9D9D9"
          />
          <path
            d="M9 18C9.55228 18 10 18.4477 10 19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M9 11C9.55228 11 10 11.4477 10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M9 4C9.55228 4 10 4.44772 10 5C10 5.55228 9.55228 6 9 6C8.44772 6 8 5.55228 8 5C8 4.44772 8.44772 4 9 4Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M16 18C16.5523 18 17 18.4477 17 19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11Z"
            stroke="#212121"
            stroke-width="2"
          />
          <path
            d="M16 4C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6C15.4477 6 15 5.55228 15 5C15 4.44772 15.4477 4 16 4Z"
            stroke="#212121"
            stroke-width="2"
          />
        </svg>
      </span>
      ${arguments_['slot="default"']}</cs-tag
    >
  `,
};
