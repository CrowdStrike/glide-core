import { ArgumentError } from 'ow';
import { expect } from '@open-wc/testing';
import sinon from 'sinon';

/*
  You only need this when the error is thrown asychronously because of a
  "slotchange" assertion. If your fixture is already wrapped in `try/catch`
  and you're still seeing an "Uncaught ArgumentError" in the console, then
  this library is for you.
*/
export default async function (callback: () => Promise<unknown>) {
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
    await callback.call(context);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;
}
