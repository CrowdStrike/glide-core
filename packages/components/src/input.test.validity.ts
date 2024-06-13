import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Input from './input.js';

Input.shadowRootOptions.mode = 'open';

it('is valid if empty but not required', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input></glide-core-input>`,
  );

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;
});

it('is valid after being filled in when empty and required', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input required></glide-core-input>`,
  );

  input.focus();

  await sendKeys({ type: 'value' });

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;
});

it('is invalid if no value and required', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input required></glide-core-input>`,
  );

  expect(input.validity?.valid).to.be.false;
  expect(input.validity?.valueMissing).to.be.true;
  expect(input.willValidate).to.be.true;
  expect(input.checkValidity()).to.be.false;
  expect(input.reportValidity()).to.be.false;
});

it('is invalid after value is cleared when required', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input
      clearable
      value="value"
      required
    ></glide-core-input>`,
  );

  const clearButton =
    input.shadowRoot?.querySelector<HTMLButtonElement>('.clear-icon-button');

  clearButton?.click();
  await input.updateComplete;

  expect(input.validity?.valid).to.be.false;
  expect(input.validity?.valueMissing).to.be.true;
  expect(input.checkValidity()).to.be.false;
  expect(input.reportValidity()).to.be.false;
});

it('is valid if no value and required but disabled', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input disabled required></glide-core-input>`,
  );

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;
});
