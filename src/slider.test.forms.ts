import { expect, fixture, html } from '@open-wc/testing';
import Slider from './slider.js';

it('can be reset to its initial value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[20]}></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  host.value = [90];
  form.reset();

  expect(host.value).to.deep.equal([20]);
});

it('has `formData` value when it has a value', async () => {
  const form = document.createElement('form');

  await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      name="name"
      .value=${[20]}
    ></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.equal('[20]');
});

it('has no `formData` value when it has a value but is disabled', async () => {
  const form = document.createElement('form');

  await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      name="name"
      .value=${[20]}
      disabled
    ></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but no `name`', async () => {
  const form = document.createElement('form');

  await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[20]}
      disabled
    ></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('is valid if not required and no `value`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is valid if required and `value`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[20]}
      required
    ></glide-core-slider>`,
  );

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is valid if no value and required and disabled', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      disabled
      required
    ></glide-core-slider>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  host.setCustomValidity('validity message');
  host.reportValidity();
  await host.updateComplete;

  host.setCustomValidity('');
  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('is valid when `setValidity()` is called', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  host.setValidity({ customError: true }, 'validity message');
  host.setValidity({});
  await host.updateComplete;

  expect(host.validity.valid).to.be.true;
  expect(host.validity.customError).to.be.false;

  expect(host.reportValidity()).to.be.true;
  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('removes its validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  host.setCustomValidity('validity message');

  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');

  host.resetValidityFeedback();

  await host.updateComplete;

  expect(host.shadowRoot?.querySelector('[data-test="validity-message"]')).to.be
    .null;

  expect(host.validity?.valid).to.be.false;
});
