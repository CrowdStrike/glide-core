import './button.js';
import './link.js';
import './toast.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { addons } from '@storybook/preview-api';
import { withActions } from '@storybook/addon-actions/decorator';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { ifDefined } from 'lit/directives/if-defined.js';
import uniqueId from './library/unique-id.js';

interface Toast {
  description?: string;
  id?: string;
  label?: string;
  duration?: number;
  variant?: 'informational' | 'success' | 'error';
}

// Set in `render()`, these are either the initial arguments as defined by
// `meta.args` or they're updated arguments after the user has interacted
// with a control. They're used in the `play()` method's "click" handler to
// ensure that new Toasts added via the Add button always reflect what the
// user sees in the controls table.
let updatedArguments: {
  id?: string;
  label?: string;
  duration?: number;
  'slot="default"'?: string;
  variant?: 'informational' | 'success' | 'error';
} & {
  toasts?: Toast[];
};

const meta: Meta = {
  title: 'Toast',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/toast.js';
      </script>

      ${story()}
    `,
  ],
  parameters: {
    actions: {
      handles: ['dismiss'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    label: 'Label',
    'addEventListener(event, handler)': '',
    duration: '',
    'slot="default"': '',
    toasts: [] as Toast[],
    variant: 'informational',
    version: '',
  },
  argTypes: {
    label: {
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: `
(event: "dismiss", handler: (event: Event) => void): void

// If you're generating Toasts by iterating through an array, make sure you listen for
// this event and update the array so Toasts already seen by the user aren't shown again.
// This is especially important if the array or data structure you're using is persisted
// somewhere.
`,
        },
      },
    },
    duration: {
      // "text" instead of "number" so users can set the value to "Infinity".
      control: { type: 'text' },
      table: {
        type: {
          summary: 'number',
          detail:
            '// Set to `Infinity` to make it persist until dismissed by the user',
        },
      },
    },
    'slot="default"': {
      table: {
        type: { summary: 'Link | string' },
      },
    },
    toasts: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: { type: 'radio' },
      options: ['informational', 'success', 'error'],
      table: {
        defaultValue: { summary: '"informational"' },
        type: { summary: '"informational" | "success" | "error"' },
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
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-button')
      ?.addEventListener('click', (event: Event) => {
        if (updatedArguments?.toasts && event.target instanceof HTMLElement) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              toasts: [
                ...updatedArguments.toasts,
                {
                  id: uniqueId(),

                  // The data attributes are used by Toast's visual and ARIA tests. They're
                  // not ideal. But they're better than those tests selecting and manipulating
                  // elements in the controls table to get themselves in the right state before
                  // taking a snapshot.
                  label: event.target.dataset.label ?? updatedArguments.label,
                  description:
                    event.target.dataset.description ??
                    updatedArguments['slot="default"'],
                  duration:
                    event.target.dataset.duration ?? updatedArguments.duration,
                  variant:
                    event.target.dataset.variant ?? updatedArguments.variant,
                },
              ],
            },
          });
        }
      });
  },
  render(arguments_, context) {
    // This method's `arguments_` appears to be the only place we have access to
    // argument values after they've been changed via a control. Everywhere else,
    // including `context.args` above and in `play()`, the arguments are what they
    // were initially as defined by `meta.args`.
    updatedArguments = arguments_;

    function onDismiss(event: Event) {
      if (updatedArguments.toasts) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            toasts: updatedArguments.toasts.filter((toast) => {
              return (
                event.target instanceof Element && toast.id !== event.target.id
              );
            }),
          },
        });
      }
    }

    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-button label="Add"></glide-core-button>

      ${repeat(
        arguments_.toasts,
        ({ id }) => id,
        (toast: {
          id: string;
          description?: string;
          duration?: number;
          label: string;
          variant?: 'informational' | 'success' | 'error';
        }) => {
          return html`
            <glide-core-toast
              duration=${ifDefined(toast.duration || undefined)}
              label=${ifDefined(toast.label || undefined)}
              id=${toast.id}
              variant=${ifDefined(
                toast.variant && toast.variant !== 'informational'
                  ? toast.variant
                  : undefined,
              )}
              @dismiss=${onDismiss}
            >
              ${toast.description ? unsafeHTML(toast.description) : nothing}
            </glide-core-toast>
          `;
        },
      )}
    `;
  },
};

export default meta;

export const Toasts: StoryObj = {};
