/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('is selected when initially selected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      selected
    ></glide-core-dropdown-option>`,
  );

  expect(component.selected).to.be.true;
  expect(component.ariaSelected).to.equal('true');
});

it('is unselected when initially unselected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  expect(component.selected).to.be.false;
  expect(component.ariaSelected).to.equal('false');
});

it('is editable', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      editable
    ></glide-core-dropdown-option>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="edit-button"]',
  );

  expect(button?.checkVisibility()).to.be.true;
});
