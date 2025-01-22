import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';

it('focuses itself when `focus()` is called', async () => {
  const component = await fixture<GlideCoreSplitButtonPrimaryButton>(html`
    <glide-core-split-button-primary-button
      label="Label"
    ></glide-core-split-button-primary-button>
  `);

  component.focus();

  const button = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});
