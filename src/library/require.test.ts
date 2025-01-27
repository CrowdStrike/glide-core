import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import require from './require.js';

@customElement('glide-core-with-required-property')
class GlideCoreWithRequiredProperty extends LitElement {
  @property()
  @require
  label?: string;
}

it('throws when a required attribute is missing', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  fixture<GlideCoreWithRequiredProperty>(
    html`<glide-core-with-required-property></glide-core-with-required-property>`,
  );

  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);
  expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;

  expect(spy.args.at(0)?.at(0).reason.message).to.equal(
    'Expected GlideCoreWithRequiredProperty to have a `label` property.',
  );

  stub.restore();
});

it('does not throw when a required attribute is not missing', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<GlideCoreWithRequiredProperty>(
    html`<glide-core-with-required-property
      label="Label"
    ></glide-core-with-required-property>`,
  );

  expect(spy.callCount).to.equal(0);

  stub.restore();
});
