import './tree.item.icon-button.js';
import './tree.item.menu.js';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreTree from './tree.js';
import { click } from './library/mouse.js';
import GlideCoreTreeItem from './tree.item.js';

it('handles item selection', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label"></glide-core-tree-item>

      <glide-core-tree-item label="Label">
        <glide-core-tree-item label="Label"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  assert(items[0]);
  items[0].selected = true;
  await host.updateComplete;
  let selected = host.querySelector('glide-core-tree-item[selected]');

  expect(items[0]?.selected).to.be.true;
  expect(selected).to.equal(items[0]);
  expect(items[1]?.selected).to.be.false;
  expect(childItems[0]?.selected).to.be.false;

  assert(childItems[0]);
  childItems[0].selected = true;
  await host.updateComplete;
  selected = host.querySelector('glide-core-tree-item[selected]');

  expect(items[0]?.selected).to.be.false;
  expect(items[1]?.selected).to.be.false;
  expect(childItems[0]?.selected).to.be.true;
  expect(selected).to.equal(childItems[0]);
});

it('can click items to expand or select them', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label"></glide-core-tree-item>

      <glide-core-tree-item label="Label">
        <glide-core-tree-item label="Label"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Label" expanded non-collapsible>
        <glide-core-tree-item label="Label"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  // Clicking an item that doesn't have items selects it
  await click(items[0]);
  expect(items[0]?.selected).to.be.true;
  expect(items[1]?.selected).to.be.false;
  expect(childItems[0]?.selected).to.be.false;
  expect(items[1]?.expanded).to.be.false;

  assert(items[1]);
  assert(items[1].shadowRoot);

  await click(
    items[1].shadowRoot.querySelector('[data-test="expand-icon-container"]'),
  );

  expect(items[1]?.expanded).to.be.true;

  // Can click and select a nested item
  await click(childItems[0]);
  expect(childItems[0]?.selected).to.be.true;

  // Can click and select a non-collapsible parent item.
  //
  // "top" because the default, clicking the center of the element,
  // will click the item's item.
  await click(items[2], 'top');
  expect(items[2]?.selected).to.be.true;
});

it('does not select an item when an icon button is clicked', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label">
        <glide-core-tree-item-icon-button
          label="Label"
          slot="suffix"
          data-test-icon-button
        >
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await click(items[0]?.querySelector('[data-test-icon-button]'));

  expect(items[0]?.selected).to.be.false;
});

it('does not select an item if its "menu" slot is clicked', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label">
        <glide-core-tree-item-menu label="Label" slot="menu" data-test-menu>
          <glide-core-menu-link label="Label"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await click(items[0]?.querySelector('[data-test-menu]'));

  expect(items[0]?.selected).to.be.false;
});

it('does not scroll the page when arrowing', async () => {
  document.body.style.height = '200vh';

  await fixture(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label">
        <glide-core-tree-item-menu label="Label" slot="menu">
          <glide-core-menu-link label="Label"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const spy = sinon.spy();
  document.addEventListener('scroll', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  // The browser apparently inserts a slight delay after arrowing before scrolling,
  // even when smooth scrolling is disabled. `100` is a round number that comfortably
  // gets us past that delay.
  await aTimeout(100);

  expect(spy.callCount).to.equal(0);

  document.body.style.height = '';
});
