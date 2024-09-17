/* eslint-disable @typescript-eslint/no-unused-expressions */

import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInput from './input.js';
import sinon from 'sinon';

it('can be reset to initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  component.value = '';
  form.reset();

  expect(component.value).to.equal('value');
});

it('can be reset if there was no initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  component.value = 'value';
  form.reset();

  expect(component.value).to.equal('');
});

it('has `formData` value when it has a value', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreInput>(
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

  await fixture<GlideCoreInput>(
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

  await fixture<GlideCoreInput>(
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

  await fixture<GlideCoreInput>(
    html`<glide-core-input value="value"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('submits its form on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input value="value"></glide-core-input>`,
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
