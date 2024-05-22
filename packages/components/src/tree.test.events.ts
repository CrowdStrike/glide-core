import './tree.item.menu.js';
import './tree.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import CsTreeItem from './tree.item.js';
import Tree from './tree.js';

it('dispatches an "item-selected" event when an item is clicked', async () => {
  const component = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item"></cs-tree-item>
    </cs-tree>
  `);

  setTimeout(() => {
    component.querySelector('cs-tree-item')?.click();
  });

  const event = await oneEvent(component, 'item-selected');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail instanceof CsTreeItem).to.be.true;
});
