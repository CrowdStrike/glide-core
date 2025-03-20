import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import type GlideCoreDropdownOption from './dropdown.option.js';

it('is accessible ', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await expect(host).to.be.accessible();
});

it('has a selected option label when an option is initially selected', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
});

it('sets its internal `label` to the last initially selected option', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
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

  const label = host.shadowRoot?.querySelector('[data-test="internal-label"]');

  expect(label?.textContent?.trim()).to.equal('Two');
});

it('sets `value` to that of the last initially selected option', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  expect(host.value).to.deep.equal(['three']);
});

it('hides Select All', async () => {
  const host = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label">
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

  const selectAll = host.shadowRoot?.querySelector<GlideCoreDropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.checkVisibility()).to.not.be.ok;
});

it('has an icon when an option with a value is selected', async () => {
  const host = await fixture(
    html`<glide-core-dropdown label="Label">
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>

      <glide-core-dropdown-option label="One" value="one" selected>
        <div slot="icon">✓</div>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two" value="two">
        <div slot="icon">✓</div>
      </glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const iconSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot instanceof HTMLSlotElement).to.be.true;
  expect(iconSlot?.assignedElements().at(0)?.slot).to.equal('icon:one');
});

it('has no icon when an option without a value is selected', async () => {
  const host = await fixture(
    html`<glide-core-dropdown label="Label">
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>

      <glide-core-dropdown-option label="One" selected>
        <div slot="icon">✓</div>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two" value="two">
        <div slot="icon">✓</div>
      </glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const iconSlot = host.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});

it('has no icon when no option is selected', async () => {
  const host = await fixture(
    html`<glide-core-dropdown label="Label">
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>

      <glide-core-dropdown-option label="One" value="one">
        <div slot="icon">✓</div>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two" value="two">
        <div slot="icon">✓</div>
      </glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const iconSlot = host.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});

it('only shows the last selected option as selected when multiple are selected initially', async () => {
  const host = await fixture(
    html`<glide-core-dropdown label="Label" open>
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

  // Wait for Floating UI.
  await aTimeout(0);

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(
    options[0]?.shadowRoot
      ?.querySelector('[data-test="checked-icon-container"] svg')
      ?.checkVisibility(),
  ).to.not.be.ok;

  expect(
    options[1]?.shadowRoot
      ?.querySelector('[data-test="checked-icon-container"] svg')
      ?.checkVisibility(),
  ).to.be.true;
});
