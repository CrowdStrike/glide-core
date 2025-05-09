import { expect, fixture, html } from '@open-wc/testing';
import ButtonGroupButton from './button-group.button.js';

it('focuses itself when `focus()` is called ', async () => {
  const host = await fixture<ButtonGroupButton>(html`
    <glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>
  `);

  host.focus();

  const radio = host.shadowRoot?.querySelector('[data-test="radio"]');
  expect(host.shadowRoot?.activeElement).to.equal(radio);
});
