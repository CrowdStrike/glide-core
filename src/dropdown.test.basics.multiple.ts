import './dropdown.option.js';
import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import Dropdown from './dropdown.js';
import Tag from './tag.js';
import type DropdownOption from './dropdown.option.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('is accessible', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        editable
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tag = host.shadowRoot
    ?.querySelector('[data-test="tag"]')
    ?.shadowRoot?.querySelector<HTMLElement>('[data-test="component"]');

  const timeout = tag?.dataset.animationDuration;
  assert(timeout);

  // Tag animates its opacity when added to the page. We wait for the animation
  // to complete to avoid a color contrast violation.
  await aTimeout(Number(timeout));

  await expect(host).to.be.accessible();
});

it('can have selected options', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
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

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.false;
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Two,');
  expect(host.value).to.deep.equal(['one', 'two']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('One');
  expect(tags?.[1]?.label).to.equal('Two');
});

it('shows Select All', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.checkVisibility()).to.be.true;
});

it('sets Select All as selected when all options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all>
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

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.selected).to.be.true;
});

it('sets Select All as deselected when no options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.selected).to.be.false;
});

it('sets Select All as indeterminate when not all options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.privateIndeterminate).to.be.true;
});

it('does not set Select All as indeterminate when no options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('does not set Select All as indeterminate when all options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all>
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

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('does not set Select All as selected when no options are provided', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable> </glide-core-dropdown>`,
  );

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.selected).to.be.false;
});

it('sets its internal label to `placeholder` when no option is selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(internalLabel?.textContent?.trim()).to.equal('Placeholder');
});

it('has no internal label when an option is selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(internalLabel?.checkVisibility()).to.not.be.ok;
});

it('has a "multiselect" icon for each selected option with a value', async () => {
  const host = await fixture(
    html`<glide-core-dropdown label="Label" multiple>
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>
      <div slot="icon:three">✓</div>

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

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const icons = host.shadowRoot?.querySelectorAll(
    '[data-test="multiselect-icon-slot"]',
  );

  expect(icons?.length).to.equal(2);
});

it('has no "multiselect" icons when no options are selected', async () => {
  const host = await fixture(
    html`<glide-core-dropdown label="Label" multiple>
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>

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

  const icons = host.shadowRoot?.querySelectorAll(
    '[data-test="multiselect-icon-slot"]',
  );

  expect(icons?.length).to.equal(0);
});

it('has no "single-select" icon', async () => {
  const host = await fixture(
    html`<glide-core-dropdown label="Label" multiple>
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

  const iconSlot = host.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});

it('does not include in its `value` disabled options that are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
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

  expect(host.value).to.deep.equal([]);
});

it('only selects the first option with a matching value when multiple options have the same value and `value` is set', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple .value=${['one']}>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
  expect(tags?.length).to.equal(1);
  expect(tags?.[0]?.label).to.equal('One');
});

it('selects multiple options with the same value when `value` is set', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple .value=${['one', 'one']}>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
});
