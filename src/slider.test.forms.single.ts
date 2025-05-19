import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import Slider from './slider.js';

it('resets to 25/75% of the range size if there was no initial value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  host.value = [90];
  await host.updateComplete;

  form.reset();

  expect(host.value).to.deep.equal([25]);
});

it('sets `value` back to the default when one is not provided initially and it is programmatically emptied', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  host.value = [];
  await host.updateComplete;

  expect(host.value).to.deep.equal([25]);
});

it('sets `value` to 25% of the range size when programmatically emptying it, even when given an initial value', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      name="name"
      .value=${[10]}
    ></glide-core-slider>`,
  );

  host.value = [];

  expect(host.value).to.deep.equal([25]);
});

it('submits its form on Enter when the input has focus', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  singleInput?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('submits its form on Enter when the handle has focus', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('defaults `formData` to 25% of the range size when no value', async () => {
  const form = document.createElement('form');

  await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      name="name"
      max="200"
    ></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.equal('[50]');
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
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
    host.shadowRoot?.querySelector('[data-test="single-input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is invalid when `setValidity()` is called', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
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
    host.shadowRoot?.querySelector('[data-test="single-input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});
