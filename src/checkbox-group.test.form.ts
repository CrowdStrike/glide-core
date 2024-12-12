/* eslint-disable @typescript-eslint/no-unused-expressions */

import './checkbox.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckboxGroup from './checkbox-group.js';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const checkbox = component.querySelector('glide-core-checkbox');
  assert(checkbox);

  checkbox.checked = false;
  form.reset();

  expect(component.value).to.deep.equal(['value']);
});

it('has `formData` when the checkboxes are checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox
        label="One"
        value="one"
        checked
      ></glide-core-checkbox>

      <glide-core-checkbox
        label="Two"
        value="two"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["one","two"]');
});

it('has `formData` when the checkbox is checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
        indeterminate
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["value"]');
});

it('has no `formData` when the checkboxes are unchecked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
      <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when disabled and the checkbox is checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name" disabled>
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when the checkbox is checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
        disabled
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when without a `name` but the checkbox is checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox
        label="Checkbox"
        value="value"
        checked
      ></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when the checkbox is checked but without a `value`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" name="name">
      <glide-core-checkbox label="Checkbox" checked></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
