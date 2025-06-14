import './button.js';
import './icons/storybook.js';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  decorators: [
    withActions,
    (story) => html`
      <form action="/">
        <script type="ignore">
          import '@crowdstrike/glide-core/button.js';
        </script>

        ${story()}
      </form>
    `,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    context.canvasElement
      .querySelector('form')
      ?.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // We reload the page to give the impression of a submission while keeping
        // the user on the same page.
        window.location.reload();
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-button
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        size=${arguments_.size === 'large' ? nothing : arguments_.size}
        tooltip=${arguments_.tooltip || nothing}
        type=${arguments_.type === 'button' ? nothing : arguments_.type}
        value=${arguments_.value || nothing}
        variant=${arguments_.variant === 'primary'
          ? nothing
          : arguments_.variant}
        ?disabled=${arguments_.disabled || nothing}
      >
        ${unsafeHTML(arguments_['slot="default"'])}
      </glide-core-button>
    `;
  },
  args: {
    label: 'Label',
    'addEventListener(event, handler)': '',
    disabled: false,
    name: '',
    size: 'large',
    'slot="prefix-icon"': '',
    'slot="suffix-icon"': '',
    type: 'button',
    tooltip: '',
    value: '',
    variant: 'primary',
    version: '',
  },
  argTypes: {
    label: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    'addEventListener(event, handler)': {
      control: false,
      table: {
        type: {
          summary: 'method',
          detail:
            '(event: "click", handler: (event: PointerEvent) => void): void',
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
    name: {
      table: {
        defaultValue: {
          summary: '""',
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
    tooltip: {
      table: {
        type: {
          summary: 'string',
          detail: 'Shown when Button is disabled',
        },
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

export const Button: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-button
        label=${arguments_.label || nothing}
        name=${arguments_.name || nothing}
        size=${arguments_.size === 'large' ? nothing : arguments_.size}
        tooltip=${arguments_.tooltip || nothing}
        type=${arguments_.type === 'button' ? nothing : arguments_.type}
        value=${arguments_.value || nothing}
        variant=${arguments_.variant === 'primary'
          ? nothing
          : arguments_.variant}
        ?disabled=${arguments_.disabled || nothing}
      >
        ${arguments_['slot="default"']}

        <glide-core-example-icon
          slot="prefix-icon"
          name="calendar"
        ></glide-core-example-icon>

        <glide-core-example-icon
          slot="suffix-icon"
          name="edit"
        ></glide-core-example-icon>
      </glide-core-button>
    `;
  },
};
