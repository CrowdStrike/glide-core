import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dropdown.option.js';
import { click } from './library/mouse.js';
import GlideCoreDropdown from './dropdown.js';

it('focuses the input when `focus()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('retains focus on the input when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      multiple
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.focus();
  await click(component.querySelector('glide-core-dropdown-option'));

  assert(component.shadowRoot?.activeElement);

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('retains focus on the the input when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.focus();

  component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('retains focus on the the input when the primary button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  await click(
    component.shadowRoot?.querySelector('[data-test="primary-button"]'),
  );

  assert(component.shadowRoot?.activeElement);

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      required
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.be.equal(input);
});

it('focuses the input when `reportValidity()` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      required
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.reportValidity();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('does not focus the input when `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      required
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.checkValidity();
  expect(component.shadowRoot?.activeElement).to.equal(null);
});

it('sets the `value` of its input field to the selected option when focus is lost', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.selected = true;

  // Now type something other than "One" so we can check that it's reverted
  // back to "One" when focus is lost.
  component.focus();
  await sendKeys({ type: 'o' });

  component.blur();

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('One');
});

it('selects the filter text on focus', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  expect(window.getSelection()?.toString()).to.equal('One');
});
