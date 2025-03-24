import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { click } from './library/mouse.js';
import GlideCoreTag from './tag.js';

it('dispatches one "remove" event on click', async () => {
  const host = await fixture(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
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
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
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
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
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

it('dispatches one "edit" event on click', async () => {
  const host = await fixture(
    html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="edit-button"]'));

  const spy = sinon.spy();
  host.addEventListener('edit', spy);

  const event = await oneEvent(host, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "edit" event on Enter ', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
  );

  host.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const spy = sinon.spy();
  host.addEventListener('edit', spy);

  const event = await oneEvent(host, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "edit" event on Space ', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
  );

  host.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const spy = sinon.spy();
  host.addEventListener('edit', spy);

  const event = await oneEvent(host, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});
