import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
  waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { click, hover } from './library/mouse.js';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';
import './tag.js';
import './tooltip.js';

it('opens on click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('closes on click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.not.be.ok;
});

it('does not close on click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('filters', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(1);
});

it('unfilters when an option is selected via click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  [...host.querySelectorAll('glide-core-dropdown-option')]
    .find(({ hidden }) => !hidden)
    ?.click();

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('unfilters when an option is selected via Enter', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });
  await sendKeys({ press: 'Enter' });

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('unfilters on Backspace', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.focus();
  await sendKeys({ type: 'one' });
  await sendKeys({ press: 'Backspace' });
  await sendKeys({ press: 'Backspace' });
  await sendKeys({ press: 'Backspace' });

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('does nothing on Enter when every option is filtered out', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'blah' });
  await sendKeys({ press: 'Enter' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const hiddenOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => hidden);

  const selectedOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ selected }) => selected);

  expect(input?.value).to.equal('blah');
  expect(hiddenOptions.length).to.equal(2);
  expect(selectedOptions.length).to.equal(0);
});

it('shows its magnifying glass icon when single-select and filtering', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const icon = host?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.true;
});

it('hides its magnifying glass icon when single-select and not filtering', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'o' });
  await sendKeys({ press: 'Backspace' });

  const icon = host?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('hides its magnifying glass icon when single-select and the filter is the label of its selected option', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = [...host.querySelectorAll('glide-core-dropdown-option')].find(
    ({ hidden }) => !hidden,
  );

  await click(option);
  await sendKeys({ type: 'One' });

  const icon = host?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('hides its magnifying glass icon when single-select and an option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const option = [...host.querySelectorAll('glide-core-dropdown-option')].find(
    ({ hidden }) => !hidden,
  );

  option?.click();

  const icon = host?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  await host.updateComplete;
  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('hides its magnifying glass icon when single-select and closed programmatically and an option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.selected = true;
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'two' });

  const icon = host?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  host.open = false;
  await host.updateComplete;

  expect(icon?.checkVisibility()).to.not.be.ok;
});

it('shows its magnifying glass icon when multiselect and filtering', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const icon = host?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.true;
});

it('hides its magnifying glass icon when multiselect and not filtering', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });

  await sendKeys({ type: 'o' });
  await sendKeys({ press: 'Backspace' });

  const icon = host?.shadowRoot?.querySelector(
    '[data-test="magnifying-glass-icon"]',
  );

  expect(icon?.checkVisibility()).to.be.not.ok;
});

it('clears its filter on close when single-select and no option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ type: 'o' });
  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('');
});

it('clears its filter on close when multiselect and no option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ type: 'o' });
  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('');
});

it('clears its filter on close when multiselect and an option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ type: 'o' });
  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('');
});

it('does not clear its filter when a tag is removed via Backspace', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' }); // Focus the tag.
  await sendKeys({ press: 'Tab' }); // Focus the input.
  await sendKeys({ type: 'o' });
  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Backspace' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('o');
});

it('does not clear its filter when every tag is removed via Meta + Backspace', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  await sendKeys({ press: 'Tab' }); // Focus the tag.
  await sendKeys({ press: 'Tab' }); // Focus the input.

  await sendKeys({ type: 'o' });
  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'Backspace' });
  await sendKeys({ up: 'Meta' });

  expect(input?.value).to.equal('o');
});

it('does not filter on only whitespace', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: ' ' });

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('hides the options when all of them are filtered out', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'fifty' });

  // Wait for it to close.
  await aTimeout(0);

  const options = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="options"]',
  );

  expect(options?.checkVisibility()).to.be.false;
});

it('hides Select All when filtering', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const selectAll = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.checkVisibility()).to.not.be.ok;
});

