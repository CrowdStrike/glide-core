import './icons/storybook.js';
import './menu.button.js';
import './menu.link.js';
import './split-button.js';
import './split-button.primary-button.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import SplitButtonPrimaryLinkComponent from './split-button.primary-link.js';
import SplitButtonSecondaryButtonComponent from './split-button.secondary-button.js';

const meta: Meta = {
  title: 'Split Button',
  decorators: [
    withActions,
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
    actions: {
      // Menu Button and Link are selected so "click" events from Menu's target
      // aren't picked up, muddying the Actions tab.
      handles: [
        'click glide-core-menu-button',
        'click glide-core-menu-button',
        'click glide-core-split-button-primary-button',
        'toggle',
      ],
    },
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
        const menuLink =
          event.target instanceof Element &&
          event.target.closest('glide-core-menu-link');

        // If the URL is anything but `/`, then the user has changed the URL and wants
        // to navigate to it.
        if (menuLink && menuLink.href === '/' && window.top) {
          event.preventDefault();

          // The Storybook user expects to navigate when the link is clicked but
          // doesn't expect to be redirected to the first story. So we refresh the
          // page to give the impression of a navigation while keeping the user
          // on the same page.
          window.top.location.reload();
        }
      });

    context.canvasElement
      .querySelector('glide-core-split-button-primary-link')
      ?.addEventListener('click', (event: Event) => {
        // If the URL is anything but `/`, then the user has changed the URL and wants
        // to navigate to it.
        if (
          event.target instanceof SplitButtonPrimaryLinkComponent &&
          event.target.href === '/' &&
          window.top
        ) {
          event.preventDefault();

          // The Storybook user expects to navigate when the link is clicked but
          // doesn't expect to be redirected to the first story. So we refresh the
          // page to give the impression of a navigation while keeping the user
          // on the same page.
          window.top.location.reload();
        }
      });

    context.canvasElement
      .querySelector('glide-core-split-button-secondary-button')
      ?.addEventListener('toggle', (event: Event) => {
        if (event.target instanceof SplitButtonSecondaryButtonComponent) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              ['<glide-core-split-button-secondary-button>.menu-open']:
                !event.target.menuOpen,
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-split-button
        variant=${arguments_.variant === 'primary'
          ? nothing
          : arguments_.variant}
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
          ] === 'bottom-end'
            ? nothing
            : arguments_[
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
          <glide-core-menu-link label="Three" href="/"></glide-core-menu-link>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>
    `;
  },
  args: {
    'slot="default"': '',
    'slot="secondary-button"': '',
    variant: 'primary',
    version: '',
    '<glide-core-split-button-primary-button>.label': 'Label',
    '<glide-core-split-button-primary-button>.addEventListener(event, handler)':
      '',
    '<glide-core-split-button-primary-button>.disabled': false,
    '<glide-core-split-button-primary-button>[slot="icon"]': '',
    '<glide-core-split-button-primary-button>.version': '',
    '<glide-core-split-button-primary-link>.label': 'Label',
    '<glide-core-split-button-primary-link>.disabled': false,
    '<glide-core-split-button-primary-link>.href': '/',
    '<glide-core-split-button-primary-link>[slot="icon"]': '',
    '<glide-core-split-button-primary-link>.version': '',
    '<glide-core-split-button-secondary-button>.label': 'Label',
    '<glide-core-split-button-secondary-button>[slot="default"]': '',
    '<glide-core-split-button-secondary-button>.disabled': false,
    '<glide-core-split-button-secondary-button>.menu-open': false,
    '<glide-core-split-button-secondary-button>.menu-placement': 'bottom-end',
    '<glide-core-split-button-secondary-button>.version': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: {
          summary: 'SplitButtonPrimaryButton | SplitButtonPrimaryLink',
        },
      },
      type: { name: 'function', required: true },
    },
    'slot="secondary-button"': {
      table: {
        type: {
          summary: 'SplitButtonSecondaryButton',
        },
      },
      type: { name: 'function', required: true },
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
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
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
    '<glide-core-split-button-primary-button>.addEventListener(event, handler)':
      {
        control: false,
        name: 'addEventListener(event, handler)',
        table: {
          category: 'Split Button Primary Button',
          type: {
            summary: 'method',
            detail:
              '(event: "click", handler: (event: PointerEvent) => void): void',
          },
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
    '<glide-core-split-button-primary-button>.version': {
      name: 'version',
      control: false,
      table: {
        category: 'Split Button Primary Button',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
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
    '<glide-core-split-button-primary-link>.disabled': {
      name: 'disabled',
      table: {
        category: 'Split Button Primary Link',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-split-button-primary-link>.href': {
      name: 'href',
      type: { name: 'string' },
      table: {
        category: 'Split Button Primary Link',
        type: { summary: 'string' },
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
    '<glide-core-split-button-primary-link>.version': {
      name: 'version',
      control: false,
      table: {
        category: 'Split Button Primary Link',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
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
          summary: 'MenuButton | MenuLink',
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
    '<glide-core-split-button-secondary-button>.version': {
      name: 'version',
      control: false,
      table: {
        category: 'Split Button Secondary Button',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
  },
};

export default meta;

export const SplitButton: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcon: StoryObj = {
  /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
  render(arguments_) {
    return html`
      <glide-core-split-button
        variant=${arguments_.variant === 'primary'
          ? nothing
          : arguments_.variant}
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
          ] === 'bottom-end'
            ? nothing
            : arguments_[
                '<glide-core-split-button-secondary-button>.menu-placement'
              ]}
          slot="secondary-button"
          ?disabled=${arguments_[
            '<glide-core-split-button-secondary-button>.disabled'
          ]}
        >
          <glide-core-menu-button label="One"></glide-core-menu-button>
          <glide-core-menu-button label="Two"></glide-core-menu-button>
          <glide-core-menu-link label="Three" href="/"></glide-core-menu-link>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>
    `;
  },
};

export const WithPrimaryLink: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-split-button
        variant=${arguments_.variant === 'primary'
          ? nothing
          : arguments_.variant}
      >
        <glide-core-split-button-primary-link
          label=${arguments_['<glide-core-split-button-primary-link>.label']}
          href=${arguments_['<glide-core-split-button-primary-link>.href']}
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
          ] === 'bottom-end'
            ? nothing
            : arguments_[
                '<glide-core-split-button-secondary-button>.menu-placement'
              ]}
          slot="secondary-button"
          ?disabled=${arguments_[
            '<glide-core-split-button-secondary-button>.disabled'
          ]}
        >
          <glide-core-menu-button label="One"></glide-core-menu-button>
          <glide-core-menu-button label="Two"></glide-core-menu-button>
          <glide-core-menu-link label="Three" href="/"></glide-core-menu-link>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>
    `;
  },
};
