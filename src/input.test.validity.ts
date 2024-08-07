/* eslint-disable @typescript-eslint/no-unused-expressions */

import './input.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
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

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'false',
  );
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

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'false',
  );
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

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'true',
  );
});

it('is invalid after value is cleared when required', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input
      clearable
      value="value"
      required
    ></glide-core-input>`,
  );

  const clearButton = input.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="clear-button"]',
  );

  clearButton?.click();
  await input.updateComplete;

  expect(input.validity?.valid).to.be.false;
  expect(input.validity?.valueMissing).to.be.true;
  expect(input.checkValidity()).to.be.false;
  expect(input.reportValidity()).to.be.false;

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'true',
  );
});

it('is valid when empty and does not exceed `maxlength`', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input maxlength="3"></glide-core-input>`,
  );

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.validity?.tooLong).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is valid when filled in and does not exceed `maxlength`', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input maxlength="3"></glide-core-input>`,
  );

  input.focus();
  await sendKeys({ type: 'val' });

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.validity?.tooLong).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});

it('is invalid when filled in and exceeds `maxlength`', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input maxlength="3"></glide-core-input>`,
  );

  input.focus();
  await sendKeys({ type: 'value' });

  expect(input.validity?.valid).to.be.false;
  expect(input.validity?.tooLong).to.be.true;
  expect(input.checkValidity()).to.be.false;
  expect(input.reportValidity()).to.be.false;

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'true',
  );
});

it('is valid if no value and required but disabled', async () => {
  const input = await fixture<Input>(
    html`<glide-core-input disabled required></glide-core-input>`,
  );

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;

  await elementUpdated(input);

  expect(input.shadowRoot?.querySelector('input')).to.have.attribute(
    'aria-invalid',
    'false',
  );
});
