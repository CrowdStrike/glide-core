/* eslint-disable @typescript-eslint/no-unused-expressions */

import './accordion.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreAccordion from './accordion.js';

GlideCoreAccordion.shadowRootOptions.mode = 'open';

it('focuses its label when `focus()` is called', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="label">
      Inner content
    </glide-core-accordion>`,
  );

  component.focus();

  const summary = component?.shadowRoot?.querySelector('[data-test="summary"]');
  expect(component?.shadowRoot?.activeElement).to.be.equal(summary);
});
