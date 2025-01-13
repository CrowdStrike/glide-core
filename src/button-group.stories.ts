import './button-group.js';
import './icons/storybook.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { when } from 'lit/directives/when.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreButton from './button-group.button.js';

const meta: Meta = {
  title: 'Button Group',
  tags: ['autodocs'],
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/button-group.js';
        import '@crowdstrike/glide-core/button-group.button.js';
      </script>

      ${story()}
    `,
  ],
  parameters: {
    actions: {
      handles: ['selected'],
    },
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play(context) {
    const buttonGroup = context.canvasElement.querySelector(
      'glide-core-button-group',
    );

    buttonGroup?.addEventListener('selected', (event: Event) => {
      if (event.target instanceof GlideCoreButton) {
        addons.getChannel().emit(UPDATE_STORY_ARGS, {
          storyId: context.id,
          updatedArgs: {
            '<glide-core-button-group-button>.one.selected':
              event.target.label === 'One',
            '<glide-core-button-group-button>.two.selected':
              event.target.label === 'Two',
            '<glide-core-button-group-button>.three.selected':
              event.target.label === 'Three',
          },
        });
      }
    });
  },
  render(arguments_) {
    return html`
      <glide-core-button-group
        label=${arguments_.label || nothing}
        orientation=${arguments_.orientation || nothing}
        variant=${arguments_.variant || nothing || nothing}
      >
        ${when(
          arguments_.variant === 'icon-only',
          () => {
            return html`<glide-core-button-group-button
                label=${arguments_['<glide-core-button-group-button>.label'] ||
                nothing}
                value=${arguments_['<glide-core-button-group-button>.value'] ||
                nothing}
                ?disabled=${arguments_[
                  '<glide-core-button-group-button>.disabled'
                ]}
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.one.selected'
                ]}
              >
                <glide-core-example-icon
                  slot="icon"
                  name="info"
                ></glide-core-example-icon>
              </glide-core-button-group-button>

              <glide-core-button-group-button
                label="Two"
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.two.selected'
                ]}
              >
                <glide-core-example-icon
                  slot="icon"
                  name="edit"
                ></glide-core-example-icon>
              </glide-core-button-group-button>

              <glide-core-button-group-button
                label="Three"
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.three.selected'
                ]}
              >
                <glide-core-example-icon
                  slot="icon"
                  name="calendar"
                ></glide-core-example-icon>
              </glide-core-button-group-button>`;
          },
          () => {
            return html`<glide-core-button-group-button
                label=${arguments_['<glide-core-button-group-button>.label'] ||
                nothing}
                value=${arguments_['<glide-core-button-group-button>.value'] ||
                nothing}
                ?disabled=${arguments_[
                  '<glide-core-button-group-button>.disabled'
                ]}
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.one.selected'
                ]}
              >
              </glide-core-button-group-button>

              <glide-core-button-group-button
                label="Two"
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.two.selected'
                ]}
              ></glide-core-button-group-button>

              <glide-core-button-group-button
                label="Three"
                ?selected=${arguments_[
                  '<glide-core-button-group-button>.three.selected'
                ]}
              ></glide-core-button-group-button>`;
          },
        )}
      </glide-core-button-group>
    `;
  },
  args: {
    label: 'Label',
    'slot="default"': '',
    orientation: 'horizontal',
    variant: '',
    '<glide-core-button-group-button>.label': 'One',
    '<glide-core-button-group-button>.addEventListener(event, handler)': '',
    '<glide-core-button-group-button>.disabled': false,
    '<glide-core-button-group-button>.one.selected': true,
    '<glide-core-button-group-button>[slot="icon"]': '',
    '<glide-core-button-group-button>.value': '',
    '<glide-core-button-group-button>.two.selected': false,
    '<glide-core-button-group-button>.three.selected': false,
  },
  argTypes: {
    label: {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string', detail: '// For screenreaders' },
      },
    },
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreButtonGroupButton' },
      },
      type: { name: 'function', required: true },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: '"horizontal"',
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['', 'icon-only'],
      table: {
        type: { summary: '"icon-only"' },
      },
    },
    '<glide-core-button-group-button>.label': {
      name: 'label',
      table: {
        category: 'Button Group Button',
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-button-group-button>.addEventListener(event, handler)': {
      name: 'addEventListener(event, handler)',
      control: false,
      table: {
        category: 'Button Group Button',
        type: {
          summary: 'method',
          detail: '(event: "selected", handler: (event: Event) => void): void',
        },
      },
    },
    '<glide-core-button-group-button>.disabled': {
      name: 'disabled',
      defaultValue: { summary: 'false' },
      table: {
        category: 'Button Group Button',
      },
    },
    '<glide-core-button-group-button>.one.selected': {
      name: 'selected',
      defaultValue: { summary: 'false' },
      table: {
        category: 'Button Group Button',
      },
    },
    '<glide-core-button-group-button>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Button Group Button',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-button-group-button>.value': {
      name: 'value',
      table: {
        category: 'Button Group Button',
        type: {
          summary: 'string',
          detail:
            '// Set `value` when you need something other than button `label`s to identify the selected button',
        },
      },
    },
    '<glide-core-button-group-button>.two.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-button-group-button>.three.selected': {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

export const ButtonGroup: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-button-group
        label=${arguments_.label || nothing}
        orientation=${arguments_.orientation}
        variant=${arguments_.variant || nothing}
      >
        <glide-core-button-group-button
          label=${arguments_['<glide-core-button-group-button>.label'] ||
          nothing}
          value=${arguments_['<glide-core-button-group-button>.value'] ||
          nothing}
          ?disabled=${arguments_['<glide-core-button-group-button>.disabled']}
          ?selected=${arguments_[
            '<glide-core-button-group-button>.one.selected'
          ]}
        >
          <glide-core-example-icon
            slot="icon"
            name="info"
          ></glide-core-example-icon>
        </glide-core-button-group-button>

        <glide-core-button-group-button
          label="Two"
          ?selected=${arguments_[
            '<glide-core-button-group-button>.two.selected'
          ]}
        >
          <glide-core-example-icon
            slot="icon"
            name="edit"
          ></glide-core-example-icon>
        </glide-core-button-group-button>

        <glide-core-button-group-button
          label="Three"
          ?selected=${arguments_[
            '<glide-core-button-group-button>.three.selected'
          ]}
        >
          <glide-core-example-icon
            slot="icon"
            name="calendar"
          ></glide-core-example-icon>
        </glide-core-button-group-button>
      </glide-core-button-group>
    `;
  },
};
