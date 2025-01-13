/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreAccordion from './accordion.js';

GlideCoreAccordion.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-accordion')).to.equal(
    GlideCoreAccordion,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  expect(component.open).to.be.false;
});

it('`#onPrefixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">
      Content
      <div slot="prefix-icon"></div>
    </glide-core-accordion>`,
  );
});

it('`#onSuffixIconsSlotChange` coverage', async () => {
  await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">
      Content
      <div slot="suffix-icons"></div>
    </glide-core-accordion>`,
  );
});
