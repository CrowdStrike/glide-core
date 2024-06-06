import './checkbox.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsCheckboxGroup from './checkbox-group.js';

CsCheckboxGroup.shadowRootOptions.mode = 'open';

it('is valid if not required and the checkbox is unchecked', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox" value="value"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is valid if required and the checkbox is checked', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox" value="value"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  component.querySelector('cs-checkbox')?.click();

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is invalid if required and the checkbox is unchecked', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox" value="value"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is invalid after being unchecked when required', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox" value="value" checked></cs-checkbox>
    </cs-checkbox-group>`,
  );

  component.querySelector('cs-checkbox')?.click();

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and the checkbox is unchecked', async () => {
  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" disabled required>
      <cs-checkbox label="Checkbox" value="value"></cs-checkbox>
    </cs-checkbox-group>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('sets the checkbox as valid when `required` is set to `false` dynamically', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" required>
      <cs-checkbox label="Checkbox" value="value"></cs-checkbox>
    </cs-checkbox-group>`,
    { parentNode: form },
  );

  component.required = false;
  await elementUpdated(component);

  const checkbox = component.querySelector('cs-checkbox');
  expect(checkbox?.validity.valid).to.be.true;
});

it('sets the checkbox as invalid when `required` is set to `true` dynamically', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox" value="value"></cs-checkbox>
    </cs-checkbox-group>`,
    { parentNode: form },
  );

  component.required = true;
  await elementUpdated(component);

  const checkbox = component.querySelector('cs-checkbox');
  expect(checkbox?.validity.valid).to.be.false;
});
