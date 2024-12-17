/* eslint-disable @typescript-eslint/no-unused-expressions */

import { LitElement } from 'lit';
import {
  aTimeout,
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import GlideCoreTag from './tag.js';

@customElement('glide-core-dropdown-in-another-component')
class GlideCoreDropdownInAnotherComponent extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  override render() {
    return html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`;
  }
}

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';
GlideCoreDropdownInAnotherComponent.shadowRootOptions.mode = 'open';
GlideCoreTag.shadowRootOptions.mode = 'open';

afterEach(async () => {
  await resetMouse();
});

it('opens on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="primary-button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await aTimeout(0);

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('toggles open and closed when the button is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="primary-button"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  await elementUpdated(component);

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('does not toggle open and closed when the button overflow text is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Calling `click()` would be sweet. The problem is it sets `event.detail` to `0`,
  // which puts us in a guard in the event handler. `Event` has no `detail` property
  // and would work. `CustomEvent` is used for completeness and to get us as close as
  // possible to a real click. See the comment in the handler for more information.
  component.shadowRoot
    ?.querySelector('[data-test="tag-overflow-text"]')
    ?.dispatchEvent(new CustomEvent('click', { bubbles: true, detail: 1 }));

  // Wait for it to open.
  await aTimeout(0);

  const options = component.shadowRoot?.querySelector('[data-test="options"]');

  expect(component.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('selects options on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');
  options[0]?.click();
  options[1]?.click();

  await elementUpdated(component);

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Two,');
});

it('does not select a disabled option on click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');

  option?.click();
  await elementUpdated(component);

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(option?.selected).to.be.false;
  expect(labels?.length).to.equal(0);
});

it('selects options on Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: ' ' });

  options[1]?.focus();
  await sendKeys({ press: ' ' });

  await elementUpdated(component);

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Two,');
});

it('selects options on Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  options[1]?.focus();
  await sendKeys({ press: 'Enter' });

  const labels = component.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Two,');
});

it('activates Select All by default', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.privateActive).to.be.true;
  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
});

it('deactivates all other options on "mouseover"', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = [
    ...component.querySelectorAll('glide-core-dropdown-option'),
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    ),
  ];

  options[0]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  options[1]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
});

it('remains open when an option is selected via click', async () => {
  const component = await fixture(
    html`<glide-core-dropdown-in-another-component></glide-core-dropdown-in-another-component>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const option = component.shadowRoot?.querySelector(
    'glide-core-dropdown-option',
  );

  assert(option);

  const { x, y } = option.getBoundingClientRect();

  // Calling `click()` won't do because Dropdown relies on a "mouseup" event to
  // decide if it should close.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x), Math.ceil(y)],
  });

  const dropdown = component.shadowRoot?.querySelector('glide-core-dropdown');

  expect(dropdown?.open).to.be.true;
});

it('remains open when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.true;
});

it('remains open when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');

  option?.focus();
  await sendKeys({ press: ' ' });

  expect(component.open).to.be.true;
});

it('activates Select All on "mouseover"', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0]?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  expect(options[0]?.privateActive).to.be.true;
});

it('does not activate the next option on ArrowDown when a tag is focused', async () => {
  // This test only accounts for when ArrowDown is pressed. Other keys like
  // ArrowUp and Home are left untested to avoid an additional seven or so
  // tests. Only testing ArrowDown is hopefully sufficient.

  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  const options = component.querySelectorAll('glide-core-dropdown-option');

  component.shadowRoot
    ?.querySelector<GlideCoreTag>('[data-test="tag"]')
    ?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.true;
});

it('updates its tag when `label` of a selected option is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.label = 'Three';
  await elementUpdated(component);

  const tag =
    component.shadowRoot?.querySelector<GlideCoreTag>('[data-test="tag"]');

  expect(tag?.label).to.equal('Three');
});

it('makes its tag editable when `editable` of a selected option is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);

  option.editable = true;
  await elementUpdated(component);

  const tag =
    component.shadowRoot?.querySelector<GlideCoreTag>('[data-test="tag"]');

  expect(tag?.privateEditable).to.be.true;
});

