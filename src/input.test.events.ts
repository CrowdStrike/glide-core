/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInput from './input.js';

GlideCoreInput.shadowRootOptions.mode = 'open';

// `await aTimeout(0)` is used throughout. Using `oneEvent` instead and
// expecting it to throw would work. But it wouldn't throw until its
// timeout, which would make for a slow test. Its timeout can likely be
// configured. But waiting a turn of the event loop, after which the event
// will have been dispatched, gets the job done as well.

it('dispatches a "change" event when typed in', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input></glide-core-input>`,
  );

  setTimeout(async () => {
    component.focus();
    await sendKeys({ type: 'testing' });
    component.blur();
  });

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an "input" event when typed in', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input></glide-core-input>`,
  );

  setTimeout(() => {
    component.focus();
    sendKeys({ type: 'testing' });
  });

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event on clear', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input value="test" clearable></glide-core-input>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<HTMLButtonElement>('[data-test="clear-button"]')
      ?.click();
  });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "invalid" event on submit when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => component.checkValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => component.reportValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event after `checkValidity` is called when required and no value but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input disabled required></glide-core-input>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity` is called when not required,', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity` is called when required and no value but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input disabled required></glide-core-input>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
