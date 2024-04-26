import './input.component.js';
import { expect, fixture, html } from '@open-wc/testing';
import type Input from './input.js';

it('can be reset', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(
    html`<cs-input value="value"></cs-input>`,
    {
      parentNode: form,
    },
  );

  input.value = '';
  form.reset();

  expect(input.value).to.equal('value');
});

it('has a `formData` value when it has a value', async () => {
  const form = document.createElement('form');

  await fixture<Input>(html`<cs-input name="name" value="value"></cs-input>`, {
    parentNode: form,
  });

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value');
});

it('has no `formData` value when no value', async () => {
  const form = document.createElement('form');

  await fixture<Input>(html`<cs-input name="name"></cs-input>`, {
    parentNode: form,
  });

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but disabled', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<cs-input name="name" value="value" disabled></cs-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but without a `name`', async () => {
  const form = document.createElement('form');

  await fixture<Input>(html`<cs-input value="value"></cs-input>`, {
    parentNode: form,
  });

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
