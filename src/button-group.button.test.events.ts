import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import ButtonGroupButton from './button-group.button.js';

it('dispatches a "private-selected" event when selected', async () => {
  const host = await fixture<ButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Label"
    ></glide-core-button-group-button>`,
  );

  setTimeout(() => {
    host.selected = true;
  });

  const event = await oneEvent(host, 'private-selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
