import './button.js';
import './toasts.js';
import './toasts.toast.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Toasts',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container and controller for toast messages.',
      },
    },
  },
  argTypes: {
    'add(toast)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(toast: Toast) => void',
        },
      },
    },
  },
  render() {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/toasts.js';
      </script>

      <!--
  Add \`<glide-core-toasts>\` to your template. It's the container for 
  messages. It supports an \`add()\` method for generating them.
-->
      <glide-core-toasts></glide-core-toasts>

      <div style="display: inline-flex; flex-direction: column; gap: 0.25rem;">
        <glide-core-button data-informational>
          Informational
        </glide-core-button>
        <glide-core-button data-success> Success </glide-core-button>
        <glide-core-button data-longer> Longer duration </glide-core-button>
        <glide-core-button data-infinite> Infinite duration </glide-core-button>
      </div>

      <script>
        const toasts = document.querySelector('glide-core-toasts');

        document
          .querySelector('[data-informational]')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'informational',
              label: 'Informational',
              description: 'This will stick around for 5 seconds',
            });
          });

        document
          .querySelector('[data-success]')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'success',
              label: 'Success',
              description: 'This will stick around for 5 seconds',
            });
          });

        document
          .querySelector('[data-longer]')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'informational',
              label: 'Longer',
              description: 'This will stick around for 10 seconds',
              duration: 10000, // Minimum is 5000 (5 seconds)
            });
          });

        document
          .querySelector('[data-infinite]')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'success',
              label: 'Success',
              description:
                'This will stick around until close button is clicked',
              duration: Infinity,
            });
          });
      </script>
    `;
  },
};

export default meta;

export const Toasts: StoryObj = {
  tags: ['!dev'],
};
