import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTag from './tag.js';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('calling `focus()` focuses the button', async () => {
  const element = await fixture<GlideCoreTag>(
    html`<glide-core-tag removable-label="Removable Label"
      >Tag</glide-core-tag
    >`,
  );

  element.focus();

  const button = element.shadowRoot?.querySelector('[data-test="button"]');

  expect(element.shadowRoot?.activeElement).to.equal(button);
});
