/* eslint-disable @typescript-eslint/no-unused-expressions */

import './menu.button.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreMenu from './menu.js';
import GlideCoreMenuOptions from './menu.options.js';

GlideCoreMenu.shadowRootOptions.mode = 'open';

it('dispatches a "private-slot-change" event', async () => {
  const component = await fixture<GlideCoreMenuOptions>(
    html`<glide-core-menu-options>
      <glide-core-menu-button label="One"></glide-core-menu-button>
    </glide-core-menu-options>`,
  );

  setTimeout(() => {
    const option = document.createElement('glide-core-menu-button');
    option.label = 'Label';

    component.append(option);
  });

  const event = await oneEvent(component, 'private-slot-change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
