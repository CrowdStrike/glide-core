import { expect } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-dropdown-option')).to.equal(
    GlideCoreDropdownOption,
  );
});
