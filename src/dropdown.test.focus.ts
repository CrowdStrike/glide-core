/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import { expect, fixture, html } from '@open-wc/testing';
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

  // Move focus to the button.
  await sendKeys({ down: 'Shift' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ up: 'Shift' });

  expect(component.open).to.be.false;

  expect(component.shadowRoot?.activeElement).to.equal(null);

  expect(component.validity.valid).to.equal(false);

  expect(
    component.shadowRoot?.querySelector('glide-core-private-label')?.error,
  ).to.equal(true);
});
