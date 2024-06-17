import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('focuses itself when `focus` is called', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="component"]'),
  );
});

it('can be tabbed to when active', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  component.privateActive = true;
  await sendKeys({ press: 'Tab' });

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('[data-test="component"]'),
  );
});

it('cannot be tabbed to when inactive', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  await sendKeys({ press: 'Tab' });

  expect(component.shadowRoot?.activeElement).to.equal(null);
});

it('cannot be tabbed to when active but not focusable', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  component.privateActive = true;
  component.privateIsFocusable = false;

  await sendKeys({ press: 'Tab' });

  expect(component.shadowRoot?.activeElement).to.equal(null);
});
