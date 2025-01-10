/* eslint-disable @typescript-eslint/no-unused-expressions */

import './textarea.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type GlideCoreTextarea from './textarea.js';

it('dispatches a `input` event when typed in', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label"></glide-core-textarea>`,
  );

  setTimeout(async () => {
    component.focus();
    await sendKeys({ type: 'testing' });
    component.blur();
  });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an `change` event when typed in', async () => {
  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label"></glide-core-textarea>`,
  );

  setTimeout(async () => {
    component.focus();
    await sendKeys({ type: 'testing' });
    component.blur();
  });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an `invalid` event on submit when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label" required></glide-core-textarea>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => form.requestSubmit());
  const event = await oneEvent(component, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `checkValidity` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label" required></glide-core-textarea>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => component.checkValidity());
  const event = await oneEvent(component, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `reportValidity` is called when required and no value', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label" required></glide-core-textarea>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => component.reportValidity());
  const event = await oneEvent(component, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an `invalid` event after `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label"></glide-core-textarea>`,
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

it('does not dispatch an `invalid` event after `checkValidity` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      label="label"
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

it('does not dispatch an `invalid` event when `reportValidity` is called when not required,', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea label="label"></glide-core-textarea>`,
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

it('does not dispatch an `invalid` event when `reportValidity` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea
      label="label"
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
