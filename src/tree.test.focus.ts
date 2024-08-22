import './tree.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTree from './tree.js';
import GlideCoreTreeItem from './tree.item.js';
import GlideCoreTreeItemIconButton from './tree.item.icon-button.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';

GlideCoreTree.shadowRootOptions.mode = 'open';

it('focuses the first tree item when tree is focused, if there are no selected items', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2"></glide-core-tree-item>
    </glide-core-tree>
  `);

  tree.dispatchEvent(new Event('focusin'));

  const childItems = tree.slotElements;
  assert(document.activeElement instanceof GlideCoreTreeItem);

  expect(document.activeElement?.label).to.equal(childItems[0].label);
});

it('focuses the selected tree item on `focus()`, if there is one', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  tree.selectItem(childItems[1]);
  tree.dispatchEvent(new Event('focusin'));
  await tree.updateComplete;
  assert(document.activeElement instanceof GlideCoreTreeItem);
  expect(document.activeElement?.label).to.equal(childItems[1].label);
});

it('does not focus the selected tree item on `focus()` if collapsed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"> </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item
          label="Grandchild Item 1"
          selected
        ></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  tree.dispatchEvent(new Event('focusin'));
  await tree.updateComplete;
  expect(document.activeElement === childItems[0]).to.equal(true);
});

it('expands a tree item if right arrow is pressed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  tree.dispatchEvent(new Event('focusin'));
  await sendKeys({ press: 'ArrowRight' });
  expect(childItems[0].expanded).to.equal(true);
  assert(document.activeElement instanceof GlideCoreTreeItem);

  expect(document.activeElement?.label).to.equal(
    childItems[0].label,
    'focus does not move',
  );
});

it(`focuses on an expanded tree item's child if right arrow is pressed`, async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1" expanded>
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  tree.dispatchEvent(new Event('focusin'));
  await sendKeys({ press: 'ArrowRight' });
  assert(document.activeElement instanceof GlideCoreTreeItem);

  expect(document.activeElement?.label).to.equal(
    childItems[0].slotElements[0].label,
  );
});

it('collapses an expanded tree item if left arrow is pressed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1" expanded>
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  tree.dispatchEvent(new Event('focusin'));
  await sendKeys({ press: 'ArrowLeft' });
  expect(childItems[0].expanded).to.equal(false);
  assert(document.activeElement instanceof GlideCoreTreeItem);

  expect(document.activeElement?.label).to.equal(
    childItems[0].label,
    'focus does not move',
  );
});

it(`focuses on a non-collapsible tree item's parent if left arrow is pressed`, async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1" expanded non-collapsible>
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  const grandchildItems = childItems[0].slotElements;
  grandchildItems[0].focus();
  await sendKeys({ press: 'ArrowLeft' });
  assert(document.activeElement instanceof GlideCoreTreeItem);
  expect(document.activeElement?.label).to.equal(childItems[0].label);
});

it(`focuses on a collapsed tree item's parent if left arrow is pressed`, async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item expanded label="Child Item 1">
        <glide-core-tree-item label="Grandchild Item 1">
          <glide-core-tree-item
            label="Great Grandchild Item 1"
          ></glide-core-tree-item>
        </glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  const grandchildItems = childItems[0].slotElements;
  grandchildItems[0].focus();
  await sendKeys({ press: 'ArrowLeft' });
  expect(document.activeElement === childItems[0]).to.equal(true);
});

it('moves down the non-expanded tree items with down arrow', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1" expanded>
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 2"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 3"></glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  tree.dispatchEvent(new Event('focusin'));

  await sendKeys({ press: 'ArrowDown' });
  assert(document.activeElement instanceof GlideCoreTreeItem);

  expect(document.activeElement?.label).to.equal(
    childItems[0].slotElements[0].label,
    'moves to child item if expanded',
  );

  await sendKeys({ press: 'ArrowDown' });

  expect(document.activeElement?.label).to.equal(
    childItems[1].label,
    'moves from last child for next parent',
  );

  await sendKeys({ press: 'ArrowDown' });

  expect(document.activeElement?.label).to.equal(
    childItems[2].label,
    'Does not navigate to collapsed tree items',
  );

  await sendKeys({ press: 'ArrowDown' });

  expect(document.activeElement?.label).to.equal(
    childItems[2].label,
    'Does not move if at the last item',
  );
});

it('moves up the non-expanded tree items with up arrow', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2" expanded>
        <glide-core-tree-item label="Grandchild Item 2"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  // Start at the last item
  childItems[1].slotElements[0].focus();

  await sendKeys({ press: 'ArrowUp' });
  assert(document.activeElement instanceof GlideCoreTreeItem);
  expect(document.activeElement?.label).to.equal(childItems[1].label);

  await sendKeys({ press: 'ArrowUp' });

  expect(document.activeElement?.label).to.equal(
    childItems[0].label,
    'Does not navigate to collapsed tree items',
  );

  await sendKeys({ press: 'ArrowUp' });

  expect(document.activeElement?.label).to.equal(
    childItems[0].label,
    'Does not move if at the first item',
  );
});

