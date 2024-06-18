import './dropdown.option.js';
import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

const defaultSlot = html`
  <glide-core-dropdown-option
    label="One"
    value="one"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Two"
    value="two"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Three"
    value="three"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Four"
    value="four"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Five"
    value="five"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Six"
    value="six"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Seven"
    value="seven"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Eight"
    value="eight"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Nine"
    value="nine"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Ten"
    value="ten"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Eleven"
    value="eleven"
  ></glide-core-dropdown-option>
`;

it('focuses the input when `focus` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
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
      multiple
      open
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  const { x, y } = option.getBoundingClientRect();

  // A simple `option.click()` won't do because we need a "mousedown" so that
  // `#onOptionsMousedown` gets covered.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x), Math.ceil(y)],
  });

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('retains focus on the the input when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

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

it('retains focus on the the input when the button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
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

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      ${defaultSlot}
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

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.be.equal(input);
});

it('focuses the input when `reportValidity` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      ${defaultSlot}
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.reportValidity();

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(component.shadowRoot?.activeElement).to.equal(input);
});

it('does not focus the input when `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" required>
      ${defaultSlot}
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.checkValidity();
  expect(component.shadowRoot?.activeElement).to.equal(null);
});
