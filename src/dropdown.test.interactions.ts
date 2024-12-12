/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  aTimeout,
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import sinon from 'sinon';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

afterEach(async () => {
  await resetMouse();
});

it('opens when opened programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowDown' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not scroll the page on ArrowDown when the Add button has focus', async () => {
  document.body.style.height = '200vh';
  document.body.style.scrollBehavior = 'auto';

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'ArrowDown' }); // Add button

  const spy = sinon.spy();
  document.addEventListener('scroll', spy);

  await sendKeys({ press: 'ArrowDown' }); // Still Add button

  // The browser apparently inserts a slight delay after arrowing before scrolling,
  // even when smooth scrolling is disabled. `100` is a round number that comfortably
  // gets us past that delay.
  await aTimeout(100);

  expect(spy.callCount).to.equal(0);
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
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

// See the `document` click handler comment in `dropdown.ts` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.open).to.be.false;
});

it('closes on edit via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.click();

  expect(component.open).to.be.false;
});

it('closes when the Add button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="add-button"]')
    ?.click();

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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
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
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('does not activate a disabled option on "mouseover"', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await elementUpdated(component);

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the next enabled option on ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option
        label="Two"
        disabled
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'ArrowDown' }); // Three

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
});

it('activates the Edit button on ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'ArrowDown' }); // One's edit button

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[0]?.privateIsEditActive).true;
  expect(options[0]?.privateIsTooltipOpen).false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[1]?.privateIsEditActive).to.be.false;
});

it('activates the next enabled option on ArrowDown when the Edit button is active', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        disabled
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' }); // One's edit button
  await sendKeys({ press: 'ArrowDown' }); // Three

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).false;
  expect(options[2]?.privateActive).to.be.true;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).true;
});

it('activates the previous enabled option on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' }); // Three
  await sendKeys({ press: 'ArrowUp' }); // Two

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
});

it('activates the Edit button on on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' }); // One's Edit button
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two's Edit button
  await sendKeys({ press: 'ArrowUp' }); // Two
  await sendKeys({ press: 'ArrowUp' }); // One's Edit button

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[0]?.privateIsEditActive).to.be.true;
  expect(options[0]?.privateIsTooltipOpen).false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.false;
});

it('activates previously active option on ArrowUp when it has an Add button', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Add button
  await sendKeys({ press: 'ArrowUp' }); // Two

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
});

it('activates the Edit button on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two's Edit button
  await sendKeys({ press: 'ArrowDown' }); // Add button
  await sendKeys({ press: 'ArrowUp' }); // Two's Edit button

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.true;
  expect(options[1]?.privateIsTooltipOpen).to.be.false;
});

it('activates the first enabled option on Home', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).to.be.false;
});

it('activates the first enabled option on PageUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'PageDown' });
  await sendKeys({ press: 'PageUp' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).to.be.false;
});

it('activates the first enabled option on ArrowUp + Meta', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).to.be.false;
});

it('activates the last enabled option on End', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'End' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).to.be.false;
});

it('activates the last option on PageDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'PageDown' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).to.be.false;
});

it('activates the last option on Meta + ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).to.be.false;
});

it('activates the previously active option when tabbing back from the Add button', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' }); // Two

  await sendKeys({ press: 'Tab' });
  await sendKeys({ down: 'Shift' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ up: 'Shift' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
  expect(options[2]?.privateIsEditActive).to.be.false;
  expect(options[2]?.privateIsTooltipOpen).to.be.false;
});

it('deactivates the active option when the Add button is tabbed to', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      add-button-label="Add"
      label="Label"
      placeholder="Placeholder"
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'Tab' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
});

it('does not wrap on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'ArrowUp' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('does not wrap on ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('updates `privateSize` on every option when `size` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.size = 'small';

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].privateSize).to.equal('small');
  expect(options[1].privateSize).to.equal('small');
});

it('opens when something other than the primary button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
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

it('does not open on edit via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.click();

  expect(component.open).to.be.false;
});

it('does not open on edit via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.false;
});

it('does not open on edit via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: ' ' });

  expect(component.open).to.be.false;
});

it('hides the tooltip of the active option when opened via click', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="primary-button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await aTimeout(0);

  const tooltip = component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="tooltip"]');

  expect(tooltip?.checkVisibility()).to.be.false;
});
