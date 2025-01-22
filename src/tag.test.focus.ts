import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTag from './tag.js';

it('calling `focus()` focuses the button', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.focus();

  const button = component.shadowRoot?.querySelector(
    '[data-test="removal-button"]',
  );

  expect(component.shadowRoot?.activeElement).to.equal(button);
});
