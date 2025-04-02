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

it('is unchecked when selected and enabled', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      private-multiple
      selected
    ></glide-core-dropdown-option>`,
  );

  const checkbox = host.shadowRoot?.querySelector('glide-core-checkbox');
  expect(checkbox?.checked).to.be.true;
});

it('is unchecked when selected and disabled', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      disabled
      private-multiple
      selected
    ></glide-core-dropdown-option>`,
  );

  const checkbox = host.shadowRoot?.querySelector('glide-core-checkbox');
  expect(checkbox?.checked).to.be.false;
});

it('has a count', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      count=${1}
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  const count = host.shadowRoot?.querySelector('[data-test="count-container"]');

  expect(count?.checkVisibility()).to.be.true;
  expect(count?.textContent?.trim()).to.equal('1');

  host.count = 1000;
  await host.updateComplete;

  expect(count?.checkVisibility()).to.be.true;
  expect(count?.textContent?.trim()).to.equal('999+');
});

it('does not have a count when negative', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      count=${-1}
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  const count = host.shadowRoot?.querySelector('[data-test="count-container"]');
  expect(count?.checkVisibility()).to.not.be.ok;
});
