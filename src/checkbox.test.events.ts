import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { click } from './library/mouse.js';
import GlideCoreCheckbox from './checkbox.js';

it('dispatches a "click" event on click', async () => {
  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(host, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "change" event on click', async () => {
  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event on click', async () => {
  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "private-value-change" event when its `value` is set programmatically', async () => {
  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="One" value="one"></glide-core-checkbox>`,
  );

  setTimeout(() => (host.value = 'two'));

  const event = await oneEvent(host, 'private-value-change');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.detail.old).to.equal('one');
  expect(event.detail.new).to.equal('two');
  expect(host.value).to.equal('two');
});

it('dispatches an "invalid" event on submit when required and unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity()` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox required></glide-core-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => host.checkValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity()` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => host.reportValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity()` is called when not required', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event after `checkValidity()` is called when required and unchecked but disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      required
    ></glide-core-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity()` is called when not required,', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity()` is called when required and unchecked but disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      required
    ></glide-core-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
