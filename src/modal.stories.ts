import './button.js';
import './icons/storybook.js';
import './tooltip.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreModal from './modal.js';
import focusOutline from './styles/focus-outline.js';

const meta: Meta = {
  title: 'Modal',
  decorators: [
    withActions,
    (story) => {
      return html`
        <style>
          [slot="target"] {
            background-color: transparent;
            border: none;
            border-radius: 50%;
            outline-offset: 1px;
            padding: 0;

            &:focus-visible {
              ${focusOutline};
            }
          }
        </style>

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

    context.canvasElement
      .querySelector('glide-core-modal')
      ?.addEventListener('toggle', (event: Event) => {
        if (event.target instanceof GlideCoreModal) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              open: event.target.open,
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        severity=${arguments_.severity || nothing}
        size=${arguments_.size}
        ?back-button=${arguments_['back-button']}
        ?open=${arguments_.open}
      >
        ${unsafeHTML(arguments_['slot="default"'])}
      </glide-core-modal>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': 'Content',
    'addEventListener(event, handler)': '',
    'back-button': false,
    open: false,
    severity: '',
    size: 'medium',
    'slot="header-actions"': '',
    'slot="primary"': '',
    'slot="secondary"': '',
    'slot="tertiary"': '',
    version: '',
    '<glide-core-modal-icon-button>.label': 'Edit',
    '<glide-core-modal-icon-button>[slot="default"]': '',
    '<glide-core-modal-icon-button>.version': '',
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
    severity: {
      control: { type: 'select' },
      options: ['', 'informational', 'medium', 'critical'],
      table: {
        type: {
          summary: `"informational" | "medium" | "high" | "critical"`,
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
          summary: 'GlideCoreButton | GlideCoreTooltip',
        },
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
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
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
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
        import '@crowdstrike/glide-core/modal.icon-button.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        severity=${arguments_.severity || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

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

export const WithPrimaryButton: StoryObj = {
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        severity=${arguments_.severity || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

        <glide-core-button label="Primary" slot="primary"></glide-core-button>
      </glide-core-modal>
    `;
  },
};

export const WithSecondaryButton: StoryObj = {
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        severity=${arguments_.severity || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
};

export const WithTertiaryTooltipAndButton: StoryObj = {
  /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        severity=${arguments_.severity || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

        <glide-core-tooltip label="Tooltip" slot="tertiary">
          <button aria-label="Tooltip:" slot="target">
            <glide-core-example-icon name="info"></glide-core-example-icon>
          </button>
        </glide-core-tooltip>

        <glide-core-button
          label="Tertiary"
          slot="tertiary"
          variant="tertiary"
        ></glide-core-button>
      </glide-core-modal>
    `;
  },
};

export const KitchenSink: StoryObj = {
  /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/modal.js';
      </script>

      <glide-core-modal
        label=${arguments_.label || nothing}
        severity=${arguments_.severity || nothing}
        ?back-button="${arguments_['back-button']}"
        ?open=${arguments_.open}
      >
        ${arguments_['slot="default"']}

        <glide-core-modal-icon-button
          slot="header-actions"
          label=${arguments_['<glide-core-modal-icon-button>.label']}
        >
          <glide-core-example-icon name="edit"></glide-core-example-icon>
        </glide-core-modal-icon-button>

        <glide-core-modal-icon-button slot="header-actions" label="Settings">
          <glide-core-example-icon name="settings"></glide-core-example-icon>
        </glide-core-modal-icon-button>

        <glide-core-tooltip label="Tooltip" slot="tertiary" screenreader-hidden>
          <button aria-label="Tooltip:" slot="target">
            <glide-core-example-icon name="info"></glide-core-example-icon>
          </button>
        </glide-core-tooltip>

        <glide-core-button
          label="Tertiary"
          slot="tertiary"
          variant="tertiary"
        ></glide-core-button>

        <glide-core-button
          label="Secondary"
          slot="secondary"
          variant="tertiary"
        ></glide-core-button>

        <glide-core-button label="Primary" slot="primary"></glide-core-button>
      </glide-core-modal>
    `;
  },
};
