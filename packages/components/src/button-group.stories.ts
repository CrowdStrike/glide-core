import './button-group-button.js';
import './button-group.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button Group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A custom-built button group.',
      },
    },
  },
  render: (arguments_) => html`
    <cs-button-group aria-label="group label" ?vertical=${arguments_.vertical}>
      <cs-button-group-button value="button-1" selected
        >Button 1</cs-button-group-button
      >
      <cs-button-group-button value="button-2">Button 2</cs-button-group-button>
      <cs-button-group-button value="button-3">Button 3</cs-button-group-button>
    </cs-button-group>
  `,
  args: {
    vertical: false,
  },
  argTypes: {
    vertical: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

export const Default: StoryObj = {};

export const DefaultWithVertical: StoryObj = {
  name: 'Default (With Vertical)',
  args: {
    vertical: true,
  },
};

export const DefaultWithPrefixIcon: StoryObj = {
  name: 'Default (With Prefix Icon)',
  render: (arguments_) => html`
    <cs-button-group aria-label="group label" ?vertical=${arguments_.vertical}>
      <cs-button-group-button value="button-1" selected>
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
        Button 1
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
        Button 2
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
        Button 3
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithVerticalPrefixIcon: StoryObj = {
  name: 'Default (With Vertical and Prefix Icon)',
  args: {
    vertical: true,
  },
  render: (arguments_) => html`
    <cs-button-group aria-label="group label" ?vertical=${arguments_.vertical}>
      <cs-button-group-button value="button-1" selected>
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
        Button 1
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
        Button 2
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
        Button 3
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithOnlyPrefixIcon: StoryObj = {
  name: 'Default (With Only Prefix Icon)',
  args: {
    vertical: false,
  },
  render: (arguments_) => html`
    <cs-button-group aria-label="group label" ?vertical=${arguments_.vertical}>
      <cs-button-group-button value="button-1" selected>
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Button 1"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Button 2"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Button 3"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithVerticalOnlyPrefixIcon: StoryObj = {
  name: 'Default (With Vertical and Only Prefix Icon)',
  args: {
    vertical: true,
  },
  render: (arguments_) => html`
    <cs-button-group aria-label="group label" ?vertical=${arguments_.vertical}>
      <cs-button-group-button value="button-1" selected>
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Button 1"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      </cs-button-group-button>
      <cs-button-group-button value="button-2">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Button 2"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      </cs-button-group-button>
      <cs-button-group-button value="button-3">
        <svg
          slot="prefix"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="Button 3"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M12 16L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
        </svg>
      </cs-button-group-button>
    </cs-button-group>
  `,
};

export const DefaultWithNoCheck: StoryObj = {
  name: 'Default (With None Selected)',
  render: (arguments_) => html`
    <cs-button-group aria-label="group label" ?vertical=${arguments_.vertical}>
      <cs-button-group-button value="button-1">Button 1</cs-button-group-button>
      <cs-button-group-button value="button-2">Button 2</cs-button-group-button>
      <cs-button-group-button value="button-3">Button 3</cs-button-group-button>
    </cs-button-group>
  `,
};
