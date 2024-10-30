/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  aTimeout,
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
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

it('opens on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="input"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await aTimeout(0);

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('filters', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });

  const options = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(1);
});

it('unfilters when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ type: 'one' });

  [...component.querySelectorAll('glide-core-dropdown-option')]
    .find(({ hidden }) => !hidden)
    ?.click();

  const options = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(11);
});

it('unfilters when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });
  await sendKeys({ press: 'Enter' });

  const options = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(11);
});

it('does nothing on Enter when every option is filtered out', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'blah' });
  await sendKeys({ press: 'Enter' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const hiddenOptions = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => hidden);

  const selectedOptions = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ selected }) => selected);

  expect(input?.value).to.equal('blah');
  expect(hiddenOptions.length).to.equal(11);
  expect(selectedOptions.length).to.equal(0);
});

it('shows its magnifying glass icon when single-select and filtering', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });

  const icon = component?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.true;
});

it('hides its magnifying glass icon when single-select and not filtering', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'o' });
  await sendKeys({ press: 'Backspace' });

  const icon = component?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('hides its magnifying glass icon when single-select and the filter is label of the selected option', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const option = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].find(({ hidden }) => !hidden);

  option?.click();

  component.focus();
  await sendKeys({ type: 'One' });

  const icon = component?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('hides its magnifying glass icon when single-select and an option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ type: 'one' });

  const option = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].find(({ hidden }) => !hidden);

  option?.click();

  const icon = component?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  await elementUpdated(component);
  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('hides its magnifying glass icon when single-select and closed programmatically and an option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.selected = true;
  component.focus();
  await sendKeys({ type: 'two' });

  const icon = component?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  component.open = false;
  await elementUpdated(component);

  expect(icon?.checkVisibility()).to.not.be.ok;
});

it('shows its magnifying glass icon when multiselect and filtering', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });

  const icon = component?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.true;
});

it('hides its magnifying glass icon when multiselect and not filtering', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'o' });
  await sendKeys({ press: 'Backspace' });

  const icon = component?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('does not filter on only whitespace', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: ' ' });

  const options = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(11);
});

it('hides the options when all of them are filtered out', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ type: 'fifty' });

  // Wait for it to close.
  await aTimeout(0);

  const options = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="options"]',
  );

  expect(options?.checkVisibility()).to.be.false;
});

it('hides Select All when filtering', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });

  const selectAll = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.checkVisibility()).to.not.be.ok;
});

it('sets the first unfiltered option as active when the previously active option is filtered out', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'two' });

  const option = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].find(({ hidden }) => !hidden);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(option?.privateActive).to.be.true;
  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('updates the `value` of its `<input>` when `label` of a selected option is changed programmatically', async () => {
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

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.label = 'Three';
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('Three');
});

it('updates `value` when an option `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'two';

  expect(component.value).to.deep.equal(['two']);
});

