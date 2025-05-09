import { expect, fixture, html } from '@open-wc/testing';
import './dropdown.option.js';
import { sendKeys } from '@web/test-runner-commands';
import Dropdown from './dropdown.js';

it('focuses its primary button when `focus()` is called', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });

  expect(host.shadowRoot?.activeElement).to.equal(
    host.shadowRoot?.querySelector('[data-test="primary-button"]'),
  );
});

it('focuses the button on submit', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" required>
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

it('focuses its primary button when `reportValidity()` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" required>
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
    html`<glide-core-dropdown label="Label" required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  host.checkValidity();
  expect(host.shadowRoot?.activeElement).to.equal(null);
});
