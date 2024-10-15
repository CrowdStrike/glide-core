/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tag.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTag from './tag.js';
import sinon from 'sinon';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('dispatches one "remove" event on click', async () => {
  const component = await fixture(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="removal-button"]')
      ?.click();
  });

  const spy = sinon.spy();
  component.addEventListener('remove', spy);

  const event = await oneEvent(component, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "remove" event on Enter ', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const spy = sinon.spy();
  component.addEventListener('remove', spy);

  const event = await oneEvent(component, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "remove" event on Space ', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const spy = sinon.spy();
  component.addEventListener('remove', spy);

  const event = await oneEvent(component, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "edit" event on click', async () => {
  const component = await fixture(
    html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="edit-button"]')
      ?.click();
  });

  const spy = sinon.spy();
  component.addEventListener('edit', spy);

  const event = await oneEvent(component, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "edit" event on Enter ', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const spy = sinon.spy();
  component.addEventListener('edit', spy);

  const event = await oneEvent(component, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "edit" event on Space ', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const spy = sinon.spy();
  component.addEventListener('edit', spy);

  const event = await oneEvent(component, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});
