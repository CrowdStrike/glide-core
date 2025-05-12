import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import Checkbox from './checkbox.js';
import { click } from './library/mouse.js';

it('can be reset', async () => {
  const form = document.createElement('form');

  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      indeterminate
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  host.checked = false;
  host.indeterminate = false;
  form.reset();

  expect(host.checked).to.be.true;
  expect(host.indeterminate).to.be.true;
});

it('has `formData` value when checked', async () => {
  const form = document.createElement('form');

  await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
      checked
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.equal('value');
});

it('has `formData` value when checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
      checked
      indeterminate
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.equal('value');
});

it('has no `formData` value when unchecked', async () => {
  const form = document.createElement('form');

  await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when unchecked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
      indeterminate
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
      checked
      disabled
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but without a `name`', async () => {
  const form = document.createElement('form');

  await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      value="value"
      checked
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but without a `value`', async () => {
  const form = document.createElement('form');

  await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      checked
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('submits its form on Enter', async () => {
  const form = document.createElement('form');

  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  host.focus();
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('is valid if unchecked but not required', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is valid but not aria-invalid after being checked when unchecked and required', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.validity.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is invalid but not aria-invalid if unchecked and required', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is invalid but not aria-invalid after being unchecked when required', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      required
    ></glide-core-checkbox>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is both invalid and valid if unchecked and required and disabled', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      required
    ></glide-core-checkbox>`,
  );

  expect(host.validity.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;
});

it('is valid when `value` is empty and `required` is updated to `false` programmatically', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');

  host.required = false;

  await host.updateComplete;

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
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
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
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

it('is invalid when `setValidity()` is called', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
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
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
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

it('retains existing validity state when `setCustomValidity()` is called', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  host.setCustomValidity('validity message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.validity?.valueMissing).to.be.true;
});

it('removes its validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
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
