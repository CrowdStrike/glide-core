import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTag from './tag.js';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('calling `focus()` focuses the button', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag removable-label="Removable Label"
      >Tag</glide-core-tag
    >`,
  );

  component.focus();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');

  expect(component.shadowRoot?.activeElement).to.equal(button);
});
