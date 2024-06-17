import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import type Input from './input.js';

it('can be reset to initial value', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(
    html`<glide-core-input value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  input.value = '';
  form.reset();

  expect(input.value).to.equal('value');
});

it('can be reset if there was no initial value', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(
    html`<glide-core-input></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  input.value = 'value';
  form.reset();

  expect(input.value).to.equal('');
});

it('has a `formData` value when it has a value', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input name="name" value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('value');
});

it('has no `formData` value when no value', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input name="name"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but disabled', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input
      name="name"
      value="value"
      disabled
    ></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when it has a value but without a `name`', async () => {
  const form = document.createElement('form');

  await fixture<Input>(
    html`<glide-core-input value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
