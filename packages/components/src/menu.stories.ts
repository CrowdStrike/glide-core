import './button.js';
import './menu.button.js';
import './menu.js';
import './menu.link.js';
import { html, nothing } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A basic menu.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    ['slot="default"']: '',
    ['slot="target"']: '',
    open: false,
    size: 'large',
  },
  argTypes: {
    ['slot="default"']: {
      table: {
        type: { summary: 'CsMenuLink | CsMenuButton' },
      },
      type: { name: 'string', required: true },
    },
    ['slot="target"']: {
      table: {
        type: { summary: 'A focusable element' },
      },
      type: { name: 'string', required: true },
    },
    open: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'large'],
      table: {
        defaultValue: { summary: '"large"' },
        type: { summary: '"small" | "large"' },
      },
    },
  },
  play(context) {
    const links = context.canvasElement.querySelectorAll('cs-menu-link');

    for (const link of links) {
      // Prevent navigation. The URLs don't go anywhere.
      link.addEventListener('click', (event) => event.preventDefault());
    }
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`<div style="height: 8rem;">
      <cs-menu
        label=${arguments_.label || nothing}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <cs-menu-link label="One" url="/one"> </cs-menu-link>
        <cs-menu-link label="Two" url="/two"> </cs-menu-link>
        <!--
          If an option does not have an associated url,
          you can use <cs-menu-button> and provide your own click handler
        -->
        <cs-menu-button label="Three"> </cs-menu-button>

        <cs-button slot="target" variant="secondary"> Target </cs-button>
      </cs-menu>
    </div>`;
  },
};

export default meta;

export const Menu: StoryObj = {};

export const MenuWithIcon: StoryObj = {
  name: 'Menu (With Icon)',
  render(arguments_) {
    return html`<div style="height: 10rem;">
      <cs-menu
        label=${arguments_.label || nothing}
        size=${arguments_.size || nothing}
        ?open=${arguments_.open}
      >
        <cs-menu-link label="Edit" url="/edit">
          <svg
            slot="icon"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </cs-menu-link>

        <cs-menu-link label="Delete" url="/delete">
          <svg
            slot="icon"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </cs-menu-link>

        <cs-menu-link label="Download" url="/download">
          <svg
            slot="icon"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
        </cs-menu-link>

        <cs-menu-link label="Settings" url="/settings">
          <svg
            slot="icon"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
            />

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </cs-menu-link>

        <cs-button slot="target" variant="secondary"> Target </cs-button>
      </cs-menu>
    </div>`;
  },
};
