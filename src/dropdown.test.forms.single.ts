import { expect, fixture, html } from '@open-wc/testing';
import './dropdown.option.js';
import Dropdown from './dropdown.js';

it('can be reset', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
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

  host
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(internalLabel?.textContent?.trim()).to.equal('Placeholder');
  expect(host.value).to.deep.equal([]);
});

it('can be reset to the initially selected option', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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
    {
      parentNode: form,
    },
  );

  host
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(internalLabel?.textContent?.trim()).to.equal('Two');
  expect(host.value).to.deep.equal(['two']);
});

it('has `formData` value when an option is selected', async () => {
  const form = document.createElement('form');

  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" name="name">
        <glide-core-dropdown-option
          label="Label"
          value="value"
          selected
        ></glide-core-dropdown-option>
      </glide-core-dropdown>
      >`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.equal('["value"]');
});

it('has no `formData` value when no option is selected', async () => {
  const form = document.createElement('form');

  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" name="name">
      <glide-core-dropdown-option
        label="Label"
        value="value"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when disabled and an option is selected', async () => {
  const form = document.createElement('form');

  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" name="name" disabled>
      <glide-core-dropdown-option
        label="Label"
        value="value"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});

it('has no `formData` value when an option is selected that has no `value`', async () => {
  const form = document.createElement('form');

  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" name="name">
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.null;
});
