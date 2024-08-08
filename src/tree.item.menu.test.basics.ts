import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreTreeItemMenu.shadowRootOptions.mode = 'open';

it('registers', async () => {
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
  const treeItemMenu = await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu>
      <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);

  expect(
    treeItemMenu.shadowRoot?.querySelector('glide-core-menu')?.placement,
  ).to.equal('bottom-start');
});

it('can set placement of the menu', async () => {
  const treeItemMenu = await fixture<GlideCoreTreeItemMenu>(html`
    <glide-core-tree-item-menu placement="bottom-end">
      <glide-core-menu-link label="One" url="/one"> </glide-core-menu-link>
    </glide-core-tree-item-menu>
  `);

  expect(
    treeItemMenu.shadowRoot?.querySelector('glide-core-menu')?.placement,
  ).to.equal('bottom-end');
});
