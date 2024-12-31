/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';
import hover from './library/hover.js';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('is selected when programmatically selected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  component.selected = true;
  await elementUpdated(component);

  expect(component.ariaSelected).to.equal('true');
});

it('has a tooltip when active and with a long label', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label=${'x'.repeat(500)}
      value="value"
    ></glide-core-dropdown-option>`,
  );

  component.privateIsTooltipOpen = true;

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.true;
});

it('has no tooltip when active and with a short label', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  component.privateActive = true;

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.false;
});

it('has a tooltip when active and with a long label set programmatically', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
    ></glide-core-dropdown-option>`,
  );

  component.privateIsTooltipOpen = true;

  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  component.label = 'x'.repeat(500);

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.true;
});

it('has no tooltip when active and with a short label set programmatically', async () => {
  // The "x" is arbitrary. 500 of them ensures the component is wider
  // than the viewport even if the viewport's width is increased.
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label=${'x'.repeat(500)}
      value="value"
    ></glide-core-dropdown-option>`,
  );

  component.privateActive = true;
  component.label = 'Label';

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.false;
});

it('sets `privateIsEditActive`', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      editable
    ></glide-core-dropdown-option>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="edit-button"]',
  );

  await hover(button);
  expect(component.privateIsEditActive).to.be.true;

  await hover(button, 'outside');
  expect(component.privateIsEditActive).to.be.false;
});
