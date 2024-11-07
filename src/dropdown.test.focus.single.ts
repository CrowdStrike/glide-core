/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import type GlideCoreTooltip from './tooltip.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('focuses the primary button when `focus()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="primary-button"]'),
  );
});

it('focuses the button on submit', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  expect(component.shadowRoot?.activeElement).to.be.equal(button);
});

it('focuses the primary button when `reportValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.reportValidity();

  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('does not focus the primary button when `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.checkValidity();
  expect(component.shadowRoot?.activeElement).to.equal(null);
});

it('has a tooltip on focus when its internal label is overflowing', async () => {
  // The period is arbitrary. 500 of them ensures we overflow.
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label=${'.'.repeat(500)}
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await elementUpdated(component);

  // Wait for the Resize Observer to do its thing.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector<GlideCoreTooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  expect(tooltip?.open).to.be.true;
  expect(tooltip?.disabled).to.be.false;
});
