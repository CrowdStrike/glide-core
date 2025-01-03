import './icons/storybook.js';
import './menu.button.js';
import './menu.link.js';
import './split-button.js';
import './split-button.primary-button.js';
import './split-button.primary-link.js';
import './split-button.secondary-button.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
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
    context.canvasElement
      .querySelector('glide-core-split-button')
      ?.addEventListener('click', (event: Event) => {
        const isMenuLink =
          event.target instanceof Element &&
          event.target.closest('glide-core-menu-link');

        if (isMenuLink && window.top) {
          event.preventDefault();

          // The Storybook user expects to navigate when the link is clicked but
          // doesn't expect to be redirected to the first story. So we refresh the
          // page to give the impression of a navigation while keeping the user
          // on the same page.
          window.top.location.reload();
        }
      });

    const secondaryButton = context.canvasElement.querySelector(
      'glide-core-split-button-secondary-button',
    );

    const observer = new MutationObserver(() => {
      addons.getChannel().emit(UPDATE_STORY_ARGS, {
        storyId: context.id,
        updatedArgs: {
          ['<glide-core-split-button-secondary-button>.menu-open']:
            context.canvasElement.querySelector<GlideCoreSplitButtonSecondaryButton>(
              'glide-core-split-button-secondary-button',
            )?.menuOpen,
        },
      });
    });

    if (secondaryButton) {
      observer.observe(secondaryButton, {
        attributes: true,
        attributeFilter: ['menu-open'],
      });
    }
  },
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
    size: 'large',
    variant: 'primary',
    '<glide-core-split-button-primary-button>.label': 'Label',
    '<glide-core-split-button-primary-button>.disabled': false,
    '<glide-core-split-button-primary-button>[slot="icon"]': '',
    '<glide-core-split-button-primary-link>.label': 'Label',
    '<glide-core-split-button-primary-link>.url': '/',
    '<glide-core-split-button-primary-link>.disabled': false,
    '<glide-core-split-button-primary-link>[slot="icon"]': '',
    '<glide-core-split-button-secondary-button>.label': 'Label',
    '<glide-core-split-button-secondary-button>[slot="default"]': '',
    '<glide-core-split-button-secondary-button>.disabled': false,
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
    '<glide-core-split-button-primary-button>.label': {
      name: 'label',
      type: { name: 'string', required: true },
      table: {
        category: 'Split Button Primary Button',
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-primary-button>.disabled': {
      name: 'disabled',
      table: {
        category: 'Split Button Primary Button',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-split-button-primary-button>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Split Button Primary Button',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-split-button-primary-link>.label': {
      name: 'label',
      type: { name: 'string', required: true },
      table: {
        category: 'Split Button Primary Link',
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-primary-link>.url': {
      name: 'url',
      type: { name: 'string', required: true },
      table: {
        category: 'Split Button Primary Link',
        type: { summary: 'string' },
      },
    },
    '<glide-core-split-button-primary-link>.disabled': {
      name: 'disabled',
      table: {
        category: 'Split Button Primary Link',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-split-button-primary-link>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Split Button Primary Link',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-split-button-secondary-button>.label': {
      name: 'label',
      type: { name: 'string', required: true },
      table: {
        category: 'Split Button Secondary Button',
        type: { summary: 'string', detail: '// For screenreaders' },
      },
    },
    '<glide-core-split-button-secondary-button>[slot="default"]': {
      name: 'slot="default"',
      table: {
        category: 'Split Button Secondary Button',
        type: {
          summary: 'GlideCoreMenuButton | GlideCoreMenuLink',
        },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-split-button-secondary-button>.disabled': {
      name: 'disabled',
      table: {
        category: 'Split Button Secondary Button',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-split-button-secondary-button>.menu-open': {
      name: 'menu-open',
      table: {
        category: 'Split Button Secondary Button',
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      type: { name: 'boolean' },
    },
    '<glide-core-split-button-secondary-button>.menu-placement': {
      name: 'menu-placement',
      control: { type: 'select' },
      options: ['bottom-end', 'top-end'],
      table: {
        category: 'Split Button Secondary Button',
        defaultValue: { summary: '"bottom-end"' },
        type: {
          summary: '"bottom-end" | "top-end"',
        },
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
