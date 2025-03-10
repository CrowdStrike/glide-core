import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreInlineAlert from './inline-alert.js';

it('dispatches one "remove" event on click', async () => {
  const host = await fixture(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  click(host.shadowRoot?.querySelector('[data-test="removal-button"]'));

  const spy = sinon.spy();
  host.addEventListener('remove', spy);

  const event = await oneEvent(host, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "remove" event on Enter ', async () => {
  const host = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  host.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const spy = sinon.spy();
  host.addEventListener('remove', spy);

  const event = await oneEvent(host, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "remove" event on Space ', async () => {
  const host = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  host.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const spy = sinon.spy();
  host.addEventListener('remove', spy);

  const event = await oneEvent(host, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});
