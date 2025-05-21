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
import Dropdown from './dropdown.js';
import './dropdown.option.js';
import type Tooltip from './tooltip.js';

it('opens on click', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.not.be.ok;
});

it('does not close on click when its input field is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.shadowRoot?.querySelector('[data-test="input"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('filters', async () => {
  const host = await fixture<Dropdown>(
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

it('remains automatically filterable when an option is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Five"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Six"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Seven"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Eight"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Nine"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Ten"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Eleven"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.querySelector('glide-core-dropdown-option:last-of-type')?.remove();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.checkVisibility()).to.be.true;
});

it('unfilters when an option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  await click(
    [...host.querySelectorAll('glide-core-dropdown-option')].find(
      ({ hidden }) => !hidden,
    ),
  );

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('unfilters when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
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
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

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
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'o' });
  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('clears its filter on close when multiselect and no option is selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'o' });
  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('clears its filter on close when multiselect and an option is selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'o' });
  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('does not clear its filter when a tag is removed via Backspace', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  await sendKeys({ press: 'Tab' }); // Focus the tag.
  await sendKeys({ press: 'Tab' }); // Focus the input field.
  await sendKeys({ type: 'o' });
  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'Backspace' });
  await sendKeys({ up: 'Meta' });

  expect(input?.value).to.equal('o');
});

it('does not filter on only whitespace', async () => {
  const host = await fixture<Dropdown>(
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

it('hides Select All when filtering', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'two' });
  await sendKeys({ press: 'Tab' });

  host.open = true;

  await aTimeout(0); // Wait for Floating UI

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('updates its input field when the `label` of its selected option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
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

it('does not update its input field when multiple options are selected and the `label` of a selected option that is not the last is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');
  assert(options[0]);

  options[0].label = 'Three';
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal(options[1]?.label);
});

it('updates its `value` when the `value` of an option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
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

it('clears its input field when multiselect is set programmatically', async () => {
  const host = await fixture<Dropdown>(
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

  expect(input?.value).to.be.empty.string;
});

it('does not select options on Space', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

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
  const host = await fixture<Dropdown>(
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

it('sets its input field to the `label` of its selected option when single-select`', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host?.querySelectorAll('glide-core-dropdown-option');

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  await aTimeout(0); // Wait for Floating UI
  await click(options[0]);

  expect(input?.value).to.equal(options[0]?.label);
});

it('clears its input field when single-select and `value` is emptied programmatically', async () => {
  const host = await fixture<Dropdown>(
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

it('clears its input field when single-select and its selected option is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.querySelector('glide-core-dropdown-option')?.remove();

  await aTimeout(0); // Wait for `#onDefaultSlotChange()`.
  await host.updateComplete; // Now wait for the forced update in `#onDefaultSlotChange()`.

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('clears its input field when multiselect and an option is selected via mouse', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host?.querySelectorAll('glide-core-dropdown-option');

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });
  await click(options[0]);

  expect(input?.value).to.be.empty.string;
});

it('clears its input field when multiselect and an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });
  await sendKeys({ press: 'Enter' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('does not clear its filter when a tag is removed', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await click(options[0]);
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.placeholder).to.equal('Placeholder');
});

it('sets an option as active on hover', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await hover(options[1]);

  const activeOptions = [...options].filter(
    ({ privateActive }) => privateActive,
  );

  const input = host.shadowRoot?.querySelector('[data-test="input"]');

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('Two');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on ArrowDown', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Two

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('Two');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on ArrowUp', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowUp' }); // One

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on Home', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Home' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on PageUp', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'PageUp' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on Meta + ArrowUp', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ up: 'Meta' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on open via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on open via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on End', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'End' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('Two');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on PageDown', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'PageDown' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('Two');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets an active option on Meta + ArrowDown', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ down: 'Meta' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ up: 'Meta' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('Two');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets no option as active when every option is filtered out', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'three' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(0);
  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets the previously active option as active when all options are filtered out', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="ABC"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="AB"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="A"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // AB
  await sendKeys({ press: 'ArrowDown' }); // A
  await sendKeys({ type: 'abd' });
  await sendKeys({ press: 'Backspace' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('AB');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets the previously active option as active when the active option is filtered out', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="ABC"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="AB"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="A"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // AB
  await sendKeys({ press: 'ArrowDown' }); // A
  await sendKeys({ type: 'b' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('AB');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets the first enabled option as active when the previously active option is filtered out', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option
        label="ABCDE"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="ABCD"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="ABC"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="AB"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="A"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' }); // ABC
  await sendKeys({ press: 'ArrowDown' }); // AB
  await sendKeys({ press: 'ArrowDown' }); // A
  await sendKeys({ type: 'abc' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('ABCD');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('sets no option as active when closed by clicking its primary button', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  await click(
    host.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="primary-button"]',
    ),
  );

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(0);
  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets no option as active when closed via Escape', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Escape' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(0);
  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets no option as active when closed because it lost focus', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(activeOptions.length).to.equal(0);
  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
});

it('sets no option as active when closed because something outside of it was clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(document.body);

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.getAttribute('aria-activedescendant')).to.be.empty.string;
  expect(activeOptions.length).to.equal(0);
});

it('cannot be tabbed to when disabled', async () => {
  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple disabled>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);
});

it('sets its input field back to the `label` of the selected option when something outside the host is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const option = host.querySelector('glide-core-dropdown-option');

  assert(option);
  option.selected = true;

  // Now we type something other than "One" so we can check that it's reverted
  // back to "One" when something else is clicked.
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'o' });

  await click(document.body);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('One');
});

it('sets its input field to the `label` of the selected option when `label` is an empty string', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label=""></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');
  await click(options[1]);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.be.empty.string;
});

it('selects its filter query when `click()` is called', async () => {
  const host = await fixture<Dropdown>(
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

it('clicks its input field when `click()` is called', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  assert(input);

  setTimeout(() => {
    host.click();
  });

  const event = await oneEvent(input, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('has no icon when filtering and an option is selected', async () => {
  const host = await fixture<Dropdown>(
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

it('supports a custom `filter()` method', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.filter = async (filter) => {
    return [...host.querySelectorAll('glide-core-dropdown-option')].filter(
      ({ label }) => label?.includes(filter),
    );
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.filter = () => {
    return Promise.reject();
  };

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ type: 'o' });

  const options = [...host.querySelectorAll('glide-core-dropdown-option')];

  const activeOptions = options.filter(({ privateActive }) => privateActive);
  const visibleOptions = options.filter(({ hidden }) => !hidden);

  expect(activeOptions.length).to.equal(1);
  expect(visibleOptions.length).to.equal(2);
  expect(options[0]?.privateActive).to.be.true;
});

it('has an item count on open', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host);

  const itemCount = host.shadowRoot?.querySelector('[data-test="item-count"]');
  expect(itemCount?.ariaLabel).to.equal('2 items');
});

it('updates its item count after filtering', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await sendKeys({ press: 'Enter' });

  const ellipsis = host.shadowRoot?.querySelector('[data-test="ellipsis"]');
  expect(ellipsis?.checkVisibility()).to.be.true;
});

it('shows an ellipsis when the label of its selected option is set programmatically and overflows', async () => {
  const host = await fixture<Dropdown>(
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
  const host = await fixture<Dropdown>(
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

  await waitUntil(() => {
    return host.shadowRoot
      ?.querySelector('[data-test="ellipsis"]')
      ?.checkVisibility();
  });

  const ellipsis = host.shadowRoot?.querySelector('[data-test="ellipsis"]');
  expect(ellipsis?.checkVisibility()).to.be.true;
});

it('hides its ellipsis when previously overflowing and an option with a shorter label is selected via click', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await aTimeout(0); // Wait for Floating UI
  await click(options[1]);

  await waitUntil(() => {
    return !host.shadowRoot
      ?.querySelector('[data-test="ellipsis"]')
      ?.checkVisibility();
  });

  const ellipsis = host.shadowRoot?.querySelector('[data-test="ellipsis"]');
  expect(ellipsis?.checkVisibility()).to.not.be.ok;
});

it('hides its ellipsis when previously overflowing and an option with a shorter label is selected via Enter', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Enter' });

  await waitUntil(() => {
    return !host.shadowRoot
      ?.querySelector('[data-test="ellipsis"]')
      ?.checkVisibility();
  });

  const ellipsis = host.shadowRoot?.querySelector('[data-test="ellipsis"]');
  expect(ellipsis?.checkVisibility()).to.not.be.ok;
});

it('does not show its input tooltip when an option is selected via click', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');

  const tooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="input-tooltip"]',
  );

  await click(host);
  await aTimeout(0); // Wait for Floating UI
  await click(option);
  await tooltip?.updateComplete;

  expect(tooltip?.open).to.be.false;
});

it('does not show its input tooltip when an option is selected via Enter', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="input-tooltip"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });
  await sendKeys({ press: 'Enter' });
  await tooltip?.updateComplete;

  expect(tooltip?.open).to.be.false;
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

  await aTimeout(0); // Wait for Floating UI

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

it('retains its filter query when multiselect and its default slot changes', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const option = document.createElement('glide-core-dropdown-option');
  option.label = 'Two';
  host.append(option);

  // Wait for `#onDefaultSlotChange()`.
  await aTimeout(0);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('one');
});

it('retains its filter query when single-select` and its default slot changes', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  const option = document.createElement('glide-core-dropdown-option');
  option.label = 'Two';
  host.append(option);

  // Wait for `#onDefaultSlotChange()`.
  await aTimeout(0);

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('one');
});

