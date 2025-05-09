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
import { click } from './library/mouse.js';
import Dropdown from './dropdown.js';

it('dispatches one "change" event when an option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(host.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await sendKeys({ press: 'Tab' });

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when an option is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await sendKeys({ press: 'Tab' });

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event after "input"', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(host.querySelector('glide-core-dropdown-option'));

  const changeSpy = sinon.spy();
  const inputSpy = sinon.spy();

  host.addEventListener('change', changeSpy);
  host.addEventListener('input', inputSpy);

  await waitUntil(() => changeSpy.callCount === 1);

  expect(changeSpy.calledAfter(inputSpy)).to.be.true;
});

it('dispatches an "edit" event on click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  click(host?.shadowRoot?.querySelector('[data-test="edit-button"]'));

  const event = await oneEvent(host, 'edit');
  const option = host.querySelector('glide-core-dropdown-option');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
});

it('dispatches an "edit" event on Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host?.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'edit');
  const option = host.querySelector('glide-core-dropdown-option');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
});

it('dispatches an "edit" event on Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host?.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'edit');
  const option = host.querySelector('glide-core-dropdown-option');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.target).to.equal(option);
});

it('does not dispatch an "edit" event when disabled', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" disabled>
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('edit', spy);

  await click(host?.shadowRoot?.querySelector('[data-test="edit-button"]'));

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "edit" event when `readonly`', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" readonly>
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('edit', spy);

  await click(host?.shadowRoot?.querySelector('[data-test="edit-button"]'));

  expect(spy.callCount).to.equal(0);
});

it('dispatches one "input" event when an option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(host.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await sendKeys({ press: 'Tab' });

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await sendKeys({ press: 'Tab' });

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "change" event when an already selected option is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await click(host.querySelector('glide-core-dropdown-option'));

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "change" event when `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    host.value = ['one'];
  });

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "change" events upon selection after `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.value = ['two'];
  click(host.querySelector('glide-core-dropdown-option'));

  const event = await oneEvent(host, 'change');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "input" event when `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    host.value = ['one'];
  });

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "change" event when an already selected option is selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(host.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "input" event when an already selected option is selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(host.querySelector('glide-core-dropdown-option'));

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "input" events upon selection after `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        value="Label"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        value="Label"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.value = ['two'];
  click(host.querySelector('glide-core-dropdown-option'));

  const event = await oneEvent(host, 'input');
  expect(event instanceof Event).to.be.true;
});
