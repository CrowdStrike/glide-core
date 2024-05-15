import './dropdown.option.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsDropdown from './dropdown.js';
import CsDropdownOption from './dropdown.option.js';

CsDropdown.shadowRootOptions.mode = 'open';
CsDropdownOption.shadowRootOptions.mode = 'open';

it('can be reset', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
    {
      parentNode: form,
    },
  );

  component
    .querySelector('cs-dropdown-option')
    ?.shadowRoot?.querySelector('[role="option"]')
    ?.dispatchEvent(new Event('click', { bubbles: true }));

  form.reset();

  expect(component.value).to.deep.equal([]);
});

it('can be reset to the initially selected option', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two" selected></cs-dropdown-option>
    </cs-dropdown>`,
    {
      parentNode: form,
    },
  );

  component
    .querySelector('cs-dropdown-option')
    ?.shadowRoot?.querySelector('[role="option"]')
    ?.dispatchEvent(new Event('click', { bubbles: true }));

  form.reset();

  expect(component.value).to.deep.equal(['two']);
});

it('has a `formData` value when an option is selected', async () => {
  const form = document.createElement('form');

  await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" name="name">
        <cs-dropdown-option
          label="Label"
          value="value"
          selected
        ></cs-dropdown-option>
      </cs-dropdown>
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
    html`<cs-dropdown placeholder="Placeholder" name="name">
      <cs-dropdown-option label="" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
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
    html`<cs-dropdown placeholder="Placeholder" name="name" disabled>
      <cs-dropdown-option
        label="Label"
        value="value"
        selected
      ></cs-dropdown-option>
    </cs-dropdown>`,
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
    html`<cs-dropdown placeholder="Placeholder" name="name">
      <cs-dropdown-option label="Label" selected></cs-dropdown-option>
    </cs-dropdown>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
