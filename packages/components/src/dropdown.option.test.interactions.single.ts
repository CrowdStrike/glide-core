import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('is selected on click', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  component.click();
  await elementUpdated(component);

  expect(component.selected).to.be.true;
  expect(component.ariaSelected).to.equal('true');
});

it('is selected when programmatically selected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  component.selected = true;
  await elementUpdated(component);

  expect(component.selected).to.be.true;
  expect(component.ariaSelected).to.equal('true');
});
