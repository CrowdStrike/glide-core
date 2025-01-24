import './tree.item.icon-button.js';
import './tree.item.menu.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreTree from './tree.js';
import { click } from './library/mouse.js';
import GlideCoreTreeItem from './tree.item.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tree')).to.equal(GlideCoreTree);
});

it('can select child and grandchild items', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const grandchildItems = childItems?.[1].querySelectorAll(
    'glide-core-tree-item',
  );

  component.selectItem(childItems[0]);
  let selectedItem = component.querySelector('glide-core-tree-item[selected]');

  expect(childItems[0].selected).to.be.true;
  expect(selectedItem).to.equal(childItems[0]);
  expect(childItems[1].selected).to.be.false;
  expect(grandchildItems[0].selected).to.be.false;

  component.selectItem(grandchildItems[0]);
  selectedItem = component.querySelector('glide-core-tree-item[selected]');

  expect(childItems[0].selected).to.be.false;
  expect(childItems[1].selected).to.be.false;
  expect(grandchildItems[0].selected).to.be.true;
  expect(selectedItem).to.equal(grandchildItems[0]);
});

it('can click child and grandchild items to expand or select them', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 3" expanded non-collapsible>
        <glide-core-tree-item label="Grandchild Item 2"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const grandchildItems = childItems?.[1].querySelectorAll(
    'glide-core-tree-item',
  );

  // Clicking an item that doesn't have children selects it
  await click(childItems[0]);
  expect(childItems[0].selected).to.be.true;
  expect(childItems[1].selected).to.be.false;
  expect(grandchildItems[0].selected).to.be.false;
  expect(childItems[1].expanded).to.be.false;

  // Clicking an item that has children expands it
  await click(childItems[1]);
  expect(childItems[1].expanded).to.be.true;

  // Can click and select a grandchild item
  await click(grandchildItems[0]);
  expect(grandchildItems[0].selected).to.be.true;

  // Can click and select a non-collapsible parent item.
  //
  // "top" because the default, clicking the center of the element,
  // will click the child's child.
  await click(childItems[2], 'top');
  expect(childItems[2].selected).to.be.true;
});

it('does not select an item if a tree-item-icon-button is clicked', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-icon-button slot="suffix" data-test-icon-button>
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await click(childItems[0].querySelector('[data-test-icon-button]'));

  expect(childItems[0].selected).to.be.false;
});

it('does not select an item if its menu slot is clicked', async () => {
  const component = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-menu slot="menu" data-test-menu>
          <glide-core-menu-link label="Edit" url="/edit"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = component.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await click(childItems[0].querySelector('[data-test-menu]'));

  expect(childItems[0].selected).to.be.false;
});

it('does not scroll the page when arrowing', async () => {
  document.body.style.height = '200vh';
  document.body.style.scrollBehavior = 'auto';

  const component = await fixture(html`
    <glide-core-tree>
      <glide-core-tree-item label="label">
        <glide-core-tree-item-menu slot="menu">
          <glide-core-menu-link label="Label" url="/"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const spy = sinon.spy();
  document.addEventListener('scroll', spy);

  component.querySelector('glide-core-tree-item')?.focus();
  await sendKeys({ press: 'ArrowDown' });

  // The browser apparently inserts a slight delay after arrowing before scrolling,
  // even when smooth scrolling is disabled. `100` is a round number that comfortably
  // gets us past that delay.
  await aTimeout(100);

  expect(spy.callCount).to.equal(0);
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-tree></glide-core-tree>`);
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tree>
        <button>Button</button>
      </glide-core-tree>
    `);
  });
});
