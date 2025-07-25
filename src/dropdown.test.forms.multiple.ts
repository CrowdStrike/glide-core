import { assert, expect, fixture, html } from '@open-wc/testing';
import './dropdown.option.js';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';
import Dropdown from './dropdown.js';
import Tag from './tag.js';
import { click } from './library/mouse.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('can be reset after options are selected via click', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[0]);
  await click(options[1]);

  form.reset();
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(host.value).to.deep.equal([]);
  expect(internalLabel?.textContent?.trim()).to.equal('Placeholder');
  expect(tags?.length).to.equal(0);
});

it('can be reset after options are selected programmatically', async () => {
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

  assert(options[0]);
  assert(options[1]);

  options[0].selected = true;
  options[1].selected = true;

  form.reset();
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(host.value).to.deep.equal([]);
  expect(internalLabel?.textContent?.trim()).to.equal('Placeholder');
  expect(tags?.length).to.equal(0);
});

it('can be reset after options are deselected via click', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open>
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
    {
      parentNode: form,
    },
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[1]);

  form.reset();
  await host.updateComplete;

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(host.value).to.deep.equal(['one', 'two']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('One');
  expect(tags?.[1]?.label).to.equal('Two');
});

it('can be reset after options are deselected programmatically', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
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
    {
      parentNode: form,
    },
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);

  options[1].selected = false;

  form.reset();
  await host.updateComplete;

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(host.value).to.deep.equal(['one', 'two']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('One');
  expect(tags?.[1]?.label).to.equal('Two');
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

it('does not submit its form when a tag is removed via Enter', async () => {
  const form = document.createElement('form');

  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" name="name" multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    spy();
  });

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});
