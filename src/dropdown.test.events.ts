/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from 'sinon';
import {
  aTimeout,
  assert,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

// `await aTimeout(0)` is used throughout. Using `oneEvent` instead and
// expecting it to throw would work. But it wouldn't throw until its
// timeout, which would make for a slow test. Its timeout can likely be
// configured. But waiting a turn of the event loop, when which the event
// will have been dispatched, gets the job done as well.

it('dispatches an "invalid" event on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event when `checkValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => component.checkValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event when `reportValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => component.reportValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event when `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `checkValidity` is called when required, disabled, and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      disabled
      required
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
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

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch an "invalid" event when `reportValidity` is called when required, disabled, and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      disabled
      required
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "change" event when an option is selected programmatically', async () => {
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

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    const option = component?.querySelector('glide-core-dropdown-option');
    assert(option);

    option.selected = true;
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "input" event when an option is selected programmatically', async () => {
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

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    const option = component?.querySelector('glide-core-dropdown-option');
    assert(option);

    option.selected = true;
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});
