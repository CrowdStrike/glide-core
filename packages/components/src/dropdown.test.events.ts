import * as sinon from 'sinon';
import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click, hover } from './library/mouse.js';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';

it('dispatches an "edit" event on click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = host.querySelector('glide-core-dropdown-option');

  const editButton = host
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector<HTMLButtonElement>('[data-test="edit-button"]');

  // Unlike a real hover, the cursor doesn't travel first through the option before
  // landing on the edit button. So hovering the edit button without hovering the
  // options first results in Dropdown Option's `#onEditButtonMouseover` handler
  // being called after Dropdown's `#onOptionsMouseover` handler. And the latter
  // deactivates the edit button.
  await hover(option);
  await hover(editButton);
  click(editButton);

  assert(option);
  const event = await oneEvent(option, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
});

it('dispatches an "edit" event on Enter', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  sendKeys({ press: 'Enter' });

  const option = host.querySelector('glide-core-dropdown-option');

  assert(option);

  const event = await oneEvent(option, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
});

it('dispatches an "edit" event on Space', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  sendKeys({ press: ' ' });

  const option = host.querySelector('glide-core-dropdown-option');

  assert(option);

  const event = await oneEvent(option, 'edit');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
});

it('dispatches an "add" event on click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  click(
    host.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="add-button"]',
    ),
  );

  const event = await oneEvent(host, 'add');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "add" event on Enter', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="add-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'add');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "add" event on Space', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="add-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'add');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches an "invalid" event on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event when `checkValidity()` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => host.checkValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event when `reportValidity()` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => host.reportValidity());

  const event = await oneEvent(host, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event when `checkValidity()` is called when not required', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  host.addEventListener('invalid', spy);
  host.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `checkValidity()` is called when required, disabled, and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" disabled required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity()` is called when required, disabled, and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" disabled required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  host.addEventListener('invalid', spy);
  host.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "change" event when an option is selected programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  setTimeout(() => {
    const option = host?.querySelector('glide-core-dropdown-option');
    assert(option);

    option.selected = true;
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "input" event when an option is selected programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  setTimeout(() => {
    const option = host?.querySelector('glide-core-dropdown-option');
    assert(option);

    option.selected = true;
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('dispatches a "toggle" on open', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    host.open = true;
  });

  const event = await oneEvent(host, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "toggle" on open', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    host.open = false;
  });

  const event = await oneEvent(host, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "toggle" event when already open', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  host.open = true;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "toggle" event when already open', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  host.open = false;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
