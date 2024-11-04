/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('is selected when programmatically selected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  component.selected = true;

  await elementUpdated(component);

  const checkbox = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(component.ariaSelected).to.equal('true');
  expect(checkbox?.checked).to.be.true;
});

it('is deselected when programmatically deselected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
      selected
    ></glide-core-dropdown-option>`,
  );

  component.selected = false;

  await elementUpdated(component);

  const checkbox = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(component.selected).to.be.false;
  expect(component.ariaSelected).to.equal('false');
  expect(checkbox?.checked).to.be.false;
});

it('sets `privateIsEditActive`', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      editable
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="edit-button"]',
  );

  button?.dispatchEvent(new MouseEvent('mouseover'));
  expect(component.privateIsEditActive).to.be.true;

  button?.dispatchEvent(new MouseEvent('mouseout'));
  expect(component.privateIsEditActive).to.be.false;
});
