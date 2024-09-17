/* eslint-disable @typescript-eslint/no-unused-expressions */

import './input.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInput from './input.js';

GlideCoreInput.shadowRootOptions.mode = 'open';

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

  const clearButton = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="clear-button"]',
  );

  clearButton?.click();
  await component.updateComplete;

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('true');
});

it('is valid when empty and does not exceed `maxlength`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input maxlength="3"></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when filled in and does not exceed `maxlength`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input maxlength="3"></glide-core-input>`,
  );

  component.focus();
  await sendKeys({ type: 'val' });

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when filled in, disabled, and value exceeds `maxlength`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      value="value"
      maxlength="3"
      disabled
    ></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is valid when filled in, readonly, and value exceeds `maxlength`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input
      value="value"
      maxlength="3"
      readonly
    ></glide-core-input>`,
  );

  expect(component.validity?.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.validity?.tooLong).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('input')?.getAttribute('aria-invalid'),
  ).to.equal('false');
});

it('is invalid when filled in and exceeds `maxlength`', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input maxlength="3"></glide-core-input>`,
  );

  component.focus();
  await sendKeys({ type: 'value' });

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.tooLong).to.be.true;
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

it('is valid when `value` is empty and `required` is set to `false` programmatically', async () => {
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
