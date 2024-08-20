/* eslint-disable @typescript-eslint/no-unused-expressions */

import './menu.link.js';
import './tree.item.menu.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import Menu from './menu.js';
import TreeItem from './tree.item.js';
import TreeItemMenu from './tree.item.menu.js';

TreeItem.shadowRootOptions.mode = 'open';
TreeItemMenu.shadowRootOptions.mode = 'open';
Menu.shadowRootOptions.mode = 'open';

it('registers', () => {
  expect(window.customElements.get('glide-core-tree-item')).to.equal(TreeItem);
});

it('renders and sets default attributes', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item"></glide-core-tree-item>
  `);

  expect(treeItem.expanded).to.equal(false);
  expect(treeItem.label).to.equal('Item');
  expect(treeItem.level).to.equal(1);
  expect(treeItem.shadowRoot?.querySelector('.expand-icon-container')).to.be.ok;
});

it('does not render expand-icon-container if remove-indentation is set', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item
      label="Item"
      remove-indentation
    ></glide-core-tree-item>
  `);

  expect(treeItem.shadowRoot?.querySelector('.expand-icon-container')).to.be
    .null;
});

it('renders with a prefix slot', async () => {
  await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item">
      <span slot="prefix" data-prefix>prefix</span>
    </glide-core-tree-item>
  `);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
});

it('adds aria-label to menu', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item">
      <glide-core-tree-item-menu slot="menu" data-menu>
        <glide-core-menu-link label="Move" url="/move"> </glide-core-menu-link>
      </glide-core-tree-item-menu>
    </glide-core-tree-item>
  `);

  const menuShadowRoot = treeItem
    .querySelector('glide-core-tree-item-menu')
    ?.shadowRoot?.querySelector('glide-core-menu')
    ?.shadowRoot?.querySelector('.component');

  expect(menuShadowRoot?.getAttribute('aria-label')).to.equal(
    'Actions for Item',
  );

  document.documentElement.setAttribute('lang', 'ja');

  await elementUpdated(treeItem);
});

it('adds Japanese aria-label to menu', async () => {
  document.documentElement.setAttribute('lang', 'ja');

  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item">
      <glide-core-tree-item-menu slot="menu" data-menu>
        <glide-core-menu-link label="Move" url="/move"> </glide-core-menu-link>
      </glide-core-tree-item-menu>
    </glide-core-tree-item>
  `);

  const menuShadowRoot = treeItem
    .querySelector('glide-core-tree-item-menu')
    ?.shadowRoot?.querySelector('glide-core-menu')
    ?.shadowRoot?.querySelector('.component');

  expect(menuShadowRoot?.getAttribute('aria-label')).to.equal(
    'Actions for Item',
  );

  document.documentElement.setAttribute('lang', 'ja');

  await elementUpdated(treeItem);
});

it('adds French aria-label to menu', async () => {
  document.documentElement.setAttribute('lang', 'fr');

  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item">
      <glide-core-tree-item-menu slot="menu" data-menu>
        <glide-core-menu-link label="Move" url="/move"> </glide-core-menu-link>
      </glide-core-tree-item-menu>
    </glide-core-tree-item>
  `);

  const menuShadowRoot = treeItem
    .querySelector('glide-core-tree-item-menu')
    ?.shadowRoot?.querySelector('glide-core-menu')
    ?.shadowRoot?.querySelector('.component');

  expect(menuShadowRoot?.getAttribute('aria-label')).to.equal(
    'Actions for Item',
  );

  document.documentElement.setAttribute('lang', 'ja');

  await elementUpdated(treeItem);
});

it('renders with a suffix slot', async () => {
  await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item">
      <span slot="suffix" data-suffix>suffix</span>
    </glide-core-tree-item>
  `);

  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('does not have an expand icon if there are no child tree items', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item"></glide-core-tree-item>
  `);

  expect(treeItem.shadowRoot?.querySelector('.expand-icon')).to.equal(null);
});

it('can expand', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item label="Item">
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
    </glide-core-tree-item>
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
  ]).to.deep.equal(['component', 'expanded']);

  expect([
    ...treeItem.shadowRoot!.querySelector('.expand-icon')!.classList,
  ]).to.deep.equal(['expand-icon', 'expand-icon-expanded']);
});

it('renders child and grandchild tree items', async () => {
  const treeItem = await fixture<TreeItem>(html`
    <glide-core-tree-item expanded label="Item">
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree-item>
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
    <glide-core-tree-item expanded label="Item">
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree-item>
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
