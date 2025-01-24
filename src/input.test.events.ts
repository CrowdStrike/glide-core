import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreInput from './input.js';

it('dispatches a "change" event on input', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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

it('dispatches an "input" event on input', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
  );

  component.focus();
  sendKeys({ type: 'test' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event on clear', async () => {
  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input value="test" clearable></glide-core-input>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="clear-button"]'));

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

it('dispatches an "invalid" event after `checkValidity()` is called when required and no value', async () => {
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

it('dispatches an "invalid" event after `reportValidity()` is called when required and no value', async () => {
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

it('does not dispatch an "invalid" event after `checkValidity()` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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

it('does not dispatch an "invalid" event after `checkValidity()` is called when required and no value but disabled', async () => {
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

it('does not dispatch an "invalid" event when `reportValidity()` is called when not required,', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreInput>(
    html`<glide-core-input label="Label"></glide-core-input>`,
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

it('does not dispatch an "invalid" event when `reportValidity()` is called when required and no value but disabled', async () => {
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
