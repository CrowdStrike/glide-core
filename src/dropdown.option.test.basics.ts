import { expect, fixture, html } from '@open-wc/testing';
import DropdownOption from './dropdown.option.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-dropdown-option')).to.equal(
    DropdownOption,
  );
});

it('sets `aria-selected` when selected', async () => {
  const host = await fixture<DropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('true');
});

it('sets `aria-selected` when unselected', async () => {
  const host = await fixture<DropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('false');
});

it('sets `aria-selected` when disabled', async () => {
  const host = await fixture<DropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
      disabled
    ></glide-core-dropdown-option>`,
  );

  expect(host.ariaSelected).to.equal('false');
});
