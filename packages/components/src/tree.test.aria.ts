import './tree.js';
import { expect, fixture, html } from '@open-wc/testing';
import Tree from './tree.js';

Tree.shadowRootOptions.mode = 'open';

it('sets roles tree and treeitem', async () => {
  const tree = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
  `);

  const childItems = tree.slotElements;

  expect(tree.getAttribute('role')).to.equal('tree');

  for (const childItem of childItems) {
    expect(childItem.getAttribute('role')).to.equal('treeitem');

    for (const grandchildItem of childItem.slotElements) {
      expect(grandchildItem.getAttribute('role')).to.equal('treeitem');
    }
  }
});

it('sets aria-expanded correctly', async () => {
  const tree = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
      <cs-tree-item label="Expanded child item" expanded>
        <cs-tree-item label="Grandchild Item 2"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
  `);

  const childItems = tree.slotElements;

  expect(childItems[0].getAttribute('aria-expanded')).to.equal(
    null,
    'does not set at all if there are no child items',
  );

  expect(childItems[1].getAttribute('aria-expanded')).to.equal(
    'false',
    'sets to string "false" if not expanded',
  );
  childItems[1].toggleExpand();
  expect(childItems[1].getAttribute('aria-expanded')).to.equal(
    'true',
    'sets to string "true" after being expanded',
  );

  expect(childItems[2].getAttribute('aria-expanded')).to.equal(
    'true',
    'sets to string "true" if starts as expanded',
  );
});

it('sets aria-selected correctly', async () => {
  const tree = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
      <cs-tree-item label="Child Item 2"></cs-tree-item>
      <cs-tree-item label="Child Item 3" selected></cs-tree-item>
    </cs-tree>
  `);

  const childItems = tree.slotElements;

  expect(childItems[0].getAttribute('aria-selected')).to.equal(
    null,
    'does not set at all if there are child items',
  );

  expect(childItems[1].getAttribute('aria-selected')).to.equal(
    'false',
    'sets to string "false" if not selected',
  );
  expect(childItems[2].getAttribute('aria-selected')).to.equal(
    'true',
    'sets to string "true" if starts as selected',
  );
  tree.selectItem(childItems[1]);
  expect(childItems[1].getAttribute('aria-selected')).to.equal(
    'true',
    'sets to string "true" after being selected',
  );
});
