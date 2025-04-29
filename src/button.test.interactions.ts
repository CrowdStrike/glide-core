import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButton from './button.js';

it('is accessible', async () => {
  const host = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label"></glide-core-button>`,
  );

  host.ariaDescription = 'Description';
  await host.updateComplete;

  const button = host.shadowRoot?.querySelector('[data-test="button"]');
  expect(button?.ariaDescription).to.equal('Description');
});
