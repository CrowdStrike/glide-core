import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dropdown.option.js';
import { click, hover } from './library/mouse.js';
import Dropdown from './dropdown.js';

it('closes and reports validity when it loses focus', async () => {
  const div = document.createElement('div');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: div },
  );

  const button = document.createElement('button');
  div.prepend(button);

  await sendKeys({ press: 'Tab' }); // Focus the button.
  await sendKeys({ press: 'Tab' }); // Focus Dropdown.
  await sendKeys({ press: ' ' }); // Open Dropdown.

  // Move focus to the body.
  await sendKeys({ press: 'Tab' });

  expect(host.open).to.be.false;

  await sendKeys({ press: 'Tab' }); // Focus the button.
  await sendKeys({ press: 'Tab' }); // Focus Dropdown.
  await sendKeys({ press: ' ' }); // Open Dropdown.

  // Move focus to its primary button.
  await sendKeys({ down: 'Shift' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ up: 'Shift' });

  expect(host.open).to.be.false;
  expect(host.shadowRoot?.activeElement).to.equal(null);
  expect(host.validity.valid).to.be.false;

  expect(host.shadowRoot?.querySelector('glide-core-private-label')?.error).to
    .be.true;
});

it('is focused on click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="primary-button"]');

  await click(button);

  expect(host.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the Add button on ArrowDown', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.querySelectorAll('glide-core-dropdown-option');

  host.focus();
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Add button

  const addButton = host.shadowRoot?.querySelector('[data-test="add-button"]');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.false;
  expect(host.shadowRoot?.activeElement).to.equal(addButton);
});

it('returns focus to itself on Escape when the Add button has focus', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' }); // Focus Dropdown.
  await sendKeys({ press: 'Tab' }); // Focus the Add button.
  await sendKeys({ press: 'Escape' });

  expect(document.activeElement).to.equal(host);
});

it('returns focus to itself when an option is activated and the Add button has focus', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' }); // Focus Dropdown.
  await sendKeys({ press: 'Tab' }); // Focus the Add button.
  await hover(host.querySelector('glide-core-dropdown-option'));

  expect(document.activeElement).to.equal(host);
});

it('shows a fallback on focus when there are no options', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label"></glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  // Wait for Floating UI.
  await aTimeout(0);

  const feedback = host.shadowRoot?.querySelector(
    '[data-test="optionless-feedback"]',
  );

  expect(feedback?.checkVisibility()).to.be.true;
  expect(feedback?.textContent?.trim()).to.equal('No options available');
});
