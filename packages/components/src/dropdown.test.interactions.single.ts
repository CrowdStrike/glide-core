import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('opens on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  expect(component.open).to.be.true;
});

it('toggles open and closed when the button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  expect(component.open).to.be.false;
});

it('does not toggle open and closed when the button overflow text is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="tag-overflow-text"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  expect(component.open).to.be.true;
});

it('selects an option on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  option?.click();

  expect(option?.selected).to.be.true;
});

it('deactivates all other options on "mouseover"', async () => {
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
  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('closes when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.querySelector('glide-core-dropdown-option')?.click();

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');

  option?.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.false;
});

it('deselects all other options when one is newly selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new Event('click'));

  const options = component.querySelectorAll('glide-core-dropdown-option');
  options[1].click();

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(options[2].selected).to.be.false;
});

it('updates `value` when an option `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'two';

  expect(component.value).to.deep.equal(['two']);
});

it('updates `value` when an option is selected via click', async () => {
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

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1].click();
  expect(component.value).to.deep.equal(['two']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  // Wait for it to open.
  await elementUpdated(component);

  options[1].click();
  expect(component.value).to.deep.equal(['two']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { detail: 1 }));

  // Wait for it to open.
  await elementUpdated(component);

  options[2].click();
  expect(component.value).to.deep.equal([]);
});

it('updates `value` when an option is selected via Enter', async () => {
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

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].focus();
  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal(['one']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await elementUpdated(component);

  options[1].focus();
  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal(['two']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await elementUpdated(component);

  options[2].focus();
  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal([]);
});

it('updates `value` when an option is selected via Space', async () => {
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

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].focus();
  await sendKeys({ press: ' ' });
  expect(component.value).to.deep.equal(['one']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await elementUpdated(component);

  options[1].focus();
  await sendKeys({ press: ' ' });

  expect(component.value).to.deep.equal(['two']);

  // Reopen it.
  component.shadowRoot
    ?.querySelector('[data-test="button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await elementUpdated(component);

  options[2].focus();
  await sendKeys({ press: ' ' });

  expect(component.value).to.deep.equal([]);
});

it('updates `value` when `multiple` is changed to `false` programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.multiple = false;

  const options = component.querySelectorAll('glide-core-dropdown-option');

  const checkbox = options[1].shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(checkbox?.checked).to.be.true;
  expect(component.value).to.deep.equal(['two']);
});

it('updates `value` when the `value` of the selected option is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'three';

  expect(component.value).to.deep.equal(['three']);
});

it('updates `value` when the `value` of the selected option is removed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = '';

  expect(component.value).to.deep.equal([]);
});

it('updates the its internal label when an option is newly selected', async () => {
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

  component
    .querySelector<GlideCoreDropdownOption>(
      'glide-core-dropdown-option:last-of-type',
    )
    ?.click();

  await elementUpdated(component);

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.textContent?.trim()).to.equal('Two');
});

it('hides Select All', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      select-all
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

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.checkVisibility()).to.not.be.ok;
});

it('does not select an option on Enter when the option is not focused', async () => {
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

  const option = component.querySelector('glide-core-dropdown-option');
  option?.focus();

  await sendKeys({ down: 'Tab' });
  await sendKeys({ down: 'Shift' });
  await sendKeys({ up: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(option?.selected).to.be.false;
});

it('does not select an option on Space when the option is not focused', async () => {
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

  const option = component.querySelector('glide-core-dropdown-option');
  option?.focus();

  await sendKeys({ down: 'Tab' });
  await sendKeys({ down: 'Shift' });
  await sendKeys({ up: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(option?.selected).to.be.false;
});
