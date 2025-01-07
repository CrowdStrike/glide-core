import './icons/storybook.js';
import './tab.group.js';
import './tab.panel.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import GlideCoreTab from './tab.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Tab Group',
  tags: ['autodocs'],
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tab.group.js';
        import '@crowdstrike/glide-core/tab.panel.js';
        import '@crowdstrike/glide-core/tab.js';
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
  args: {
    'slot="default"': '',
    'slot="nav"': '',
    '--panel-padding-inline-end': '',
    '--panel-padding-inline-start': '',
    '--tabs-padding-block-end': '',
    '--tabs-padding-block-start': '',
    '--tabs-padding-inline-end': '',
    '--tabs-padding-inline-start': '',
    '<glide-core-tab>.panel': '',
    '<glide-core-tab>[slot="default"]': 'Tab',
    '<glide-core-tab>.1.selected': true,
    '<glide-core-tab>.addEventListener(event, handler)': '',
    '<glide-core-tab>.disabled': false,
    '<glide-core-tab>[slot="icon"]': '',
    '<glide-core-tab>.2.selected': false,
    '<glide-core-tab>.3.selected': false,
    '<glide-core-tab>.4.selected': false,
    '<glide-core-tab>.5.selected': false,
    '<glide-core-tab>.6.selected': false,
    '<glide-core-tab>.7.selected': false,
    '<glide-core-tab>.8.selected': false,
    '<glide-core-tab>.9.selected': false,
    '<glide-core-tab>.10.selected': false,
    '<glide-core-tab-panel>.name': '',
    '<glide-core-tab-panel>[slot="default"]': 'Panel',
  },
  play(context) {
    const tabs = context.canvasElement.querySelectorAll('glide-core-tab');

    for (const tab of tabs) {
      tab.addEventListener('click', (event: Event) => {
        if (event.target instanceof GlideCoreTab) {
          for (const tab of tabs) {
            addons.getChannel().emit(UPDATE_STORY_ARGS, {
              storyId: context.id,
              updatedArgs: {
                [`<glide-core-tab>.${tab.panel}.selected`]:
                  tab === event.target,
              },
            });
          }
        }
      });
    }
  },
  render(arguments_) {
    const addInlineStyles = () => {
      const styles = [];

      if (arguments_['--panel-padding-inline-end']) {
        styles.push(
          `--panel-padding-inline-end: ${arguments_['--panel-padding-inline-end']};`,
        );
      }

      if (arguments_['--panel-padding-inline-start']) {
        styles.push(
          `--panel-padding-inline-start: ${arguments_['--panel-padding-inline-start']};`,
        );
      }

      if (arguments_['--tabs-padding-block-end']) {
        styles.push(
          `--tabs-padding-block-end: ${arguments_['--tabs-padding-block-end']};`,
        );
      }

      if (arguments_['--tabs-padding-block-start']) {
        styles.push(
          `--tabs-padding-block-start: ${arguments_['--tabs-padding-block-start']};`,
        );
      }

      if (arguments_['--tabs-padding-inline-end']) {
        styles.push(
          `--tabs-padding-inline-end: ${arguments_['--tabs-padding-inline-end']};`,
        );
      }

      if (arguments_['--tabs-padding-inline-start']) {
        styles.push(
          `--tabs-padding-inline-start: ${arguments_['--tabs-padding-inline-start']};`,
        );
      }

      return styles?.length > 0 ? styles.join(' ') : undefined;
    };

    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    return html`
      <glide-core-tab-group style="${ifDefined(addInlineStyles())}">
        <glide-core-tab
          slot="nav"
          panel="1"
          ?selected=${arguments_['<glide-core-tab>.1.selected']}
        >
          ${unsafeHTML(arguments_['<glide-core-tab>[slot="default"]'])}
        </glide-core-tab>

        <glide-core-tab
          slot="nav"
          panel="2"
          ?selected=${arguments_['<glide-core-tab>.2.selected']}
          ?disabled=${arguments_['<glide-core-tab>.disabled']}
        >
          With Icon

          <glide-core-example-icon
            slot="icon"
            name="checkmark"
          ></glide-core-example-icon>
        </glide-core-tab>

        <glide-core-tab-panel name="1">
          ${unsafeHTML(arguments_['<glide-core-tab-panel>[slot="default"]'])}
        </glide-core-tab-panel>
        <glide-core-tab-panel name="2"> With Icon </glide-core-tab-panel>
      </glide-core-tab-group>
    `;
  },
  argTypes: {
    'slot="default"': {
      control: false,
      table: {
        type: { summary: 'GlideCoreTabPanel' },
      },
      type: { name: 'function', required: true },
    },
    'slot="nav"': {
      control: false,
      table: {
        type: { summary: 'GlideCoreTab' },
      },
      type: { name: 'function', required: true },
    },
    '--panel-padding-inline-end': {
      table: {
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '--panel-padding-inline-start': {
      table: {
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '--tabs-padding-block-end': {
      table: {
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '--tabs-padding-block-start': {
      table: {
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '--tabs-padding-inline-end': {
      table: {
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '--tabs-padding-inline-start': {
      table: {
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '<glide-core-tab>.panel': {
      name: 'panel',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab>[slot="default"]': {
      name: 'slot="default"',
      control: 'text',
      table: {
        category: 'Tab',
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab>.1.selected': {
      name: 'selected',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tab>.addEventListener(event, handler)': {
      control: false,
      name: 'addEventListener(event, handler)',
      table: {
        category: 'Tab',
        type: {
          summary: 'method',
          detail: '(event: "selected", handler: (event: Event) => void): void',
        },
      },
    },
    '<glide-core-tab>.disabled': {
      name: 'disabled',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tab>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-tab>.2.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.3.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.4.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.5.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.6.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.7.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.8.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.9.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab>.10.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-panel>.name': {
      name: 'name',
      control: false,
      table: {
        category: 'Tab Panel',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab-panel>[slot="default"]': {
      name: 'slot="default"',
      control: 'text',
      table: {
        category: 'Tab Panel',
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
  },
};

export default meta;

export const Tabs: StoryObj = {
  tags: ['!autodocs'],
};

export const WithOverflow: StoryObj = {
  render(arguments_) {
    return html`
      <div style="width: 25rem;">
        <glide-core-tab-group>
          <glide-core-tab
            slot="nav"
            panel="1"
            ?selected=${arguments_['<glide-core-tab>.1.selected']}
          >
            One
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="2"
            ?selected=${arguments_['<glide-core-tab>.2.selected']}
            ?disabled=${arguments_['<glide-core-tab>.disabled']}
            >Two</glide-core-tab
          >
          <glide-core-tab
            slot="nav"
            panel="3"
            ?selected=${arguments_['<glide-core-tab>.3.selected']}
          >
            Three
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="4"
            ?selected=${arguments_['<glide-core-tab>.4.selected']}
          >
            Four
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="5"
            ?selected=${arguments_['<glide-core-tab>.5.selected']}
          >
            Five
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="6"
            ?selected=${arguments_['<glide-core-tab>.6.selected']}
          >
            Six
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="7"
            ?selected=${arguments_['<glide-core-tab>.7.selected']}
          >
            Seven
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="8"
            ?selected=${arguments_['<glide-core-tab>.8.selected']}
          >
            Eight
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="9"
            ?selected=${arguments_['<glide-core-tab>.9.selected']}
          >
            Nine
          </glide-core-tab>
          <glide-core-tab
            slot="nav"
            panel="10"
            ?selected=${arguments_['<glide-core-tab>.10.selected']}
          >
            Ten
          </glide-core-tab>

          <glide-core-tab-panel name="1"> One </glide-core-tab-panel>
          <glide-core-tab-panel name="2"> Two </glide-core-tab-panel>
          <glide-core-tab-panel name="3"> Three </glide-core-tab-panel>
          <glide-core-tab-panel name="4"> Four </glide-core-tab-panel>
          <glide-core-tab-panel name="5"> Five </glide-core-tab-panel>
          <glide-core-tab-panel name="6"> Six </glide-core-tab-panel>
          <glide-core-tab-panel name="7"> Seven </glide-core-tab-panel>
          <glide-core-tab-panel name="8"> Eight </glide-core-tab-panel>
          <glide-core-tab-panel name="9"> Nine </glide-core-tab-panel>
          <glide-core-tab-panel name="10"> Ten </glide-core-tab-panel>
        </glide-core-tab-group>
      </div>
    `;
  },
};
