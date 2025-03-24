import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { click } from './library/mouse.js';
import GlideCoreToggle from './toggle.js';

it('dispatches a "click" event on click', async () => {
  const host = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(host, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "change" event on click', async () => {
  const host = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(host, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event on click', async () => {
  const host = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(host, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});
