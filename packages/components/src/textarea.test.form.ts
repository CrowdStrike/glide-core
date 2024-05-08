import './textarea.js';
import { expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type CsTextarea from './textarea.js';

it('can be reset', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea value="value" label="label"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  textarea.focus();
  await sendKeys({ type: 'testing-' });
  await expect(textarea.value).to.equal('testing-value');
  form.reset();

  expect(textarea.value).to.equal('value');
});

it('has `formData` when it has a `value` and `name`', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea value="value" label="label" name="name"></cs-textarea>`;
  await fixture<CsTextarea>(template, { parentNode: form });
  const formData = new FormData(form);

  expect(formData.get('name')).to.be.equal('value');
});

it('has `formData` when text is entered and has a `name`', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea value="" label="label" name="name"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  textarea?.focus();
  await sendKeys({ type: 'testing' });
  const formData = new FormData(form);

  expect(formData.get('name')).to.be.equal('testing');
});

it('has no `formData` value when it has a value and is disabled', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea value="value" label="label" name="test-name" disabled></cs-textarea>`;
  await fixture<CsTextarea>(template, { parentNode: form });
  const formData = new FormData(form);

  expect(formData.get('test-name')).to.be.null;
});

it('appends no `formData` when it has a value and no `name`', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea value="value" label="label"></cs-textarea>`;
  await fixture<CsTextarea>(template, { parentNode: form });
  const formData = new FormData(form);

  expect(formData).to.be.empty;
});

it('appends no `formData` when it has no value and a `name`', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" name="name"></cs-textarea>`;
  await fixture<CsTextarea>(template, { parentNode: form });
  const formData = new FormData(form);

  expect(formData).to.be.empty;
});
