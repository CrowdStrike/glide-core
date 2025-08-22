import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Input from './input.js';
import { click } from '@/src/library/mouse.js';

it('dispatches a "change" event on input', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  sendKeys({ press: 'Tab' });

  const event = await oneEvent(host, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event on input', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  await sendKeys({ press: 'Tab' });
  sendKeys({ type: 'test' });

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event on clear', async () => {
  const host = await fixture<Input>(
    html`<glide-core-input
      label="Label"
      value="value"
      clearable
    ></glide-core-input>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="clear-button"]'));

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "invalid" event on submit when required and no value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity()` is called when required and no value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => host.checkValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity()` is called when required and no value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label" required></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => host.reportValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity()` is called when not required', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event after `checkValidity()` is called when required and no value but disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label" disabled required></glide-core-input>`,
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

  const host = await fixture<Input>(
    html`<glide-core-input label="Label"></glide-core-input>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity()` is called when required and no value but disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<Input>(
    html`<glide-core-input label="Label" disabled required></glide-core-input>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
