/* eslint-disable @typescript-eslint/no-unused-expressions */

import './checkbox.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckboxGroup from './checkbox-group.js';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';

it('is valid if not required and the checkbox is unchecked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid if required and the checkbox is checked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.querySelector('glide-core-checkbox')?.click();

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is invalid if required and the checkbox is unchecked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is invalid after being unchecked when required', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  component.querySelector('glide-core-checkbox')?.click();

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and the checkbox is unchecked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" disabled required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('sets the checkbox as valid when `required` is set to `false` dynamically', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.required = false;
  await elementUpdated(component);

  const checkbox = component.querySelector('glide-core-checkbox');
  expect(checkbox?.validity.valid).to.be.true;
});

it('sets the checkbox as invalid when `required` is set to `true` dynamically', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.required = true;
  await elementUpdated(component);

  const checkbox = component.querySelector('glide-core-checkbox');
  expect(checkbox?.validity.valid).to.be.false;
});

it('sets the validity message with `setCustomValidity()`', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;

  await elementUpdated(component);

  expect(
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('removes a validity message with an empty argument to `setCustomValidity()`', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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
    component.shadowRoot?.querySelector('[data-test="validity-message"]')
      ?.textContent,
  ).to.equal('validity message');
});

it('is valid when `setValidity()` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
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
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox" value="value"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  component.setCustomValidity('validity message');

  expect(component.validity?.valid).to.be.false;
  expect(component.validity?.customError).to.be.true;
  expect(component.validity?.valueMissing).to.be.true;
});
