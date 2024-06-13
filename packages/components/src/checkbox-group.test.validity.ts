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
