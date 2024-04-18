import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsCheckbox from './checkbox.js';

CsCheckbox.shadowRootOptions.mode = 'open';

it('is valid if unchecked but not required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid after being checked when unchecked and required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
  );

  component.click();

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is invalid if unchecked and required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is invalid after being unchecked when required', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox checked required></cs-checkbox>`,
  );

  component.click();

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if unchecked and required but disabled', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox disabled required></cs-checkbox>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('adds an error class after submit when unchecked and required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
    { parentNode: form },
  );

  form.requestSubmit();
  await elementUpdated(component);

  const isErrorClass = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.true;
});

it('adds an error class after `reportValidity` is called when required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isErrorClass = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.true;
});

it('does not add an error class by default', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
  );

  const isErrorClass = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `reportValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isErrorClass = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `reportValidity` is called when required and checked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox checked required></cs-checkbox>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isErrorClass = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `reportValidity` is called when required but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox disabled required></cs-checkbox>`,
    { parentNode: form },
  );

  component.reportValidity();
  await elementUpdated(component);

  const isErrorClass = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});

it('does not add an error class after `checkValidity` is called when required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
    { parentNode: form },
  );

  component.checkValidity();
  await elementUpdated(component);

  const isErrorClass = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.classList.contains('error');

  expect(isErrorClass).to.be.false;
});
