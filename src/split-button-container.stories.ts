import './icons/storybook.js';
import './menu.button.js';
import './menu.link.js';
import './split-button-container.button.js';
import './split-button-container.js';
import './split-button-container.link.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import GlideCoreSplitButtonContainer from './split-button-container.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Split Button Container',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A container for a pair of buttons. One is the primary action. The other opens a menu.',
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

    const splitButtonContainer = context.canvasElement.querySelector(
      'glide-core-split-button-container',
    );

    const observer = new MutationObserver((entries) => {
      const hasOpenChanged = entries.some(
        ({ attributeName }) => attributeName === 'menu-open',
      );

      if (hasOpenChanged) {
        addons.getChannel().emit(STORY_ARGS_UPDATED, {
          storyId: context.id,
          args: {
            ...arguments_,
            ['menu-open']:
              context.canvasElement.querySelector<GlideCoreSplitButtonContainer>(
                'glide-core-split-button-container',
              )?.menuOpen,
          },
        });
      }
    });

    if (splitButtonContainer) {
      observer.observe(splitButtonContainer, { attributes: true });
    }
  },
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/split-button-container.js';
      import '@crowdstrike/glide-core/split-button-container.button.js';
      import '@crowdstrike/glide-core/menu.link.js';
      import '@crowdstrike/glide-core/menu.button.js';
    </script>

    <glide-core-split-button-container
      menu-label=${arguments_['menu-label'] || nothing}
      menu-placement=${arguments_['menu-placement']}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
      ?menu-open=${arguments_['menu-open']}
    >
      <glide-core-split-button-container-button
        label=${arguments_['<glide-core-split-button-container-button>.label']}
        slot="primary-action"
      ></glide-core-split-button-container-button>

      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
      <glide-core-menu-link label="Three" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `,
  args: {
    'menu-label': 'Label',
    'slot="default"': '',
    'slot="primary-action"': '',
    '<glide-core-split-button-container-button>.label': 'Label',
    '<glide-core-split-button-container-link>.label': 'Label',
    '<glide-core-split-button-container-link>.url': '/',
    'click(options)': '',
    disabled: false,
    'focus(options)': '',
    'menu-open': false,
    'menu-placement': 'bottom-end',
    size: 'large',
    variant: 'primary',
    '<glide-core-split-button-container-button>[slot="icon"]': '',
    '<glide-core-split-button-container-link>[slot="icon"]': '',
  },
  argTypes: {
    'menu-label': {
      control: { type: 'text' },
      type: { name: 'string', required: true },
      table: {
        defaultValue: {
          summary: '""',
        },
        type: { summary: 'string', detail: '// For screenreaders' },
      },
    },
    'slot="primary-action"': {
      table: {
        type: {
          summary:
            'GlideCoreSplitButtonContainerButton | GlideCoreSplitButtonContainerLink',
        },
      },
      type: { name: 'function', required: true },
    },
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreMenuButton | GlideCoreMenuLink' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-split-button-container-button>.label': {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-container-link>.label': {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-container-link>.url': {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    'click(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(options?: { target?: "menu-button" }) => void',
        },
      },
    },
    'focus(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(options?: FocusOptions & { target?: "menu-button" }) => void',
        },
      },
    },
    'menu-open': {
      control: { type: 'boolean' },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    'menu-placement': {
      control: { type: 'select' },
      options: ['top-end', 'bottom-end'],
      table: {
        defaultValue: { summary: '"bottom-end"' },
        type: {
          summary: '"top-end" | "bottom-end"',
        },
      },
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
    '<glide-core-split-button-container-button>[slot="icon"]': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    '<glide-core-split-button-container-link>[slot="icon"]': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
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
      import '@crowdstrike/glide-core/split-button-container.js';
      import '@crowdstrike/glide-core/split-button-container.button.js';
      import '@crowdstrike/glide-core/menu.link.js';
      import '@crowdstrike/glide-core/menu.button.js';
    </script>

    <glide-core-split-button-container
      menu-label=${arguments_['menu-label'] || nothing}
      menu-placement=${arguments_['menu-placement']}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
      ?menu-open=${arguments_['menu-open']}
    >
      <glide-core-split-button-container-button
        label=${arguments_['<glide-core-split-button-container-button>.label']}
        slot="primary-action"
      >
        <glide-core-example-icon
          slot="icon"
          name="info"
        ></glide-core-example-icon>
      </glide-core-split-button-container-button>

      <glide-core-menu-button label="One"></glide-core-menu-button>
      <glide-core-menu-button label="Two"></glide-core-menu-button>
      <glide-core-menu-link label="Three" url="/"></glide-core-menu-link>
    </glide-core-split-button-container>
  `,
};

export const WithPrimaryActionLink: StoryObj = {
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/split-button-container.js';
      import '@crowdstrike/glide-core/split-button-container.link.js';
      import '@crowdstrike/glide-core/menu.link.js';
      import '@crowdstrike/glide-core/menu.button.js';
    </script>

    <glide-core-split-button-container
      menu-label=${arguments_['menu-label']}
      menu-placement=${arguments_['menu-placement']}
      size=${arguments_.size}
      variant=${arguments_.variant}
      ?disabled=${arguments_.disabled}
      ?menu-open=${arguments_['menu-open']}
    >
      <glide-core-split-button-container-link
        label=${arguments_['<glide-core-split-button-container-link>.label']}
        slot="primary-action"
        url=${arguments_['<glide-core-split-button-container-link>.url']}
      >
      </glide-core-split-button-container-link>

      <glide-core-menu-link label="One" url="/"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-button-container>
  `,
};
