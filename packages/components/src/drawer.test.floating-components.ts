import './drawer.js';
import './tooltip.js';
import './tree.item.js';
import './tree.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDrawer from './drawer.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';
GlideCoreTreeItemMenu.shadowRootOptions.mode = 'open';

it('sets containing block for tooltips', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>
      <div>Some other element</div>
      <glide-core-tooltip>
        Tooltip
        <span slot="target">Target</span>
      </glide-core-tooltip>
    </glide-core-drawer>`,
  );

  const containingBlock = drawer.shadowRoot?.querySelector('aside');

  drawer.open();

  const tooltip = drawer.querySelector('glide-core-tooltip');

  expect(tooltip?.containingBlock === containingBlock).to.be.true;
});

it('sets containing block for menus', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>
      <glide-core-menu>
        <glide-core-menu-options>
          <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
        </glide-core-menu-options>

        <div slot="target">Target</div>
      </glide-core-menu>
    </glide-core-drawer>`,
  );

  const containingBlock = drawer.shadowRoot?.querySelector('aside');

  drawer.open();

  const menu = drawer.querySelector('glide-core-menu');

  expect(menu?.containingBlock === containingBlock).to.be.true;
});

it('sets containing block for tree item menu', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>
      <glide-core-tree>
        <glide-core-tree-item label="yup">
          <glide-core-tree-item-menu slot="menu">
            <glide-core-menu-link label="Edit" url="/edit">
            </glide-core-menu-link>
          </glide-core-tree-item-menu>
        </glide-core-tree-item>
      </glide-core-tree>
    </glide-core-drawer>`,
  );

  const containingBlock = drawer.shadowRoot?.querySelector('aside');

  drawer.open();

  const treeItemMenu = drawer.querySelector('glide-core-tree-item-menu');
  const menu = treeItemMenu?.shadowRoot?.querySelector('glide-core-menu');

  expect(menu?.containingBlock === containingBlock).to.be.true;
});
