/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('closes and reports validity when it loses focus', async () => {
  const div = document.createElement('div');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      required
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: div },
  );

  const button = document.createElement('button');
  div.prepend(button);

  component.focus();

  // Move focus to the body.
  await sendKeys({ press: 'Tab' });

  expect(component.open).to.be.false;

  component.open = true;
  component.focus();

  // Move focus to the primary button.
  await sendKeys({ down: 'Shift' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ up: 'Shift' });

  expect(component.open).to.be.false;
  expect(component.shadowRoot?.activeElement).to.equal(null);
  expect(component.validity.valid).to.be.false;

  expect(component.shadowRoot?.querySelector('glide-core-private-label')?.error)
    .to.be.true;
});

it('is focused when clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  button?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the Add button on ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  component.focus();
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Add button

  const addButton = component.shadowRoot?.querySelector(
    '[data-test="add-button"]',
  );

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsOpenTooltip).to.be.false;
  expect(component.shadowRoot?.activeElement).to.equal(addButton);
});

it('returns focus to itself on Escape when the Add button has focus', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

  expect(document.activeElement).to.equal(component);
});

it('returns focus to itself when an option is activated and the Add button has focus', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'Tab' });

  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await elementUpdated(component);

  expect(document.activeElement).to.equal(component);
});
