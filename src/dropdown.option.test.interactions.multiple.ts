import { expect, fixture, html } from '@open-wc/testing';
import { hover } from './library/mouse.js';
import GlideCoreDropdownOption from './dropdown.option.js';

it('is selected when programmatically selected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  host.selected = true;
  await host.updateComplete;

  const checkbox = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(host.ariaSelected).to.equal('true');
  expect(checkbox?.checked).to.be.true;
});

it('is deselected when programmatically deselected', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      private-multiple
      selected
    ></glide-core-dropdown-option>`,
  );

  host.selected = false;
  await host.updateComplete;

  const checkbox = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(host.ariaSelected).to.equal('false');
  expect(checkbox?.checked).to.be.false;
});

it('sets `privateIsEditActive`', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      editable
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="edit-button"]');

  await hover(button);
  expect(host.privateIsEditActive).to.be.true;

  await hover(button, 'outside');
  expect(host.privateIsEditActive).to.be.false;
});
