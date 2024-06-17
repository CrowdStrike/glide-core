import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('registers', async () => {
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

  // None are reflected, so no attribute assertions are necessary.
  expect(component.privateActive).to.equal(false);
  expect(component.selected).to.equal(false);
  expect(component.value).to.equal('');
});

it('can be selected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      selected
    ></glide-core-dropdown-option>`,
  );

  expect(component.hasAttribute('selected')).to.be.true;
  expect(component.selected).to.be.true;

  const option = component.shadowRoot?.querySelector('[role="option"]');

  expect(option?.getAttribute('aria-selected')).to.equal('true');
  expect(option?.ariaSelected).to.equal('true');
});

it('can have a label', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  expect(component.shadowRoot?.textContent?.trim()).to.equal('Label');
});

it('can have an icon', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option label="Label" value="value">
      <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />

        <path
          d="M12 16L12 12"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />

        <circle cx="12" cy="8" r="1" fill="currentColor" />
      </svg>
    </glide-core-dropdown-option>`,
  );

  const icon = component?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedElements()
    .at(0);

  expect(icon instanceof SVGElement).to.be.true;
});

it('can have a value', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  expect(component.getAttribute('value')).to.equal('value');
  expect(component.value).to.equal('value');
});
