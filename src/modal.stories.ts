import './button.js';
import './icons/storybook.js';
import './modal.tertiary-icon.js';
import './tooltip.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreModal from './modal.js';

const meta: Meta = {
  title: 'Modal',
  decorators: [
    withActions,
    (story) => {
      return html`
        ${story()}
        <glide-core-button label="Open"></glide-core-button>
      `;
    },
  ],
  parameters: {
    actions: {
      handles: ['toggle'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-modal ~ glide-core-button')
      ?.addEventListener('click', () => {
        const modal = context.canvasElement.querySelector('glide-core-modal');

        if (modal) {
          modal.open = true;
        }
      });

    const modal = context.canvasElement.querySelector('glide-core-modal');

    const observer = new MutationObserver(() => {
      if (modal instanceof GlideCoreModal) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            open: modal.open,
          },
        });
      }
    });

    if (modal) {
      observer.observe(modal, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        size=${arguments_.size}
        ?back-button=${arguments_['back-button']}
        ?open=${arguments_.open}
      >
        ${unsafeHTML(arguments_['slot="default"'])}

        <glide-core-button label="Primary" slot="primary"></glide-core-button>

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': 'Content',
    'addEventListener(event, handler)': '',
    'back-button': false,
    open: false,
    size: 'medium',
    'slot="header-actions"': '',
    'slot="primary"': '',
    'slot="secondary"': '',
    'slot="tertiary"': '',
    version: '',
    '<glide-core-modal-icon-button>.label': 'Edit',
    '<glide-core-modal-icon-button>[slot="default"]': '',
    '<glide-core-modal-icon-button>.version': '',
    '<glide-core-modal-tertiary-icon>.label': 'Information',
    '<glide-core-modal-tertiary-icon>[slot="default"]': '',
    '<glide-core-modal-tertiary-icon>.tooltip-placement': 'bottom',
    '<glide-core-modal-tertiary-icon>.version': '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'slot="default"': {
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(event: "toggle", handler: (event: Event)) => void): void',
        },
      },
    },
    'back-button': {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: {
          detail: '// Adds a button to the header that closes Modal on click',
          summary: 'boolean',
        },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large', 'xlarge'],
      table: {
        defaultValue: {
          summary: '"medium"',
        },
        type: { summary: '"small" | "medium" | "large" | "xlarge"' },
      },
    },
    'slot="header-actions"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreModalIconButton',
        },
      },
    },
    'slot="primary"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreButton',
        },
      },
    },
    'slot="secondary"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreButton',
        },
      },
    },
    'slot="tertiary"': {
      control: false,
      table: {
        type: {
          summary: 'GlideCoreButton | GlideCoreModalTertiaryIcon',
        },
      },
    },
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-modal-icon-button>.label': {
      name: 'label',
      table: {
        category: 'Modal Icon Button',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-modal-icon-button>[slot="default"]': {
      name: 'slot="default"',
      control: false,
      table: {
        category: 'Modal Icon Button',
        type: { summary: 'Element', detail: 'An icon' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-modal-icon-button>.version': {
      control: false,
      name: 'version',
      table: {
        category: 'Modal Icon Button',
        defaultValue: {
          summary: import.meta.env.VITE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-modal-tertiary-icon>.label': {
      name: 'label',
      table: {
        category: 'Modal Tertiary Icon',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-modal-tertiary-icon>[slot="default"]': {
      name: 'slot="default"',
      control: false,
      table: {
        category: 'Modal Tertiary Icon',
        type: { summary: 'Element', detail: 'An icon' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-modal-tertiary-icon>.tooltip-placement': {
      name: 'tooltip-placement',
      control: { type: 'radio' },
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        category: 'Modal Tertiary Icon',
        defaultValue: { summary: '"bottom"' },
        type: {
          summary: '"top" | "right" | "bottom" | "left"',
          detail:
            '// The tooltip will try to move itself to the opposite of this value if not doing so would result in\n// overflow. For example, if "bottom" results in overflow the tooltip will try "top" but not "right"\n// or "left".',
        },
      },
    },
    '<glide-core-modal-tertiary-icon>.version': {
      control: false,
      name: 'version',
      table: {
        category: 'Modal Tertiary Icon',
        defaultValue: {
          summary: import.meta.env.VITE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
  },
};

export default meta;

export const Modal: StoryObj = {
  tags: ['!autodocs'],
};

export const WithHeaderActions: StoryObj = {
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
        import '@crowdstrike/glide-core/modal.icon-button.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>

        <!-- Only "glide-core-modal-icon-button" components should be used with header-actions -->
        <glide-core-modal-icon-button
          slot="header-actions"
          label=${arguments_['<glide-core-modal-icon-button>.label']}
        >
          <glide-core-example-icon name="edit"></glide-core-example-icon>
        </glide-core-modal-icon-button>

        <glide-core-modal-icon-button slot="header-actions" label="Settings">
          <glide-core-example-icon name="settings"></glide-core-example-icon>
        </glide-core-modal-icon-button>
      </glide-core-modal>
    `;
  },
};

export const WithTertiaryButton: StoryObj = {
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

        <glide-core-button label="Primary" slot="primary"></glide-core-button>

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>

        <glide-core-button
          label="Tertiary"
          slot="tertiary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
};

export const WithTertiaryIconAndButton: StoryObj = {
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
        import '@crowdstrike/glide-core/modal.tertiary-icon.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

        <glide-core-button label="Primary" slot="primary"></glide-core-button>

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>

        <glide-core-modal-tertiary-icon
          label=${arguments_['<glide-core-modal-tertiary-icon>.label']}
          slot="tertiary"
          tooltip-placement=${arguments_[
            '<glide-core-modal-tertiary-icon>.tooltip-placement'
          ]}
        >
          <glide-core-example-icon name="info"></glide-core-example-icon>
        </glide-core-modal-tertiary-icon>

        <glide-core-button
          label="Tertiary"
          slot="tertiary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
};
