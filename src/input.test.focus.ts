import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreInput from './input.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
  );

  host.focus();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('focuses itself after submit when required and no value', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.be.equal(input);
});

it('focuses itself after `reportValidity()` is called when required and no value', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  host.reportValidity();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('focuses itself after `requestSubmit()` is called when required and no value', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');

  expect(host.shadowRoot?.activeElement === input).to.be.true;
});

it('does not focus itself after `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  host.checkValidity();

  expect(host.shadowRoot?.activeElement === null).to.be.true;
});
