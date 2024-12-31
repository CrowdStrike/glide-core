/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreCheckbox from './checkbox.js';
import click from './library/click.js';

GlideCoreCheckbox.shadowRootOptions.mode = 'open';

it('dispatches a "click" event when clicked', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(component, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "change" event when clicked', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an "input" event when clicked', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  click(component.shadowRoot?.querySelector('[data-test="input"]'));

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "private-value-change" event when its `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="One" value="one"></glide-core-checkbox>`,
  );

  setTimeout(() => (component.value = 'two'));

  const event = await oneEvent(component, 'private-value-change');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.detail.old).to.equal('one');
  expect(event.detail.new).to.equal('two');
  expect(component.value).to.equal('two');
});

it('dispatches an "invalid" event on submit when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox required></glide-core-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => component.checkValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity` is called when required and unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" required></glide-core-checkbox>`,
    { parentNode: form },
  );

  setTimeout(() => component.reportValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event after `checkValidity` is called when required and unchecked but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      required
    ></glide-core-checkbox>`,
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

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity` is called when required and unchecked but disabled', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      disabled
      required
    ></glide-core-checkbox>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