it('selects and deselects options when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
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

  component.value = ['two', 'three'];

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(options[2].selected).to.be.true;
});

it('selects no options when `value` is changed programmatically to an empty string and some options have no `value`', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.value = [''];

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.false;
  expect(options[2].selected).to.be.false;
});

it('updates `value` when an option is selected or deselected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
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
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1].click();
  expect(component.value).to.deep.equal(['one', 'two']);

  options[1].click();
  expect(component.value).to.deep.equal(['one']);

  options[2].click();
  expect(component.value).to.deep.equal(['one']);
});

it('does not update `value` when a disabled option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.querySelector('glide-core-dropdown-option')?.click();

  expect(component.value).to.deep.equal([]);
});

it('updates `value` when a option is selected or deselected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
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
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal(['one', 'two']);

  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal(['one']);

  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Enter' });
  expect(component.value).to.deep.equal(['one']);
});

it('updates `value` when an option is selected or deselected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
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
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.focus();

  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: ' ' });
  expect(component.value).to.deep.equal(['one', 'two']);

  await sendKeys({ press: ' ' });
  expect(component.value).to.deep.equal(['one']);

  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: ' ' });
  expect(component.value).to.deep.equal(['one']);
});

it('updates `value` when multiselect is changed to `true` programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.multiple = true;

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(component.value).to.deep.equal(['two']);
  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;

  await elementUpdated(options[1]);

  const checkbox = options[1].shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(checkbox?.checked).to.be.true;
});

it('updates `value` when the `value` of a selected option is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
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
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'three';

  expect(component.value).to.deep.equal(['three', 'two']);
});

