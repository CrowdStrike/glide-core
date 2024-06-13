import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

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
  // to fail, results in an unhandled rejection that gets logged.
  const stub = sinon.stub(console, 'error');

  // Menu asserts against its default slot once on `firstUpdated` and
  // again on "slotchange". It also renders asynchronously. So we have
  // to wait until the stub has been called before restoring it.
  await waitUntil(() => stub.called);
  stub.restore();

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;
});
