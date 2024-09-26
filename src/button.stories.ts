import './button.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  tags: ['autodocs'],
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, unicorn/explicit-length-check */
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/button.js';
      </script>

      <form>
        <glide-core-button
          aria-controls=${arguments_['aria-controls'] || nothing}
          aria-expanded=${arguments_['aria-expanded'] || nothing}
          aria-haspopup=${arguments_['aria-haspopup'] || nothing}
          formaction=${arguments_.formaction || nothing}
          formenctype=${arguments_.formenctype || nothing}
          formmethod=${arguments_.formmethod || nothing}
          formtarget=${arguments_.formtarget || nothing}
          label=${arguments_.label || nothing}
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
        >
          ${unsafeHTML(arguments_['slot="default"'])}
        </glide-core-button>
      </form>
    `;
  },
  args: {
    label: 'Label',
    'aria-controls': '',
    'aria-expanded': '',
    'aria-haspopup': '',
    autofocus: false,
    'click()': '',
    disabled: false,
    'focus(options)': '',
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
    'slot="prefix-icon"': '',
    'slot="suffix-icon"': '',
    type: 'button',
    value: '',
    variant: 'primary',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'aria-controls': {
      table: {
        defaultValue: {
          summary: 'null',
        },
      },
    },
    'aria-expanded': {
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: 'null',
        },
        type: {
          summary: '"true" | "false"',
        },
      },
      options: ['', 'true', 'false'],
    },
    'aria-haspopup': {
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: 'null',
        },
        type: {
          summary:
            '"true" | "false" | "menu" | "listbox" | "tree" | "grid" | "dialog"',
        },
      },
      options: [
        '',
        'true',
        'false',
        'menu',
        'listbox',
        'tree',
        'grid',
        'dialog',
      ],
    },
    autofocus: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    'click()': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '() => void',
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
    'focus(options)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail: '(options?: FocusOptions) => void',
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
      options: ['', 'get', 'dialog', 'post'],
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
    'slot="prefix-icon"': {
      control: false,
      table: {
        type: { summary: 'Element' },
      },
    },
    'slot="suffix-icon"': {
      control: false,
      table: {
        type: { summary: 'Element' },
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
  render(arguments_) {
    return html`
      <script type="ignore">
        import '@crowdstrike/glide-core/button.js';
      </script>

      <glide-core-button
        aria-controls=${arguments_['aria-controls'] || nothing}
        aria-expanded=${arguments_['aria-expanded'] || nothing}
        aria-haspopup=${arguments_['aria-haspopup'] || nothing}
        formaction=${arguments_.formaction || nothing}
        formenctype=${arguments_.formenctype || nothing}
        formmethod=${arguments_.formmethod || nothing}
        formtarget=${arguments_.formtarget || nothing}
        label=${arguments_.label || nothing}
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
          slot="prefix-icon"
          name="calendar"
        ></glide-core-example-icon>
        <glide-core-example-icon
          slot="suffix-icon"
          name="pencil"
        ></glide-core-example-icon>
      </glide-core-button>
    `;
  },
};
