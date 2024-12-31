/* eslint-disable @typescript-eslint/no-unused-expressions */

import './checkbox.js';
import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import click from './library/click.js';

GlideCoreCheckboxGroup.shadowRootOptions.mode = 'open';

it('dispatches a "click" event when clicked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  click(component);

  const event = await oneEvent(component, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "change" event when clicked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  click(component.querySelector('glide-core-checkbox'));

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an "input" event when clicked', async () => {
  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
  );

  click(component.querySelector('glide-core-checkbox'));

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches an "invalid" event on submit when required and the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `checkValidity` is called when required and the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  setTimeout(() => component.checkValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event after `reportValidity` is called when required and the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  setTimeout(() => component.reportValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event after `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event after `checkValidity` is called when disabled but required and the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" disabled required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
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

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group">
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity` is called when disabled but required and the checkbox is unchecked', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreCheckboxGroup>(
    html`<glide-core-checkbox-group label="Checkbox Group" disabled required>
      <glide-core-checkbox label="Checkbox"></glide-core-checkbox>
    </glide-core-checkbox-group>`,
    { parentNode: form },
  );

  const spy = sinon.spy();

  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
