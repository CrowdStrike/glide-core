/* eslint-disable @typescript-eslint/no-unused-expressions */

import './input.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreInput from './input.js';

GlideCoreInput.shadowRootOptions.mode = 'open';

it('focuses the input when `focus()` is called', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
  );

  component.focus();

  const inputElement = component.shadowRoot?.querySelector('input');
  expect(component.shadowRoot?.activeElement).to.equal(inputElement);
});

it('focuses the input after submit when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const inputElement = component.shadowRoot?.querySelector('input');
  expect(component.shadowRoot?.activeElement).to.be.equal(inputElement);
});

it('blurs the input and reports validity if `blur` is called', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
  );

  component.focus();

  const inputElement = component.shadowRoot?.querySelector('input');
  expect(component.shadowRoot?.activeElement).to.equal(inputElement);

  component.blur();
  await component.updateComplete;

  expect(component.shadowRoot?.activeElement).to.equal(null);

  expect(component.validity.valid).to.equal(false);

  expect(
    component.shadowRoot?.querySelector('glide-core-private-label')?.error,
  ).to.equal(true);
});

it('focuses the input after `reportValidity` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  component.reportValidity();

  const inputElement = component.shadowRoot?.querySelector('input');
  expect(component.shadowRoot?.activeElement).to.equal(inputElement);
});

it('focuses the input after `requestSubmit` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const inputElement = component.shadowRoot?.querySelector('input');

  expect(component.shadowRoot?.activeElement === inputElement).to.be.true;
});

it('does not focus the input after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  component.checkValidity();

  expect(component.shadowRoot?.activeElement === null).to.be.true;
});
