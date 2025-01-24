import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

it('is selected when initially selected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
      selected
    ></glide-core-dropdown-option>`,
  );

  const checkbox = component.shadowRoot?.querySelector('glide-core-checkbox');

  expect(component.selected).to.be.true;
  expect(component.ariaSelected).to.equal('true');
  expect(checkbox?.checked).to.be.true;
});

it('is unselected when initially unselected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  const checkbox = component.shadowRoot?.querySelector('glide-core-checkbox');

  expect(component.selected).to.be.false;
  expect(component.ariaSelected).to.equal('false');
  expect(checkbox?.checked).to.be.false;
});

it('is editable', async () => {
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

  expect(button?.checkVisibility()).to.be.true;
});
