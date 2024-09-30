import './icons/storybook.js';
import './menu.button.js';
import './menu.link.js';
import './split-button.js';
import './split-button.primary-button.js';
import './split-button.primary-link.js';
import './split-button.secondary-button.js';
import { STORY_ARGS_UPDATED } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';

const meta: Meta = {
  title: 'Split Button',
  tags: ['autodocs'],
  decorators: [
    (story) =>
      html`<form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/split-button.js';
          import '@crowdstrike/glide-core/split-button.primary-link.js';
          import '@crowdstrike/glide-core/split-button.secondary-button.js';
          import '@crowdstrike/glide-core/menu.button.js';
          import '@crowdstrike/glide-core/menu.link.js';
        </script>

        ${story()}
      </form>`,
  ],
  parameters: {
    docs: {
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
      'glide-core-split-button-secondary-button',
    );

    const observer = new MutationObserver(() => {
      addons.getChannel().emit(STORY_ARGS_UPDATED, {
        storyId: context.id,
        args: {
          ...arguments_,
          ['<glide-core-split-button-secondary-button>.menu-open']:
            context.canvasElement.querySelector<GlideCoreSplitButtonSecondaryButton>(
              'glide-core-split-button-secondary-button',
            )?.menuOpen,
        },
      });
    });

    if (splitButtonContainer) {
      observer.observe(splitButtonContainer, {
        attributes: true,
        attributeFilter: ['menu-open'],
      });
    }
  },
  render(arguments_) {
    /* eslint-disable unicorn/explicit-length-check */
    return html`
      <glide-core-split-button
        size=${arguments_.size}
        variant=${arguments_.variant}
      >
        <glide-core-split-button-primary-button
          label=${arguments_[
            '<glide-core-split-button-primary-button>.label'
          ] || nothing}
          ?disabled=${arguments_[
            '<glide-core-split-button-primary-button>.disabled'
          ]}
        ></glide-core-split-button-primary-button>

        <glide-core-split-button-secondary-button
          label=${arguments_[
            '<glide-core-split-button-secondary-button>.label'
          ] || nothing}
          menu-placement=${arguments_[
            '<glide-core-split-button-secondary-button>.menu-placement'
          ]}
          slot="secondary-button"
          ?disabled=${arguments_[
            '<glide-core-split-button-secondary-button>.disabled'
          ]}
          ?menu-open=${arguments_[
            '<glide-core-split-button-secondary-button>.menu-open'
          ]}
        >
          <glide-core-menu-button label="One"></glide-core-menu-button>
          <glide-core-menu-button label="Two"></glide-core-menu-button>
          <glide-core-menu-link label="Three" url="/"></glide-core-menu-link>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>
    `;
  },
  args: {
    'slot="default"': '',
    'slot="secondary-button"': '',
    '<glide-core-split-button-primary-button>.label': 'Label',
    '<glide-core-split-button-primary-link>.label': 'Label',
    '<glide-core-split-button-primary-link>.url': '/',
    '<glide-core-split-button-secondary-button>.label': 'Label',
    '<glide-core-split-button-secondary-button>[slot="default"]': '',
    size: 'large',
    variant: 'primary',
    '<glide-core-split-button-primary-button>.click()': '',
    '<glide-core-split-button-primary-button>.disabled': false,
    '<glide-core-split-button-primary-button>.focus(options)': '',
    '<glide-core-split-button-primary-button>[slot="icon"]': '',
    '<glide-core-split-button-primary-link>.click()': '',
    '<glide-core-split-button-primary-link>.disabled': false,
    '<glide-core-split-button-primary-link>.focus(options)': '',
    '<glide-core-split-button-link>[slot="icon"]': '',
    '<glide-core-split-button-secondary-button>.click()': '',
    '<glide-core-split-button-secondary-button>.disabled': false,
    '<glide-core-split-button-secondary-button>.focus(options)': '',
    '<glide-core-split-button-secondary-button>.menu-open': false,
    '<glide-core-split-button-secondary-button>.menu-placement': 'bottom-end',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: {
          summary:
            'GlideCoreSplitButtonPrimaryButton | GlideCoreSplitButtonPrimaryLink',
        },
      },
      type: { name: 'function', required: true },
    },
    'slot="secondary-button"': {
      table: {
        type: {
          summary: 'GlideCoreSplitButtonSecondaryButton',
        },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-split-button-primary-button>.label': {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-primary-link>.label': {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-primary-link>.url': {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-secondary-button>.label': {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
    },
    '<glide-core-split-button-secondary-button>[slot="default"]': {
      table: {
        type: {
          summary: 'GlideCoreMenuButton | GlideCoreMenuLink',
        },
      },
      type: { name: 'function', required: true },
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
    '<glide-core-split-button-primary-button>.click()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    '<glide-core-split-button-primary-button>.disabled': {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-split-button-primary-button>.focus(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(options?: FocusOptions) => void',
        },
      },
    },
    '<glide-core-split-button-primary-button>[slot="icon"]': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    '<glide-core-split-button-primary-link>.click()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    '<glide-core-split-button-primary-link>.disabled': {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-split-button-primary-link>.focus(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(options?: FocusOptions) => void',
        },
      },
    },
    '<glide-core-split-button-link>[slot="icon"]': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    '<glide-core-split-button-secondary-button>.click()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
        },
      },
    },
    '<glide-core-split-button-secondary-button>.focus(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(options?: FocusOptions) => void',
        },
      },
    },
    '<glide-core-split-button-secondary-button>.menu-open': {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    '<glide-core-split-button-secondary-button>.menu-placement': {
      control: { type: 'select' },
      options: ['bottom-end', 'top-end'],
      table: {
        defaultValue: { summary: '"bottom-end"' },
        type: {
          summary: '"bottom-end" | "top-end"',
        },
      },
    },
    '<glide-core-split-button-secondary-button>.disabled': {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

export const SplitButton: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcon: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-split-button
        size=${arguments_.size}
        variant=${arguments_.variant}
      >
        <glide-core-split-button-primary-button
          label=${arguments_[
            '<glide-core-split-button-primary-button>.label'
          ] || nothing}
          ?disabled=${arguments_[
            '<glide-core-split-button-primary-button>.disabled'
          ]}
        >
          <glide-core-example-icon
            slot="icon"
            name="info"
          ></glide-core-example-icon>
        </glide-core-split-button-primary-button>

        <glide-core-split-button-secondary-button
          label=${arguments_[
            '<glide-core-split-button-secondary-button>.label'
          ] || nothing}
          ?menu-open=${arguments_[
            '<glide-core-split-button-secondary-button>.menu-open'
          ]}
          menu-placement=${arguments_[
            '<glide-core-split-button-secondary-button>.menu-placement'
          ]}
          slot="secondary-button"
          ?disabled=${arguments_[
            '<glide-core-split-button-secondary-button>.disabled'
          ]}
        >
          <glide-core-menu-button label="One"></glide-core-menu-button>
          <glide-core-menu-button label="Two"></glide-core-menu-button>
          <glide-core-menu-link label="Three" url="/"></glide-core-menu-link>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>
    `;
  },
};

export const WithPrimaryLink: StoryObj = {
  render(arguments_) {
    // eslint-disable unicorn/explicit-length-check
    return html`
      <glide-core-split-button
        size=${arguments_.size}
        variant=${arguments_.variant}
      >
        <glide-core-split-button-primary-link
          label=${arguments_['<glide-core-split-button-primary-link>.label']}
          url=${arguments_['<glide-core-split-button-primary-link>.url']}
          ?disabled=${arguments_[
            '<glide-core-split-button-primary-link>.disabled'
          ]}
        >
        </glide-core-split-button-primary-link>

        <glide-core-split-button-secondary-button
          label=${arguments_[
            '<glide-core-split-button-secondary-button>.label'
          ]}
          ?menu-open=${arguments_[
            '<glide-core-split-button-secondary-button>.menu-open'
          ]}
          menu-placement=${arguments_[
            '<glide-core-split-button-secondary-button>.menu-placement'
          ]}
          slot="secondary-button"
          ?disabled=${arguments_[
            '<glide-core-split-button-secondary-button>.disabled'
          ]}
        >
          <glide-core-menu-button label="One"></glide-core-menu-button>
          <glide-core-menu-button label="Two"></glide-core-menu-button>
          <glide-core-menu-link label="Three" url="/"></glide-core-menu-link>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>
    `;
  },
};
