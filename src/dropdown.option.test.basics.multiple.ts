import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

it('is selected when initially selected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
      selected
    ></glide-core-dropdown-option>`,
  );

  const checkbox = host.shadowRoot?.querySelector('glide-core-checkbox');

  expect(host.ariaSelected).to.equal('true');
  expect(checkbox?.checked).to.be.true;
});

it('is unselected when initially unselected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  const checkbox = host.shadowRoot?.querySelector('glide-core-checkbox');

  expect(host.ariaSelected).to.equal('false');
  expect(checkbox?.checked).to.be.false;
});

it('is editable', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      editable
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="edit-button"]');
  expect(button?.checkVisibility()).to.be.true;
});

it('checks its checkbox when programmatically enabled', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      private-multiple
      disabled
      selected
    ></glide-core-dropdown-option>`,
  );

  host.disabled = false;
  await host.updateComplete;

  const checkbox = host.shadowRoot?.querySelector('glide-core-checkbox');
  expect(checkbox?.checked).to.be.true;
});

it('unchecks its checkbox when programmatically disabled', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      private-multiple
      selected
    ></glide-core-dropdown-option>`,
  );

  host.disabled = true;
  await host.updateComplete;

  const checkbox = host.shadowRoot?.querySelector('glide-core-checkbox');
  expect(checkbox?.checked).to.be.false;
});
