import './icons/storybook.js';
import './tab.group.js';
import './tab.panel.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import GlideCoreTab from './tab.js';

const meta: Meta = {
  title: 'Tab Group',
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
    version: '',
    '--tabs-padding-block-end': '',
    '--tabs-padding-block-start': '',
    '--tabs-padding-inline-end': '',
    '--tabs-padding-inline-start': '',
    '<glide-core-tab>.panel': '',
    '<glide-core-tab>[slot="default"]': 'Tab',
    '<glide-core-tab>.addEventListener(event, handler)': '',
    '<glide-core-tab>.disabled': false,
    '<glide-core-tab>.1.selected': true,
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
    '<glide-core-tab>.version': false,
    '<glide-core-tab-panel>.name': '',
    '<glide-core-tab-panel>[slot="default"]': 'Panel',
    '<glide-core-tab-panel>.version': '',
    '<glide-core-tab-panel>[--padding-inline-end]': '',
    '<glide-core-tab-panel>[--padding-inline-start]': '',
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-tab-group')
      ?.addEventListener('selected', (event: Event) => {
        if (event.target instanceof GlideCoreTab) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              [`<glide-core-tab>.${event.target.panel}.selected`]: true,
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-tab-group
        style=${styleMap({
          '--tabs-padding-block-start':
            arguments_['--tabs-padding-block-start'] || null,
          '--tabs-padding-block-end':
            arguments_['--tabs-padding-block-end'] || null,
          '--tabs-padding-inline-start':
            arguments_['--tabs-padding-inline-start'] || null,
          '--tabs-padding-inline-end':
            arguments_['--tabs-padding-inline-end'] || null,
        })}
      >
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
          ?disabled=${arguments_['<glide-core-tab>.disabled']}
          ?selected=${arguments_['<glide-core-tab>.2.selected']}
        >
          With Icon

          <glide-core-example-icon
            slot="icon"
            name="checkmark"
          ></glide-core-example-icon>
        </glide-core-tab>

        <glide-core-tab-panel
          name="1"
          style=${arguments_['<glide-core-tab-panel>[--padding-inline-end]'] ||
          arguments_['<glide-core-tab-panel>[--padding-inline-start]']
            ? styleMap({
                '--padding-inline-end':
                  arguments_['<glide-core-tab-panel>[--padding-inline-end]'] ||
                  null,
                '--padding-inline-start':
                  arguments_[
                    '<glide-core-tab-panel>[--padding-inline-start]'
                  ] || null,
              })
            : nothing}
        >
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
    version: {
      control: false,
      table: {
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
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
    '<glide-core-tab>.1.selected': {
      name: 'selected',
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
    '<glide-core-tab>.version': {
      name: 'version',
      control: false,
      table: {
        category: 'Tab',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
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
    '<glide-core-tab-panel>.version': {
      name: 'version',
      control: false,
      table: {
        category: 'Tab Panel',
        defaultValue: {
          summary: import.meta.env.VITE_GLIDE_CORE_VERSION,
        },
        type: { summary: 'string', detail: '// For debugging' },
      },
    },
    '<glide-core-tab-panel>[--padding-inline-end]': {
      name: '--padding-inline-end',
      table: {
        category: 'Tab Panel',
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '<glide-core-tab-panel>[--padding-inline-start]': {
      name: '--padding-inline-start',
      table: {
        category: 'Tab Panel',
        type: {
          summary: 'CSS custom property',
        },
      },
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

          <glide-core-tab-panel
            name="1"
            style=${styleMap({
              '--padding-inline-end':
                arguments_['<glide-core-tab-panel>[--padding-inline-end]'] ||
                null,
              '--padding-inline-start':
                arguments_['<glide-core-tab-panel>[--padding-inline-start]'] ||
                null,
            })}
          >
            One
          </glide-core-tab-panel>
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
