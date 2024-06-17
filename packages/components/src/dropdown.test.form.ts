import './dropdown.option.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CsDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

CsDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[role="option"]')
    ?.dispatchEvent(new Event('click', { bubbles: true }));

  form.reset();

  await elementUpdated(component);

  expect(component.value).to.deep.equal([]);

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="placeholder-or-selected-option-label"]')
      ?.textContent?.trim(),
  ).to.equal('Placeholder');
});

it('can be reset to the initially selected option', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[role="option"]')
    ?.dispatchEvent(new Event('click', { bubbles: true }));

  form.reset();

  expect(component.value).to.deep.equal(['two']);
});

it('has a `formData` value when an option is selected', async () => {
  const form = document.createElement('form');

  await fixture<CsDropdown>(
    html`<glide-core-dropdown
        label="Label"
        placeholder="Placeholder"
        name="name"
      >
        <glide-core-dropdown-option
          label="Label"
          value="value"
          selected
        ></glide-core-dropdown-option>
      </glide-core-dropdown>
      >`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["value"]');
});

it('has no `formData` value when no option is selected', async () => {
  const form = document.createElement('form');

  await fixture<CsDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
    >
      <glide-core-dropdown-option
        label=""
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when disabled and an option is selected', async () => {
  const form = document.createElement('form');

  await fixture<CsDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
      disabled
    >
      <glide-core-dropdown-option
        label="Label"
        value="value"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when an option is selected that has no `value`', async () => {
  const form = document.createElement('form');

  await fixture<CsDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
    >
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
