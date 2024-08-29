import './tag.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreTag from './tag.js';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('dispatches a "remove" event when the icon button is clicked', async () => {
  const component = await fixture(
    html`<glide-core-tag removable-label="test-aria-label"
      ><span slot="prefix">Prefix</span
      ><span data-content>Tag</span></glide-core-tag
    >`,
  );

  const iconButton = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="button"]',
  );

  setTimeout(() => {
    iconButton?.click();
  });

  const event = await oneEvent(component, 'remove');
  expect(event?.type).to.be.equal('remove');
});
