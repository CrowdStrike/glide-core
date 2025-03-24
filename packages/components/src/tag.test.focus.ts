import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTag from './tag.js';

it('calling `focus()` focuses its removal button', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  host.focus();

  const button = host.shadowRoot?.querySelector('[data-test="removal-button"]');

  expect(host.shadowRoot?.activeElement).to.equal(button);
});