it('sets the `value` of its `<input>` when made filterable', async () => {
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
    </glide-core-dropdown>`,
  );

  component.filterable = true;

  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  // Wait for the `filterable` setter to do its thing.
  await aTimeout(0);

  expect(input?.value).to.equal('One');
});

it('does not select options on Space', async () => {
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

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: ' ' });

  expect(options[0]?.selected).to.be.false;
});

it('deselects the last selected option on Backspace', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].selected = true;
  options[1].selected = true;

  await elementUpdated(component);

  component.focus();

  component.shadowRoot
    ?.querySelector<HTMLInputElement>('[data-test="input"]')
    ?.setSelectionRange(0, 0);

  await aTimeout(0);
  await sendKeys({ press: 'Backspace' });

  expect(options[1].selected).to.be.false;
  expect(options[0].selected).to.be.true;

  await sendKeys({ press: 'Backspace' });

  expect(options[0].selected).to.be.false;
});

it('deselects all options on Meta + Backspace', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].selected = true;
  options[1].selected = true;

  await elementUpdated(component);

  component.focus();

  component.shadowRoot
    ?.querySelector<HTMLInputElement>('[data-test="input"]')
    ?.setSelectionRange(0, 0);

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'Backspace' });
  await sendKeys({ up: 'Meta' });

  expect(options[1].selected).to.be.false;
  expect(options[0].selected).to.be.false;
});

it('sets the `value` of its `<input>` to the label of the selected option when not `multiple`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const option = component?.querySelector('glide-core-dropdown-option');
  option?.click();

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal(option?.label);
});

it('clears the `value` of its `<input>` when multiselect and an option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });

  const option = component?.querySelector('glide-core-dropdown-option');
  option?.click();

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('uses `placeholder` as a placeholder when multiselect and no option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component?.querySelector('glide-core-dropdown-option')?.click();

  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.placeholder).to.equal('Placeholder');
});

it('sets `aria-activedescendant` on option "mouseover"', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open> ${defaultSlot} </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');
  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[1].id);
});

it('sets `aria-activedescendant` on ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'ArrowDown' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[1].id);
});

it('sets `aria-activedescendant` on ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1]?.focus();

  await sendKeys({ press: 'ArrowUp' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('sets `aria-activedescendant` on Home', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  options[1].focus();
  await sendKeys({ press: 'Home' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('sets `aria-activedescendant` on PageUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1].focus();

  await sendKeys({ press: 'PageUp' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('sets `aria-activedescendant` on Meta + ArrowUp', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  const options = component.querySelectorAll('glide-core-dropdown-option');
  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[0].id);
});

it('sets `aria-activedescendant` on open via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
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

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = component.querySelector('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on open via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = component.querySelector('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on End', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  // Made into an array because the linter forces `at(-1)` instead of
  // `[options.length - 1]` but doesn't take into account that `options`
  // isn't an actual array and doesn't have an `at()` method.
  const options = [...component.querySelectorAll('glide-core-dropdown-option')];

  await sendKeys({ press: 'End' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    options.at(-1)?.id,
  );
});

it('sets `aria-activedescendant` on PageDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  // Made into an array because the linter forces `at(-1)` instead of
  // `[options.length - 1]` but doesn't take into account that `options`
  // isn't an actual array and doesn't have an `at()` method.
  const options = [...component.querySelectorAll('glide-core-dropdown-option')];

  await sendKeys({ press: 'PageDown' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    options.at(-1)?.id,
  );
});

it('sets `aria-activedescendant` on Meta + ArrowDown', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  // Spread into an array because the linter forces `at(-1)` instead of
  // `[options.length - 1]` but doesn't take into account that `options`
  // isn't an actual array and doesn't have an `at()` method.
  const options = [...component.querySelectorAll('glide-core-dropdown-option')];

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    options.at(-1)?.id,
  );
});

it('sets `aria-activedescendant` when closed via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="primary-button"]')
    ?.click();

  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal('');
});

it('sets `aria-activedescendant` when closed because it lost focus', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'Tab' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal('');
});

it('sets `aria-activedescendant` when closed because something outside of it was clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  document.body.click();
  await elementUpdated(component);

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal('');
});

it('sets `aria-activedescendant` when closed via Escape', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ press: 'Escape' });

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal('');
});

it('cannot be tabbed to when `disabled`', async () => {
  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      disabled
    >
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);
});

it('sets the `value` of its `<input>` back to the label of selected option when something other than it is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.selected = true;

  // Now type something other than "One" so we can check that it's reverted
  // back to "One" when something else is clicked.
  component.focus();
  await sendKeys({ type: 'o' });

  document.body.click();

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('One');
});

it('selects the filter text when `click()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });
  component.click();

  expect(window.getSelection()?.toString()).to.equal('one');
});

it('clicks the `<input>` when `click()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector('[data-test="input"]');
  assert(button);

  setTimeout(() => {
    component.click();
  });

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('has no icon when filtering and an option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>

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
  await sendKeys({ type: 'one' });

  const iconSlot = component.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});
