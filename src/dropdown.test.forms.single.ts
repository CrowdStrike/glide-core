import { assert, expect, fixture, html } from '@open-wc/testing';
import './dropdown.option.js';
import Dropdown from './dropdown.js';
import { click } from '@/src/library/mouse.js';
import requestIdleCallback from '@/src/library/request-idle-callback.js';

it('can be reset after an option is selected via click', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
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

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[0]);

  form.reset();
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(internalLabel?.textContent?.trim()).to.equal('Placeholder');
  expect(host.value).to.deep.equal([]);
});

it('can be reset after an option is selected programmatically', async () => {
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = true;

  form.reset();
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(internalLabel?.textContent?.trim()).to.equal('Placeholder');
  expect(host.value).to.deep.equal([]);
});

it('can be reset after an option is deselected via click', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
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
    {
      parentNode: form,
    },
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[0]);

  form.reset();
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(internalLabel?.textContent?.trim()).to.equal('One');
  expect(host.value).to.deep.equal(['one']);
});

it('can be reset after an option is deselected programmatically', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
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
    {
      parentNode: form,
    },
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = false;

  form.reset();
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(internalLabel?.textContent?.trim()).to.equal('One');
  expect(host.value).to.deep.equal(['one']);
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
