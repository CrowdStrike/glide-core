import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<GlideCoreSplitButtonPrimaryLink>(html`
    <glide-core-split-button-primary-link
      label="Label"
      url="/"
    ></glide-core-split-button-primary-link>
  `);

  host.focus();

  const link = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(host.shadowRoot?.activeElement).to.equal(link);
});
