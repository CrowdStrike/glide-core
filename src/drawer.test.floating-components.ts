/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
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
