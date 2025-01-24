import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';

it('focuses itself when `focus()` is called', async () => {
  const component = await fixture<GlideCoreSplitButtonPrimaryLink>(html`
    <glide-core-split-button-primary-link
      label="Label"
      url="/"
    ></glide-core-split-button-primary-link>
  `);

  component.focus();

  const link = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(component.shadowRoot?.activeElement).to.equal(link);
});
