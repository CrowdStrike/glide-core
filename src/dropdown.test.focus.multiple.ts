import './dropdown.option.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import type GlideCoreTag from './tag.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('focuses the button when `focus` is called', async () => {
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

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="button"]'),
  );
});

it('focuses the button on submit when required and no options are selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      required
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
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  expect(component.shadowRoot?.activeElement).to.be.equal(button);
});

it('focuses the button when `reportValidity` is called when required and no options are selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      required
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
    { parentNode: form },
  );

  component.reportValidity();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('does not focus the button when `checkValidity` is called', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      required
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
    { parentNode: form },
  );

  component.checkValidity();
  expect(component.shadowRoot?.activeElement).to.equal(null);
});

it('focuses the second tag when the first one is removed', async () => {
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags =
    component.shadowRoot?.querySelectorAll<GlideCoreTag>('[data-test="tag"]');

  tags?.[0].click();
  await elementUpdated(component);

  expect(component.shadowRoot?.activeElement).to.equal(tags?.[1]);
});

it('focuses the third tag when the second one is removed', async () => {
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags =
    component.shadowRoot?.querySelectorAll<GlideCoreTag>('[data-test="tag"]');

  tags?.[1].click();
  await elementUpdated(component);

  expect(component.shadowRoot?.activeElement).to.equal(tags?.[2]);
});

it('focuses the second tag when the last one removed', async () => {
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags =
    component.shadowRoot?.querySelectorAll<GlideCoreTag>('[data-test="tag"]');

  tags?.[2].click();
  await elementUpdated(component);

  expect(component.shadowRoot?.activeElement).to.equal(tags?.[1]);
});