it('unhides every option after filtering when one is selected and Dropdown is reopened', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'two' });
  await sendKeys({ press: 'Tab' });

  host.open = true;

  // Wait for Floating UI.
  await aTimeout(0);

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('sets the first unfiltered option as active when the previously active option is filtered out', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'two' });

  const option = [...host.querySelectorAll('glide-core-dropdown-option')].find(
    ({ hidden }) => !hidden,
  );

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(option?.privateActive).to.be.true;
  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('updates its input field when the `label` of its selected option is set programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.label = 'Three';
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('Three');
});

it('updates its `value` when the `value` of an option is set programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'two';

  expect(host.value).to.deep.equal(['two']);
});

it('updates its input field when made filterable', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.filterable = true;
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  // Wait for the `filterable` setter to do its thing.
  await aTimeout(0);

  expect(input?.value).to.equal('One');
});

it('clears its input field when `multiple` is set programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.multiple = true;
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('');
});

it('does not select options on Space', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: ' ' });

  expect(options[0]?.selected).to.be.false;
});

it('deselects the last selected option on Backspace', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await sendKeys({ press: 'Tab' });
  await click(options[0]);
  await click(options[1]);

  host.shadowRoot
    ?.querySelector<HTMLInputElement>('[data-test="input"]')
    ?.setSelectionRange(0, 0);

  await sendKeys({ press: 'Backspace' });
  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;

  await sendKeys({ press: 'Backspace' });
  expect(options[0]?.selected).to.be.false;
});

it('deselects all options on Meta + Backspace', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await sendKeys({ press: 'Tab' });
  await click(options[0]);
  await click(options[1]);

  host.shadowRoot
    ?.querySelector<HTMLInputElement>('[data-test="input"]')
    ?.setSelectionRange(0, 0);

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'Backspace' });
  await sendKeys({ up: 'Meta' });

  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.selected).to.be.false;
});

it('sets its input field to the `label` of its selected option when not `multiple`', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host?.querySelector('glide-core-dropdown-option');
  option?.click();

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal(option?.label);
});

it('clears its input field when single-select and `value` is emptied programmatically', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.value = [];

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('clears the `value` of its `<input>` when single-select and its selected option is removed', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.querySelector('glide-core-dropdown-option')?.remove();

  // Wait for `#onDefaultSlotChange()`.
  await aTimeout(0);

  // Now wait for the forced update in `#onDefaultSlotChange()`.
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('clears its input field when multiselect and an option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const option = host?.querySelector('glide-core-dropdown-option');
  option?.click();

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('does not clear its filter when a tag is removed', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' }); // Focus the tag.
  await sendKeys({ press: 'Tab' }); // Focus the input.
  await sendKeys({ type: 'o' });

  await click(
    host.shadowRoot
      ?.querySelector('[data-test="tag"]')
      ?.shadowRoot?.querySelector('[data-test="removal-button"]'),
  );

  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('o');
});

it('uses `placeholder` as a placeholder when multiselect and no option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host?.querySelector('glide-core-dropdown-option')?.click();

  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.placeholder).to.equal('Placeholder');
});

it('sets `aria-activedescendant` on option hover', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.querySelectorAll('glide-core-dropdown-option');
  const input = host.shadowRoot?.querySelector('[data-test="input"]');

  await hover(options[1]);

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[1]?.id);
});

it('sets `aria-activedescendant` on ArrowDown', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[1]?.id);
});

