import { expect, fixture, html } from '@open-wc/testing';
import { click } from './library/mouse.js';
import './menu.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import expectWindowError from './library/expect-window-error.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tree-item-menu')).to.equal(
    GlideCoreTreeItemMenu,
  );
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture<GlideCoreTreeItemMenu>(html`
      <glide-core-tree-item-menu></glide-core-tree-item-menu>
    `);
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture<GlideCoreTreeItemMenu>(html`
      <glide-core-tree-item-menu>
        <button>Button</button>
      </glide-core-tree-item-menu>
    `);
  });
});

it('can be opened programmatically', async () => {
  const component = await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu>
      <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-menu')
      ?.getAttribute('open'),
  ).to.equal(null);

  await click(component.shadowRoot?.querySelector('[data-test="icon-button"]'));

  expect(
    component.shadowRoot
      ?.querySelector('glide-core-menu')
      ?.getAttribute('open'),
  ).to.equal('');
});

it('has `#onIconSlotChange` coverage', async () => {
  await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu>
      <svg slot="icon"></svg>
      <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);
});
