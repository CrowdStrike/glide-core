import { expect, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';

export default async function (callback: () => Promise<unknown>) {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  await callback.call(context);
  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;

  window.removeEventListener('unhandledrejection', spy);
  stub.restore();
}
