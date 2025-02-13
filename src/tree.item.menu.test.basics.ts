import { expect, fixture, html } from '@open-wc/testing';
import './menu.js';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import { click } from './library/mouse.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import expectWindowError from './library/expect-window-error.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTreeItemMenu {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tree-item-menu')).to.equal(
    GlideCoreTreeItemMenu,
  );
});

it('can be opened programmatically', async () => {
  const host = await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu label="Label">
      <glide-core-menu-link label="Label"></glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);

  const menu = host.shadowRoot?.querySelector('glide-core-menu');

  expect(menu?.open).to.be.false;

  await click(host.shadowRoot?.querySelector('[data-test="icon-button"]'));

  expect(menu?.open).to.be.true;
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
    return fixture<GlideCoreTreeItemMenu>(html`
      <glide-core-tree-item-menu label="Label"></glide-core-tree-item-menu>
    `);
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture<GlideCoreTreeItemMenu>(html`
      <glide-core-tree-item-menu label="Label">
        <button>Button</button>
      </glide-core-tree-item-menu>
    `);
  });
});

it('has `#onIconSlotChange` coverage', async () => {
  await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu label="Label">
      <svg slot="icon"></svg>
      <glide-core-menu-link label="Label"></glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);
});
