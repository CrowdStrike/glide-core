import { assert, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreToasts from './toasts.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreToasts {}

it('has toasts', async () => {
  const host = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  host.add({
    label: 'One',
    description: 'One',
    variant: 'informational',
  });

  host.add({
    label: 'Two',
    description: 'Two',
    variant: 'success',
  });

  const toasts = host.shadowRoot?.querySelectorAll('glide-core-toast');
  expect(toasts?.length).to.equal(2);

  expect(toasts?.[0]?.label).to.equal('One');
  expect(toasts?.[0]?.description).to.equal('One');
  expect(toasts?.[0]?.variant).to.equal('informational');

  expect(toasts?.[1]?.label).to.equal('Two');
  expect(toasts?.[1]?.description).to.equal('Two');
  expect(toasts?.[1]?.variant).to.equal('success');
});

it('removes a closed toast', async () => {
  const host = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  host.add({
    label: 'Label',
    description: 'Description',
    variant: 'informational',
  });

  let toasts = host.shadowRoot?.querySelectorAll('glide-core-toast');
  assert(toasts);

  expect(toasts?.length).to.equal(1);

  toasts[0]?.close();
  toasts[0]?.dispatchEvent(new Event('close', { bubbles: true }));

  toasts = host.shadowRoot?.querySelectorAll('glide-core-toast');
  expect(toasts?.length).to.equal(0);
});

it('is hidden when there are no toasts', async () => {
  const host = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  const component = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(component?.checkVisibility()).to.not.be.ok;
});

it('is visible when there are toasts', async () => {
  const host = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  host.add({
    label: 'Label',
    description: 'Description',
    variant: 'informational',
  });

  const component = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(component?.checkVisibility()).to.be.true;
});

it('is hidden when a toast is closed', async () => {
  const host = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  host.add({
    label: 'Label',
    description: 'Description',
    variant: 'informational',
  });

  const toast = host.shadowRoot?.querySelector('glide-core-toast');

  toast?.close();
  toast?.dispatchEvent(new Event('close', { bubbles: true }));

  const component = host.shadowRoot?.querySelector('[data-test="component"]');
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
