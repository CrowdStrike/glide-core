import './dropdown.option.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsDropdown from './dropdown.js';

CsDropdown.shadowRootOptions.mode = 'open';

it('is valid if not required and no option is selected', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option
        label="Label"
        value="value"
        selected
      ></cs-dropdown-option>
    </cs-dropdown>`,
  );

  expect(component.validity.valid).to.be.true;
  expect(component.validity?.valueMissing).to.be.false;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});

it('is invalid if required and no option is selected', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.false;
  expect(component.reportValidity()).to.be.false;
});

it('is both invalid and valid if required but disabled and no option is selected', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" disabled required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  expect(component.validity.valid).to.be.false;
  expect(component.validity?.valueMissing).to.be.true;
  expect(component.checkValidity()).to.be.true;
  expect(component.reportValidity()).to.be.true;
});
