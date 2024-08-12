/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button-group.button.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreButtonGroupButton from './button-group.button.js';

it('emits a "private-selected" event when selected', async () => {
  const component = await fixture<GlideCoreButtonGroupButton>(
    html`<glide-core-button-group-button
      label="Button"
    ></glide-core-button-group-button>`,
  );

  setTimeout(() => {
    component.selected = true;
  });

  const event = await oneEvent(component, 'private-selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
