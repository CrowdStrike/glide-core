import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreCheckbox from './checkbox.js';

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('focuses the input when `focus` is called', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  component.focus();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input after submit when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
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

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  component.reportValidity();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input after `requestSubmit` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  form.requestSubmit();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('does not focus the input after `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  component.checkValidity();

  expect(component.shadowRoot?.activeElement).to.equal(null);
});

it('blurs the input and reports validity if `blur` is called', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox required></glide-core-checkbox>`,
  );

  component.focus();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);

  component.blur();
  await component.updateComplete;

  expect(component.shadowRoot?.activeElement).to.equal(null);

  expect(component.validity.valid).to.equal(false);

  expect(
    component.shadowRoot?.querySelector('glide-core-label')?.error,
  ).to.equal(true);
});
