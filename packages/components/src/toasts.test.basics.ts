import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreToasts from './toasts.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreToasts {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-toasts')).to.equal(
    GlideCoreToasts,
  );
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  host.add({
    label: 'Label',
    description: 'Description',
    variant: 'informational',
  });

  await expect(host).to.be.accessible();
});

it('is hidden unless there are toasts displayed', async () => {
  const host = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  const component = host.shadowRoot?.querySelector('[data-test="component"]');

  expect(component?.checkVisibility()).to.not.be.ok;

  host.add({
    label: 'Label',
    description: 'Description',
    variant: 'informational',
  });

  expect(component?.checkVisibility()).to.be.true;

  const toast = host.shadowRoot?.querySelector('glide-core-toast');

  toast?.close();
  toast?.dispatchEvent(new Event('close', { bubbles: true }));

  expect(component?.checkVisibility()).to.not.be.ok;
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
