import './textarea.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type GlideCoreTextarea from './textarea.js';

it('dispatches an "change" event on input', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  component.focus();

  setTimeout(async () => {
    await sendKeys({ type: 'test' });
    component.blur();
  });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
  );

  component.focus();
  sendKeys({ type: 'test' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an `invalid` event on submit when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => form.requestSubmit());
  const event = await oneEvent(component, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `checkValidity()` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => component.checkValidity());
  const event = await oneEvent(component, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `reportValidity()` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label" required></glide-core-textarea>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => component.reportValidity());
  const event = await oneEvent(component, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an `invalid` event after `checkValidity()` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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

it('does not dispatch an `invalid` event after `checkValidity()` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
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
  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an `invalid` event when `reportValidity()` is called when not required,', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="Label"></glide-core-textarea>`,
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

it('does not dispatch an `invalid` event when `reportValidity()` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
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
  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
