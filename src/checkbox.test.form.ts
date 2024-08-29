/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreCheckbox from './checkbox.js';
import sinon from 'sinon';

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
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

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      checked
      indeterminate
    ></glide-core-checkbox>`,
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

it('has `formData` value when checked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
      checked
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value');
});

it('has `formData` value when checked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
      checked
      indeterminate
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value');
});

it('has no `formData` value when unchecked', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when unchecked and indeterminate', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      value="value"
      indeterminate
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      name="name"
      value="value"
      checked
      disabled
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but without a `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      value="value"
      checked
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when checked but without a `value`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      name="name"
      checked
    ></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('submits its form on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy();
  });

  component.focus();
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(1);
});
