import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreInput from './input.js';

it('focuses itself when `focus()` is called', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Test"></glide-core-input>
  `);

  const inputElement =
    component.shadowRoot?.querySelector<HTMLInputElement>('input');

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(inputElement);
});

it('can be cleared', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Label" clearable></glide-core-input>
  `);

  const clearButton = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="clear-button"]',
  );

  component.focus();

  await sendKeys({ type: 'testing' });
  expect(component.value).to.be.equal('testing');

  await click(clearButton);
  expect(component.value).to.be.equal('');
});

it('reveals its value', async () => {
  const component = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Label"
      type="password"
      password-toggle
    ></glide-core-input>
  `);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>('input');
  expect(input?.type).to.equal('password');

  await click(
    component.shadowRoot?.querySelector('[data-test="password-toggle"]'),
  );

  expect(input?.type).to.equal('text');
});
