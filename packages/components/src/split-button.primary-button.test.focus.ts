import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<GlideCoreSplitButtonPrimaryButton>(html`
    <glide-core-split-button-primary-button
      label="Label"
    ></glide-core-split-button-primary-button>
  `);

  host.focus();

  const button = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(host.shadowRoot?.activeElement).to.equal(button);
});
