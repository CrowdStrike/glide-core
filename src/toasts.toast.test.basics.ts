import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreToast from './toasts.toast.js';
import sinon from 'sinon';

GlideCoreToast.shadowRootOptions.mode = 'open';

// NOTE: Due to https://github.com/modernweb-dev/web/issues/2520, we sometimes need
// to manually dispatch the `transitionend` event in tests.

it('registers', async () => {
  expect(window.customElements.get('glide-core-toast')).to.equal(
    GlideCoreToast,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  await expect(component).to.be.accessible();
});

it('sets correct role', async () => {
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  expect(
    component.shadowRoot?.firstElementChild?.getAttribute('role'),
  ).to.equal('alert');
});

it('sets correct aria labelling', async () => {
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  expect(
    component.shadowRoot?.firstElementChild?.getAttribute('aria-labelledby'),
  ).to.equal('label description');

  expect(
    component.shadowRoot?.firstElementChild?.querySelector('#label')
      ?.textContent,
  ).to.equal('Label');

  expect(
    component.shadowRoot?.firstElementChild?.querySelector('#description')
      ?.textContent,
  ).to.equal('Toast description');
});

it('sets variant, label, and description', async () => {
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  await expect(component.variant).to.equal('informational');
  await expect(component.label).to.equal('Label');
  await expect(component.description).to.equal('Toast description');
});

it('opens and closes by default', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  clock.tick(3000);

  const shadowElement = component.shadowRoot!.firstElementChild;

  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
  ]);

  clock.tick(6000);

  expect([...component.shadowRoot!.firstElementChild!.classList]).to.deep.equal(
    ['component', 'informational', 'closed'],
  );

  clock.restore();
});

it('responds to duration', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
      duration="10000"
    ></glide-core-toast>`,
  );

  clock.tick(9500);

  const shadowElement = component.shadowRoot!.firstElementChild;

  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
  ]);

  clock.tick(1000);

  expect([...component.shadowRoot!.firstElementChild!.classList]).to.deep.equal(
    ['component', 'informational', 'closed'],
  );

  clock.restore();
});

it('responds to duration of Infinity', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
      duration="Infinity"
    ></glide-core-toast>`,
  );

  clock.tick(9500);

  const shadowElement = component.shadowRoot!.firstElementChild;

  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
  ]);

  clock.restore();
});

it('does not allow less than 5000 duration', async () => {
  const clock = sinon.useFakeTimers();

  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
      duration="3000"
    ></glide-core-toast>`,
  );

  clock.tick(4000);

  const shadowElement = component.shadowRoot!.firstElementChild;

  expect([...shadowElement!.classList]).to.deep.equal([
    'component',
    'informational',
  ]);

  clock.restore();
});

it('can be closed by clicking on the x icon', async () => {
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  const shadowElement = component.shadowRoot!.firstElementChild;

  const closeButton = shadowElement?.querySelector<HTMLButtonElement>(
    'glide-core-icon-button[label="Close"]',
  );

  assert(closeButton);

  closeButton.click();

  expect([...component.shadowRoot!.firstElementChild!.classList]).to.deep.equal(
    ['component', 'informational', 'closed'],
  );
});
