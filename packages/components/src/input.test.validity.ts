import './input.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Input from './input.js';

Input.shadowRootOptions.mode = 'open';

it('is valid if empty but not required', async () => {
  const input = await fixture<Input>(html`<cs-input></cs-input>`);

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;
});

it('is valid after being filled in when empty and required', async () => {
  const input = await fixture<Input>(html`<cs-input required></cs-input>`);

  input.focus();

  await sendKeys({ type: 'value' });

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;
});

it('is invalid if no value and required', async () => {
  const input = await fixture<Input>(html`<cs-input required></cs-input>`);

  expect(input.validity?.valid).to.be.false;
  expect(input.validity?.valueMissing).to.be.true;
  expect(input.willValidate).to.be.true;
  expect(input.checkValidity()).to.be.false;
  expect(input.reportValidity()).to.be.false;
});

it('is invalid after value is cleared when required', async () => {
  const input = await fixture<Input>(
    html`<cs-input clearable value="value" required></cs-input>`,
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
    html`<cs-input disabled required></cs-input>`,
  );

  expect(input.validity?.valid).to.be.true;
  expect(input.validity?.valueMissing).to.be.false;
  expect(input.checkValidity()).to.be.true;
  expect(input.reportValidity()).to.be.true;
});

it('adds an error class after submit when empty and required', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  form.requestSubmit();
  await elementUpdated(input);

  const isErrorClass = input.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.true;
});

it('adds an error class after `reportValidity` is called when required', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  input.reportValidity();
  await elementUpdated(input);

  const isErrorClass = input.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.true;
});

it('does not add an error class by default', async () => {
  const input = await fixture<Input>(html`<cs-input required></cs-input>`);

  const isErrorClass = input.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `reportValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(html`<cs-input></cs-input>`, {
    parentNode: form,
  });

  input.reportValidity();
  await elementUpdated(input);

  const isErrorClass = input.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `reportValidity` is called when required and has a value', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(
    html`<cs-input value="value" required></cs-input>`,
    { parentNode: form },
  );

  input.reportValidity();
  await elementUpdated(input);

  const isErrorClass = input.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `reportValidity` is called when required but disabled', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(
    html`<cs-input disabled required></cs-input>`,
    { parentNode: form },
  );

  input.reportValidity();
  await elementUpdated(input);

  const isErrorClass = input.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `checkValidity` is called when required', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  input.checkValidity();
  await elementUpdated(input);

  const isErrorClass = input.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});