it('updates `value` when the `value` of a selected option is emptied programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
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
    </glide-core-dropdown>`,
  );

  const option = component.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = '';

  expect(component.value).to.deep.equal(['two']);
});

it('updates `value` a tag is removed', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
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
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<GlideCoreTag>('[data-test="tag"]')
    ?.click();

  expect(component.value).to.deep.equal(['two']);
});

it('does not add duplicate values to `value` when `value` is set programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
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

  component.value = ['one', 'two'];

  expect(component.value).to.deep.equal(['one', 'two']);
});

it('has no internal label when an option is newly selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component
    .querySelector<GlideCoreDropdownOption>(
      'glide-core-dropdown-option:last-of-type',
    )
    ?.click();

  await elementUpdated(component);

  const label = component.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(label?.checkVisibility()).to.not.be.ok;
});

it('hides tags to prevent overflow', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      style="display: block; max-width: 20rem;"
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].selected = true;
  options[1].selected = true;
  options[2].selected = true;
  options[3].selected = true;

  // Wait for the Resize Observer to do its thing.
  await aTimeout(0);

  const tagContainers = [
    ...(component.shadowRoot?.querySelectorAll<HTMLElement>(
      '[data-test="tag-container"]',
    ) ?? []),
  ].filter((element) => element.checkVisibility());

  expect(tagContainers?.length).to.equal(2);
});

it('has overflow text when its tags are overflowing', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      style="display: block; max-width: 20rem;"
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].selected = true;
  options[1].selected = true;
  options[2].selected = true;
  options[3].selected = true;

  // Wait for the Resize Observer to do its thing.
  await aTimeout(0);

  const tagOverflow = component.shadowRoot?.querySelector(
    '[data-test="tag-overflow-count"]',
  );

  expect(tagOverflow?.textContent?.trim()).to.equal('2');
});

it('deselects the option when its tag is removed', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<GlideCoreTag>('[data-test="tag"]')
    ?.click();

  const option = component.querySelector('glide-core-dropdown-option');
  expect(option?.selected).to.be.false;
});

it('deselects all but the last selected option when `multiple` is changed to `false` programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.multiple = false;

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).be.false;
  expect(options[1].selected).be.true;
});

it('selects all enabled options when none are selected and Select All is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
    ?.click();

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(options[2].selected).to.be.true;
});

it('selects all enabled options when some are selected and Select All is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
    ?.click();

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.true;
  expect(options[1].selected).to.be.false;
  expect(options[2].selected).to.be.true;
  expect(options[3].selected).to.be.true;
});

it('deselects all options when all are selected and Select All is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
    ?.click();

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.false;
});

it('selects all enabled options when none are selected and Select All is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector('[data-test="select-all"]')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  await sendKeys({ press: ' ' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(options[2].selected).to.be.true;
});

it('selects all options when some are selected and Select All is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector('[data-test="select-all"]')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  await sendKeys({ press: ' ' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.true;
  expect(options[1].selected).to.be.true;
});

it('deselects all options when all are selected and Select All is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector('[data-test="select-all"]')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  await sendKeys({ press: ' ' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.false;
});

it('selects all enabled options when none are selected and Select All is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector('[data-test="select-all"]')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  await sendKeys({ press: 'Enter' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.true;
  expect(options[2].selected).to.be.true;
});

it('selects all options when some are selected and Select All is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector('[data-test="select-all"]')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  await sendKeys({ press: 'Enter' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.true;
  expect(options[1].selected).to.be.false;
  expect(options[2].selected).to.be.true;
  expect(options[3].selected).to.be.true;
});

it('deselects all options when all are selected and Select All is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      open
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component?.shadowRoot
    ?.querySelector('[data-test="select-all"]')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  await sendKeys({ press: 'Enter' });

  const options = component.querySelectorAll('glide-core-dropdown-option');

  expect(options[0].selected).to.be.false;
  expect(options[1].selected).to.be.false;
});

it('shows Select All', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for it to open.
  await aTimeout(0);

  component.selectAll = true;
  await elementUpdated(component);

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.checkVisibility()).to.be.true;
});

it('sets Select All as selected when all enabled options are selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[1].click();
  options[2].click();

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.selected).to.be.true;
});

it('sets Select All as deselected when no options are selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].click();
  options[1].click();
  options[0].click();
  options[1].click();

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.selected).to.be.false;
});

it('sets Select All as indeterminate when not all options are selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].click();
  await elementUpdated(component);

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.privateIndeterminate).to.be.true;
});

it('does not set Select All as indeterminate when no options are selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].click();
  options[0].click();

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('does not set Select All as indeterminate when all options are selected', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = component.querySelectorAll('glide-core-dropdown-option');

  options[0].click();
  options[1].click();

  const selectAll =
    component.shadowRoot?.querySelector<GlideCoreDropdownOption>(
      '[data-test="select-all"]',
    );

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('closes when a tag is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const tag = component.shadowRoot?.querySelector('[data-test="tag"]');
  assert(tag);

  const { x, y } = tag.getBoundingClientRect();

  // A simple `tag.click()` won't do because it would remove the tag. We want to
  // click elsewhere on the tag so focus is moved to `document.body`. This ensures
  // Dropdown's "focusout" handler doesn't cause Dropdown to close.
  await sendMouse({
    type: 'click',
    position: [Math.ceil(x), Math.ceil(y)],
  });

  await elementUpdated(component);

  expect(component.open).to.be.false;
});

it('closes on edit via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('glide-core-tag')
    ?.shadowRoot?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.click();

  await elementUpdated(component);

  expect(component.open).to.be.false;
});

it('closes on edit via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('glide-core-tag')
    ?.shadowRoot?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: 'Enter' });

  expect(component.open).to.be.false;
});

it('closes on edit via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option
        label="One"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.shadowRoot
    ?.querySelector('glide-core-tag')
    ?.shadowRoot?.querySelector<HTMLButtonElement>('[data-test="edit-button"]')
    ?.focus();

  await sendKeys({ press: ' ' });

  expect(component.open).to.be.false;
});

it('cannot be tabbed to when `disabled`', async () => {
  await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      disabled
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);
});

it('clicks the primary button when `click()` is called', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder" multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = component.shadowRoot?.querySelector(
    '[data-test="primary-button"]',
  );

  assert(button);

  setTimeout(() => {
    component.click();
  });

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});
