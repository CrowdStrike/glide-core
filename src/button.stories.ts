import './button.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A button with optional icons.',
      },
    },
  },
  render: (arguments_) => {
    /* eslint-disable unicorn/explicit-length-check */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/button.js';
      </script>

      <form>
        <glide-core-button
          formaction=${arguments_.formaction || nothing}
          formenctype=${arguments_.formenctype || nothing}
          formmethod=${arguments_.formmethod || nothing}
          formtarget=${arguments_.formtarget || nothing}
          name=${arguments_.name || nothing}
          popovertarget=${arguments_.popovertarget || nothing}
          popovertargetaction=${arguments_.popovertargetaction || nothing}
          size=${arguments_.size || nothing}
          type=${arguments_.type || nothing}
          value=${arguments_.value || nothing}
          variant=${arguments_.variant || nothing}
          ?autofocus=${arguments_.autofocus}
          ?disabled=${arguments_.disabled || nothing}
          ?formnovalidate=${arguments_.formnovalidate}
          >${arguments_['slot="default"']}</glide-core-button
        >
      </form>
    `;
  },
  args: {
    'slot="default"': 'Button',
    autofocus: false,
    disabled: false,
    form: '',
    formaction: '',
    formenctype: 'application/x-www-form-urlencoded',
    formmethod: 'get',
    formnovalidate: false,
    formtarget: '_self',
    name: '',
    popovertarget: '',
    popovertargetaction: 'toggle',
    size: 'large',
    type: 'button',
    value: '',
    variant: 'primary',
  },
  argTypes: {
    'slot="default"': {
      control: { type: 'text' },
      table: {
        type: { summary: 'Element | string' },
      },
      type: { name: 'string', required: true },
    },
    autofocus: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    form: {
      control: false,
      table: {
        defaultValue: {
          summary: 'null',
        },
        type: { summary: 'readonly HTMLFormElement | readonly null' },
      },
    },
    formaction: {
      table: {
        defaultValue: {
          summary: '""',
        },
      },
    },
    formenctype: {
      control: { type: 'select' },
      options: [
        '',
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/plain',
      ],
      table: {
        defaultValue: {
          summary: '"application/x-www-form-urlencoded"',
        },
        type: {
          summary:
            '"application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain"',
        },
      },
    },
    formmethod: {
      control: { type: 'select' },
      options: ['', 'dialog', 'get', 'post'],
      table: {
        defaultValue: {
          summary: '"get"',
        },
        type: {
          summary: '"dialog" | "get" | "post"',
        },
      },
    },
    formnovalidate: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    formtarget: {
      control: { type: 'select' },
      options: ['', '_blank', '_parent', '_self', '_top'],
      table: {
        defaultValue: {
          summary: '"_self"',
        },
        type: {
          summary: '"_blank" | "_parent" | "_self" | "_top"',
        },
      },
    },
    name: {
      table: {
        defaultValue: {
          summary: '""',
        },
      },
    },
    popovertargetaction: {
      control: { type: 'select' },
      options: ['', 'hide', 'show', 'toggle'],
      table: {
        defaultValue: {
          summary: '"toggle"',
        },
        type: {
          summary: '"hide" | "show" | "toggle"',
        },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'small'],
      table: {
        defaultValue: {
          summary: '"large"',
        },
        type: { summary: '"large" | "small"' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'reset', 'submit'],
      table: {
        defaultValue: {
          summary: '"button"',
        },
        type: { summary: '"button" | "reset" | "submit"' },
      },
    },
    value: {
      control: { type: 'text' },
      table: {
        defaultValue: {
          summary: '""',
        },
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        defaultValue: {
          summary: '"primary"',
        },
        type: { summary: '"primary" | "secondary" | "tertiary"' },
      },
    },
  },
};

export default meta;

export const Button: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render: (arguments_) => html`
    <script type="ignore">
      import '@crowdstrike/glide-core/button.js';
    </script>

    <glide-core-button
      formaction=${arguments_.formaction || nothing}
      formenctype=${arguments_.formenctype || nothing}
      formmethod=${arguments_.formmethod || nothing}
      formtarget=${arguments_.formtarget || nothing}
      name=${arguments_.name || nothing}
      popovertarget=${arguments_.popovertarget || nothing}
      popovertargetaction=${arguments_.popovertargetaction || nothing}
      size=${arguments_.size || nothing}
      type=${arguments_.type || nothing}
      value=${arguments_.value || nothing}
      variant=${arguments_.variant || nothing}
      ?autofocus=${arguments_.autofocus}
      ?disabled=${arguments_.disabled}
      ?formnovalidate=${arguments_.formnovalidate}
    >
      ${arguments_['slot="default"']}

      <glide-core-example-icon
        slot="prefix"
        name="calendar"
      ></glide-core-example-icon>

      <glide-core-example-icon
        slot="suffix"
        name="chevron-down"
      ></glide-core-example-icon>
    </glide-core-button>
  `,
};
