import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<GlideCoreSplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  host.focus();

  const button = host.shadowRoot?.querySelector('[data-test="button"]');
  expect(host.shadowRoot?.activeElement).to.equal(button);
});
