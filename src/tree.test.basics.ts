/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tree.item.icon-button.js';
import './tree.item.js';
import './tree.js';
import { ArgumentError } from 'ow';
import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreTree from './tree.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';
import type GlideCoreTreeItemIconButton from './tree.item.icon-button.js';
import type GlideCoreTreeItemMenu from './tree.item.menu.js';

GlideCoreTree.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-tree')).to.equal(GlideCoreTree);
});

it('renders and sets default attributes', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item"></glide-core-tree-item>
    </glide-core-tree>
  `);

  expect(tree.selectedItem).to.equal(undefined);
});

it('can select child and grandchild items', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  const grandchildItems = childItems?.[1].slotElements;

  tree.selectItem(childItems[0]);
  expect(childItems[0].selected).to.equal(true);
  expect(tree.selectedItem).to.equal(childItems[0]);
  expect(childItems[1].selected).to.equal(false);
  expect(grandchildItems[0].selected).to.equal(false);

  tree.selectItem(grandchildItems[0]);
  expect(childItems[0].selected).to.equal(false);
  expect(childItems[1].selected).to.equal(false);
  expect(grandchildItems[0].selected).to.equal(true);
  expect(tree.selectedItem).to.equal(grandchildItems[0]);
});

it('can click child and grandchild items to expand or select them', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 3" expanded non-collapsible>
        <glide-core-tree-item label="Grandchild Item 2"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  const grandchildItems = childItems?.[1].slotElements;

  // Clicking an item that doesn't have children selects it
  childItems[0].click();
  expect(childItems[0].selected).to.equal(true);
  expect(childItems[1].selected).to.equal(false);
  expect(grandchildItems[0].selected).to.equal(false);

  expect(childItems[1].expanded).to.equal(false);

  // Clicking an item that has children expands it
  childItems[1].click();
  expect(childItems[1].expanded).to.equal(true);

  // Can click and select a grandchild item
  grandchildItems[0].click();
  expect(grandchildItems[0].selected).to.equal(true);

  // Can click and select a non-collapsible parent item
  childItems[2].click();
  expect(childItems[2].selected).to.equal(true);
});

it('does not select an item if a tree-item-icon-button is clicked', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-icon-button slot="suffix" data-test-icon-button>
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;

  const iconButton = childItems[0].querySelector<GlideCoreTreeItemIconButton>(
    '[data-test-icon-button]',
  );

  assert(iconButton);
  iconButton.click();
  await iconButton.updateComplete;

  expect(childItems[0].selected).to.equal(false);
});

it('does not select an item if its menu slot is clicked', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-menu slot="menu" data-test-menu>
          <glide-core-menu-link label="Edit" url="/edit"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;

  const menu =
    childItems[0].querySelector<GlideCoreTreeItemMenu>('[data-test-menu]');

  assert(menu);
  menu.click();
  await menu.updateComplete;

  expect(childItems[0].selected).to.equal(false);
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreTree>(html`<glide-core-tree></glide-core-tree>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreTree>(html`
      <glide-core-tree>
        <button>Button</button>
      </glide-core-tree>
    `);
  });
});
