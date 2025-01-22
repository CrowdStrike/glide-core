import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import GlideCoreModal from './modal.js';

it('dispatches a "toggle" event on open', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.addEventListener('toggle', spy);

  setTimeout(() => {
    component.open = true;
  });

  const event = await oneEvent(component, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches a "toggle" event on close', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  component.addEventListener('toggle', spy);

  setTimeout(() => {
    component.open = false;
  });

  const event = await oneEvent(component, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "toggle" event when already open', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  component.addEventListener('toggle', spy);

  setTimeout(() => {
    component.open = true;
  });

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "toggle" event when already closed', async () => {
  const spy = sinon.spy();

  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.addEventListener('toggle', spy);

  setTimeout(() => {
    component.open = false;
  });

  expect(spy.callCount).to.equal(0);
});
