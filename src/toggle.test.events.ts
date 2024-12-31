/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreToggle from './toggle.js';
import click from './library/click.js';
import sinon from 'sinon';

GlideCoreToggle.shadowRootOptions.mode = 'open';

// `await aTimeout(0)` is used throughout. Using `oneEvent` instead and
// expecting it to throw would work. But it wouldn't throw until its
// timeout, which would make for a slow test. Its timeout can likely be
// configured. But waiting a turn of the event loop, after which the event
// will have been dispatched, gets the job done as well.

it('dispatches a "click" event when clicked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(component, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "selected" event when clicked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(component, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch an "input" event when clicked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);
  await click(component.shadowRoot?.querySelector('[data-test="input"]'));

  expect(spy.callCount).to.equal(0);
});
