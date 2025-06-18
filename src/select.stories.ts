import './button.js';
import './select.js';
import './options.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import './option.js';
// TODO: remove if i remove the filter story
import './input.js';

const meta: Meta = {
  title: 'Select',
  decorators: [
    withActions,
    (story) =>
      html`<script type="ignore">
          import '@crowdstrike/glide-core/select.js';
          import '@crowdstrike/glide-core/options.js';
          import '@crowdstrike/glide-core/option.js';
        </script>

        ${story()}`,
  ],
  parameters: {
    actions: {
      // TODO
      // Menu Button and Link are selected so "click" events from Menu's target
      // aren't picked up, muddying the Actions tab.
      handles: ['click', 'input', 'change', 'toggle'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  args: {
    'slot="default"': '',
    'slot="target"': '',
    'addEventListener(event, handler)': '',
    loading: false,
    offset: 4,
    open: false,
    placement: 'bottom-start',
    version: '',
    '<glide-core-options>[slot="default"]': '',
    '<glide-core-options>.version': '',
    '<glide-core-option>.label': 'One',
    '<glide-core-option>.disabled': false,
    '<glide-core-option>.href': '/',
    '<glide-core-option>.version': '',
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'MenuOptions' },
      },
      type: { name: 'function', required: true },
    },
    'slot="target"': {
      table: {
        type: {
          summary: 'Element',
          detail:
            '// The element to which the menu will anchor. Can be any focusable element.',
        },
      },
      type: { name: 'function', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "click" | "toggle", handler: (event: Event) => void): void',
        },
      },
    },
    loading: {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
          detail: `
// Add this attribute when asynchronously updating Menu Options' default slot. Remove it after the
// slot has been updated.
`,
        },
      },
    },
    offset: {
      table: {
        defaultValue: { summary: '4' },
        type: { summary: 'number' },
      },
    },
    open: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placement: {
      control: { type: 'select' },
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
        'top-start',
        'top-end',
      ],
      table: {
        defaultValue: { summary: '"bottom-start"' },
        type: {
          summary:
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start"| "top-end"',
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
  },
  render(arguments_) {
    return html`<glide-core-select
      label=${arguments_.label}
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?loading=${arguments_.loading}
      ?open=${arguments_.open}
    >
      <glide-core-button label="Toggle" slot="target"></glide-core-button>

      <glide-core-options>
        <glide-core-option label="One" value="one"></glide-core-option>
        <glide-core-option label="Two" value="two"></glide-core-option>
      </glide-core-options>
    </glide-core-select>`;
  },
};

export default meta;

export const Select: StoryObj = {};

export const WithFiltering: StoryObj = {
  render(arguments_) {
    return html`<glide-core-select
      label=${arguments_.label}
      offset=${arguments_.offset === 4 ? nothing : arguments_.offset}
      placement=${arguments_.placement === 'bottom-start'
        ? nothing
        : arguments_.placement}
      ?loading=${arguments_.loading}
      ?open=${arguments_.open}
    >
      <glide-core-input
        label="Label"
        slot="target"
        hide-label
      ></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One" value="one"></glide-core-option>
        <glide-core-option label="Two" value="two"></glide-core-option>
        <glide-core-option label="Three" value="three"></glide-core-option>
      </glide-core-options>
    </glide-core-select>`;
  },
};
