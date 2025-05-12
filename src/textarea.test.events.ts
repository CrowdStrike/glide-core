import './textarea.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type Textarea from './textarea.js';

it('dispatches an "change" event on input', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  sendKeys({ press: 'Tab' });

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event', async () => {
  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  await sendKeys({ press: 'Tab' });
  sendKeys({ type: 'test' });

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "invalid" event on submit when required and no value', async () => {
  const form = document.createElement('form');

  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
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

  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
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

  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
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

  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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

it('does not dispatch an "invalid" event after `checkValidity()` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<Textarea>(
    html`<glide-core-textarea
      label="Label"
      required
      disabled
    ></glide-core-textarea>`,
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

it('does not dispatch an "invalid" event when `reportValidity()` is called when not required,', async () => {
  const form = document.createElement('form');

  const host = await fixture<Textarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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

it('does not dispatch an "invalid" event when `reportValidity()` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<Textarea>(
    html`<glide-core-textarea
      label="Label"
      required
      disabled
    ></glide-core-textarea>`,
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
