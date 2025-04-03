import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

it('sets `aria-selected` when selected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('true');
});

it('sets `aria-selected` when unselected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('false');
});

it('is editable', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      editable
    ></glide-core-dropdown-option>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="edit-button"]');
  expect(button?.checkVisibility()).to.be.true;
});

it('appears checked when selected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  const checkmark = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(checkmark?.checkVisibility()).to.be.true;
});

it('appears unchecked when selected and disabled', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
      disabled
    ></glide-core-dropdown-option>`,
  );

  const checkmark = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(checkmark?.checkVisibility()).to.not.be.ok;
});

it('has a count', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      count=${1}
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
    ></glide-core-dropdown-option>`,
  );

  const count = host.shadowRoot?.querySelector('[data-test="count-container"]');
  expect(count?.checkVisibility()).to.not.be.ok;
});
