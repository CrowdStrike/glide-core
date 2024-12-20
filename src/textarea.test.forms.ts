/* eslint-disable @typescript-eslint/no-unused-expressions */

import './textarea.js';
import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type GlideCoreTextarea from './textarea.js';

it('can be reset to initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="testing"
      label="label"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  component.focus();
  await sendKeys({ type: '-value' });
  await expect(component.value).to.equal('testing-value');
  form.reset();

  expect(component.value).to.equal('testing');
});

it('can be reset if there was no initial value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label"></glide-core-textarea>`,
    { parentNode: form },
  );

  component.value = 'value';
  form.reset();

  expect(component.value).to.equal('');
});

it('has `formData` when it has a `value` and `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      name="name"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData.get('name')).to.be.equal('value');
});

it('has `formData` when text is entered and has a `name`', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value=""
      label="label"
      name="name"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  component?.focus();
  await sendKeys({ type: 'testing' });
  const formData = new FormData(form);

  expect(formData.get('name')).to.be.equal('testing');
});

it('has no `formData` value when it has a value and is disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
      name="test-name"
      disabled
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData.get('test-name')).to.be.null;
});

it('appends no `formData` when it has a value and no `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      value="value"
      label="label"
    ></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData).to.be.empty;
});

it('appends no `formData` when it has no value and a `name`', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label" name="name"></glide-core-textarea>`,
    { parentNode: form },
  );

  const formData = new FormData(form);

  expect(formData).to.be.empty;
});
