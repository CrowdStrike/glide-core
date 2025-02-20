import './menu.link.js';
import './tree.item.menu.js';
import './menu.js';
import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import GlideCoreTreeItem from './tree.item.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTreeItem {}

it('registers itself', () => {
  expect(window.customElements.get('glide-core-tree-item')).to.equal(
    GlideCoreTreeItem,
  );
});

it('has an expand icon when it has items', async () => {
  const host = await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item label="Label">
      <glide-core-tree-item label="Label"></glide-core-tree-item>
    </glide-core-tree-item>
  `);

  expect(
    host.shadowRoot
      ?.querySelector('[data-test="expand-icon-container"] svg')
      ?.checkVisibility(),
  ).to.be.true;
});

it('does not have an expand icon when `remove-indentation` is set', async () => {
  const host = await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item
      label="Label"
      remove-indentation
    ></glide-core-tree-item>
  `);

  expect(
    host.shadowRoot
      ?.querySelector('[data-test="expand-icon-container"] svg')
      ?.checkVisibility(),
  ).to.not.be.ok;
});

it('does not have an expand icon if it has no items', async () => {
  const host = await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item label="Label"></glide-core-tree-item>
  `);

  expect(
    host.shadowRoot
      ?.querySelector('[data-test="expand-icon-container"] svg')
      ?.checkVisibility(),
  ).to.not.be.ok;
});

it('sets `label` on its menu target', async () => {
  const host = await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item label="Label">
      <glide-core-tree-item-menu label="Label" slot="menu">
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-tree-item-menu>
    </glide-core-tree-item>
  `);

  const target = host
    .querySelector('glide-core-tree-item-menu')
    ?.shadowRoot?.querySelector('glide-core-menu')
    ?.querySelector('glide-core-icon-button');

  expect(target?.label).to.equal('Actions for Label');
});

it('sets `level` on its items', async () => {
  const host = await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item expanded label="Label">
      <glide-core-tree-item label="Label"></glide-core-tree-item>

      <glide-core-tree-item label="Label">
        <glide-core-tree-item label="Label"></glide-core-tree-item>
      </glide-core-tree-item>
    </glide-core-tree-item>
  `);

  const items = host.querySelectorAll<GlideCoreTreeItem>(
    ':scope > glide-core-tree-item',
  );

  const childItems = host.querySelectorAll<GlideCoreTreeItem>(
    'glide-core-tree-item glide-core-tree-item',
  );

  expect(items?.[0].level).to.equal(2);
  expect(childItems?.[0].level).to.equal(2);
  expect(childItems?.[1].level).to.equal(2);
  expect(childItems?.[2].level).to.equal(3);
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-tree-item></glide-core-tree-item>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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

it('throws when its "menu" slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tree-item expanded label="Label">
        <span slot="menu"></span>
      </glide-core-tree-item>
    `);
  });
});

it('has "prefix" slot coverage', async () => {
  await fixture<GlideCoreTreeItem>(html`
    <glide-core-tree-item label="Label">
      <span slot="prefix">Prefix</span>
    </glide-core-tree-item>
  `);
});
