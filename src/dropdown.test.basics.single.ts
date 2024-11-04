/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import type GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';

it('is accessible ', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await expect(component).to.be.accessible();
});

it('has a selected option label when an option is initially selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
});

it('sets its internal `label` to the last initially selected option', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
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

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.textContent?.trim()).to.equal('Two');
});

it('sets `value` to that of the last initially selected option', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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

  expect(component.value).to.deep.equal(['three']);
});

it('hides Select All', async () => {
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

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.checkVisibility()).to.not.be.ok;
});

it('has an icon when an option with a value is selected', async () => {
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
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

  const iconSlot = component.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot instanceof HTMLSlotElement).to.be.true;
  expect(iconSlot?.assignedElements().at(0)?.slot).to.equal('icon:one');
});

it('has no icon when an option without a value is selected', async () => {
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
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

  const iconSlot = component.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});

it('has no icon when no option is selected', async () => {
  const component = await fixture(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
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

  const iconSlot = component.shadowRoot?.querySelector(
    '[data-test="single-select-icon-slot"]',
  );

  expect(iconSlot).to.be.null;
});
