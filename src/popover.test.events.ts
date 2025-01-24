import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import GlideCorePopover from './popover.js';

it('dispatches a "toggle" event on open', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  setTimeout(() => {
    component.open = true;
  });

  const event = await oneEvent(component, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "toggle" event on close', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  setTimeout(() => {
    component.open = false;
  });

  const event = await oneEvent(component, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "toggle" event when already open', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const spy = sinon.spy();
  component.addEventListener('toggle', spy);

  component.open = true;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "toggle" event when already closed', async () => {
  const component = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const spy = sinon.spy();
  component.addEventListener('toggle', spy);

  component.open = false;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
