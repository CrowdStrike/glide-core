/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';

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
  // The period is arbitrary. 500 of them ensures we exceed the maximum
  // width even if it's increased.
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label=${'.'.repeat(500)}
      value="value"
    ></glide-core-dropdown-option>`,
  );

  component.privateisOpenTooltip = true;

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

  component.privateisOpenTooltip = true;

  // The period is arbitrary. 500 of them ensures we exceed the maximum
  // width even if it's increased.
  component.label = '.'.repeat(500);

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector('[data-test="tooltip"]');
  expect(tooltip?.checkVisibility()).to.be.true;
});

it('has no tooltip when active and with a short label set programmatically', async () => {
  // The period is arbitrary. 500 of them ensures we exceed the maximum
  // width even if it's increased.
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label=${'.'.repeat(500)}
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
