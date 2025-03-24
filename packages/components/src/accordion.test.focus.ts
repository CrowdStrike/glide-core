import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreAccordion from './accordion.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  host.focus();

  const summary = host?.shadowRoot?.querySelector('[data-test="summary"]');
  expect(host?.shadowRoot?.activeElement).to.equal(summary);
});
