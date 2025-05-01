import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreTab from './tab.js';

it('dispatches a "private-selected" event when selected', async () => {
  const host = await fixture<GlideCoreTab>(
    html`<glide-core-tab panel="1">One</glide-core-tab>`,
  );

  setTimeout(() => {
    host.selected = true;
  });

  const event = await oneEvent(host, 'private-selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