it('shows a fallback when every option has been hidden via filtering', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'two' });

  const feedback = host.shadowRoot?.querySelector(
    '[data-test="optionless-feedback"]',
  );

  const options = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="options"]',
  );

  expect(feedback?.checkVisibility()).to.be.true;
  expect(feedback?.textContent?.trim()).to.equal('No matching options');
  expect(options?.checkVisibility()).to.be.false;
});

it('shows a fallback when every option has been removed via filtering', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  host.filter = async () => {
    const options = host.querySelectorAll('glide-core-dropdown-option');

    for (const option of options) {
      option.remove();
    }
  };

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'two' });

  const feedback = host.shadowRoot?.querySelector(
    '[data-test="optionless-feedback"]',
  );

  const options = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="options"]',
  );

  expect(feedback?.checkVisibility()).to.be.true;
  expect(feedback?.textContent?.trim()).to.equal('No options available');
  expect(options?.checkVisibility()).to.be.false;
});

it('updates itself when multiple options are selected and the last selected option is disabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        value="x"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await click(host);
  await hover(options[1]);

  assert(options[1]);
  options[1].disabled = true;
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const inputTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="input-tooltip"]',
  );

  const activeOptions = [...options].filter(
    ({ privateActive }) => privateActive,
  );

  expect(host.value).to.deep.equal(['one']);
  expect(input?.value).to.equal('One');
  expect(input?.getAttribute('aria-activedescendant')).to.equal(options[0]?.id);
  expect(inputTooltip?.disabled).to.be.true;
  expect(activeOptions.length).to.equal(1);
  expect(options[0]?.privateActive).to.be.true;
});

it('updates itself when multiple options are selected and the last selected option is enabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        value="x"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        disabled
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);
  options[1].disabled = false;
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const inputTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="input-tooltip"]',
  );

  expect(input?.value).to.equal('Two');
  expect(inputTooltip?.disabled).to.be.true;
  expect(host.value).to.deep.equal(['two']);
});
