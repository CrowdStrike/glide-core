import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';

it('focuses itself when `focus()` is called ', async () => {
  const host = await fixture<GlideCoreButtonGroupButton>(html`
    <glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>
  `);

  host.focus();

  const radio = host.shadowRoot?.querySelector('[role="radio"]');
  expect(host.shadowRoot?.activeElement).to.equal(radio);
});
