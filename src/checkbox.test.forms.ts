import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreCheckbox from './checkbox.js';
import { click } from './library/mouse.js';

/* eslint-disable @typescript-eslint/no-unused-expressions */

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      indeterminate
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  component.checked = false;
  component.indeterminate = false;
  form.reset();

  expect(component.checked).to.be.true;
  expect(component.indeterminate).to.be.true;
});

it('has `formData` value when checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
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
  expect(formData.get('name')).to.be.equal('value');
});

it('has `formData` value when checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
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
  expect(formData.get('name')).to.be.equal('value');
});

it('has no `formData` value when unchecked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
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

  await fixture<GlideCoreCheckbox>(
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

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
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

  await fixture<GlideCoreCheckbox>(
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

  await fixture<GlideCoreCheckbox>(
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

  const component = await fixture<GlideCoreCheckbox>(
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

  component.focus();
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('is valid if unchecked but not required', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid but not aria-invalid after being checked when unchecked and required', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid but not aria-invalid if unchecked and required', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid but not aria-invalid after being unchecked when required', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      required
    ></glide-core-checkbox>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="input"]'));

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is both invalid and valid if unchecked and required but disabled', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      required
    ></glide-core-checkbox>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid when `value` is empty and `required` is updated to `false` programmatically', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');

  component.required = false;

  await component.updateComplete;

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.checkValidity()).to.be.false;

  await component.updateComplete;

  // Like native, the validity message shouldn't display until `reportValidity()` is called.
  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(component.reportValidity()).to.be.false;

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.setCustomValidity('validity message');
  component.reportValidity();

  await component.updateComplete;

  component.setCustomValidity('');

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('is invalid when `setValidity()` is called', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.setValidity({ customError: true }, 'validity message');

  expect(component.validity.valid).to.be.false;

  await component.updateComplete;

  // Like native, the validity message shouldn't display until `reportValidity()` is called.
  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(component.validity?.customError).to.be.true;

  component.reportValidity();

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.setValidity({ customError: true }, 'validity message');

  component.setValidity({});

  await component.updateComplete;

  expect(component.validity.valid).to.be.true;
  expect(component.validity.customError).to.be.false;

  expect(component.reportValidity()).to.be.true;

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('retains existing validity state when `setCustomValidity()` is called', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});

it('removes validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.setCustomValidity('validity message');

  expect(component.reportValidity()).to.be.false;

  await component.updateComplete;

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');

  component.resetValidityFeedback();

  await component.updateComplete;

  expect(component.shadowRoot?.querySelector('[data-test="validity-message"]'))
    .to.be.null;

  expect(component.validity?.valid).to.be.false;
});
