/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tag.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreTag from './tag.js';
import sinon from 'sinon';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('dispatches one "remove" event', async () => {
  const component = await fixture(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  const spy = sinon.spy();

  component.addEventListener('remove', spy);

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="button"]')
      ?.click();
  });

  const event = await oneEvent(component, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});