it('sets `aria-activedescendant` on ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = host.querySelector(
    'glide-core-dropdown-option:nth-of-type(2)',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Home' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = host.querySelector('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'PageUp' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = host.querySelector('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on Meta + ArrowUp', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = host.querySelector('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on open via click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = host.querySelector('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on open via Space', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const option = host.querySelector('glide-core-dropdown-option');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(option?.id);
});

it('sets `aria-activedescendant` on End', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  // Made into an array because the linter forces `at(-1)` instead of
  // `[options.length - 1]` but doesn't take into account that `options`
  // isn't an actual array and doesn't have an `at()` method.
  const options = [...host.querySelectorAll('glide-core-dropdown-option')];

  await sendKeys({ press: 'End' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    options.at(-1)?.id,
  );
});

it('sets `aria-activedescendant` on PageDown', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  // Made into an array because the linter forces `at(-1)` instead of
  // `[options.length - 1]` but doesn't take into account that `options`
  // isn't an actual array and doesn't have an `at()` method.
  const options = [...host.querySelectorAll('glide-core-dropdown-option')];

  await sendKeys({ press: 'PageDown' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    options.at(-1)?.id,
  );
});

it('sets `aria-activedescendant` on Meta + ArrowDown', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await sendKeys({ press: 'Tab' });

  // Spread into an array because the linter forces `at(-1)` instead of
  // `[options.length - 1]` but doesn't take into account that `options`
  // isn't an actual array and doesn't have an `at()` method.
  const options = [...host.querySelectorAll('glide-core-dropdown-option')];

  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    options.at(-1)?.id,
  );
});

it('sets `aria-activedescendant` when closed via click', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.shadowRoot
    ?.querySelector<HTMLButtonElement>('[data-test="primary-button"]')
    ?.click();

  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets `aria-activedescendant` when closed because it lost focus', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets `aria-activedescendant` when closed because something outside of it was clicked', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets `aria-activedescendant` when closed via Escape', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('cannot be tabbed to when disabled', async () => {
  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple disabled>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);
});

it('sets its input field back to the `label` of the selected option when something outside the host is clicked', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.selected = true;

  // Now type something other than "One" so we can check that it's reverted
  // back to "One" when something else is clicked.
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'o' });

  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('One');
});

it('selects the filter text when `click()` is called', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.click();

  expect(window.getSelection()?.toString()).to.equal('One');
});

it('clicks the `<input>` when `click()` is called', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="input"]');
  assert(button);

  setTimeout(() => {
    host.click();
  });

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('has no icon when filtering and an option is selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>

      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const iconSlot = host.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});

it('supports custom filtering', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.filter = async (filter) => {
    const options = [...host.querySelectorAll('glide-core-dropdown-option')];

    return options.filter(({ label }) => label?.includes(filter));
  };

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'O' });

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(1);
  expect(options[0]?.label).to.equal('One');
});

it('does nothing when filtering fails', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.filter = () => {
    return Promise.reject();
  };

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'O' });

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('updates its item count after filtering', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const itemCount = host.shadowRoot?.querySelector('[data-test="item-count"]');

  expect(itemCount?.ariaLabel).to.equal('1 items');
});

it('shows an ellipsis when the label of its selected option overflows', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.selected = true;
  await host.updateComplete;

  const ellipsis = host.shadowRoot?.querySelector('[data-test="ellipsis"]');

  expect(ellipsis?.checkVisibility()).to.be.true;
});

it('shows an ellipsis when the label of its selected option is set programmatically and overflows', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  option.label = 'x'.repeat(500);
  await host.updateComplete;

  // Wait for the resize observer to do its thing.
  await aTimeout(0);

  const ellipsis = host.shadowRoot?.querySelector('[data-test="ellipsis"]');
  expect(ellipsis?.checkVisibility()).to.be.true;
});

it('shows an ellipsis when made filterable programmatically and the label of its selected option overflows', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.filterable = true;

  await waitUntil(() => {
    return host.shadowRoot
      ?.querySelector('[data-test="input"]')
      ?.checkVisibility();
  });

  // Wait for the resize observer to do its thing.
  await aTimeout(0);

  const ellipsis = host.shadowRoot?.querySelector('[data-test="ellipsis"]');

  expect(ellipsis?.checkVisibility()).to.be.true;
});

it('does not allow its "toggle" event to propagate', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const tooltip = host.shadowRoot
    ?.querySelector('[data-test="input-tooltip"]')
    ?.shadowRoot?.querySelector<HTMLElement>('[data-test="tooltip"]');

  assert(tooltip);
  tooltip.dataset.openDelay = '0';

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  await hover(host.shadowRoot?.querySelector('[data-test="input"]'));

  expect(spy.callCount).to.equal(0);
});
