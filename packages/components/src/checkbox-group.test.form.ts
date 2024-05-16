import './checkbox.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import CsCheckboxGroup from './checkbox-group.js';

CsCheckboxGroup.shadowRootOptions.mode = 'open';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox" value="value" checked></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const checkbox = component.querySelector('cs-checkbox');
  assert(checkbox);

  checkbox.checked = false;
  form.reset();

  expect(component.value).to.deep.equal(['value']);
});

it('has `formData` when the checkboxes are checked', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" name="name">
      <cs-checkbox label="One" value="one" checked></cs-checkbox>
      <cs-checkbox label="Two" value="two" checked></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["one","two"]');
});

it('has `formData` when the checkbox is checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" name="name">
      <cs-checkbox
        label="Checkbox"
        value="value"
        checked
        indeterminate
      ></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["value"]');
});

it('has no `formData` when the checkboxes are unchecked', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" name="name">
      <cs-checkbox label="One" value="one"></cs-checkbox>
      <cs-checkbox label="Two" value="two"></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when disabled and the checkbox is checked', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" name="name" disabled>
      <cs-checkbox label="Checkbox" value="value" checked></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when the checkbox is checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" name="name">
      <cs-checkbox
        label="Checkbox"
        value="value"
        checked
        disabled
      ></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` when without a `name` but the checkbox is checked', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group">
      <cs-checkbox label="Checkbox" value="value" checked></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when the checkbox is checked but without a `value`', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckboxGroup>(
    html`<cs-checkbox-group label="Checkbox Group" name="name">
      <cs-checkbox label="Checkbox" checked></cs-checkbox>
    </cs-checkbox-group>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
