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
        Add <cs-toasts> somewhere in your application template.
        This will be the container for toast messages,
        and provides an add() method that you will use to generate toast messages.
      -->
      <cs-toasts></cs-toasts>
      <div style="display:flex; flex-direction: column; gap: 0.25rem;">
        <cs-button variant="secondary" data-add-informational
          >Informational</cs-button
        >
        <cs-button variant="secondary" data-add-success>Success</cs-button>
        <cs-button variant="secondary" data-add-longer
          >Longer duration</cs-button
        >
        <cs-button variant="secondary" data-add-infinite
          >Infinite duration</cs-button
        >
      </div>
      <script>
        const toasts = document.querySelector('cs-toasts');
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
