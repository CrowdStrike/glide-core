import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Checkbox from './checkbox.js';

it('focuses the input when `focus()` is called', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  host.focus();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input after submit when required and unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input after `reportValidity()` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  host.reportValidity();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input after `requestSubmit()` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  form.requestSubmit();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('does not focus the input after `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  host.checkValidity();

  expect(host.shadowRoot?.activeElement).to.be.null;
});

it('updates its validity on blur', async () => {
  const host = await fixture<Checkbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  expect(host.validity.valid).to.be.false;
});
