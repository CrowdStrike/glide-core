import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsDropdown from './dropdown.js';
import CsDropdownOption from './dropdown.option.js';

CsDropdown.shadowRootOptions.mode = 'open';
CsDropdownOption.shadowRootOptions.mode = 'open';

// `await aTimeout(0)` is used throughout. Using `oneEvent` instead and
// expecting it to throw would work. But it wouldn't throw until its
// timeout, which would make for a slow test. Its timeout can likely be
// configured. But waiting a turn of the event loop, when which the event
// will have been dispatched, gets the job done as well.

it('dispatches a "change" event when an option is selected via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  setTimeout(() => {
    component
      .querySelector('cs-dropdown-option')
      ?.shadowRoot?.querySelector('[role="option"]')
      ?.dispatchEvent(new Event('click', { bubbles: true }));
  });

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail).to.deep.equal(['value']);
});

it('dispatches a "change" event when an option is selected via Enter', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.querySelector('cs-dropdown-option')?.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail).to.deep.equal(['value']);
});

it('dispatches a "change" event when an option is selected via Space', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.querySelector('cs-dropdown-option')?.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail).to.deep.equal(['value']);
});

it('dispatches a "input" event when an option is selected via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  setTimeout(() => {
    component
      .querySelector('cs-dropdown-option')
      ?.shadowRoot?.querySelector('[role="option"]')
      ?.dispatchEvent(new Event('click', { bubbles: true }));
  });

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail).to.deep.equal(['value']);
});

it('dispatches a "input" event when an option is selected via Enter', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.querySelector('cs-dropdown-option')?.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail).to.deep.equal(['value']);
});

it('dispatches a "input" event when an option is selected via Space', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.querySelector('cs-dropdown-option')?.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.detail).to.deep.equal(['value']);
});

it('dispatches an "invalid" event on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => form.requestSubmit());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event when `checkValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => component.checkValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('dispatches an "invalid" event when `reportValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  setTimeout(() => component.reportValidity());

  const event = await oneEvent(component, 'invalid');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "invalid" event when `checkValidity` is called when not required', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event when `checkValidity` is called when required, disabled, and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" disabled required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  component.addEventListener('invalid', spy);
  component.checkValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event when `reportValidity` is called when not required,', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});

it('does not dispatch an "invalid" event when `reportValidity` is called when required, disabled, and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" disabled required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  const spy = sinon.spy();
  component.addEventListener('invalid', spy);
  component.reportValidity();
  await aTimeout(0);

  expect(spy.notCalled).to.be.true;
});
