/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tree.item.icon-button.js';
import './tree.item.icon-button.js';
import './tree.item.menu.js';
import './tree.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTree from './tree.js';
import GlideCoreTreeItem from './tree.item.js';
import click from './library/click.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreTree.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tree')).to.equal(GlideCoreTree);
});

it('renders and sets default attributes', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item"></glide-core-tree-item>
    </glide-core-tree>
  `);

  expect(component.selectedItem).to.equal(undefined);
});

it('can select child and grandchild items', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const grandchildItems = childItems?.[1].querySelectorAll(
    'glide-core-tree-item',
  );

  component.selectItem(childItems[0]);
  expect(childItems[0].selected).to.be.true;
  expect(component.selectedItem).to.equal(childItems[0]);
  expect(childItems[1].selected).to.be.false;
  expect(grandchildItems[0].selected).to.be.false;

  component.selectItem(grandchildItems[0]);
  expect(childItems[0].selected).to.be.false;
  expect(childItems[1].selected).to.be.false;
  expect(grandchildItems[0].selected).to.be.true;
  expect(component.selectedItem).to.equal(grandchildItems[0]);
});

it('can click child and grandchild items to expand or select them', async () => {
  const component = await fixture<GlideCoreTree>(html`
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

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const grandchildItems = childItems?.[1].querySelectorAll(
    'glide-core-tree-item',
  );

  // Clicking an item that doesn't have children selects it
  await click(childItems[0]);
  expect(childItems[0].selected).to.be.true;
  expect(childItems[1].selected).to.be.false;
  expect(grandchildItems[0].selected).to.be.false;
  expect(childItems[1].expanded).to.be.false;

  // Clicking an item that has children expands it
  await click(childItems[1]);
  expect(childItems[1].expanded).to.be.true;

  // Can click and select a grandchild item
  await click(grandchildItems[0]);
  expect(grandchildItems[0].selected).to.be.true;

  // Can click and select a non-collapsible parent item.
  //
  // "top" because the default, clicking the center of the element,
  // will click the child's child.
  await click(childItems[2], 'top');
  expect(childItems[2].selected).to.be.true;
});

it('does not select an item if a tree-item-icon-button is clicked', async () => {
  const component = await fixture<GlideCoreTree>(html`
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

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await click(childItems[0].querySelector('[data-test-icon-button]'));

  expect(childItems[0].selected).to.be.false;
});

it('does not select an item if its menu slot is clicked', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-menu slot="menu" data-test-menu>
          <glide-core-menu-link label="Edit" url="/edit"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await click(childItems[0].querySelector('[data-test-menu]'));

  expect(childItems[0].selected).to.be.false;
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
