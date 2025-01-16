import './button.js';
import './toasts.js';
import './toasts.toast.js';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Toasts',
  decorators: [
    (story) =>
      html`<script type="ignore">
          import '@crowdstrike/glide-core/toasts.js';
        </script>

        ${story()} `,
  ],
  args: {
    'add(toast)': '',
    version: '',
  },
  argTypes: {
    'add(toast)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: `
(toast: {
    label: string;
    description: string;
    variant: "error" | "informational" | "success";
    duration?: number;
  }
) => void`,
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
  },
  render() {
    return html`
      <!--
  Add \`<glide-core-toasts>\` to your template. It's the container for
  messages. It supports an \`add()\` method for generating them.
-->
      <glide-core-toasts></glide-core-toasts>

      <div
        style=${styleMap({
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '0.25rem',
        })}
      >
        <glide-core-button
          label="Informational"
          id="informational"
        ></glide-core-button>
        <glide-core-button label="Success" id="success"></glide-core-button>
        <glide-core-button label="Error" id="error"></glide-core-button>
        <glide-core-button
          label="Longer duration"
          id="longer"
        ></glide-core-button>
        <glide-core-button
          label="Infinite duration"
          id="infinite"
        ></glide-core-button>
      </div>

      <script>
        const toasts = document.querySelector('glide-core-toasts');

        document
          .querySelector('#informational')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'informational',
              label: 'Informational',
              description: 'This will stick around for 5 seconds',
            });
          });

        document.querySelector('#success').addEventListener('click', () => {
          toasts.add({
            variant: 'success',
            label: 'Success',
            description: 'This will stick around for 5 seconds',
          });
        });

        document.querySelector('#error').addEventListener('click', () => {
          toasts.add({
            variant: 'error',
            label: 'Error',
            description: 'This will stick around for 5 seconds',
          });
        });

        document.querySelector('#longer').addEventListener('click', () => {
          toasts.add({
            variant: 'informational',
            label: 'Longer',
            description: 'This will stick around for 10 seconds',
            duration: 10000, // Minimum is 5000 (5 seconds)
          });
        });

        document.querySelector('#infinite').addEventListener('click', () => {
          toasts.add({
            variant: 'success',
            label: 'Success',
            description: 'This will stick around until close button is clicked',
            duration: Infinity,
          });
        });
      </script>
    `;
  },
};

export default meta;

export const Toasts: StoryObj = {};
