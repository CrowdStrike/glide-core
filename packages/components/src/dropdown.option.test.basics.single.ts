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

it('is deselected when initially deselected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  expect(component.selected).to.be.false;
  expect(component.ariaSelected).to.equal('false');
});
