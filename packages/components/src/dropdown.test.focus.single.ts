import './dropdown.option.js';
import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
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

it('focuses the button on submit when required and no option is selected', async () => {
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

it('focuses the initially selected option when clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Open it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new Event('click', { bubbles: true }));

  // Wait for it to open.
  await elementUpdated(component);

  const option = component.querySelector('glide-core-dropdown-option');
  expect(document.activeElement).to.equal(option);
});

it('focuses the active option when opened via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Open it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new Event('click', { bubbles: true }));

  // Wait for it to open.
  await elementUpdated(component);

  const option = component.querySelector('glide-core-dropdown-option');
  expect(document.activeElement).to.equal(option);
});

it('focuses the active option when opened via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  // Wait for it to open.
  await elementUpdated(component);

  const option = component.querySelector('glide-core-dropdown-option');
  expect(document.activeElement).to.equal(option);
});

it('focuses the button on close via Escape', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="button"]',
  );

  button?.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  button?.dispatchEvent(new Event('click', { bubbles: true }));

  component
    ?.querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[role="option"]')
    ?.dispatchEvent(new Event('click'));

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  button?.dispatchEvent(new Event('click', { bubbles: true }));

  component.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('focuses the button when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  button?.dispatchEvent(new Event('click', { bubbles: true }));

  component.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: ' ' });

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

it('retains focus on the the first option when the button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  assert(button);

  const { x, y } = button.getBoundingClientRect();

  // A simple `option.click()` won't do because we need a "mousedown" so that
  // `#onDropdownMousedown` gets covered.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x), Math.ceil(y)],
  });

  const option = component.querySelector('glide-core-dropdown-option');
  expect(document.activeElement).to.equal(option);
});
