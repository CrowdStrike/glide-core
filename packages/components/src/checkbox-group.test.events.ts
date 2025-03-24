import './checkbox.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { click } from './library/mouse.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';

it('dispatches a "click" event on click', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  click(host);

  const event = await oneEvent(host, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "change" event on click', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  click(host.querySelector('glide-core-checkbox'));

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "input" event on click', async () => {
  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  click(host.querySelector('glide-core-checkbox'));

  const event = await oneEvent(host, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an "invalid" event on submit when required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity()` is called when required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  setTimeout(() => host.checkValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity()` is called when required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  setTimeout(() => host.reportValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity()` is called when not required', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event after `checkValidity()` is called when disabled but required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" disabled required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
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

  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label">
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity()` is called when disabled but required and its checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Label" disabled required>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
