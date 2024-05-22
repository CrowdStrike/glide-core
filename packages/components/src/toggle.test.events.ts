import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import CsToggle from './toggle.js';

CsToggle.shadowRootOptions.mode = 'open';

// `await aTimeout(0)` is used throughout. Using `oneEvent` instead and
// expecting it to throw would work. But it wouldn't throw until its
// timeout, which would make for a slow test. Its timeout can likely be
// configured. But waiting a turn of the event loop, after which the event
// will have been dispatched, gets the job done as well.

it('dispatches a "click" event when clicked', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label"></cs-toggle>`,
  );

  setTimeout(() => component.click());

  const event = await oneEvent(component, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('dispatches a "change" event when clicked', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label"></cs-toggle>`,
  );

  setTimeout(() => component.click());

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "input" event when clicked', async () => {
  const component = await fixture<CsToggle>(
    html`<cs-toggle label="Label"></cs-toggle>`,
  );

  setTimeout(() => component.click());

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
});
