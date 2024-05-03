import { expect, fixture, html } from '@open-wc/testing';
import Tree from './tree.js';
import TreeItem from './tree.item.js';

Tree.shadowRootOptions.mode = 'open';
TreeItem.shadowRootOptions.mode = 'open';

it('is accessible', async () => {
  const component = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
  `);

  await expect(component).to.be.accessible();
});

it('sets roles tree and treeitem', async () => {
  const component = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
    </cs-tree>
  `);

  const childItems = component.slotElements;

  expect(
    component.shadowRoot?.querySelector('.tree')?.getAttribute('role'),
  ).to.equal('tree');

  expect(
    childItems[0].shadowRoot?.querySelector('.component')?.getAttribute('role'),
  ).to.equal('treeitem');
  expect(
    childItems[1].shadowRoot?.querySelector('.component')?.getAttribute('role'),
  ).to.equal('treeitem');
  expect(
    childItems[1].slotElements[0].shadowRoot
      ?.querySelector('.component')
      ?.getAttribute('role'),
  ).to.equal('treeitem');
});

it('sets aria-expanded correctly', async () => {
  const component = await fixture<Tree>(html`
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

  const childItems = component.slotElements;

  expect(childItems[0].getAttribute('aria-expanded')).to.equal(
    null,
    'does not set at all if there are no child items',
  );

  expect(
    childItems[1].shadowRoot
      ?.querySelector('.component')
      ?.getAttribute('aria-expanded'),
  ).to.equal('false', 'sets to string "false" if not expanded');

  childItems[1].toggleExpand();
  await childItems[1].updateComplete;

  expect(
    childItems[1].shadowRoot
      ?.querySelector('.component')
      ?.getAttribute('aria-expanded'),
  ).to.equal('true', 'sets to string "true" after being expanded');

  expect(
    childItems[2].shadowRoot
      ?.querySelector('.component')
      ?.getAttribute('aria-expanded'),
  ).to.equal('true', 'sets to string "true" if starts as expanded');
});

it('sets aria-selected correctly', async () => {
  const component = await fixture<Tree>(html`
    <cs-tree>
      <cs-tree-item label="Child Item 1">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
      <cs-tree-item label="Child Item 2"></cs-tree-item>
      <cs-tree-item label="Child Item 3" selected></cs-tree-item>
    </cs-tree>
  `);

  const childItems = component.slotElements;

  expect(childItems[0].getAttribute('aria-selected')).to.equal(
    null,
    'does not set at all if there are child items',
  );

  expect(
    childItems[1].shadowRoot
      ?.querySelector('.component')
      ?.getAttribute('aria-selected'),
  ).to.equal('false', 'sets to string "false" if not selected');
  expect(
    childItems[2].shadowRoot
      ?.querySelector('.component')
      ?.getAttribute('aria-selected'),
  ).to.equal('true', 'sets to string "true" if starts as selected');
  component.selectItem(childItems[1]);
  await childItems[1].updateComplete;
  expect(
    childItems[1].shadowRoot
      ?.querySelector('.component')
      ?.getAttribute('aria-selected'),
  ).to.equal('true', 'sets to string "true" after being selected');
});
