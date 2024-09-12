/* eslint-disable @typescript-eslint/no-unused-expressions */

import './dropdown.option.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';

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

it('is accessible', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  await expect(component).to.be.accessible({
    // Axe doesn't search within slots when determining whether an element
    // has an ID that matches `aria-activedescendant` exists.
    ignoredRules: ['aria-valid-attr-value'],
  });
});

it('is filterable', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.checkVisibility()).to.be.true;
});

it('uses `placeholder` as a placeholder when not `multiple` and no option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.placeholder).to.equal('Placeholder');
});

it('sets `value` of the `<input>` when an option is initially seleccted', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
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

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('One');
});
