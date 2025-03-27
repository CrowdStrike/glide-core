import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { hover } from './library/mouse.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import GlideCoreTooltip from './tooltip.js';

it('is selected when programmatically selected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  host.selected = true;
  await host.updateComplete;

  expect(host.ariaSelected).to.equal('true');
});

it('has a tooltip when active and with a long label', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label=${'x'.repeat(500)}
    ></glide-core-dropdown-option>`,
  );

  host.privateIsTooltipOpen = true;

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = host.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.true;
});

it('has no tooltip when active with a short label', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  host.privateActive = true;

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = host.shadowRoot?.querySelector<GlideCoreTooltip>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.open).to.be.false;
});

it('has a tooltip when active with a long label set programmatically', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  host.privateIsTooltipOpen = true;

  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  host.label = 'x'.repeat(500);

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = host.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.true;
});

it('has no tooltip when active and with a short label set programmatically', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label=${'x'.repeat(500)}
    ></glide-core-dropdown-option>`,
  );

  host.privateActive = true;
  host.label = 'Label';

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = host.shadowRoot?.querySelector<GlideCoreTooltip>(
    '[data-test="tooltip"]',
  );

  expect(tooltip?.open).to.be.false;
});

it('sets `aria-selected` when selected programmatically', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  host.selected = true;
  expect(host.ariaSelected).to.equal('true');
});

it('sets `aria-selected` when deselected programmatically', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  host.selected = false;
  expect(host.ariaSelected).to.equal('false');
});

it('sets `aria-selected` when disabled programmatically', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  host.disabled = true;
  expect(host.ariaSelected).to.equal('false');
});

it('sets `aria-selected` when enabled programmatically', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      disabled
      selected
    ></glide-core-dropdown-option>`,
  );

  host.disabled = false;
  expect(host.ariaSelected).to.equal('true');
});

it('sets `privateIsEditActive`', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      editable
    ></glide-core-dropdown-option>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="edit-button"]');

  await hover(button);
  expect(host.privateIsEditActive).to.be.true;

  await hover(button, 'outside');
  expect(host.privateIsEditActive).to.be.false;
});

it('appears checked when programmatically enabled', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      disabled
      selected
    ></glide-core-dropdown-option>`,
  );

  host.disabled = false;
  await host.updateComplete;

  const checkmark = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(checkmark?.checkVisibility()).to.be.true;
});

it('appears unchecked when programmatically disabled', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      selected
    ></glide-core-dropdown-option>`,
  );

  host.disabled = true;
  await host.updateComplete;

  const checkmark = host.shadowRoot?.querySelector(
    '[data-test="checked-icon-container"] svg',
  );

  expect(checkmark?.checkVisibility()).to.not.be.ok;
});
