import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTree from './tree.js';
import GlideCoreTreeItem from './tree.item.js';
import GlideCoreTreeItemIconButton from './tree.item.icon-button.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';

it('focuses the first item when none are selected', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One">
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three"></glide-core-tree-item>
    </glide-core-tree>
  `);

  await sendKeys({ press: 'Tab' });

  const item = host.querySelector<GlideCoreTreeItem>('glide-core-tree-item');

  expect(document.activeElement).to.equal(item);
});

it('focuses the selected item', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One"></glide-core-tree-item>
      <glide-core-tree-item label="Two"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const item = host.querySelector<GlideCoreTreeItem>('glide-core-tree-item');

  assert(item);
  host.selectItem(item);
  await sendKeys({ press: 'Tab' });

  expect(document.activeElement).to.equal(item);
});

it('does not focus the selected item if it is collapsed', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One"></glide-core-tree-item>

      <glide-core-tree-item label="Two">
        <glide-core-tree-item label="Three" selected></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const item = host.querySelector<GlideCoreTreeItem>('glide-core-tree-item');

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(item);
});

it('expands an item on ArrowRight', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One">
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(items[0].expanded).to.be.true;
  expect(document.activeElement).to.equal(items[0]);
});

it('focuses an expanded item on ArrowRight', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One" expanded>
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const item = host.querySelector<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowRight' });

  expect(document.activeElement).to.equal(item);
});

it('collapses an expanded item on ArrowLeft', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One" expanded>
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowLeft' });

  expect(items[0].expanded).to.be.false;
  expect(document.activeElement).to.equal(items[0]);
});

it('focuses the parent of an uncollapsable item on ArrowLeft', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One" expanded non-collapsible>
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  childItems[0].focus();
  await sendKeys({ press: 'ArrowLeft' });

  expect(document.activeElement).to.equal(items[0]);
});

it('focuses the parent of a collapsed item on ArrowLeft', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item expanded label="One">
        <glide-core-tree-item label="Two">
          <glide-core-tree-item label="Three"></glide-core-tree-item>
        </glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Four"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll(':scope > glide-core-tree-item');

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  childItems[0].focus();
  await sendKeys({ press: 'ArrowLeft' });
  expect(document.activeElement === items[0]).to.be.true;
});

it('moves down the unexpanded items on ArrowDown', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One" expanded>
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three">
        <glide-core-tree-item label="Four"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Five"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(document.activeElement).to.equal(
    items[0].querySelector('glide-core-tree-item'),
  );

  await sendKeys({ press: 'ArrowDown' });
  expect(document.activeElement).to.equal(items[1]);

  await sendKeys({ press: 'ArrowDown' });
  expect(document.activeElement).to.equal(items[2]);

  await sendKeys({ press: 'ArrowDown' });
  expect(document.activeElement).to.equal(items[2]);
});

it('moves up the unexpanded items on ArrowUp', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One">
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three" expanded>
        <glide-core-tree-item label="Four"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  // Start at the last item
  items[1].querySelector('glide-core-tree-item')?.focus();

  await sendKeys({ press: 'ArrowUp' });
  expect(document.activeElement).to.equal(items[1]);

  await sendKeys({ press: 'ArrowUp' });
  expect(document.activeElement).to.equal(items[0]);

  await sendKeys({ press: 'ArrowUp' });
  expect(document.activeElement).to.equal(items[0]);
});

it('moves to the first item when Home is pressed', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One">
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three" expanded>
        <glide-core-tree-item label="Four"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  items[1].querySelector('glide-core-tree-item')?.focus();

  await sendKeys({ press: 'Home' });
  expect(document.activeElement).to.equal(items[0]);
});

it('moves to the last item on End', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One">
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three" expanded>
        <glide-core-tree-item label="Four"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  items[0].focus();
  await sendKeys({ press: 'End' });

  expect(document.activeElement).to.equal(
    items[1].querySelector('glide-core-tree-item'),
  );
});

it('selects or expands and collapses items when Enter is pressed', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One"></glide-core-tree-item>

      <glide-core-tree-item label="Two">
        <glide-core-tree-item label="Three"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  items[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(items[0].selected).to.be.true;
  expect(items[1].selected).to.be.false;
  expect(childItems[0].selected).to.be.false;
  expect(items[1].expanded).to.be.false;

  items[1].focus();
  await sendKeys({ press: 'Enter' });
  expect(items[1].expanded).to.be.true;

  childItems[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(childItems[0].selected).to.be.true;
});

it('selects a `non-collapsible` parent item on Enter', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One" expanded non-collapsible>
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  childItems[0].focus();
  items[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(childItems[0].selected).to.be.false;
  expect(items[0].selected).to.be.true;
});

it('does nothing if an unsupported key is pressed', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One">
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three" expanded>
        <glide-core-tree-item label="Four"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'a' });

  expect(document.activeElement).to.equal(items[0]);
});

it('can use the keyboard to navigate to an icon button', async () => {
  await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label">
        <glide-core-tree-item-icon-button slot="suffix">
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  assert(document.activeElement instanceof GlideCoreTreeItemIconButton);
});

it('can use the keyboard to navigate to an item menu', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label">
        <glide-core-tree-item-menu slot="menu">
          <glide-core-menu-link label="Label"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  await sendKeys({ press: 'Tab' }); // Focus the first item.
  await sendKeys({ press: 'Tab' }); // Focus its menu.

  expect(document.activeElement).to.equal(
    host.querySelector('glide-core-tree-item-menu'),
  );
});

it('does not focus on an icon button unless its parent item is focused', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One"></glide-core-tree-item>

      <glide-core-tree-item label="Two">
        <glide-core-tree-item-icon-button slot="suffix">
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item',
  );

  items[0].focus();
  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);

  items[1].focus();
  await sendKeys({ press: 'Tab' });

  expect(document.activeElement instanceof GlideCoreTreeItemIconButton).to.be
    .true;

  await sendKeys({ down: 'Shift' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ up: 'Shift' });

  expect(document.activeElement).to.equal(items[1]);
});

it('does not focus on an item menu unless its parent item is focused', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label"></glide-core-tree-item>

      <glide-core-tree-item label="Label">
        <glide-core-tree-item-menu slot="menu">
          <glide-core-menu-link label="Label"></glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  await sendKeys({ press: 'Tab' });

  const items = host.querySelectorAll('glide-core-tree-item');

  items[0].focus();
  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);

  items[1].focus();
  await sendKeys({ press: 'Tab' });
  expect(document.activeElement instanceof GlideCoreTreeItemMenu).to.be.true;
});

it('does not select an item if Enter is pressed while its icon button is focused', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label">
        <glide-core-tree-item-icon-button slot="suffix">
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  await sendKeys({ press: 'Tab' });

  const items = host.querySelectorAll('glide-core-tree-item');

  const iconButton = host.querySelector('glide-core-tree-item-icon-button');

  items[0].focus();
  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(iconButton);

  await sendKeys({ press: 'Enter' });
  expect(items[0].selected).to.be.false;
});