it('moves to the first item when Home is pressed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2" expanded>
        <glide-core-tree-item label="Grandchild Item 2"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  // Start at the last item
  childItems[1].slotElements[0].focus();

  await sendKeys({ press: 'Home' });
  assert(document.activeElement instanceof GlideCoreTreeItem);
  expect(document.activeElement?.label).to.equal(childItems[0].label);
});

it('moves to the last item when End is pressed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2" expanded>
        <glide-core-tree-item label="Grandchild Item 2"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  // Start at the first item
  childItems[0].focus();

  await sendKeys({ press: 'End' });
  assert(document.activeElement instanceof GlideCoreTreeItem);

  expect(document.activeElement?.label).to.equal(
    childItems[1].slotElements[0].label,
  );
});

it('selects or expands/collapses node when Enter is pressed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"></glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  const grandchildItems = childItems?.[1].slotElements;

  // For an item that doesn't have children, selects it
  childItems[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(childItems[0].selected).to.equal(true);
  expect(childItems[1].selected).to.equal(false);
  expect(grandchildItems[0].selected).to.equal(false);
  expect(childItems[1].expanded).to.equal(false);

  // For an item that has children, expands it
  childItems[1].focus();
  await sendKeys({ press: 'Enter' });
  expect(childItems[1].expanded).to.equal(true);

  // Can select a grandchild item
  grandchildItems[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(grandchildItems[0].selected).to.equal(true);
});

it('selects a non-collapsible parent node when Enter is pressed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1" expanded non-collapsible>
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  const grandchildItems = childItems?.[0].slotElements;

  grandchildItems[0].focus();
  childItems[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(grandchildItems[0].selected).to.equal(false);
  expect(childItems[0].selected).to.equal(true);
});

it('does nothing if some other key is pressed', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item label="Grandchild Item 1"></glide-core-tree-item>
      </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2" expanded>
        <glide-core-tree-item label="Grandchild Item 2"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const childItems = tree.slotElements;
  // Start at the first item
  childItems[0].focus();

  await sendKeys({ press: 'a' });
  assert(document.activeElement instanceof GlideCoreTreeItem);
  expect(document.activeElement?.label).to.equal(childItems[0].label);
});

it('can use the keyboard to navigate to a tree item icon button', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-icon-button slot="suffix">
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  tree.dispatchEvent(new Event('focusin'));

  const childItems = tree.slotElements;
  childItems[0].focus();
  await sendKeys({ press: 'Tab' });

  assert(document.activeElement instanceof GlideCoreTreeItemIconButton);
});

it('can use the keyboard to navigate to a tree item menu', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-menu slot="menu">
          <glide-core-menu-link label="Edit" url="/edit">
          </glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  tree.dispatchEvent(new Event('focusin'));

  const childItems = tree.slotElements;
  childItems[0].focus();
  await sendKeys({ press: 'Tab' });

  assert(document.activeElement instanceof GlideCoreTreeItemMenu);
});

it('does not focus on a tree item icon button unless that tree item is focused', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"> </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item-icon-button slot="suffix">
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  tree.dispatchEvent(new Event('focusin'));

  const childItems = tree.slotElements;
  childItems[0].focus();
  await sendKeys({ press: 'Tab' });

  expect(document.activeElement === document.body).to.equal(true);

  childItems[1].focus();

  await sendKeys({ press: 'Tab' });

  expect(
    document.activeElement instanceof GlideCoreTreeItemIconButton,
  ).to.equal(true);

  await sendKeys({ down: 'Shift' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ up: 'Shift' });

  expect(document.activeElement === childItems[1]).to.equal(
    true,
    'can keyboard navigate back to the parent Tree Item',
  );
});

it('does not focus on a tree item menu unless that tree item is focused', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1"> </glide-core-tree-item>
      <glide-core-tree-item label="Child Item 2">
        <glide-core-tree-item-menu slot="menu">
          <glide-core-menu-link label="Edit" url="/edit">
          </glide-core-menu-link>
        </glide-core-tree-item-menu>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  tree.dispatchEvent(new Event('focusin'));

  const childItems = tree.slotElements;
  childItems[0].focus();
  await sendKeys({ press: 'Tab' });

  expect(document.activeElement === document.body).to.equal(true);

  childItems[1].focus();

  await sendKeys({ press: 'Tab' });

  expect(document.activeElement instanceof GlideCoreTreeItemMenu).to.equal(
    true,
  );
});

it('does not select a tree item if Enter is pressed while its tree item icon button is focused', async () => {
  const tree = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="Child Item 1">
        <glide-core-tree-item-icon-button slot="suffix">
          <svg viewBox="0 0 24 24">
            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </glide-core-tree-item-icon-button>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  tree.dispatchEvent(new Event('focusin'));

  const childItems = tree.slotElements;
  childItems[0].focus();
  await sendKeys({ press: 'Tab' });

  expect(
    document.activeElement instanceof GlideCoreTreeItemIconButton,
  ).to.equal(true);

  await sendKeys({ press: 'Enter' });

  expect(childItems[0].hasAttribute('selected')).to.equal(false);
});
