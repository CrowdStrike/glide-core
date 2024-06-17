import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import GlideCoreCheckbox from './checkbox.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('is selected on click', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  component.click();
  await elementUpdated(component);

  const option = component.shadowRoot?.querySelector('[role="option"]');

  expect(component.selected).to.be.true;
  expect(option?.getAttribute('aria-selected')).to.equal('true');
  expect(option?.ariaSelected).to.equal('true');
});

it('is selected on click when the checkbox itself is clicked', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  // Checkbox has its own lifecycle. Wait until it's ready.
  waitUntil(() => {
    return (
      component.shadowRoot?.querySelector('[data-test="checkbox"]') instanceof
      GlideCoreCheckbox
    );
  });

  const checkbox = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  checkbox?.click();

  await elementUpdated(component);

  const option = component.shadowRoot?.querySelector('[role="option"]');

  expect(component.selected).to.be.true;
  expect(option?.getAttribute('aria-selected')).to.equal('true');
  expect(option?.ariaSelected).to.equal('true');
  expect(checkbox?.checked).to.be.true;
});

it('is selected when programmatically selected', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
      value="value"
      private-multiple
    ></glide-core-dropdown-option>`,
  );

  component.selected = true;

  await elementUpdated(component);

  const option = component.shadowRoot?.querySelector('[role="option"]');

  const checkbox = component.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(component.selected).to.be.true;
  expect(option?.getAttribute('aria-selected')).to.equal('true');
  expect(option?.ariaSelected).to.equal('true');
  expect(checkbox?.checked).to.be.true;
});
