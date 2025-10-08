import './label.js';
import { html, nothing } from 'lit';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import { when } from 'lit/directives/when.js';

const meta: Meta = {
  title: 'Label',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/label.js';
      </script>

      ${story()}
    `,
  ],
  args: {
    label: 'Label',
    'slot="default"': 'Label',
    'slot="control"': '',
    'slot="description"': '',
    disabled: false,
    error: false,
    'hide-label': false,
    orientation: 'horizontal',
    required: false,
    'slot="summary"': '',
    split: '',
    tooltip: '',
    version: '',
  },
  argTypes: {
    label: {
      table: {
        type: {
          summary: 'string',
          detail: `
// Shown in a tooltip when the content of the default slot is truncated and hovered. This attribute's
// value should be the same as the text content of the default slot.`,
        },
      },
      type: { name: 'string', required: true },
    },
    'slot="default"': {
      table: {
        type: {
          summary: 'Element',
          detail:
            "// The label for your control. Usually a `<label>`. Don't forget to associate this element with your control using `for`.",
        },
      },
      type: { name: 'string', required: true },
    },
    'slot="control"': {
      control: false,
      table: {
        type: {
          summary: 'Element',
        },
      },
      type: { name: 'function', required: true },
    },
    'slot="description"': {
      table: {
        type: {
          summary: 'string | Element',
          detail: '// Content shown below the "control" slot',
        },
      },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
          detail: `
// Disables the tooltip that's shown on the default slot when it is truncated and hovered. Also adds a
// "not-allowed" cursor to the "control" slot when hovered.
`,
        },
      },
    },
    error: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
          detail:
            '// Changes the color of the "description" slot to indicate your control failed to pass validation.',
        },
      },
    },
    'hide-label': {
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
        },
      },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    required: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        table: {
          type: {
            detail: '// Adds an asterisk after the default slot',
          },
        },
      },
    },
    'slot="summary"': {
      table: {
        type: {
          summary: 'boolean',
          detail: '// Content shown to the right the "control" slot',
        },
      },
    },
    split: {
      control: 'select',
      options: ['', 'left', 'middle', 'right'],
      table: {
        type: {
          summary: '"left" | "middle" | "right"',
          detail: `
// The layout of the default and "control" slots:
//
// - "left": 1/3 of the available space for the default slot. 2/3 for "control" slot.
// - "middle": 1/2 of the available space the default slot. 1/2 for "control" slot.
// - "right": 2/3 of the available space the default slot. 1/3 for "control" slot.
`,
        },
      },
    },
    tooltip: {
      table: {
        type: {
          summary: 'string',
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
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-label
        label=${arguments_.label || nothing}
        orientation=${arguments_.orientation || nothing}
        split=${arguments_.split || nothing}
        tooltip=${arguments_.tooltip || nothing}
        ?disabled=${arguments_.disabled || nothing}
        ?error=${arguments_.error || nothing}
        ?hide-label=${arguments_['hide-label'] || nothing}
        ?required=${arguments_.required || nothing}
      >
        <label for="input"> ${arguments_['slot="default"']} </label>
        <input id="input" slot="control" />
        ${when(
          arguments_['slot="summary"'],
          () =>
            html` <div slot="summary">${arguments_['slot="summary"']}</div>`,
        )}
        ${when(
          arguments_['slot="description"'],
          () =>
            html` <div slot="description">
              ${arguments_['slot="description"']}
            </div>`,
        )}
      </glide-core-label>
    `;
  },
};

export default meta;

export const Label: StoryObj = {};
