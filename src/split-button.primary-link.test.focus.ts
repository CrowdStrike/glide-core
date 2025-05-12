import { expect, fixture, html } from '@open-wc/testing';
import SplitButtonPrimaryLink from './split-button.primary-link.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<SplitButtonPrimaryLink>(html`
    <glide-core-split-button-primary-link
      label="Label"
      href="/"
    ></glide-core-split-button-primary-link>
  `);

  host.focus();

  const link = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(host.shadowRoot?.activeElement).to.equal(link);
});
