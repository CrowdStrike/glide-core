import { assert, expect, fixture, html, waitUntil } from '@open-wc/testing';
import GlideCoreMenu from './menu.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import click from './library/click.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreTreeItemMenu.shadowRootOptions.mode = 'open';
GlideCoreMenu.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tree-item-menu')).to.equal(
    GlideCoreTreeItemMenu,
  );
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreTreeItemMenu>(html`
      <glide-core-tree-item-menu></glide-core-tree-item-menu>
    `);
  });
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreTreeItemMenu>(html`
      <glide-core-tree-item-menu>
        <button>Button</button>
      </glide-core-tree-item-menu>
    `);
  });

  // Menu is rendered asynchronously outside of Tree Menu Item's lifecycle
  // and asserts against its default slot. That assertion, which is expected
  // to fail in this case, results in an unhandled rejection that gets logged.
  // `console.error` is stubbed so the logs aren't muddied.
  const stub = sinon.stub(console, 'error');

  // Menu asserts against its default slot once on `firstUpdated` and again
  // on "slotchange". So we wait until the stub is called twice before restoring
  // it.
  await waitUntil(() => stub.calledTwice);
  stub.restore();
});

it('defaults the placement of the menu to bottom start', async () => {
  const component = await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu>
      <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-menu')?.placement,
  ).to.equal('bottom-start');
});

it('can set placement of the menu', async () => {
  const component = await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu placement="bottom-end">
      <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-menu')?.placement,
  ).to.equal('bottom-end');
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

it('can set a custom icon', async () => {
  const component = await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu placement="bottom-end">
      <svg data-test-custom-icon="true" slot="icon"></svg>
      <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);

  const menu = component.shadowRoot?.querySelector('glide-core-menu');

  assert(menu);

  const menuTarget = menu.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="target"]')
    ?.assignedElements()[0];

  assert(menuTarget);

  const icon = menuTarget
    ?.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedElements()[0];

  assert(icon instanceof SVGElement);

  expect(icon.dataset.testCustomIcon).to.equal('true');
});
