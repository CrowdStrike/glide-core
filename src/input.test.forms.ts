/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInput from './input.js';
import click from './library/click.js';
import sinon from 'sinon';

GlideCoreInput.shadowRootOptions.mode = 'open';

it('can be reset to initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  component.value = '';
  form.reset();

  expect(component.value).to.equal('value');
});

it('can be reset if there was no initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  component.value = 'value';
  form.reset();

  expect(component.value).to.equal('');
});

it('has `formData` value when it has a value', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreInput>(
    html`<glide-core-input name="name" value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value');
});

it('has no `formData` value when no value', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreInput>(
    html`<glide-core-input name="name"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreInput>(
    html`<glide-core-input
      name="name"
      value="value"
      disabled
    ></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but without a `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreInput>(
    html`<glide-core-input value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('submits its form on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input value="value"></glide-core-input>`,
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

it('is valid if empty but not required', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid after being filled in when empty and required', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
  );

  component.focus();

  await sendKeys({ type: 'value' });

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid if no value and required', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is invalid after value is cleared when required', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      clearable
      value="value"
      required
    ></glide-core-input>`,
  );

  await click(
    component.shadowRoot?.querySelector('[data-test="clear-button"]'),
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid if no value and required but disabled', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input disabled required></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('updates validity when `required` and `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');

  component.value = 'text';

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');

  // Resetting the value to empty to ensure it goes
  // back to an invalid state
  component.value = '';

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is invalid when `value` is empty and `required` is set to `true` programmatically', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');

  component.required = true;

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid when `value` is empty and `required` is updated to `false` programmatically', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');

  component.required = false;

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when the `value` attribute matches `pattern`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      value="value"
    ></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.patternMismatch).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when `value` matches `pattern` after being set programmatically', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
    ></glide-core-input>`,
  );

  component.value = 'value';

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.patternMismatch).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid when `value` does not match `pattern`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      value="1234"
    ></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.patternMismatch).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is invalid when a programmatically set `value` does not match `pattern`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
    ></glide-core-input>`,
  );

  component.value = 'val';

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.patternMismatch).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is invalid when `required` and `value` does not match `pattern`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      required
    ></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.patternMismatch).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});

it('is valid when `pattern` is programmatically removed', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
    ></glide-core-input>`,
  );

  component.pattern = undefined;

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.patternMismatch).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.checkValidity()).to.be.false;

  await elementUpdated(component);

  // Like native, the validity message shouldn't display until `reportValidity()` is called.
  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  component.setCustomValidity('validity message');
  component.reportValidity();

  await elementUpdated(component);

  component.setCustomValidity('');

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('is invalid when `setValidity()` is called', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  component.setValidity({ customError: true }, 'validity message');

  expect(component.validity.valid).to.be.false;

  await elementUpdated(component);

  // Like native, the validity message shouldn't display until `reportValidity()` is called.
  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;

  expect(component.validity?.customError).to.be.true;

  component.reportValidity();

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  component.setValidity({ customError: true }, 'validity message');

  component.setValidity({});

  await elementUpdated(component);

  expect(component.validity.valid).to.be.true;
  expect(component.validity.customError).to.be.false;

  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.be.undefined;
});

it('retains existing validity state when `setCustomValidity()` is called', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      required
    ></glide-core-input>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.validity?.patternMismatch).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});
