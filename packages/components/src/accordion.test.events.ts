import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreAccordion from './accordion.js';

it('dispatches a "toggle" event on open', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
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
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label" open>
      Content
    </glide-core-accordion>`,
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
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label" open>
      Content
    </glide-core-accordion>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  host.open = true;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "toggle" event when already closed', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  host.open = false;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
