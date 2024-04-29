import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import Input from './input.js';

Input.shadowRootOptions.mode = 'open';

it('focuses the input when `focus` is called', async () => {
  const input = await fixture<Input>(html`<cs-input required></cs-input>`);
  input.focus();

  const inputElement = input.shadowRoot?.querySelector('input');
  expect(input.shadowRoot?.activeElement).to.equal(inputElement);
});

it('focuses the input after submit when required and no value', async () => {
  const form = document.createElement('form');

  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  form.requestSubmit();

  const inputElement = input.shadowRoot?.querySelector('input');
  expect(input.shadowRoot?.activeElement).to.be.equal(inputElement);
});

it('blurs the input if `blur` is called', async () => {
  const input = await fixture<Input>(html`<cs-input required></cs-input>`);

  input.focus();

  const inputElement = input.shadowRoot?.querySelector('input');
  expect(input.shadowRoot?.activeElement).to.equal(inputElement);

  input.blur();
  await input.updateComplete;

  expect(input.shadowRoot?.activeElement).to.equal(null);
});

it('focuses the input after `reportValidity` is called when required and no value', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  input.reportValidity();

  const inputElement = input.shadowRoot?.querySelector('input');
  expect(input.shadowRoot?.activeElement).to.equal(inputElement);
});

it('focuses the input after `requestSubmit` is called when required and no value', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  form.requestSubmit();

  const inputElement = input.shadowRoot?.querySelector('input');
  expect(input.shadowRoot?.activeElement).to.equal(inputElement);
});

it('does not focus the input after `checkValidity` is called', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  input.checkValidity();

  expect(input.shadowRoot?.activeElement).to.equal(null);
});
