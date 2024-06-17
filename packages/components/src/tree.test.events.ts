import './tree.item.menu.js';
import './tree.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreTree from './tree.js';
import GlideCoreTreeItem from './tree.item.js';

it('dispatches an "item-selected" event when an item is clicked', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item"></glide-core-tree-item>
    </glide-core-tree>
  `);

  setTimeout(() => {
    component.querySelector('glide-core-tree-item')?.click();
  });

  const event = await oneEvent(component, 'item-selected');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail instanceof GlideCoreTreeItem).to.be.true;
});
