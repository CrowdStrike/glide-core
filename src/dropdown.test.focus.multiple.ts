import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import './dropdown.option.js';
import { sendKeys } from '@web/test-runner-commands';
import Dropdown from './dropdown.js';
import type Tag from './tag.js';

it('focuses its primary button when `focus()` is called', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });

  expect(host.shadowRoot?.activeElement).to.equal(
    host.shadowRoot?.querySelector('[data-test="primary-button"]'),
  );
});

it('focuses its primary button on submit when required and no options are selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const button = host.shadowRoot?.querySelector('[data-test="primary-button"]');

  expect(host.shadowRoot?.activeElement).to.be.equal(button);
});

it('focuses its primary button when `reportValidity()` is called when required and no options are selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  host.reportValidity();

  const button = host.shadowRoot?.querySelector('[data-test="primary-button"]');

  expect(host.shadowRoot?.activeElement).to.equal(button);
});

it('does not focus its primary button when `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple required>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  host.checkValidity();
  expect(host.shadowRoot?.activeElement).to.equal(null);
});

it('focuses the second tag when the first one is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  tags?.[0]?.click();
  await host.updateComplete;

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

  expect(host.shadowRoot?.activeElement).to.equal(tags?.[1]);
});

it('focuses the third tag when the second one is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  tags?.[1]?.click();
  await host.updateComplete;

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

  expect(host.shadowRoot?.activeElement).to.equal(tags?.[2]);
});

it('focuses the second tag when the third tag removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  tags?.[2]?.click();
  await host.updateComplete;

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

  expect(host.shadowRoot?.activeElement).to.equal(tags?.[1]);
});

it('focuses itself when the last tag is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.shadowRoot?.querySelector<Tag>('[data-test="tag"]')?.click();

  await host.updateComplete;

  // Wait for the timeout in `#onTagRemove`.
  await aTimeout(0);

  expect(document.activeElement).to.equal(host);
});
