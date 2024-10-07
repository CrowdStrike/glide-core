/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import type GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';

it('is accessible', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await expect(component).to.be.accessible();
});

it('sets `value` to that of the initially selected options', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open multiple>
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

  expect(component.value).to.deep.equal(['two', 'three']);
});

it('has selected option labels when options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Two,');
});

it('has a tag when an option is initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  const tag = component.shadowRoot?.querySelector('[data-test="tag"]');

  expect(tag?.checkVisibility()).to.be.true;
  expect(tag?.textContent?.trim()).to.equal('One');
});

it('hides tags to prevent overflow', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      style="display: block; max-width: 20rem;"
    >
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Four"
        value="four"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for the Resize Observer to do its thing.
  await aTimeout(0);

  const tagContainers = [
    ...(component.shadowRoot?.querySelectorAll<HTMLElement>(
      '[data-test="tag-container"]',
    ) ?? []),
  ].filter((element) => element.checkVisibility());

  expect(tagContainers?.length).to.equal(2);
});

it('shows Select All', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
      open
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

  // Wait for it to open.
  await aTimeout(0);

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.checkVisibility()).to.be.true;
});

it('sets Select All as selected when all options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
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
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.selected).to.be.true;
});

it('sets Select All as deselected when no options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
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

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.selected).to.be.false;
});

it('sets Select All as indeterminate when not all options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
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

  expect(selectAll?.privateIndeterminate).to.be.true;
});

it('does not set Select All as indeterminate when no options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
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

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('does not set Select All as indeterminate when all options are initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
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
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('sets its internal label to `placeholder` when no option is initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.textContent?.trim()).to.equal('Placeholder');
});

it('has no internal label when an option is initially selected', async () => {
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

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label).to.not.exist;
});

it('has a "multiselect" icon for each selected option with a value', async () => {
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  const icons = component.shadowRoot?.querySelectorAll(
    '[data-test="multiselect-icon-slot"]',
  );

  expect(icons?.length).to.equal(2);
});

it('has no "multiselect" icons', async () => {
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  const icons = component.shadowRoot?.querySelectorAll(
    '[data-test="multiselect-icon-slot"]',
  );

  expect(icons?.length).to.equal(0);
});

it('has no "single-select" icon', async () => {
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  const iconSlot = component.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});
