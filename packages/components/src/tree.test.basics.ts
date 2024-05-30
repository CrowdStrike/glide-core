import './tree.item.js';
import './tree.item.menu.js';
import './tree.js';
import { ArgumentError } from 'ow';
import { assert, expect, fixture, html } from '@open-wc/testing';
import CsMenu from './menu.js';
import Tree from './tree.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

Tree.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-tree')).to.equal(Tree);
});

it('renders and sets default attributes', async () => {
  const tree = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item"></cs-tree-item>
    </cs-tree>
  `);

  expect(tree.selectedItem).to.equal(undefined);
});

it('can select child and grandchild items', async () => {
  const tree = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
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
  const tree = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
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
});

it('does not select an item if its menu slot is clicked', async () => {
  const tree = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1">
        <cs-tree-item-menu slot="menu" data-test-menu>
          <cs-menu-link label="Edit" url="/edit"></cs-menu-link>
        </cs-tree-item-menu>
      </cs-tree-item>
    </cs-tree>
  `);

  const childItems = tree.slotElements;
  const menu = childItems[0].querySelector<CsMenu>('[data-test-menu]');
  assert(menu);
  menu.click();
  await menu.updateComplete;

  expect(childItems[0].selected).to.equal(false);
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<Tree>(html`<cs-tree></cs-tree>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<Tree>(html`
      <cs-tree>
        <button>Button</button>
      </cs-tree>
    `);
  });
});
