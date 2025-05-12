import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import Textarea from './textarea.js';

it('can be reset if it has an initial value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" value="one"></glide-core-textarea>`,
    { parentNode: form },
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'two' });

  form.reset();

  expect(host.value).to.equal('one');
});

it('can be reset if it has no initial value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
    { parentNode: form },
  );

  host.value = 'value';
  form.reset();

  expect(host.value).to.be.empty.string;
});

it('has `formData` when it has a `value` and `name`', async () => {
  const form = document.createElement('form');

  await fixture<Textarea>(
    html`<glide-core-textarea
      value="value"
      label="Label"
      name="name"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData.get('name')).to.equal('value');
});

it('has `formData` when text is entered and has a `name`', async () => {
  const form = document.createElement('form');

  await fixture<Textarea>(
    html`<glide-core-textarea label="Label" name="name"></glide-core-textarea>`,
    { parentNode: form },
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'value' });
  const formData = new FormData(form);

  expect(formData.get('name')).to.equal('value');
});

it('has no `formData` value when it has a value and is disabled', async () => {
  const form = document.createElement('form');

  await fixture<Textarea>(
    html`<glide-core-textarea
      label="Label"
      name="test-name"
      value="value"
      disabled
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData.get('test-name')).to.be.null;
});

it('appends no `formData` when it has a value and no `name`', async () => {
  const form = document.createElement('form');

  await fixture<Textarea>(
    html`<glide-core-textarea
      value="value"
      label="Label"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);
  expect(formData).to.be.empty;
});

it('appends no `formData` when it has no value and a `name`', async () => {
  const form = document.createElement('form');

  await fixture<Textarea>(
    html`<glide-core-textarea label="Label" name="name"></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData).to.be.empty;
});

it('is valid by default', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.validity?.tooLong).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is valid after being filled in and required', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  host.focus();
  await sendKeys({ type: 'value' });

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.validity?.tooLong).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is invalid if no value and required', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.validity?.tooLong).to.be.false;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is valid if no value but required and disabled', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea
      label="Label"
      required
      disabled
    ></glide-core-textarea>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.validity?.tooLong).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('false');
});

it('updates its validity when required and `value` is set programmatically', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('true');

  host.value = 'text';

  await host.updateComplete;

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('false');

  // Resetting the value to empty to ensure it goes
  // back to an invalid state
  host.value = '';

  await host.updateComplete;

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is invalid when `value` is empty and `required` is set to `true` programmatically', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('false');

  host.required = true;

  await host.updateComplete;

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is valid when `value` is empty and `required` is set to `false` programmatically', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('true');

  host.required = false;

  await host.updateComplete;

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  expect(
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('false');
});

it('updates its validity on blur', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  expect(host.validity.valid).to.be.false;
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
    host.shadowRoot?.querySelector('[data-test="textarea"]')?.ariaInvalid,
  ).to.equal('true');

  expect(
    host.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
  );

  host.setCustomValidity('validity message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.validity?.valueMissing).to.be.true;
});

it('submits its form on Meta + Enter', async () => {
  const form = document.createElement('form');

  await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event?.preventDefault();
    spy();
  });

  await sendKeys({ press: 'Tab' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'Enter' });
  await sendKeys({ up: 'Meta' });

  expect(spy.callCount).to.equal(1);
});

it('removes its validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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
