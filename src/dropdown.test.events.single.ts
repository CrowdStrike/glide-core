/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import * as sinon from 'sinon';
import {
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
  waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import click from './library/click.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';

it('dispatches one "change" event when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(component.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  component.focus();

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  component.focus();

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event after "input"', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(component.querySelector('glide-core-dropdown-option'));

  const changeSpy = sinon.spy();
  const inputSpy = sinon.spy();

  component.addEventListener('change', changeSpy);
  component.addEventListener('input', inputSpy);

  await waitUntil(() => changeSpy.callCount === 1);

  expect(changeSpy.calledAfter(inputSpy)).to.be.true;
});

it('dispatches an "edit" event on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  click(component?.shadowRoot?.querySelector('[data-test="edit-button"]'));

  const event = await oneEvent(component, 'edit');
  const option = component.querySelector('glide-core-dropdown-option');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
});

it('dispatches an "edit" event on Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'edit');
  const option = component.querySelector('glide-core-dropdown-option');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
});

it('dispatches an "edit" event on Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'edit');
  const option = component.querySelector('glide-core-dropdown-option');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.target).to.equal(option);
});

it('does not dispatch an "edit" event when `disabled`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" disabled>
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('edit', spy);

  await click(
    component?.shadowRoot?.querySelector('[data-test="edit-button"]'),
  );

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "edit" event when `readonly`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" readonly>
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('edit', spy);

  await click(
    component?.shadowRoot?.querySelector('[data-test="edit-button"]'),
  );

  expect(spy.callCount).to.equal(0);
});

it('dispatches one "input" event when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(component.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  component.focus();

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  component.focus();

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "change" event when an already selected option is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  await click(component.querySelector('glide-core-dropdown-option'));

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "change" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    component.value = ['one'];
  });

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "change" events upon selection after `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.value = ['two'];
  click(component.querySelector('glide-core-dropdown-option'));

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "input" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    component.value = ['one'];
  });

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "change" event when an already selected option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(component.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "input" event when an already selected option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(component.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "input" events upon selection after `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.value = ['two'];
  click(component.querySelector('glide-core-dropdown-option'));

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
});
