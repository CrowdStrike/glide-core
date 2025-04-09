import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreLink from './link.js';
import { click } from './library/mouse.js';

it('dispatches a "click" event on click', async () => {
  const host = await fixture<GlideCoreLink>(
    html`<glide-core-link label="Label" url="/"></glide-core-link>`,
  );

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  click(host);
  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "click" event on click when disabled', async () => {
  const host = await fixture<GlideCoreLink>(
    html`<glide-core-link label="Label" url="/" disabled></glide-core-link>`,
  );

  const spy = sinon.spy();

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
    spy();
  });

  await click(host);

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "click" event on `click()`', async () => {
  const host = await fixture<GlideCoreLink>(
    html`<glide-core-link label="Label" url="/"></glide-core-link>`,
  );

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  setTimeout(() => {
    host.click();
  });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "click" event on `click()` when disabled', async () => {
  const host = await fixture<GlideCoreLink>(
    html`<glide-core-link label="Label" url="/" disabled></glide-core-link>`,
  );

  const spy = sinon.spy();

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
    spy();
  });

  host.click();

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "click" event on Enter', async () => {
  const host = await fixture<GlideCoreLink>(
    html`<glide-core-link label="Label" url="/"></glide-core-link>`,
  );

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "click" event on Enter when disabled', async () => {
  const host = await fixture<GlideCoreLink>(
    html`<glide-core-link label="Label" url="/" disabled></glide-core-link>`,
  );

  const spy = sinon.spy();

  host.addEventListener('click', (event: Event) => {
    event.preventDefault();
    spy();
  });

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});
