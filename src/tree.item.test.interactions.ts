import './menu.link.js';
import './tree.item.menu.js';
import './menu.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreTreeItem from './tree.item.js';

it('can select items', async () => {
  const host = await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item label="One" expanded>
      <glide-core-tree-item label="Two"></glide-core-tree-item>

      <glide-core-tree-item label="Three">
        <glide-core-tree-item label="Four"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree-item>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  assert(items[0]);
  host.selectItem(items[0]);

  expect(items[0].selected).to.be.true;
  expect(items[1]?.selected).to.be.false;
  expect(childItems[1]?.selected).to.be.false;

  assert(childItems[2]);
  host.selectItem(childItems[2]);

  expect(items[0].selected).to.be.false;
  expect(items[1]?.selected).to.be.false;
  expect(childItems[2].selected).to.be.true;
});

it('sets `level` on an item added programmatically', async () => {
  const host = await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item label="Label" expanded></glide-core-tree-item>
  `);

  const item = Object.assign(document.createElement('glide-core-tree-item'), {
    label: 'Label',
  });

  host.append(item);
  await host.updateComplete;

  expect(item.level).to.equal(2);
});
