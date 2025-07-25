import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import Options from './options.js';

it('dispatches a "private-slot-change" event', async () => {
  const host = await fixture<Options>(
    html`<glide-core-options></glide-core-options>`,
  );

  setTimeout(() => {
    const option = document.createElement('glide-core-option');

    option.label = 'Label';
    host.append(option);
  });

  const event = await oneEvent(host, 'private-slot-change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
