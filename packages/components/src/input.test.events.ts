import './input.component.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import type Input from './input.js';

// `await aTimeout(0)` is used throughout. Using `oneEvent` instead and
// expecting it to throw would work. But it wouldn't throw until its
// timeout, which would make for a slow test. Its timeout can likely be
// configured. But waiting a turn of the event loop, after which the event
// will have been dispatched, gets the job done as well.

it('dispatches a "change" event when typed in', async () => {
  const input = await fixture<Input>(html`<cs-input></cs-input>`);
  setTimeout(async () => {
    input.focus();
    await sendKeys({ type: 'testing' });
    input.blur();
  });

  const event = await oneEvent(input, 'change');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "input" event when typed in', async () => {
  const input = await fixture<Input>(html`<cs-input></cs-input>`);
  setTimeout(() => {
    input.focus();
    sendKeys({ type: 'testing' });
  });

  const event = await oneEvent(input, 'input');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event on submit when required and no value', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(input, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity` is called when required and no value', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  setTimeout(() => input.checkValidity());

  const event = await oneEvent(input, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity` is called when required and no value', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input required></cs-input>`, {
    parentNode: form,
  });

  setTimeout(() => input.reportValidity());

  const event = await oneEvent(input, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input></cs-input>`, {
    parentNode: form,
  });
  const spy = sinon.spy();

  input.addEventListener('invalid', spy);
  input.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity` is called when required and no value but disabled', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(
    html`<cs-input disabled required></cs-input>`,
    { parentNode: form },
  );
  const spy = sinon.spy();

  input.addEventListener('invalid', spy);
  input.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event when `reportValidity` is called when not required,', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(html`<cs-input></cs-input>`, {
    parentNode: form,
  });
  const spy = sinon.spy();

  input.addEventListener('invalid', spy);
  input.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event when `reportValidity` is called when required and no value but disabled', async () => {
  const form = document.createElement('form');
  const input = await fixture<Input>(
    html`<cs-input disabled required></cs-input>`,
    { parentNode: form },
  );
  const spy = sinon.spy();

  input.addEventListener('invalid', spy);
  input.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});
