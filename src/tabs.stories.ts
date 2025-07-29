import './icons/storybook.js';
import './tabs.js';
import './tabs.panel.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import TabComponent from './tabs.tab.js';

const meta: Meta = {
  title: 'Tabs',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tabs.js';
        import '@crowdstrike/glide-core/tabs.panel.js';
        import '@crowdstrike/glide-core/tabs.tab.js';
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
    '<glide-core-tabs-tab>.panel': '',
    '<glide-core-tabs-tab>[slot="default"]': 'One',
    '<glide-core-tabs-tab>.addEventListener(event, handler)': '',
    '<glide-core-tabs-tab>.disabled': false,
    '<glide-core-tabs-tab>.1.selected': true,
    '<glide-core-tabs-tab>[slot="icon"]': '',
    '<glide-core-tabs-tab>.2.selected': false,
    '<glide-core-tabs-tab>.3.selected': false,
    '<glide-core-tabs-tab>.4.selected': false,
    '<glide-core-tabs-tab>.5.selected': false,
    '<glide-core-tabs-tab>.6.selected': false,
    '<glide-core-tabs-tab>.7.selected': false,
    '<glide-core-tabs-tab>.8.selected': false,
    '<glide-core-tabs-tab>.9.selected': false,
    '<glide-core-tabs-tab>.10.selected': false,
    '<glide-core-tabs-tab>.version': false,
    '<glide-core-tabs-panel>.name': '',
    '<glide-core-tabs-panel>[slot="default"]': 'Panel',
    '<glide-core-tabs-panel>.version': '',
    '<glide-core-tabs-panel>[--padding-inline-end]': '',
    '<glide-core-tabs-panel>[--padding-inline-start]': '',
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-tabs')
      ?.addEventListener('selected', (event: Event) => {
        if (event.target instanceof TabComponent) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              '<glide-core-tabs-tab>.1.selected': event.target.panel === '1',
              '<glide-core-tabs-tab>.2.selected': event.target.panel === '2',
            },
          });
        }
      });
  },
  render(arguments_) {
    /* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/prefer-nullish-coalescing */
    return html`
      <glide-core-tabs
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
        <glide-core-tabs-tab
          slot="nav"
          panel="1"
          ?selected=${arguments_['<glide-core-tabs-tab>.1.selected']}
        >
          ${unsafeHTML(arguments_['<glide-core-tabs-tab>[slot="default"]'])}
        </glide-core-tabs-tab>
        <glide-core-tabs-tab
          slot="nav"
          panel="2"
          ?disabled=${arguments_['<glide-core-tabs-tab>.disabled']}
          ?selected=${arguments_['<glide-core-tabs-tab>.2.selected']}
        >
          Two
        </glide-core-tabs-tab>

        <glide-core-tabs-panel
          name="1"
          style=${arguments_['<glide-core-tabs-panel>[--padding-inline-end]'] ||
          arguments_['<glide-core-tabs-panel>[--padding-inline-start]']
            ? styleMap({
                '--padding-inline-end':
                  arguments_['<glide-core-tabs-panel>[--padding-inline-end]'] ||
                  null,
                '--padding-inline-start':
                  arguments_[
                    '<glide-core-tabs-panel>[--padding-inline-start]'
                  ] || null,
              })
            : nothing}
        >
          ${unsafeHTML(arguments_['<glide-core-tabs-panel>[slot="default"]'])}
        </glide-core-tabs-panel>
        <glide-core-tabs-panel name="2"> With Icon </glide-core-tabs-panel>
      </glide-core-tabs>
    `;
  },
  argTypes: {
    'slot="default"': {
      control: false,
      table: {
        type: { summary: 'TabPanel' },
      },
      type: { name: 'function', required: true },
    },
    'slot="nav"': {
      control: false,
      table: {
        type: { summary: 'Tab' },
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
    '<glide-core-tabs-tab>.panel': {
      name: 'panel',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tabs-tab>[slot="default"]': {
      name: 'slot="default"',
      control: 'text',
      table: {
        category: 'Tab',
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tabs-tab>.addEventListener(event, handler)': {
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
    '<glide-core-tabs-tab>.disabled': {
      name: 'disabled',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tabs-tab>.1.selected': {
      name: 'selected',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tabs-tab>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-tabs-tab>.2.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.3.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.4.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.5.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.6.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.7.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.8.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.9.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.10.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tabs-tab>.version': {
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
    '<glide-core-tabs-panel>.name': {
      name: 'name',
      control: false,
      table: {
        category: 'Tab Panel',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tabs-panel>[slot="default"]': {
      name: 'slot="default"',
      control: 'text',
      table: {
        category: 'Tab Panel',
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tabs-panel>.version': {
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
    '<glide-core-tabs-panel>[--padding-inline-end]': {
      name: '--padding-inline-end',
      table: {
        category: 'Tab Panel',
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '<glide-core-tabs-panel>[--padding-inline-start]': {
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
        <glide-core-tabs>
          <glide-core-tabs-tab
            slot="nav"
            panel="1"
            ?selected=${arguments_['<glide-core-tabs-tab>.1.selected']}
          >
            One
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="2"
            ?selected=${arguments_['<glide-core-tabs-tab>.2.selected']}
            ?disabled=${arguments_['<glide-core-tabs-tab>.disabled']}
            >Two</glide-core-tabs-tab
          >
          <glide-core-tabs-tab
            slot="nav"
            panel="3"
            ?selected=${arguments_['<glide-core-tabs-tab>.3.selected']}
          >
            Three
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="4"
            ?selected=${arguments_['<glide-core-tabs-tab>.4.selected']}
          >
            Four
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="5"
            ?selected=${arguments_['<glide-core-tabs-tab>.5.selected']}
          >
            Five
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="6"
            ?selected=${arguments_['<glide-core-tabs-tab>.6.selected']}
          >
            Six
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="7"
            ?selected=${arguments_['<glide-core-tabs-tab>.7.selected']}
          >
            Seven
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="8"
            ?selected=${arguments_['<glide-core-tabs-tab>.8.selected']}
          >
            Eight
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="9"
            ?selected=${arguments_['<glide-core-tabs-tab>.9.selected']}
          >
            Nine
          </glide-core-tabs-tab>
          <glide-core-tabs-tab
            slot="nav"
            panel="10"
            ?selected=${arguments_['<glide-core-tabs-tab>.10.selected']}
          >
            Ten
          </glide-core-tabs-tab>

          <glide-core-tabs-panel
            name="1"
            style=${styleMap({
              '--padding-inline-end':
                arguments_['<glide-core-tabs-panel>[--padding-inline-end]'] ||
                null,
              '--padding-inline-start':
                arguments_['<glide-core-tabs-panel>[--padding-inline-start]'] ||
                null,
            })}
          >
            One
          </glide-core-tabs-panel>
          <glide-core-tabs-panel name="2"> Two </glide-core-tabs-panel>
          <glide-core-tabs-panel name="3"> Three </glide-core-tabs-panel>
          <glide-core-tabs-panel name="4"> Four </glide-core-tabs-panel>
          <glide-core-tabs-panel name="5"> Five </glide-core-tabs-panel>
          <glide-core-tabs-panel name="6"> Six </glide-core-tabs-panel>
          <glide-core-tabs-panel name="7"> Seven </glide-core-tabs-panel>
          <glide-core-tabs-panel name="8"> Eight </glide-core-tabs-panel>
          <glide-core-tabs-panel name="9"> Nine </glide-core-tabs-panel>
          <glide-core-tabs-panel name="10"> Ten </glide-core-tabs-panel>
        </glide-core-tabs>
      </div>
    `;
  },
};

export const WithIcons: StoryObj = {
  render(arguments_) {
    return html`
      <glide-core-tabs
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
        <glide-core-tabs-tab
          slot="nav"
          panel="1"
          ?selected=${arguments_['<glide-core-tabs-tab>.1.selected']}
        >
          ${unsafeHTML(arguments_['<glide-core-tabs-tab>[slot="default"]'])}

          <glide-core-example-icon
            slot="icon"
            name="calendar"
          ></glide-core-example-icon>
        </glide-core-tabs-tab>
        <glide-core-tabs-tab
          slot="nav"
          panel="2"
          ?disabled=${arguments_['<glide-core-tabs-tab>.disabled']}
          ?selected=${arguments_['<glide-core-tabs-tab>.2.selected']}
        >
          Two

          <glide-core-example-icon
            slot="icon"
            name="checkmark"
          ></glide-core-example-icon>
        </glide-core-tabs-tab>

        <glide-core-tabs-panel
          name="1"
          style=${arguments_['<glide-core-tabs-panel>[--padding-inline-end]'] ||
          arguments_['<glide-core-tabs-panel>[--padding-inline-start]']
            ? styleMap({
                '--padding-inline-end':
                  arguments_['<glide-core-tabs-panel>[--padding-inline-end]'] ||
                  null,
                '--padding-inline-start':
                  arguments_[
                    '<glide-core-tabs-panel>[--padding-inline-start]'
                  ] || null,
              })
            : nothing}
        >
          ${unsafeHTML(arguments_['<glide-core-tabs-panel>[slot="default"]'])}
        </glide-core-tabs-panel>
        <glide-core-tabs-panel name="2"> With Icon </glide-core-tabs-panel>
      </glide-core-tabs>
    `;
  },
};
