/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreTextarea from './textarea.js';

GlideCoreTextarea.shadowRootOptions.mode = 'open';

it('can be reset if it has an initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="testing"
      label="label"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  component.focus();
  await sendKeys({ type: '-value' });
  expect(component.value).to.equal('testing-value');
  form.reset();

  expect(component.value).to.equal('testing');
});

it('can be reset if it has no initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label"></glide-core-textarea>`,
    { parentNode: form },
  );

  component.value = 'value';
  form.reset();

  expect(component.value).to.equal('');
});

it('has `formData` when it has a `value` and `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      name="name"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData.get('name')).to.be.equal('value');
});

it('has `formData` when text is entered and has a `name`', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value=""
      label="label"
      name="name"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  component?.focus();
  await sendKeys({ type: 'testing' });
  const formData = new FormData(form);

  expect(formData.get('name')).to.be.equal('testing');
});

it('has no `formData` value when it has a value and is disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      name="test-name"
      disabled
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData.get('test-name')).to.be.null;
});

it('appends no `formData` when it has a value and no `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData).to.be.empty;
});

it('appends no `formData` when it has no value and a `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label" name="name"></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData).to.be.empty;
});

it('is valid by default', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid after being filled in and required', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required></glide-core-textarea>`,
  );

  component.focus();
  await sendKeys({ type: 'value' });

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid if no value and required', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid if no value but required and disabled', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required disabled></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('updates validity when `required` and `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');

  component.value = 'text';

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
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
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is invalid when `value` is empty and `required` is set to `true` programmatically', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');

  component.required = true;

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid when `value` is empty and `required` is set to `false` programmatically', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');

  component.required = false;

  await elementUpdated(component);

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('blurs the textarea and reports validity if `blur` is called', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea required></glide-core-textarea>`,
  );

  component.focus();

  const textareaElement = component.shadowRoot?.querySelector('textarea');
  expect(component.shadowRoot?.activeElement === textareaElement).to.be.true;

  component.blur();
  await component.updateComplete;

  expect(component.shadowRoot?.activeElement === null).to.be.true;

  expect(component.validity.valid).to.be.false;

  expect(component.shadowRoot?.querySelector('glide-core-private-label')?.error)
    .to.be.true;
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
    component.shadowRoot
      ?.querySelector('textarea')
      ?.getAttribute('aria-invalid'),
  ).to.equal('true');

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});

it('submits its form on Meta + Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label"></glide-core-textarea>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event?.preventDefault();
    spy();
  });

  component?.focus();
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'Enter' });
  await sendKeys({ up: 'Meta' });

  expect(spy.callCount).to.be.equal(1);
});

it('removes validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  component.setCustomValidity('validity message');

  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');

  component.resetValidityFeedback();

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="validity-message"]'))
    .to.be.null;

  expect(component.validity?.valid).to.be.false;
});
