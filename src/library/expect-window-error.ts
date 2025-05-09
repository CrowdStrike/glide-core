import { expect, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

export default async function (callback: () => unknown) {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  await callback.call(context);
  await waitUntil(() => spy.callCount);

  // Some components assert against a slot that is itself slotted content for
  // a component. For example, Split Button Secondary Button and its default slot.
  //
  // Split Button Secondary Button passes its default slot into Menu's default slot,
  // and Menu asserts against its default slot. So Split Button Secondary Button's
  // default slot test produces two errors: one from itself and one from Menu.
  //
  // Rather than account for cases like that in each test, we simply use `to.be.greaterThan()`
  // instead of `to.equal(1)`.
  expect(spy.callCount).to.be.greaterThan(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  expect(spy.args.at(0)?.at(4) instanceof Error).to.be.true;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
}
