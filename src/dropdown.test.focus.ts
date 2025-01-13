/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdownOption from './dropdown.option.js';
import { click, hover } from './library/mouse.js';
import GlideCoreDropdown from './dropdown.js';

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
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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

it('is focused on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  await click(button);

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

  // Wait for Floating UI.
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
  expect(options[1]?.privateIsTooltipOpen).to.be.false;
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

  // Wait for Floating UI.
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
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'Tab' });

  await hover(component.querySelector('glide-core-dropdown-option'));

  expect(document.activeElement).to.equal(component);
});
