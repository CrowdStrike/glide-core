import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import Slider from './slider.js';

it('can be reset if there was no initial value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  host.value = [10, 90];
  await host.updateComplete;

  form.reset();

  expect(host.value).to.deep.equal([25, 75]);
});

it('sets `value` back to the default when one is not provided initially and it is programmatically emptied', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  host.value = [];

  expect(host.value).to.deep.equal([25, 75]);
});

it('updates `value` to the initial value when programmatically emptying it', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      name="name"
      .value=${[10, 90]}
      multiple
    ></glide-core-slider>`,
  );

  host.value = [];

  expect(host.value).to.deep.equal([10, 90]);
});

it('submits its form on Enter when the minimum input has focus', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  minimumInput?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('submits its form on Enter when the minimum handle has focus', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('submits its form on Enter when the maximum input has focus', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  maximumInput?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('submits its form on Enter when the maximum handle has focus', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('defaults `formData` to 25/75% of `max` when no value', async () => {
  const form = document.createElement('form');

  await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      name="name"
      max="200"
      multiple
    ></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.equal('[50,150]');
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  host.setCustomValidity('validity message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.checkValidity()).to.be.false;

  await host.updateComplete;

  // Like native, the message shouldn't display until `reportValidity()` is called.
  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="minimum-input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="maximum-input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is invalid when `setValidity()` is called', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  host.setValidity({ customError: true }, 'validity message');

  expect(host.validity.valid).to.be.false;

  await host.updateComplete;

  // Like native, the message shouldn't display until `reportValidity()` is called.
  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(host.validity?.customError).to.be.true;

  host.reportValidity();

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="minimum-input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="maximum-input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});
