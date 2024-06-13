import './dropdown.option.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

CsDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('focuses the button when `focus` is called', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('button'),
  );
});

it('focuses the button on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
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

  const button = component.shadowRoot?.querySelector('button');
  expect(component.shadowRoot?.activeElement).to.be.equal(button);
});

it('focuses the button when `reportValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.reportValidity();

  const button = component.shadowRoot?.querySelector('button');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the initially selected option when clicked', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new Event('click'));

  // Wait for the dropdown to open.
  await elementUpdated(component);

  const option = component.querySelector('glide-core-dropdown-option');
  expect(document.activeElement).to.equal(option);
});

it('focuses the active option', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new Event('click'));

  // Wait for the dropdown to open.
  await elementUpdated(component);

  const option = component.querySelector('glide-core-dropdown-option');
  expect(document.activeElement).to.equal(option);
});

it('focuses the button on close via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));
  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button on close via Escape', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');

  button?.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));

  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new Event('click'));

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via Enter', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));

  component.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via Space', async () => {
  const component = await fixture<CsDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));

  component.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: ' ' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('does not focus the button when `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
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
