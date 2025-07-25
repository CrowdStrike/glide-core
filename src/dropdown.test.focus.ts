import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dropdown.option.js';
import { click } from './library/mouse.js';
import Dropdown from './dropdown.js';
import requestIdleCallback from './library/request-idle-callback.js';

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
  expect(host.shadowRoot?.activeElement).to.be.null;
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

it('shows a fallback on focus when there are no options', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label"></glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await requestIdleCallback(); // Wait for Floating UI

  const feedback = host.shadowRoot?.querySelector(
    '[data-test="optionless-feedback"]',
  );

  expect(feedback?.checkVisibility()).to.be.true;
  expect(feedback?.textContent?.trim()).to.equal('No options available');
});
