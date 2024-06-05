import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import TreeItemMenu from './tree.item.menu.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

it('registers', async () => {
  expect(window.customElements.get('cs-tree-item-menu')).to.equal(TreeItemMenu);
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture<TreeItemMenu>(html`
      <cs-tree-item-menu></cs-tree-item-menu>
    `);
  });
});

it('throws if the default slot is the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture<TreeItemMenu>(html`
      <cs-tree-item-menu>
        <button>Button</button>
      </cs-tree-item-menu>
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
