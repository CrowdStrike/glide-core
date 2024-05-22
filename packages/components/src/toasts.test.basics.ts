import { assert, expect, fixture, html } from '@open-wc/testing';
import CsToasts from './toasts.js';

CsToasts.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('registers', async () => {
  expect(window.customElements.get('cs-toasts')).to.equal(CsToasts);
});

it('is accessible', async () => {
  const component = await fixture<CsToasts>(html`<cs-toasts></cs-toasts>`);

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  await expect(component).to.be.accessible();
});

it('sets correct role', async () => {
  const component = await fixture<CsToasts>(html`<cs-toasts></cs-toasts>`);

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  expect(
    component.shadowRoot?.firstElementChild?.getAttribute('role'),
  ).to.equal('region');
});

it('is can add a toast', async () => {
  const component = await fixture<CsToasts>(html`<cs-toasts></cs-toasts>`);

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  const toasts = component.shadowRoot?.querySelectorAll('cs-toast');
  assert(toasts);
  expect(toasts.length).to.equal(1);
  const toast = toasts[0];
  expect(toast.label).to.equal('Test toast');
  expect(toast.description).to.equal('Test toast description');
  expect(toast.variant).to.equal('informational');
});

it('is can add multiple toasts', async () => {
  const component = await fixture<CsToasts>(html`<cs-toasts></cs-toasts>`);

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

  const toasts = component.shadowRoot?.querySelectorAll('cs-toast');
  assert(toasts);
  expect(toasts.length).to.equal(2);

  const toast1 = toasts[0];
  expect(toast1.label).to.equal('Test toast');
  expect(toast1.description).to.equal('Test toast description');
  expect(toast1.variant).to.equal('informational');

  const toast2 = toasts[1];
  expect(toast2.label).to.equal('Test toast 2');
  expect(toast2.description).to.equal('Test toast description 2');
  expect(toast2.variant).to.equal('success');
});

it('removes a closed toast from the DOM', async () => {
  const component = await fixture<CsToasts>(html`<cs-toasts></cs-toasts>`);

  component.add({
    label: 'Test toast',
    description: 'Test toast description',
    variant: 'informational',
  });

  let toasts = component.shadowRoot?.querySelectorAll('cs-toast');
  assert(toasts);
  expect(toasts.length).to.equal(1);
  const toast = toasts[0];
  toast.close();
  toast.dispatchEvent(new Event('close', { bubbles: true }));

  toasts = component.shadowRoot?.querySelectorAll('cs-toast');

  expect(toasts?.length).to.equal(0);
});
