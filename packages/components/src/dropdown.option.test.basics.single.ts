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

  const option = component.shadowRoot?.querySelector('[role="option"]');

  expect(component.hasAttribute('selected')).to.be.true;
  expect(component.selected).to.be.true;
  expect(option?.getAttribute('aria-selected')).to.equal('true');
  expect(option?.ariaSelected).to.equal('true');
});
