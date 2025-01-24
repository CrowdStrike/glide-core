import './tree.item.icon-button.js';
import './tree.item.menu.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreTree from './tree.js';
import GlideCoreTreeItem from './tree.item.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTree {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tree')).to.equal(GlideCoreTree);
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One"></glide-core-tree-item>

      <glide-core-tree-item label="Two">
        <glide-core-tree-item label="Three"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  await expect(host).to.be.accessible();
});

it('sets `aria-expanded`', async () => {
  const host = await fixture(html`
    <glide-core-tree>
      <glide-core-tree-item label="One"></glide-core-tree-item>

      <glide-core-tree-item label="Two">
        <glide-core-tree-item label="Three"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Four" expanded>
        <glide-core-tree-item label="Five"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  expect(items[0].ariaExpanded).to.equal(null);

  expect(
    items[1].shadowRoot?.querySelector('[data-test="component"]')?.ariaExpanded,
  ).to.equal('false');

  items[1].toggleExpand();
  await items[1].updateComplete;

  expect(
    items[1].shadowRoot?.querySelector('[data-test="component"]')?.ariaExpanded,
  ).to.equal('true');

  expect(
    items[2].shadowRoot?.querySelector('[data-test="component"]')?.ariaExpanded,
  ).to.equal('true');
});

it('sets `aria-selected`', async () => {
  const host = await fixture<GlideCoreTree>(html`
    <glide-core-tree>
      <glide-core-tree-item label="One">
        <glide-core-tree-item label="Two"></glide-core-tree-item>
      </glide-core-tree-item>

      <glide-core-tree-item label="Three"></glide-core-tree-item>
      <glide-core-tree-item label="Four" selected></glide-core-tree-item>
    </glide-core-tree>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  expect(items[0].ariaSelected).to.equal(null);

  expect(
    items[1].shadowRoot?.querySelector('[data-test="component"]')?.ariaSelected,
  ).to.equal('false');

  expect(
    items[2].shadowRoot?.querySelector('[data-test="component"]')?.ariaSelected,
  ).to.equal('true');

  host.selectItem(items[1]);
  await items[1].updateComplete;

  expect(
    items[1].shadowRoot?.querySelector('[data-test="component"]')?.ariaSelected,
  ).to.equal('true');
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
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
