import { ArgumentError } from 'ow';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import TreeItemMenu from './tree.item.menu.js';
import sinon from 'sinon';

it('registers', async () => {
  expect(window.customElements.get('cs-tree-item-menu')).to.equal(TreeItemMenu);
});

it('throws if it does not have a default slot', async () => {
  const onerror = window.onerror;

  // Prevent Mocha from failing the test because of the failed "slotchange" assertion,
  // which is expected. We'd catch the error below. But it happens in an event handler
  // and so propagates to the window.
  //
  // https://github.com/mochajs/mocha/blob/99601da68d59572b6aa931e9416002bcb5b3e19d/browser-entry.js#L75
  //
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = null;

  const spy = sinon.spy();

  try {
    await fixture<TreeItemMenu>(html`
      <cs-tree-item-menu></cs-tree-item-menu>
    `);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;

  // Menu is rendered asynchronously outside of Tree Menu Item's lifecycle
  // and asserts against its default slot. That assertion, which is expected
  // to fail, results in an unhandled rejection that gets logged.
  const stub = sinon.stub(console, 'error');
  await waitUntil(() => stub.called);
  stub.restore();

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;
});

it('throws if the default slot is the incorrect type', async () => {
  const onerror = window.onerror;

  // Prevent Mocha from failing the test because of the failed "slotchange" assertion,
  // which is expected. We'd catch the error below. But it happens in an event handler
  // and so propagates to the window.
  //
  // https://github.com/mochajs/mocha/blob/99601da68d59572b6aa931e9416002bcb5b3e19d/browser-entry.js#L75
  //
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = null;

  const spy = sinon.spy();

  try {
    await fixture<TreeItemMenu>(html`
      <cs-tree-item-menu>
        <button>Button</button>
      </cs-tree-item-menu>
    `);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;

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
