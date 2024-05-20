import { expect, fixture, html } from '@open-wc/testing';
import CsCheckbox from './checkbox.js';

CsCheckbox.shadowRootOptions.mode = 'open';

it('focuses the input when `focus` is called', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label"></cs-checkbox>`,
  );

  component.focus();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input after submit when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" required></cs-checkbox>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.be.equal(input);
});

it('focuses the input after `reportValidity` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" required></cs-checkbox>`,
    { parentNode: form },
  );

  component.reportValidity();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input after `requestSubmit` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" required></cs-checkbox>`,
    { parentNode: form },
  );

  form.requestSubmit();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('does not focus the input after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox label="Label" required></cs-checkbox>`,
    { parentNode: form },
  );

  component.checkValidity();

  expect(component.shadowRoot?.activeElement).to.equal(null);
});
