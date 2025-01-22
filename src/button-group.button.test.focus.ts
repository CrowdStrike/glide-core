import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';

it('focuses itself when `focus()` is called ', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(html`
    <glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>
  `);

  component.focus();

  const radio = component.shadowRoot?.querySelector('[role="radio"]');
  expect(component.shadowRoot?.activeElement).to.equal(radio);
});
