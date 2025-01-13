import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreAccordion from './accordion.js';

GlideCoreAccordion.shadowRootOptions.mode = 'open';

it('focuses itself when `focus()` is called', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  component.focus();

  const summary = component?.shadowRoot?.querySelector('[data-test="summary"]');
  expect(component?.shadowRoot?.activeElement).to.equal(summary);
});
