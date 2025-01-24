import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import sinon from 'sinon';
import { click, hover } from './library/mouse.js';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

it('opens on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(
    component.shadowRoot?.querySelector('[data-test="primary-button"]'),
  );

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('toggles open and closed when the primary button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(
    component.shadowRoot?.querySelector('[data-test="primary-button"]'),
  );

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('selects an option on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');

  await click(option);

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(option?.selected).to.be.true;
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(component.value).to.deep.equal(['one']);
});

it('does not select a disabled option on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');

  await click(option);

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(option?.selected).to.be.false;
  expect(labels?.length).to.equal(0);
  expect(component.value).to.deep.equal([]);
});

it('selects an option on Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');

  option?.focus();
  await sendKeys({ press: ' ' });

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(option?.selected).to.be.true;
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(component.value).to.deep.equal(['one']);
});

it('selects an option when its icon is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="One" value="one">
        <svg
          slot="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          style=${styleMap({
            height: '1rem',
            width: '1rem',
          })}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');

  await click(option?.querySelector('[slot="icon"]'));

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(option?.selected).to.be.true;
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(component.value).to.deep.equal(['one']);
});

it('does not deselect options on Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component?.focus();
  await sendKeys({ press: ' ' });

  const option = component.querySelector('glide-core-dropdown-option');

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(option?.selected).to.be.true;
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(component.value).to.deep.equal(['one']);
});

it('selects an option on Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');
  option?.focus();
  await sendKeys({ press: 'Enter' });

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(option?.selected).to.be.true;
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(component.value).to.deep.equal(['one']);
});

it('deactivates all other options when an option is hovered', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  await hover(options[0]);
  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('closes when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.querySelector('glide-core-dropdown-option'));

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  component.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector('glide-core-dropdown-option');

  option?.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.false;
});

it('closes when an already selected option is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.querySelector('glide-core-dropdown-option'));

  expect(component.open).to.be.false;
});

it('closes on edit via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.shadowRoot?.querySelector('[data-test="edit-button"]'));

  expect(component.open).to.be.false;
});

it('deselects all other options when one is newly selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  await click(options[1]);

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(options[2].selected).to.be.false;
  expect(component.value).to.deep.equal(['two']);
});

it('updates its internal label when `label` of the selected option is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.label = 'Two';
  await component.updateComplete;

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.textContent?.trim()).to.equal(option?.label);
});

it('shows an Edit button when `editable` of the selected option is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.editable = true;
  await component.updateComplete;

  const editButton = component.shadowRoot?.querySelector(
    '[data-test="edit-button"]',
  );

  expect(editButton?.checkVisibility()).to.be.true;
});

it('selects and deselects options when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
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
  );

  component.value = ['two'];

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
});

it('throws when `value` is changed programmatically to include more than one value', async () => {
  const component = await fixture<GlideCoreDropdown>(
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
  );

  const spy = sinon.spy();

  try {
    component.value = ['one', 'two'];
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('updates `value` when an option `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'two';

  expect(component.value).to.deep.equal(['two']);
});

it('does not update `value` when a disabled option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.querySelector('glide-core-dropdown-option'));

  expect(component.value).to.deep.equal([]);
});

it('updates `value` when `multiple` is changed to `false` programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open multiple>
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
  );

  component.multiple = false;

  const options = component.querySelectorAll('glide-core-dropdown-option');

  const checkbox = options[1].shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(checkbox?.checked).to.be.true;
  expect(component.value).to.deep.equal(['two']);
});

it('updates `value` when the `value` of the selected option is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'three';

  expect(component.value).to.deep.equal(['three']);
});

it('updates `value` when the `value` of the selected option is removed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown open>
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
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = '';

  expect(component.value).to.deep.equal([]);
});

it('updates its internal label when an option is newly selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
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
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const option = component.querySelector<GlideCoreDropdownOption>(
    'glide-core-dropdown-option:last-of-type',
  );

  await click(option);

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.textContent?.trim()).to.equal(option?.label);
});

it('hides Select All', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const selectAll = component.shadowRoot?.querySelector(
    '[data-test="select-all"]',
  );

  expect(selectAll?.checkVisibility()).to.not.be.ok;
});

it('cannot be tabbed to when disabled', async () => {
  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" disabled>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ down: 'Tab' });
  expect(document.activeElement).to.equal(document.body);
});

it('clicks its primary button when `click()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  setTimeout(() => {
    component.click();
  });

  assert(button);

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('unhides its options when made unfilterable', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      filterable
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.focus();
  await sendKeys({ type: 'one' });

  component.filterable = false;

  const options = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});
