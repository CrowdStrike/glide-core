import './dropdown.option.js';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import type GlideCoreTag from './tag.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('focuses the primary button when `focus()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="primary-button"]'),
  );
});

it('focuses the primary button on submit when required and no options are selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      required
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  expect(component.shadowRoot?.activeElement).to.be.equal(button);
});

it('focuses the primary button when `reportValidity` is called when required and no options are selected', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      required
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  component.reportValidity();

  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  expect(component.shadowRoot?.activeElement).to.equal(button);
});

it('does not focus the primary button when `checkValidity` is called', async () => {
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags =
    component.shadowRoot?.querySelectorAll<GlideCoreTag>('[data-test="tag"]');

  tags?.[0].click();
  await elementUpdated(component);

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

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
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags =
    component.shadowRoot?.querySelectorAll<GlideCoreTag>('[data-test="tag"]');

  tags?.[1].click();
  await elementUpdated(component);

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

  expect(component.shadowRoot?.activeElement).to.equal(tags?.[2]);
});

it('focuses the second tag when the third tag removed', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags =
    component.shadowRoot?.querySelectorAll<GlideCoreTag>('[data-test="tag"]');

  tags?.[2].click();
  await elementUpdated(component);

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

  expect(component.shadowRoot?.activeElement).to.equal(tags?.[1]);
});

it('focuses itself when the last tag is removed', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<GlideCoreTag>('[data-test="tag"]')
    ?.click();

  await elementUpdated(component);

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

  expect(document.activeElement).to.equal(component);
});
