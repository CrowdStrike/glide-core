import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import Popover from './popover.js';
import './popover.container.js';

it('dispatches a "toggle" event on open', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  setTimeout(() => {
    host.open = true;
  });

  const event = await oneEvent(host, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "toggle" event on close', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  setTimeout(() => {
    host.open = false;
  });

  const event = await oneEvent(host, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "toggle" event when already open', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  host.open = true;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "toggle" event when already closed', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  host.open = false;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
