import './icon-button.js';
import './icons/storybook.js';
import './menu.link.js';
import './tree.item.icon-button.js';
import './tree.js';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';
import { addons } from '@storybook/preview-api';
import { html } from 'lit';
import GlideCoreTreeItem from './tree.item.js';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  decorators: [
    (story) =>
      html`<div style="max-width: 18.75rem; height: 10rem;">
        <script type="ignore">
          import '@crowdstrike/glide-core/tree.js';
          import '@crowdstrike/glide-core/tree.item.js';
          import '@crowdstrike/glide-core/tree.item.menu.js';
          import '@crowdstrike/glide-core/tree.item.icon-button.js';
          import '@crowdstrike/glide-core/menu.link.js';
        </script>

        ${story()}
      </div>`,
  ],
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  title: 'Tree',
  tags: ['autodocs'],
  args: {
    'slot="default"': '',
    '<glide-core-tree-item>.label': 'Branch',
    '<glide-core-tree-item>.addEventListener(event, handler)': '',
    '<glide-core-tree-item>.two.expanded': true,
    '<glide-core-tree-item>.non-collapsible': false,
    '<glide-core-tree-item>.remove-indentation': false,
    '<glide-core-tree-item>.one.expanded': false,
    '<glide-core-tree-item>.one.selected': false,
    '<glide-core-tree-item>.two.selected': false,
    '<glide-core-tree-item>.three.expanded': false,
    '<glide-core-tree-item>.three.selected': false,
    '<glide-core-tree-item>.four.expanded': false,
    '<glide-core-tree-item>.four.selected': false,
    '<glide-core-tree-item>.five.expanded': true,
    '<glide-core-tree-item>.five.selected': false,
    '<glide-core-tree-item>.six.expanded': false,
    '<glide-core-tree-item>.six.selected': false,
    '<glide-core-tree-item-icon-button>.label': 'Settings',
    '<glide-core-tree-item-menu>.placement': 'bottom-start',
  },
  play(context) {
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.target instanceof GlideCoreTreeItem) {
          // The only public property we have to go off with Tree Item is `label`.
          // But `label` is a moving target because it can be changed via a control.
          // Thus `id`, which is stripped from the code example by `preview.js`.
          addons.getChannel().emit(UPDATE_STORY_ARGS, {
            storyId: context.id,
            updatedArgs: {
              [`<glide-core-tree-item>.${record.target.id}.expanded`]:
                record.target.expanded,
              [`<glide-core-tree-item>.${record.target.id}.selected`]:
                record.target.selected,
            },
          });
        }
      }
    });

    const treeItems = context.canvasElement.querySelectorAll<GlideCoreTreeItem>(
      'glide-core-tree-item',
    );

    for (const treeItem of treeItems) {
      observer.observe(treeItem, {
        attributes: true,
        attributeFilter: ['expanded', 'selected'],
      });
    }
  },
  render(arguments_) {
    return html`<glide-core-tree>
      <glide-core-tree-item
        label="Back"
        id="one"
        ?expanded=${arguments_['<glide-core-tree-item>.one.expanded']}
        ?selected=${arguments_['<glide-core-tree-item>.one.selected']}
        ?remove-indentation=${arguments_[
          '<glide-core-tree-item>.remove-indentation'
        ]}
      >
        <glide-core-example-icon
          slot="prefix"
          name="arrow-left"
        ></glide-core-example-icon>
      </glide-core-tree-item>

      <glide-core-tree-item
        label=${arguments_['<glide-core-tree-item>.label']}
        id="two"
        ?expanded=${arguments_['<glide-core-tree-item>.two.expanded']}
        ?non-collapsible=${arguments_['<glide-core-tree-item>.non-collapsible']}
      >
        <glide-core-example-icon
          slot="prefix"
          name="share"
        ></glide-core-example-icon>

        <glide-core-tree-item
          label="Hover menu and suffix icon"
          id="three"
          ?expanded=${arguments_['<glide-core-tree-item>.three.expanded']}
          ?selected=${arguments_['<glide-core-tree-item>.three.selected']}
        >
          <glide-core-tree-item-icon-button
            slot="suffix"
            label=${arguments_['<glide-core-tree-item-icon-button>.label']}
          >
            <glide-core-example-icon name="settings"></glide-core-example-icon>
          </glide-core-tree-item-icon-button>

          <glide-core-tree-item-menu
            slot="menu"
            placement=${arguments_['<glide-core-tree-item-menu>.placement']}
          >
            <glide-core-menu-link label="Edit" url="/">
              <glide-core-example-icon
                slot="icon"
                name="edit"
              ></glide-core-example-icon>
            </glide-core-menu-link>

            <glide-core-menu-link label="Move" url="/">
              <glide-core-example-icon
                slot="icon"
                name="move"
              ></glide-core-example-icon>
            </glide-core-menu-link>
          </glide-core-tree-item-menu>
        </glide-core-tree-item>

        <glide-core-tree-item
          label="Custom suffix icon menu"
          id="four"
          ?expanded=${arguments_['<glide-core-tree-item>.four.expanded']}
          ?selected=${arguments_['<glide-core-tree-item>.four.selected']}
        >
          <glide-core-tree-item-menu slot="suffix">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              slot="icon"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <glide-core-menu-link label="My link" url="#">
            </glide-core-menu-link>
            <glide-core-menu-link label="My other link" url="#">
            </glide-core-menu-link>
          </glide-core-tree-item-menu>
        </glide-core-tree-item>

        <glide-core-tree-item
          label="Branch"
          id="five"
          ?expanded=${arguments_['<glide-core-tree-item>.five.expanded']}
          ?selected="${arguments_['<glide-core-tree-item>.five.selected']}"
        >
          <glide-core-tree-item
            label="Leaf"
            id="six"
            ?expanded=${arguments_['<glide-core-tree-item>.six.expanded']}
            ?selected="${arguments_['<glide-core-tree-item>.six.selected']}"
          ></glide-core-tree-item>
        </glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>`;
  },
  argTypes: {
    'slot="default"': {
      table: {
        type: { summary: 'GlideCoreTreeItem' },
      },
      type: { name: 'function', required: true },
    },
    '<glide-core-tree-item>.label': {
      name: 'label',
      table: {
        category: 'Tree Item',
        type: { summary: 'string' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-tree-item>.addEventListener(event, handler)': {
      control: false,
      name: 'addEventListener(event, handler)',
      table: {
        category: 'Tree Item',
        type: {
          summary: 'method',
          detail:
            '(event: "selected", handler: (event: Event) => void) => void',
        },
      },
    },
    '<glide-core-tree-item>.two.expanded': {
      name: 'expanded',
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.non-collapsible': {
      name: 'non-collapsible',
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.remove-indentation': {
      name: 'remove-indentation',
      control: { type: 'boolean' },
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.one.expanded': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.one.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.two.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.three.expanded': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.three.selected': {
      name: 'selected',
      table: {
        category: 'Tree Item',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    '<glide-core-tree-item>.four.expanded': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.four.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.five.expanded': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.five.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.six.expanded': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item>.six.selected': {
      table: {
        disable: true,
      },
    },
    '<glide-core-tree-item-icon-button>.label': {
      name: 'label',
      table: {
        category: 'Tree Item Icon Button',
        type: { summary: 'string', detail: '// For screenreaders' },
      },
      type: { name: 'string', required: true },
    },
    '<glide-core-tree-item-menu>.placement': {
      name: 'placement',
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
        'top-start',
        'top-end',
      ],
      table: {
        category: 'Tree Item Menu',
        defaultValue: { summary: '"bottom-start"' },
        type: {
          summary:
            '"bottom" | "left" | "right" | "top" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end" | "top-start"| "top-end"',
        },
      },
    },
    '<glide-core-tree-item-menu>[slot="icon"]': {
      name: '[slot="icon"]',
      table: {
        category: 'Tree Item Menu',
        control: false,
        type: {
          summary: 'Element',
        },
      },
    },
  },
};

export default meta;

export const Tree: StoryObj = {};
