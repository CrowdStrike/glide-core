import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-dropdown-option')).to.equal(
    GlideCoreDropdownOption,
  );
});

it('has defaults', async () => {
  // Required attributes are supplied and not asserted below. The idea is that
  // this test shouldn't fail to typecheck if these templates are eventually
  // typechecked, which means supplying required attributes and slots.
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  expect(component.privateMultiple).to.be.false;
  expect(component.getAttribute('private-multiple')).to.equal(null);

  expect(component.privateSize).to.equal('large');
  expect(component.getAttribute('private-size')).to.equal('large');

  expect(component.selected).to.be.false;
  expect(component.hasAttribute('selected')).to.be.false;

  expect(component.value).to.equal('');
  expect(component.getAttribute('value')).to.equal('');

  // None are reflected, so no attribute assertions are necessary.
  expect(component.privateActive).to.be.false;
  expect(component.privateIndeterminate).to.be.false;
});

it('is selectable', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  const checkedIconContainer = component.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"]',
  );

  expect(checkedIconContainer instanceof Element).to.be.true;
});
