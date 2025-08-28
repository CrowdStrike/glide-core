import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import PopoverContainer from './popover.container.js';

it('dispatches a "private-role-change" event', async () => {
  const host = await fixture<PopoverContainer>(
    html`<glide-core-popover-container>Popover</glide-core-popover-container>`,
  );

  setTimeout(() => {
    host.role = 'dialog';
  });

  const event = await oneEvent(host, 'private-role-change');

  expect(event.bubbles).to.be.true;
});
