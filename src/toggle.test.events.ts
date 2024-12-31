/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreToggle from './toggle.js';
import click from './library/click.js';

GlideCoreToggle.shadowRootOptions.mode = 'open';

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

it('dispatches a "change" event when clicked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an "input" event when clicked', async () => {
  const component = await fixture<GlideCoreToggle>(
    html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});
