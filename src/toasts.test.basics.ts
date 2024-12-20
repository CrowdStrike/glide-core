/* eslint-disable @typescript-eslint/no-unused-expressions */

import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreToasts from './toasts.js';

GlideCoreToasts.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-toasts')).to.equal(
    GlideCoreToasts,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  await expect(component).to.be.accessible();
});

it('sets correct role', async () => {
  const component = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  expect(
    component.shadowRoot?.firstElementChild?.getAttribute('role'),
  ).to.equal('region');
});

it('can add a toast', async () => {
  const component = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  const toasts = component.shadowRoot?.querySelectorAll('glide-core-toast');
  assert(toasts);
  expect(toasts.length).to.equal(1);
  const toast = toasts[0];
  expect(toast.label).to.equal('Test toast');
  expect(toast.description).to.equal('Test toast description');
  expect(toast.variant).to.equal('informational');
});

it('can add a toast with duration', async () => {
  const component = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
    duration: 10_000,
  });

  const toasts = component.shadowRoot?.querySelectorAll('glide-core-toast');
  assert(toasts);
  const toast = toasts[0];
  expect(toast.duration).to.equal(10_000);
});

it('can add multiple toasts', async () => {
  const component = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  component.add({
    label: 'Test toast 2',
    description: 'Test toast description 2',
    variant: 'success',
  });

  component.add({
    label: 'Test toast 3',
    description: 'Test toast description 3',
    variant: 'error',
  });

  const toasts = component.shadowRoot?.querySelectorAll('glide-core-toast');
  assert(toasts);
  expect(toasts.length).to.equal(3);

  const toast1 = toasts[0];
  expect(toast1.label).to.equal('Test toast');
  expect(toast1.description).to.equal('Test toast description');
  expect(toast1.variant).to.equal('informational');

  const toast2 = toasts[1];
  expect(toast2.label).to.equal('Test toast 2');
  expect(toast2.description).to.equal('Test toast description 2');
  expect(toast2.variant).to.equal('success');

  const toast3 = toasts[2];
  expect(toast3.label).to.equal('Test toast 3');
  expect(toast3.description).to.equal('Test toast description 3');
  expect(toast3.variant).to.equal('error');
});

it('removes a closed toast from the DOM', async () => {
  const component = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  let toasts = component.shadowRoot?.querySelectorAll('glide-core-toast');
  assert(toasts);
  expect(toasts.length).to.equal(1);
  const toast = toasts[0];
  toast.close();
  toast.dispatchEvent(new Event('close', { bubbles: true }));

  toasts = component.shadowRoot?.querySelectorAll('glide-core-toast');

  expect(toasts?.length).to.equal(0);
});

it('is hidden unless there are toasts displayed', async () => {
  const component = await fixture<GlideCoreToasts>(
    html`<glide-core-toasts></glide-core-toasts>`,
  );

  const shadowComponent = component.shadowRoot?.querySelector('.component');
  assert(shadowComponent);

  expect(shadowComponent.hasAttribute('popover')).to.be.false;
  expect(getComputedStyle(shadowComponent).display).to.equal('none');

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  expect(shadowComponent.getAttribute('popover')).to.equal('manual');
  expect(getComputedStyle(shadowComponent).display).to.equal('flex');

  const toasts = component.shadowRoot?.querySelectorAll('glide-core-toast');
  assert(toasts);
  const toast = toasts[0];
  toast.close();
  toast.dispatchEvent(new Event('close', { bubbles: true }));

  expect(getComputedStyle(shadowComponent).display).to.equal('none');
});
