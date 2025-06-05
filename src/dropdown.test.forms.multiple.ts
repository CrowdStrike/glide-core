import { expect, fixture, html } from '@open-wc/testing';
import './dropdown.option.js';
import Dropdown from './dropdown.js';
import Tag from './tag.js';

it('can be reset', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  options[1]?.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(host.value).to.deep.equal([]);
  expect(internalLabel?.textContent?.trim()).to.equal('Placeholder');
});

it('can be reset to its initially selected options', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
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

  host
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(new Event('click'));

  form.reset();

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('Three');
  expect(host.value).to.deep.equal(['two', 'three']);
});

it('has `formData` value when options are selected', async () => {
  const form = document.createElement('form');

  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" name="name" multiple>
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
  expect(formData.get('name')).to.equal('["one","two"]');
});

it('has no `formData` value when no option is selected', async () => {
  const form = document.createElement('form');

  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" name="name" multiple>
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
    html`<glide-core-dropdown label="Label" name="name" disabled multiple>
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
    html`<glide-core-dropdown label="Label" name="name" multiple>
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
