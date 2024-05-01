import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import CsCheckbox from './checkbox.js';

CsCheckbox.shadowRootOptions.mode = 'open';

// `await aTimeout(0)` is used throughout. Using `oneEvent` instead and
// expecting it to throw would work. But it wouldn't throw until its
// timeout, which would make for a slow test. Its timeout can likely be
// configured. But waiting a turn of the event loop, after which the event
// will have been dispatched, gets the job done as well.

it('dispatches a "click" event when clicked', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
  );

  setTimeout(() => component.click());

  const event = await oneEvent(component, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('dispatches a "change" event when clicked', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
  );

  setTimeout(() => component.click());

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "input" event when clicked', async () => {
  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
  );

  setTimeout(() => component.click());

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event on submit when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => component.checkValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox required></cs-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => component.reportValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity` is called when required and unchecked but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox disabled required></cs-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event when `reportValidity` is called when not required,', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox></cs-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event when `reportValidity` is called when required and unchecked but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsCheckbox>(
    html`<cs-checkbox disabled required></cs-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});
