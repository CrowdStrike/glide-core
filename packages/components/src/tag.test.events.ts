import './tag.js';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import CsTag from './tag.js';

CsTag.shadowRootOptions.mode = 'open';

it('dispatches a "remove" event when the icon button is clicked and the tag disappears', async () => {
  const element = await fixture(
    html`<cs-tag removableLabel="test-aria-label"
      ><span slot="prefix">Prefix</span><span data-content>Tag</span></cs-tag
    >`,
  );
  const iconButton = element.shadowRoot?.querySelector('button');
  setTimeout(() => {
    iconButton?.click();
  });
  const event = await oneEvent(element, 'remove');

  expect(event?.type).to.be.equal('remove');

  // Wait for tne animation to complete
  await aTimeout(300);

  // Shadow dom contents should have disappeared
  expect(element.shadowRoot?.querySelector('*')).to.be.null;
});
