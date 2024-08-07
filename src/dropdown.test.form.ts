/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('exposes standard form control properties and methods', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  expect(component.form).to.equal(form);
  expect(component.validity instanceof ValidityState).to.be.true;
  expect(component.willValidate).to.be.true;
  expect(component.checkValidity).to.be.a('function');
  expect(component.reportValidity).to.be.a('function');
});

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
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
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  await elementUpdated(component);

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.textContent?.trim()).to.equal('Placeholder');
  expect(component.value).to.deep.equal([]);
});

it('can be reset to the initially selected option', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
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
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  expect(component.value).to.deep.equal(['two']);
});

it('has `formData` value when an option is selected', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreDropdown>(
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

  await fixture<GlideCoreDropdown>(
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

  await fixture<GlideCoreDropdown>(
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

  await fixture<GlideCoreDropdown>(
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
