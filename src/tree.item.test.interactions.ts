import './menu.link.js';
import './tree.item.menu.js';
import './menu.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTreeItem from './tree.item.js';

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
