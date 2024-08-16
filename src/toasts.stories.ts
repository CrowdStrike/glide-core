import './button.js';
import './toasts.js';
import './toasts.toast.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [(story) => html`<div style="height: 20rem;">${story()}</div>`],
  title: 'Toasts',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container and controller for toast messages',
      },
    },
  },
  argTypes: {
    'add(toast: Toast)': {
      type: 'function',
      table: {
        type: {
          summary: 'method',
          detail: 'Adds a toast.',
        },
      },
    },
  },
  render() {
    return html`
      <!--
  Add <glide-core-toasts> somewhere in your application template.
  This will be the container for toast messages,
  and provides an add() method that you will use to generate toast messages.
-->
      <glide-core-toasts></glide-core-toasts>

      <div style="display:flex; flex-direction: column; gap: 0.25rem;">
        <glide-core-button variant="secondary" data-add-informational
          >Informational</glide-core-button
        >
        <glide-core-button variant="secondary" data-add-success
          >Success</glide-core-button
        >
        <glide-core-button variant="secondary" data-add-longer
          >Longer duration</glide-core-button
        >
        <glide-core-button variant="secondary" data-add-infinite
          >Infinite duration</glide-core-button
        >
      </div>
      <script>
        const toasts = document.querySelector('glide-core-toasts');
        document
          .querySelector('[data-add-informational]')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'informational',
              label: 'Informational',
              description: 'This will stick around for 5 seconds',
            });
          });
        document
          .querySelector('[data-add-success]')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'success',
              label: 'Success',
              description: 'This will stick around for 5 seconds',
            });
          });
        document
          .querySelector('[data-add-longer]')
          .addEventListener('click', () => {
            toasts.add({
              variant: 'informational',
              label: 'Longer',
              description: 'This will stick around for 10 seconds',
              duration: 10000, // Minimum is 5000 (5 seconds)
            });
          });
        document
          .querySelector('[data-add-infinite]')
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

export const Default: StoryObj = {};
