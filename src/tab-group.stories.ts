import './icons/storybook.js';
import './tab-group.js';
import './tab-group.panel.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components';
import TabGroupTab from './tab-group.tab.js';

const meta: Meta = {
  title: 'Tab Group',
  decorators: [
    withActions,
    (story) => html`
      <script type="ignore">
        import '@crowdstrike/glide-core/tab-group.js';
        import '@crowdstrike/glide-core/tab-group.panel.js';
        import '@crowdstrike/glide-core/tab-group.tab.js';
      </script>

      ${story()}
    `,
  ],
  parameters: {
    actions: {
      handles: ['deselected', 'selected'],
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
    '<glide-core-tab-group-tab>.panel': '',
    '<glide-core-tab-group-tab>.label': 'One',
    '<glide-core-tab-group-tab>.addEventListener(event, handler)': '',
    '<glide-core-tab-group-tab>.disabled': false,
    '<glide-core-tab-group-tab>.1.selected': true,
    '<glide-core-tab-group-tab>[slot="icon"]': '',
    '<glide-core-tab-group-tab>.2.selected': false,
    '<glide-core-tab-group-tab>.3.selected': false,
    '<glide-core-tab-group-tab>.4.selected': false,
    '<glide-core-tab-group-tab>.5.selected': false,
    '<glide-core-tab-group-tab>.6.selected': false,
    '<glide-core-tab-group-tab>.7.selected': false,
    '<glide-core-tab-group-tab>.8.selected': false,
    '<glide-core-tab-group-tab>.9.selected': false,
    '<glide-core-tab-group-tab>.10.selected': false,
    '<glide-core-tab-group-tab>.version': false,
    '<glide-core-tab-group-panel>.name': '',
    '<glide-core-tab-group-panel>[slot="default"]': 'One',
    '<glide-core-tab-group-panel>.version': '',
    '<glide-core-tab-group-panel>[--padding-inline-end]': '',
    '<glide-core-tab-group-panel>[--padding-inline-start]': '',
  },
  play(context) {
    context.canvasElement
      .querySelector('glide-core-tab-group')
      ?.addEventListener('selected', (event: Event) => {
        if (event.target instanceof TabGroupTab) {
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              '<glide-core-tab-group-tab>.1.selected':
                event.target.panel === '1',
              '<glide-core-tab-group-tab>.2.selected':
                event.target.panel === '2',
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
        <glide-core-tab-group-tab
          label=${arguments_['<glide-core-tab-group-tab>.label'] || nothing}
          panel="1"
          slot="nav"
          ?selected=${arguments_['<glide-core-tab-group-tab>.1.selected']}
        ></glide-core-tab-group-tab>
        <glide-core-tab-group-tab
          label="Two"
          panel="2"
          slot="nav"
          ?disabled=${arguments_['<glide-core-tab-group-tab>.disabled']}
          ?selected=${arguments_['<glide-core-tab-group-tab>.2.selected']}
        ></glide-core-tab-group-tab>

        <glide-core-tab-group-panel
          name="1"
          style=${arguments_[
            '<glide-core-tab-group-panel>[--padding-inline-end]'
          ] ||
          arguments_['<glide-core-tab-group-panel>[--padding-inline-start]']
            ? styleMap({
                '--padding-inline-end':
                  arguments_[
                    '<glide-core-tab-group-panel>[--padding-inline-end]'
                  ] || null,
                '--padding-inline-start':
                  arguments_[
                    '<glide-core-tab-group-panel>[--padding-inline-start]'
                  ] || null,
              })
            : nothing}
        >
          ${unsafeHTML(
            arguments_['<glide-core-tab-group-panel>[slot="default"]'],
          )}
        </glide-core-tab-group-panel>
        <glide-core-tab-group-panel name="2"> Two </glide-core-tab-group-panel>
      </glide-core-tab-group>
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
    '<glide-core-tab-group-tab>.label': {
      name: 'label',
      table: {
        category: 'Tab',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-tab-group-tab>.panel': {
      name: 'panel',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab-group-tab>.addEventListener(event, handler)': {
      control: false,
      name: 'addEventListener(event, handler)',
      table: {
        category: 'Tab',
        type: {
          summary: 'method',
          detail:
            '(event: "deselected" | "selected", handler: (event: Event) => void): void',
        },
      },
    },
    '<glide-core-tab-group-tab>.disabled': {
      name: 'disabled',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tab-group-tab>.1.selected': {
      name: 'selected',
      table: {
        category: 'Tab',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    '<glide-core-tab-group-tab>[slot="icon"]': {
      name: 'slot="icon"',
      control: false,
      table: {
        category: 'Tab',
        type: { summary: 'Element' },
      },
    },
    '<glide-core-tab-group-tab>.2.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.3.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.4.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.5.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.6.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.7.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.8.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.9.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.10.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tab-group-tab>.version': {
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
    '<glide-core-tab-group-panel>.name': {
      name: 'name',
      control: false,
      table: {
        category: 'Tab Panel',
        type: { summary: 'string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab-group-panel>[slot="default"]': {
      name: 'slot="default"',
      control: 'text',
      table: {
        category: 'Tab Panel',
        type: { summary: 'Element | string' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tab-group-panel>.version': {
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
    '<glide-core-tab-group-panel>[--padding-inline-end]': {
      name: '--padding-inline-end',
      table: {
        category: 'Tab Panel',
        type: {
          summary: 'CSS custom property',
        },
      },
    },
    '<glide-core-tab-group-panel>[--padding-inline-start]': {
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

export const TabGroup: StoryObj = {
  tags: ['!autodocs'],
};

export const WithIcons: StoryObj = {
  render(arguments_) {
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
        <glide-core-tab-group-tab
          label=${arguments_['<glide-core-tab-group-tab>.label'] || nothing}
          slot="nav"
          panel="1"
          ?selected=${arguments_['<glide-core-tab-group-tab>.1.selected']}
        >
          <glide-core-example-icon
            slot="icon"
            name="calendar"
          ></glide-core-example-icon>
        </glide-core-tab-group-tab>
        <glide-core-tab-group-tab
          label="Two"
          panel="2"
          slot="nav"
          ?disabled=${arguments_['<glide-core-tab-group-tab>.disabled']}
          ?selected=${arguments_['<glide-core-tab-group-tab>.2.selected']}
        >
          <glide-core-example-icon
            slot="icon"
            name="checkmark"
          ></glide-core-example-icon>
        </glide-core-tab-group-tab>

        <glide-core-tab-group-panel
          name="1"
          style=${arguments_[
            '<glide-core-tab-group-panel>[--padding-inline-end]'
          ] ||
          arguments_['<glide-core-tab-group-panel>[--padding-inline-start]']
            ? styleMap({
                '--padding-inline-end':
                  arguments_[
                    '<glide-core-tab-group-panel>[--padding-inline-end]'
                  ] || null,
                '--padding-inline-start':
                  arguments_[
                    '<glide-core-tab-group-panel>[--padding-inline-start]'
                  ] || null,
              })
            : nothing}
        >
          ${unsafeHTML(
            arguments_['<glide-core-tab-group-panel>[slot="default"]'],
          )}
        </glide-core-tab-group-panel>
        <glide-core-tab-group-panel name="2"> Two </glide-core-tab-group-panel>
      </glide-core-tab-group>
    `;
  },
};

export const WithOverflow: StoryObj = {
  render(arguments_) {
    return html`
      <div style="width: 25rem;">
        <glide-core-tab-group>
          <glide-core-tab-group-tab
            label=${arguments_['<glide-core-tab-group-tab>.label'] || nothing}
            panel="1"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.1.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Two"
            panel="2"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.2.selected']}
            ?disabled=${arguments_['<glide-core-tab-group-tab>.disabled']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Three"
            panel="3"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.3.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Four"
            panel="4"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.4.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Five"
            panel="5"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.5.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Six"
            panel="6"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.6.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Seven"
            panel="7"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.7.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Eight"
            panel="8"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.8.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Nine"
            panel="9"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.9.selected']}
          ></glide-core-tab-group-tab>
          <glide-core-tab-group-tab
            label="Ten"
            panel="10"
            slot="nav"
            ?selected=${arguments_['<glide-core-tab-group-tab>.10.selected']}
          ></glide-core-tab-group-tab>

          <glide-core-tab-group-panel
            name="1"
            style=${styleMap({
              '--padding-inline-end':
                arguments_[
                  '<glide-core-tab-group-panel>[--padding-inline-end]'
                ] || null,
              '--padding-inline-start':
                arguments_[
                  '<glide-core-tab-group-panel>[--padding-inline-start]'
                ] || null,
            })}
          >
            One
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="2">
            Two
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="3">
            Three
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="4">
            Four
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="5">
            Five
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="6">
            Six
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="7">
            Seven
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="8">
            Eight
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="9">
            Nine
          </glide-core-tab-group-panel>
          <glide-core-tab-group-panel name="10">
            Ten
          </glide-core-tab-group-panel>
        </glide-core-tab-group>
      </div>
    `;
  },
};
