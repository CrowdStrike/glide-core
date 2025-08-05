import './spinner.js';
import { nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Spinner',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/spinner.js';
      </script>

      ${story()}
    `,
  ],
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-spinner
        label=${arguments_.label || nothing}
        size=${arguments_.size === 'medium' ? nothing : arguments_.size}
      ></glide-core-spinner>
    `;
  },
  args: {
    label: 'Label',
    size: 'medium',
    version: '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
      type: { name: 'string', required: true },
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small'],
      table: {
        defaultValue: {
          summary: '"medium"',
        },
        type: { summary: '"large" | "medium" | "small"' },
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
};

export default meta;

export const Spinner: StoryObj = {};
