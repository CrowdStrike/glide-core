import { expect, fixture, html } from '@open-wc/testing';
import CsCheckbox from './checkbox.js';

CsCheckbox.shadowRootOptions.mode = 'open';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox checked indeterminate></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  component.checked = false;
  component.indeterminate = false;
  form.reset();

  expect(component.checked).to.be.true;
  expect(component.indeterminate).to.be.true;
});

it('has a `formData` value when checked', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckbox>(
    html`<cs-checkbox name="name" value="value" checked></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value');
});

it('has a `formData` value when checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckbox>(
    html`<cs-checkbox
      name="name"
      value="value"
      checked
      indeterminate
    ></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value');
});

it('has no `formData` value when unchecked', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckbox>(
    html`<cs-checkbox name="name" value="value"></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when unchecked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckbox>(
    html`<cs-checkbox name="name" value="value" indeterminate></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckbox>(
    html`<cs-checkbox
      name="name"
      value="value"
      checked
      disabled
    ></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but without a `name`', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckbox>(
    html`<cs-checkbox value="value" checked></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but without a `value`', async () => {
  const form = document.createElement('form');

  await fixture<CsCheckbox>(
    html`<cs-checkbox name="name" checked></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
