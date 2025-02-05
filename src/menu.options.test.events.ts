import './menu.button.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import './menu.js';
import GlideCoreMenuOptions from './menu.options.js';

it('dispatches a "private-slot-change" event', async () => {
  const host = await fixture<GlideCoreMenuOptions>(
    html`<glide-core-menu-options>
      <glide-core-menu-button label="One"></glide-core-menu-button>
    </glide-core-menu-options>`,
  );

  setTimeout(() => {
    const option = document.createElement('glide-core-menu-button');
    option.label = 'Label';

    host.append(option);
  });

  const event = await oneEvent(host, 'private-slot-change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
