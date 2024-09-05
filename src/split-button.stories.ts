import './icons/storybook.js';
import './menu.button.js';
import './menu.link.js';
import './split-button.js';
import './split-container.js';
import './split-link.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Split Button',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<div
        style="height: 13rem; display: flex; align-items: center; justify-content: center;"
      >
        ${story()}
      </div>`,
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A pair of buttons. One is the primary action. The other controls a menu of alternate actions.',
      },
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const links = context.canvasElement.querySelectorAll(
      'glide-core-menu-link',
    );

    for (const link of links) {
      // Prevent navigation. The URLs don't go anywhere.
      link.addEventListener('click', (event) => event.preventDefault());
    }
  },
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/split-container.js';
      import '@crowdstrike/glide-core/split-button.js';
      import '@crowdstrike/glide-core/menu.link.js';
      import '@crowdstrike/glide-core/menu.button.js';
    </script>

    <glide-core-split-container
      menu-label=${arguments_['menu-label'] || nothing}
      menu-placement=${arguments_['menu-placement'] || nothing}
      size=${arguments_.size > 0 ? arguments_.size : nothing}
      variant=${arguments_.variant || nothing}
      ?disabled=${arguments_.disabled || nothing}
      ?open=${arguments_.open || nothing}
    >
      <glide-core-split-button slot="primary-action">
        Button
      </glide-core-split-button>

      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `,
  args: {
    'menu-label': 'Label',
    'slot="primary-action"': '',
    'slot="default"': '',
    disabled: false,
    'menu-placement': 'bottom-end',
    open: false,
    size: 'large',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary"' },
      },
    },

    open: {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'small'],
      table: {
        defaultValue: {
          summary: '"large"',
        },
        type: { summary: '"large" | "small"' },
      },
    },
    'menu-label': {
      control: { type: 'text' },
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
    },
    'menu-placement': {
      control: { type: 'select' },
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
        'top-start',
        'top-end',
      ],
      table: {
        defaultValue: { summary: '"bottom-end"' },
        type: {
          summary:
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start"| "top-end"',
        },
      },
    },
    'slot="primary-action"': {
      table: {
        type: { summary: 'GlideCoreSplitButton | GlideCoreSplitLink' },
      },
      type: { name: 'function', required: true },
    },
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreMenuButton | GlideCoreMenuLink' },
      },
      type: { name: 'function', required: true },
    },
  },
};

export default meta;

export const SplitButton: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcon: StoryObj = {
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/split-container.js';
      import '@crowdstrike/glide-core/split-button.js';
      import '@crowdstrike/glide-core/menu.link.js';
      import '@crowdstrike/glide-core/menu.button.js';
    </script>

    <glide-core-split-container
      ?open=${arguments_.open || nothing}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement'] ?? nothing}
    >
      <glide-core-split-button slot="primary-action">
        <glide-core-example-icon
          slot="prefix"
          name="info"
        ></glide-core-example-icon>

        Button
      </glide-core-split-button>

      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `,
};

export const WithSplitLink: StoryObj = {
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/split-container.js';
      import '@crowdstrike/glide-core/split-button.js';
      import '@crowdstrike/glide-core/menu.link.js';
      import '@crowdstrike/glide-core/menu.button.js';
    </script>

    <glide-core-split-container
      ?open=${arguments_.open || nothing}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled || nothing}
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement']}
    >
      <glide-core-split-link slot="primary-action" url="/">
        Button
      </glide-core-split-link>

      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `,
};
