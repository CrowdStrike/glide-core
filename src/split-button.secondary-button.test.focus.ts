import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';

it('focuses itself when `focus()` is called', async () => {
  const component = await fixture<GlideCoreSplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  component.focus();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});
