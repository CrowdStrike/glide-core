/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';
import GlideCoreModalTertiaryIcon from './modal.tertiary-icon.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';

GlideCoreModal.shadowRootOptions.mode = 'open';
GlideCoreModalTertiaryIcon.shadowRootOptions.mode = 'open';
GlideCoreTreeItemMenu.shadowRootOptions.mode = 'open';

it('sets containing block for tooltips', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      <glide-core-tooltip>
        Tooltip
        <span slot="target">Target</span>
      </glide-core-tooltip>
      <glide-core-modal-tertiary-icon
        slot="tertiary"
        label="Information"
        tooltip-placement="right"
      >
        Icon
      </glide-core-modal-tertiary-icon>
    </glide-core-modal>`,
  );

  const containingBlock = element.shadowRoot?.querySelector('dialog');

  element.showModal();

  const tooltip = element.querySelector('glide-core-tooltip');

  expect(tooltip?.containingBlock === containingBlock).to.be.true;

  const tertiaryIconTooltip = element
    .querySelector('glide-core-modal-tertiary-icon')
    ?.shadowRoot?.querySelector('glide-core-tooltip');

  expect(tertiaryIconTooltip?.containingBlock === containingBlock).to.be.true;
});

it('sets containing block for menus', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      <glide-core-menu>
        <glide-core-menu-options>
          <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
        </glide-core-menu-options>

        <div slot="target">Target</div>
      </glide-core-menu>
    </glide-core-modal>`,
  );

  const containingBlock = element.shadowRoot?.querySelector('dialog');

  element.showModal();

  const menu = element.querySelector('glide-core-menu');

  expect(menu?.containingBlock === containingBlock).to.be.true;
});

it('sets containing block for tree item menu', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      <glide-core-tree>
        <glide-core-tree-item label="yup">
          <glide-core-tree-item-menu slot="menu">
            <glide-core-menu-link label="Edit" url="/edit">
            </glide-core-menu-link>
          </glide-core-tree-item-menu>
        </glide-core-tree-item>
      </glide-core-tree>
    </glide-core-modal>`,
  );

  const containingBlock = element.shadowRoot?.querySelector('dialog');

  element.showModal();

  const treeItemMenu = element.querySelector('glide-core-tree-item-menu');
  const menu = treeItemMenu?.shadowRoot?.querySelector('glide-core-menu');

  expect(menu?.containingBlock === containingBlock).to.be.true;
});
