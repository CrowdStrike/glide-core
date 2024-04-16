import './tree-item.js';
import { expect, fixture, html } from '@open-wc/testing';
import TreeItem from './tree-item.js';

TreeItem.shadowRootOptions.mode = 'open';

it('renders and sets default attributes', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <cs-tree-item label="Item"></cs-tree-item>
  `);

  expect(treeItem.expanded).to.equal(false);
  expect(treeItem.label).to.equal('Item');
  expect(treeItem.level).to.equal(1);
});

it('renders with a prefix slot', async () => {
  await fixture<TreeItem>(html`
    <cs-tree-item label="Item">
      <span slot="prefix" data-prefix>prefix</span>
    </cs-tree-item>
  `);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
});

it('renders with a menu slot', async () => {
  await fixture<TreeItem>(html`
    <cs-tree-item label="Item">
      <span slot="menu" data-menu>menu</span>
    </cs-tree-item>
  `);

  expect(document.querySelector('[data-menu]')).to.be.ok;
});

it('renders with a suffix slot', async () => {
  await fixture<TreeItem>(html`
    <cs-tree-item label="Item">
      <span slot="suffix" data-suffix>suffix</span>
    </cs-tree-item>
  `);

  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('does not have an expand icon if there are no child tree items', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <cs-tree-item label="Item"></cs-tree-item>
  `);

  expect(treeItem.shadowRoot?.querySelector('.expand-icon')).to.equal(null);
});

it('can expand', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <cs-tree-item label="Item">
      <cs-tree-item label="Child Item 1"></cs-tree-item>
    </cs-tree-item>
  `);

  expect([
    ...treeItem.shadowRoot!.querySelector('.component')!.classList,
  ]).to.deep.equal(['component']);
  expect([
    ...treeItem.shadowRoot!.querySelector('.expand-icon')!.classList,
  ]).to.deep.equal(['expand-icon']);

  treeItem.toggleExpand();
  await treeItem.updateComplete;
  expect([
    ...treeItem.shadowRoot!.querySelector('.component')!.classList,
  ]).to.deep.equal(['component', 'component-expanded']);
  expect([
    ...treeItem.shadowRoot!.querySelector('.expand-icon')!.classList,
  ]).to.deep.equal(['expand-icon', 'expand-icon-expanded']);
});

it('renders child and grandchild tree items', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <cs-tree-item expanded label="Item">
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
    </cs-tree-item>
  `);

  expect(treeItem.shadowRoot?.querySelector('.expand-icon')).to.be.ok;
  const childItems = treeItem.slotElements;
  expect(childItems?.length).to.equal(2);
  expect(childItems?.[0].level).to.equal(2, 'Children are level 2');
  const grandchildItems = childItems?.[1].slotElements;
  expect(grandchildItems?.length).to.equal(1);
  expect(grandchildItems?.[0].level).to.equal(3, 'Grandchildren are level 3');
});

it('can select child and grandchild items', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <cs-tree-item expanded label="Item">
      <cs-tree-item label="Child Item 1"></cs-tree-item>
      <cs-tree-item label="Child Item 2">
        <cs-tree-item label="Grandchild Item 1"></cs-tree-item>
      </cs-tree-item>
    </cs-tree-item>
  `);

  const childItems = treeItem.slotElements;
  const grandchildItems = childItems?.[1].slotElements;

  treeItem.selectItem(childItems[0]);
  expect(childItems[0].selected).to.equal(true);
  expect(childItems[1].selected).to.equal(false);
  expect(grandchildItems[0].selected).to.equal(false);

  treeItem.selectItem(grandchildItems[0]);
  expect(childItems[0].selected).to.equal(false);
  expect(childItems[1].selected).to.equal(false);
  expect(grandchildItems[0].selected).to.equal(true);
});
