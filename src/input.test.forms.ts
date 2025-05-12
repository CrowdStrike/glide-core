import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import Input from './input.js';
import { click } from './library/mouse.js';

it('can be reset to its initial value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label" value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  host.value = '';
  form.reset();

  expect(host.value).to.equal('value');
});

it('can be reset if there was no initial value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  host.value = 'value';
  form.reset();

  expect(host.value).to.be.empty.string;
});

it('has `formData` value when it has a value', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input
      label="Label"
      name="name"
      value="value"
    ></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.equal('value');
});

it('has no `formData` value when no value', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input label="Label" name="name"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but disabled', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input
      label="Label"
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

  await fixture<Input>(
    html`<glide-core-input label="Label" value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('submits its form on Enter', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input label="Label" value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});

it('is valid if empty but not required', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is valid after being filled in when empty and required', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'value' });

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is invalid if no value and required', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is invalid after value is cleared when required', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      value="value"
      clearable
      required
    ></glide-core-input>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="clear-button"]'));

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is valid if no value and required and disabled', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label" disabled required></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('updates its validity when required and `value` is set programmatically', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');

  host.value = 'text';

  await host.updateComplete;

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
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
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is invalid when `value` is empty and `required` is set to `true` programmatically', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');

  host.required = true;

  await host.updateComplete;

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is valid when `value` is empty and `required` is updated to `false` programmatically', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
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

it('is valid when the `value` attribute matches `pattern`', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[A-Za-z_s][A-Za-z_0-9s]*"
      value="value"
    ></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.patternMismatch).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is valid when `value` matches `pattern` after being set programmatically', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
    ></glide-core-input>`,
  );

  host.value = 'value';

  await host.updateComplete;

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.patternMismatch).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is valid when `pattern` is set and `value` is empty', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
    ></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.patternMismatch).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('is invalid when `value` does not match `pattern`', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[A-Za-z_s][A-Za-z_0-9s]*"
      value="!value"
    ></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.patternMismatch).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is invalid when a programmatically set `value` does not match `pattern`', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
    ></glide-core-input>`,
  );

  host.value = 'val';

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.patternMismatch).to.be.true;
  expect(host.checkValidity()).to.be.false;
  expect(host.reportValidity()).to.be.false;

  await host.updateComplete;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('true');
});

it('is invalid when `required` and `value` does not match `pattern`', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      value="val"
      required
    ></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.patternMismatch).to.be.true;
});

it('is invalid when `required`, has an empty `value`, and a `pattern`', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      required
    ></glide-core-input>`,
  );

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.patternMismatch).to.be.false;
  expect(host.validity?.valueMissing).to.be.true;
});

it('is valid when `pattern` is programmatically removed', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      value="val"
    ></glide-core-input>`,
  );

  host.pattern = undefined;

  await host.updateComplete;

  expect(host.validity?.valid).to.be.true;
  expect(host.validity?.patternMismatch).to.be.false;
  expect(host.checkValidity()).to.be.true;
  expect(host.reportValidity()).to.be.true;

  expect(
    host.shadowRoot?.querySelector('[data-test="input"]')?.ariaInvalid,
  ).to.equal('false');
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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
  // `value` does not match `pattern` intentionally to force an invalid state
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      pattern="[a-z]{4,8}"
      value="val"
      required
    ></glide-core-input>`,
  );

  host.setCustomValidity('validity message');

  expect(host.validity?.valid).to.be.false;
  expect(host.validity?.customError).to.be.true;
  expect(host.validity?.patternMismatch).to.be.true;
  expect(host.validity?.valueMissing).to.be.false;
});

it('removes its validity feedback but retains its validity state when `resetValidityFeedback()` is called', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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
