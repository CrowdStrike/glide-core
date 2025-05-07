import { aTimeout, assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { click, hover } from './library/mouse.js';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';
import GlideCoreTooltip from './tooltip.js';

it('opens when opened programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.true;
});

it('shows a fallback when opened programmatically and there are no options', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label"></glide-core-dropdown>`,
  );

  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const feedback = host.shadowRoot?.querySelector(
    '[data-test="optionless-feedback"]',
  );

  expect(feedback?.checkVisibility()).to.be.true;
  expect(feedback?.textContent?.trim()).to.equal('No options available');
});

it('does not open when opened programmatically and there are no options', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label"> </glide-core-dropdown>`,
  );

  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.false;
});

it('opens on ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('does not open on ArrowUp when disabled', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" disabled>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not open on ArrowUp when `readonly`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" readonly>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('opens on ArrowDown', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('does not open on ArrowDown when disabled', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" disabled>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not open on ArrowDown when `readonly`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" readonly>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not scroll the page on ArrowDown when the Add button has focus', async () => {
  document.body.style.height = '200vh';

  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Add button

  const spy = sinon.spy();
  document.addEventListener('scroll', spy);

  await sendKeys({ press: 'ArrowDown' }); // Still Add button

  // The browser apparently inserts a slight delay after arrowing before scrolling,
  // even when smooth scrolling is disabled. `100` is a round number that comfortably
  // gets us past that delay.
  await aTimeout(100);

  expect(spy.callCount).to.equal(0);

  document.body.style.height = '';
});

it('opens on Space', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('does not open on Space when disabled', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" disabled>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not open on Space when `readonly`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" readonly>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

// See the `document` click handler comment in `dropdown.ts` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: div },
  );

  const button = document.createElement('button');
  button.addEventListener('click', () => (host.open = true));
  div.append(button);
  await click(button);

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('closes when something outside of it is clicked', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(document.body);
  expect(host.open).to.be.false;
});

it('closes on Escape', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

  expect(host.open).to.be.false;
});

it('closes on edit via click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(
    host
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector('[data-test="edit-button"]'),
  );

  expect(host.open).to.be.false;
});

it('closes when the Add button is clicked', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(host.shadowRoot?.querySelector('[data-test="add-button"]'));

  expect(host.open).to.be.false;
});

it('opens when open and enabled programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open disabled>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.disabled = false;

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host?.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.true;
});

it('closes when open and disabled programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  host.disabled = true;

  const options = host?.shadowRoot?.querySelector('[data-test="options"]');
  expect(options?.checkVisibility()).to.be.false;
});

it('activates an option on hover', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('does not activate a disabled option on hover', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the next enabled option on ArrowDown', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Three

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[2]?.privateActive).to.be.true;
});

it('activates the Edit button on ArrowDown', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // One's edit button

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[0]?.privateIsEditActive).true;
  expect(options[0]?.privateIsTooltipOpen).false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[1]?.privateIsEditActive).to.be.false;
});

it('activates the next enabled option on ArrowDown when the Edit button is active', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        disabled
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowDown' }); // One's edit button
  await sendKeys({ press: 'ArrowDown' }); // Three

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowDown' }); // Three
  await sendKeys({ press: 'ArrowUp' }); // Two

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
});

it('activates the Edit button on on ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowDown' }); // One's Edit button
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two's Edit button
  await sendKeys({ press: 'ArrowUp' }); // Two
  await sendKeys({ press: 'ArrowUp' }); // One's Edit button

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[0]?.privateIsEditActive).to.be.true;
  expect(options[0]?.privateIsTooltipOpen).false;
  expect(options[1]?.privateActive).to.be.false;
  expect(options[1]?.privateIsEditActive).to.be.false;
  expect(options[1]?.privateIsTooltipOpen).to.be.false;
});

it('activates previously active option on ArrowUp when it has an Add button', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Add button
  await sendKeys({ press: 'ArrowUp' }); // Two

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsTooltipOpen).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.false;
});

it('activates the Edit button on ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two's Edit button
  await sendKeys({ press: 'ArrowDown' }); // Add button
  await sendKeys({ press: 'ArrowUp' }); // Two's Edit button

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[1]?.privateIsEditActive).to.be.true;
  expect(options[1]?.privateIsTooltipOpen).to.be.false;
});

it('activates the first enabled option on Home', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Home' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'PageDown' });
  await sendKeys({ press: 'PageUp' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'End' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'PageDown' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowDown' }); // Two

  await sendKeys({ press: 'Tab' });
  await sendKeys({ down: 'Shift' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ up: 'Shift' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

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
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown add-button-label="Add" label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[0]?.privateIsEditActive).to.be.false;
  expect(options[0]?.privateIsTooltipOpen).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
});

it('does not wrap on ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('does not wrap on ArrowDown', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('opens when something other than its primary button is clicked', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="internal-label"]'));

  expect(host.open).to.be.true;
});

it('does not open on edit via click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="edit-button"]'));

  expect(host.open).to.be.false;
});

it('does not open on edit via Enter', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.false;
});

it('does not open on edit via Space', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: ' ' });

  expect(host.open).to.be.false;
});

it('shows a fallback when open and its options are removed', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.querySelectorAll('glide-core-dropdown-option');

  for (const option of options) {
    option.remove();
  }

  // Wait for `#onDefaultSlotChange()`.
  await aTimeout(0);

  const feedback = host.shadowRoot?.querySelector(
    '[data-test="optionless-feedback"]',
  );

  expect(feedback?.checkVisibility()).to.be.true;
  expect(feedback?.textContent?.trim()).to.equal('No options available');
});

it('hides the tooltip of the active option when opened via click', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const tooltip = host
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector<GlideCoreTooltip>('[data-test="tooltip"]');

  expect(tooltip?.open).to.be.false;
});

it('does not allow its "toggle" event to propagate', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = host.shadowRoot
    ?.querySelector('[data-test="internal-label-tooltip"]')
    ?.shadowRoot?.querySelector<HTMLElement>('[data-test="tooltip"]');

  assert(tooltip);
  tooltip.dataset.openDelay = '0';

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  await hover(host.shadowRoot?.querySelector('[data-test="internal-label"]'));

  expect(spy.callCount).to.equal(0);
});

it('enables options when `value` is set programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="one"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.value = ['one'];

  const option = host.querySelector('glide-core-dropdown-option');
  expect(option?.disabled).to.be.false;
});
