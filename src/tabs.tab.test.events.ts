import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import TabsTab from './tabs.tab.js';

it('dispatches a "private-selected" event when selected', async () => {
  const host = await fixture<TabsTab>(
    html`<glide-core-tabs-tab panel="1">One</glide-core-tabs-tab>`,
  );

  setTimeout(() => {
    host.selected = true;
  });

  const event = await oneEvent(host, 'private-selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
