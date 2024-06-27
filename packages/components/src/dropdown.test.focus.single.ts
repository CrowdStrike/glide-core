import './dropdown.option.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('focuses the button when `focus` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="button"]'),
  );
});

it('focuses the button on submit', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  expect(component.shadowRoot?.activeElement).to.be.equal(button);
});

it('focuses the button when `reportValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.reportValidity();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('does not focus the button when `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.checkValidity();
  expect(component.shadowRoot?.activeElement).to.equal(null);
});
