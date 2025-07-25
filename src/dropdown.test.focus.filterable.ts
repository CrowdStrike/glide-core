import { assert, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './dropdown.option.js';
import { click } from './library/mouse.js';
import Dropdown from './dropdown.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('focuses the input when `focus()` is called', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.focus();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('retains focus on the input when an option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable multiple open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await click(host.querySelector('glide-core-dropdown-option'));

  assert(host.shadowRoot?.activeElement);

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('retains focus on the the input when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });

  host
    .querySelector('glide-core-dropdown-option')
    ?.shadowRoot?.querySelector('[data-test="component"]')
    ?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
    );

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('retains focus on the the input when its primary button is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  assert(host.shadowRoot?.activeElement);

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input on submit when required and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    {
      parentNode: form,
    },
  );

  form.requestSubmit();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('focuses the input when `reportValidity()` is called when required and no option is selected', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  host.reportValidity();

  const input = host.shadowRoot?.querySelector('[data-test="input"]');
  expect(host.shadowRoot?.activeElement).to.equal(input);
});

it('does not focus the input when `checkValidity()` is called', async () => {
  const form = document.createElement('form');

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable required>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
    { parentNode: form },
  );

  host.checkValidity();
  expect(host.shadowRoot?.activeElement).to.be.null;
});

it('sets the `value` of its `<input> to the selected option when focus is lost', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.selected = true;

  // Now type something other than "Label" so we can check that it's reverted
  // back to "Label" when focus is lost.
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });
  await sendKeys({ press: 'Tab' });

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  expect(input?.value).to.equal('One');
});

it('selects the filter text on focus', async () => {
  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  expect(window.getSelection()?.toString()).to.equal('One');
});
