import { nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import LinkComponent from './link.js';

const meta: Meta = {
  title: 'Link',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/link.js';
      </script>

      ${story()}
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
      .querySelector('glide-core-link')
      ?.addEventListener('click', (event: Event) => {
        if (
          event.target instanceof LinkComponent &&
          event.target.href === '/' &&
          window.top
        ) {
          event.preventDefault();

          // The Storybook user expects to navigate when the link is clicked but
          // doesn't expect to be redirected to the first story, which "/" would do.
          // So we navigate to the current URL or reload the page.
          if (event.target.target === '_blank') {
            window.open(window.top.location.href);
          } else {
            window.top.location.reload();
          }
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-link
        label=${arguments_.label || nothing}
        download=${arguments_.download || nothing}
        href=${arguments_.href || nothing}
        target=${arguments_.target || nothing}
        ?disabled=${arguments_.disabled || nothing}
      ></glide-core-link>
    `;
  },
  args: {
    label: 'Label',
    'addEventListener(event, handler)': '',
    disabled: false,
    download: '',
    href: '/',
    target: '',
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
    download: {
      table: {
        type: { summary: 'string' },
      },
    },
    href: {
      table: {
        type: { summary: 'string' },
      },
      type: { name: 'string' },
    },
    target: {
      control: {
        type: 'select',
      },
      options: ['', '_blank', '_parent', '_self', '_top'],
      table: {
        type: { summary: '"_blank" | "_parent" | "_self" | "_top"' },
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

export const Link: StoryObj = {};
