import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

it('focuses itself when `focus()` is called', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  host.focus();

  expect(document.activeElement).to.equal(host);
});
