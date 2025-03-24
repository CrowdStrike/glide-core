import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreInput from './input.js';

it('can be cleared', async () => {
  const host = await fixture<GlideCoreInput>(html`
    <glide-core-input label="Label" clearable></glide-core-input>
  `);

  const clearButton = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="clear-button"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'testing' });
  expect(host.value).to.be.equal('testing');

  await click(clearButton);
  expect(host.value).to.be.equal('');
});

it('reveals its value', async () => {
  const host = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Label"
      type="password"
      password-toggle
    ></glide-core-input>
  `);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>('input');
  expect(input?.type).to.equal('password');

  await click(host.shadowRoot?.querySelector('[data-test="password-toggle"]'));

  expect(input?.type).to.equal('text');
});
