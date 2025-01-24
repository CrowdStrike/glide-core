import './dropdown.option.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';

it('is accessible', async () => {
  const component = await fixture<GlideCoreDropdown>(
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

  await expect(component).to.be.accessible({
    ignoredRules: [
      // Axe doesn't like that our item count element doesn't have a `role`. Yet
      // it does label `<input>` and is announced correctly, at least by VoiceOver.
      'aria-prohibited-attr',

      // Axe doesn't search within slots when determining whether an element
      // has an ID that matches `aria-activedescendant` exists.
      'aria-valid-attr-value',
    ],
  });
});

it('can be filterable', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.checkVisibility()).to.be.true;
});

it('is automatically filterable', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
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

  const input = component.shadowRoot?.querySelector('[data-test="input"]');
  expect(input?.checkVisibility()).to.be.true;
});

it('uses `placeholder` as a placeholder when not `multiple` and no option is selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const input = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.placeholder).to.equal('Placeholder');
});

it('sets the value of its input field when an option is initially selected', async () => {
  const component = await fixture(
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
