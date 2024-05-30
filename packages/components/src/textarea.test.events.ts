import './textarea.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type CsTextarea from './textarea.js';

it('dispatches a `input` event when typed in', async () => {
  const template = `<cs-textarea label="label"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template);

  setTimeout(async () => {
    textarea.focus();
    await sendKeys({ type: 'testing' });
    textarea.blur();
  });

  const event = await oneEvent(textarea, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an `change` event when typed in', async () => {
  const template = `<cs-textarea label="label"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template);

  setTimeout(async () => {
    textarea.focus();
    await sendKeys({ type: 'testing' });
    textarea.blur();
  });

  const event = await oneEvent(textarea, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an `invalid` event on submit when required and no value', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" required></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  setTimeout(() => form.requestSubmit());
  const event = await oneEvent(textarea, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `checkValidity` is called when required and no value', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" required></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  setTimeout(() => textarea.checkValidity());
  const event = await oneEvent(textarea, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `reportValidity` is called when required and no value', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" required></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  setTimeout(() => textarea.reportValidity());
  const event = await oneEvent(textarea, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an `invalid` event after `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an `invalid` event after `checkValidity` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" required disabled></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an `invalid` event when `reportValidity` is called when not required,', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an `invalid` event when `reportValidity` is called when required, no value, and disabled', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" required disabled></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('dispatches an `invalid` event after `requestSubmit` is called when `max-character-count` exceeded', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" max-character-count="3"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });

  setTimeout(async () => {
    textarea.focus();
    await sendKeys({ type: 'testing' });
    form.requestSubmit();
  });

  const event = await oneEvent(textarea, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `checkValidity` is called when `max-character-count` exceeded', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" max-character-count="3"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });

  setTimeout(async () => {
    textarea.focus();
    await sendKeys({ type: 'testing' });
    textarea.checkValidity();
  });

  const event = await oneEvent(textarea, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('dispatches an `invalid` event after `reportValidity` is called when `max-character-count` exceeded', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" max-character-count="3"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });

  setTimeout(async () => {
    textarea.focus();
    await sendKeys({ type: 'testing' });
    textarea.reportValidity();
  });

  const event = await oneEvent(textarea, 'invalid');

  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an `invalid` event after `checkValidity` is called when `max-character-count` not exceeded', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" max-character-count="3"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.focus();
  await sendKeys({ type: 'ab' });
  textarea.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an `invalid` event after `checkValidity` is called when `max-character-count` exceeded and disabled', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" max-character-count="3" disabled></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.focus();
  await sendKeys({ type: 'test' });
  textarea.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an `invalid` event when `reportValidity` is called and `max-character-count` is not exceeded,', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" max-character-count="3"></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.focus();
  await sendKeys({ type: 'ab' });
  textarea.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an `invalid` event when `reportValidity` is called `max-character-count` exceeded and disabled,', async () => {
  const form = document.createElement('form');
  const template = `<cs-textarea label="label" max-character-count="3" disabled></cs-textarea>`;
  const textarea = await fixture<CsTextarea>(template, { parentNode: form });
  const spy = sinon.spy();
  textarea.addEventListener('invalid', spy);
  textarea.focus();
  await sendKeys({ type: 'test' });
  textarea.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});
