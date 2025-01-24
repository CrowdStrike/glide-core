import { expect, fixture, html } from '@open-wc/testing';
import './dropdown.option.js';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreTag from './tag.js';

it('can be reset', async () => {
  const form = document.createElement('form');

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
    {
      parentNode: form,
    },
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  options[1]?.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  await component.updateComplete;

  expect(component.value).to.deep.equal([]);

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.textContent?.trim()).to.equal('Placeholder');
});

it('can be reset to the initially selected options', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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
    {
      parentNode: form,
    },
  );

  component
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  const tags =
    component.shadowRoot?.querySelectorAll<GlideCoreTag>('[data-test="tag"]');

  expect(tags?.length).to.equal(2);
  expect(tags?.[0].label).to.equal('Two');
  expect(tags?.[1].label).to.equal('Three');
  expect(component.value).to.deep.equal(['two', 'three']);
});

it('has `formData` value when options are selected', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
        label="Label"
        placeholder="Placeholder"
        name="name"
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
      </glide-core-dropdown>
      >`,
    {
      parentNode: form,
    },
  );

  const formData = new FormData(form);
  expect(formData.get('name')).to.be.equal('["one","two"]');
});

it('has no `formData` value when no option is selected', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
      multiple
    >
      <glide-core-dropdown-option
        label=""
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

  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
      disabled
      multiple
    >
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

  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      name="name"
      multiple
    >
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
