import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import CsDropdown from './dropdown.js';
import CsDropdownOption from './dropdown.option.js';

CsDropdown.shadowRootOptions.mode = 'open';
CsDropdownOption.shadowRootOptions.mode = 'open';

it('opens when clicked', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  expect(component.open).to.be.true;
});

it('opens on ArrowUp', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowUp' });

  expect(component.open).to.be.true;
});

it('opens on ArrowDown', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(component.open).to.be.true;
});

it('opens on Space', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.true;
});

// See the `document` click listener comment in `dropdown.ts` for an explanation.
it('opens when opened programmatically via the click handler of another element', async () => {
  const div = document.createElement('div');

  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
    { parentNode: div },
  );

  const button = document.createElement('button');
  button.addEventListener('click', () => (component.open = true));
  div.append(button);
  button.click();

  expect(component.open).to.be.true;
});

it('closes when clicked', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  // Open it.
  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  expect(component.open).to.be.false;
});

it('closes when something outside of it is clicked', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  document.body.click();
  expect(component.open).to.be.false;
});

it('closes on Escape when the button has focus', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.open).to.be.false;
});

it('closes on Escape when an option has focus', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'Escape' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  // Open it.
  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Enter', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.querySelector('cs-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const option = component.querySelector('cs-dropdown-option');

  option?.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.false;
});

it('selects the clicked option', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="Label" value="value"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const option = component.querySelector('cs-dropdown-option');
  option?.click();

  expect(option?.selected).to.be.true;
});

it('deselects all other options when one is newly selected', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option label="One" value="one" selected></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
      <cs-dropdown-option label="Three" value="three"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new Event('click'));

  const options = component.querySelectorAll('cs-dropdown-option');
  options[1].click();

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(options[2].selected).to.be.false;
});

it('deactivates all other options on "mouseover"', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[0]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('activates an option on "mouseover"', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');
  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[1]?.privateActive).to.be.true;
});

it('activates the first option by default', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the next option on ArrowDown', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('activates the previous option on ArrowUp', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1]?.focus();

  expect(options[1]?.privateActive).to.be.true;
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the first option on Home', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  expect(options[1].privateActive).to.be.true;

  options[1].focus();
  await sendKeys({ press: 'Home' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the first option on PageUp', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1].focus();
  expect(options[1]?.privateActive).to.be.true;

  await sendKeys({ press: 'PageUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('activates the first option on ArrowUp + Meta', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

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
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: 'End' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('activates the last option on PageDown', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');
  options[0]?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('activates the last option on Meta + ArrowDown', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');
  options[0]?.focus();

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('does not wrap on ArrowUp', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[0]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[0]?.focus();
  await sendKeys({ press: 'ArrowUp' });

  expect(options[0]?.privateActive).to.be.true;
  expect(options[1]?.privateActive).to.be.false;
});

it('does not wrap on ArrowDown', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  expect(options[1].privateActive).to.be.true;

  options[1]?.focus();
  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('updates `value` when an option is selected via click', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
      <cs-dropdown-option label="Three"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[1].click();
  expect(component.value).to.deep.equal(['two']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  await elementUpdated(component);

  options[2].click();
  expect(component.value).to.deep.equal([]);
});

it('updates `value` when an option is selected via Enter', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal(['one']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  await elementUpdated(component);

  options[1].focus();
  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal([]);
});

it('updates `value` when an option is selected via Space', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  const options = component.querySelectorAll('cs-dropdown-option');

  options[0].focus();
  await sendKeys({ press: ' ' });
  expect(component.value).to.deep.equal(['one']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('button')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  await elementUpdated(component);

  options[1].focus();
  await sendKeys({ press: ' ' });

  expect(component.value).to.deep.equal([]);
});

it('sets the button text when an option is initially selected', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder">
      <cs-dropdown-option label="One" value="one" selected></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  expect(
    component.shadowRoot?.querySelector('button')?.textContent?.trim(),
  ).to.equal('One');
});

it('updates the button text when an option is newly selected', async () => {
  const component = await fixture<CsDropdown>(
    html`<cs-dropdown label="Label" placeholder="Placeholder" open>
      <cs-dropdown-option label="One" value="one"></cs-dropdown-option>
      <cs-dropdown-option label="Two" value="two"></cs-dropdown-option>
    </cs-dropdown>`,
  );

  component
    .querySelector<CsDropdownOption>('cs-dropdown-option:last-of-type')
    ?.click();

  await elementUpdated(component);

  const button = component.shadowRoot?.querySelector('button');
  expect(button?.textContent?.trim()).to.equal('Two');
});
