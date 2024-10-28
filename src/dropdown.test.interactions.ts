/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('opens when opened programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.open = true;
  await aTimeout(0);

  const options = component.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.true;
});

it('opens on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowUp' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('does not open on ArrowUp when `disabled`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" disabled>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowUp' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not open on ArrowUp when `readonly`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" readonly>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowUp' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('opens on ArrowDown', async () => {
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
  );

  component.focus();
  await sendKeys({ press: 'ArrowDown' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('does not open on ArrowDown when `disabled`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" disabled>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowDown' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not open on ArrowDown when `readonly`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" readonly>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowDown' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('opens on Space', async () => {
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

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('does not open on Space when `disabled`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" disabled>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not open on Space when `readonly`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" readonly>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

// See the `document` click listener comment in `dropdown.ts` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: div },
  );

  const button = document.createElement('button');
  button.addEventListener('click', () => (component.open = true));
  div.append(button);
  button.click();

  // Wait for it to open.
  await aTimeout(0);

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('closes when something outside of it is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  document.body.click();
  expect(component.open).to.be.false;
});

it('closes on Escape', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.open).to.be.false;
});

it('opens when open and enabled programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      disabled
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.disabled = false;

  // Wait for it to open.
  await aTimeout(0);

  const options = component?.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.true;
});

it('closes when open and disabled programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.disabled = true;

  const options = component?.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.false;
});

it('activates an option on "mouseover"', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');
  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[1]?.privateActive).to.be.true;
});

it('activates the next option on ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('activates the previous option on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1]?.focus();

  expect(options[1]?.privateActive).to.be.true;
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the first option on Home', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  expect(options[1].privateActive).to.be.true;

  options[1].focus();
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the first option on PageUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1].focus();
  expect(options[1]?.privateActive).to.be.true;

  await sendKeys({ press: 'PageUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the first option on ArrowUp + Meta', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  expect(options[1]?.privateActive).to.be.true;

  options[1].focus();
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the last option on End', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: 'End' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('activates the last option on PageDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');
  options[0]?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('activates the last option on Meta + ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');
  options[0]?.focus();

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('does not wrap on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[0]?.focus();
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('does not wrap on ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  expect(options[1].privateActive).to.be.true;

  options[1]?.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('updates `privateSize` on every option when `size` is changed programmatically', async () => {
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
  );

  component.size = 'small';

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].privateSize).to.equal('small');
  expect(options[1].privateSize).to.equal('small');
});

it('opens when something other than the button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const internalLabel = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  assert(internalLabel);

  const { x, y } = internalLabel.getBoundingClientRect();

  // A simple `option.click()` won't do because we need a "mousedown" so that
  // `#onDropdownMousedown` gets covered.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x), Math.ceil(y)],
  });

  expect(component.open).to.be.true;
});

it('hides the tooltip of the active option when opened via click', async () => {
  // The period is arbitrary. 500 of them ensures we exceed the maximum
  // width even if it's increased.
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label=${'.'.repeat(500)}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await aTimeout(0);

  const tooltip = component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="tooltip"]');

  expect(tooltip?.checkVisibility()).to.be.false;
});
