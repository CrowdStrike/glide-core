import './dropdown.option.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsDropdown from './dropdown.js';
import CsDropdownOption from './dropdown.option.js';

CsDropdown.shadowRootOptions.mode = 'open';
CsDropdownOption.shadowRootOptions.mode = 'open';

it('focuses the button when `focus` is called', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('button'),
  );
});

it('focuses the button on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
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
    html`<cs-dropdown placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  component.reportValidity();

  const button = component.shadowRoot?.querySelector('button');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the initially selected option when clicked', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option
        label="Label"
        value="value"
        selected
      ></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new Event('click'));

  // Wait for the dropdown to open.
  await elementUpdated(component);

  const option = component.querySelector('cs-dropdown-option');
  expect(document.activeElement).to.equal(option);
});

it('focuses the active option', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new Event('click'));

  // Wait for the dropdown to open.
  await elementUpdated(component);

  const option = component.querySelector('cs-dropdown-option');
  expect(document.activeElement).to.equal(option);
});

it('focuses the button on close via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));
  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button on close via Escape', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');

  button?.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));

  component
    .querySelector('cs-dropdown-option')
    ?.dispatchEvent(new Event('click'));

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via Enter', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));

  component.querySelector('cs-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via Space', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  button?.dispatchEvent(new Event('click'));

  component.querySelector('cs-dropdown-option')?.focus();
  await sendKeys({ press: ' ' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('does not focus the button when `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown placeholder="Placeholder" required>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: form },
  );

  component.checkValidity();
  expect(component.shadowRoot?.activeElement).to.equal(null);
});
