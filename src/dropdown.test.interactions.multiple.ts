import { LitElement } from 'lit';
import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import { sendKeys } from '@web/test-runner-commands';
import { styleMap } from 'lit/directives/style-map.js';
import { click, hover } from './library/mouse.js';
import Dropdown from './dropdown.js';
import DropdownOption from './dropdown.option.js';
import Tag from './tag.js';

@customElement('glide-core-dropdown-in-another-component')
class DropdownInAnotherComponent extends LitElement {
  override render() {
    return html`<glide-core-dropdown label="Label" multiple open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`;
  }
}

it('opens on click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('toggles open and closed when the button is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('selects an option on click via mouse', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await aTimeout(0); // Wait for Floating UI
  await click(options[0]);

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['two', 'one']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('One');
});

it('selects an option on click via `click()`', async () => {
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
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.click();
  await options[0]?.updateComplete;

  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['two', 'one']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('One');
});

it('selects an option when one is selected programmatically', async () => {
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
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = true;
  await options[0]?.updateComplete;
  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['two', 'one']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('One');
});

it('deselects an option on click via mouse', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await aTimeout(0); // Wait for Floating UI
  await click(options[0]);

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(host.value).to.deep.equal(['two']);
  expect(tags?.length).to.equal(1);
  expect(tags?.[0]?.label).to.equal('Two');
});

it('deselects an option on click via `click()`', async () => {
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
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.click();
  await options[0]?.updateComplete;

  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(host.value).to.deep.equal(['two']);
  expect(tags?.length).to.equal(1);
  expect(tags?.[0]?.label).to.equal('Two');
});

it('deselects an option when one is deselected programmatically', async () => {
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
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);

  options[0].selected = false;
  await options[0]?.updateComplete;
  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(host.value).to.deep.equal(['two']);
  expect(tags?.length).to.equal(1);
  expect(tags?.[0]?.label).to.equal('Two');
});

it('does not select a disabled option on click via mouse', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');

  await click(option);

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(option?.selected).to.be.false;
  expect(labels?.length).to.equal(0);
  expect(host.value).to.deep.equal([]);
  expect(tags?.length).to.equal(0);
});

it('selects an option on Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open>
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

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: ' ' });

  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['two', 'one']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('One');
});

it('deselects an option on Space', async () => {
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
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: ' ' });

  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(host.value).to.deep.equal(['two']);
  expect(tags?.length).to.equal(1);
  expect(tags?.[0]?.label).to.equal('Two');
});

it('selects an option on Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open>
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

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['two', 'one']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('One');
});

it('deselects an option on Enter', async () => {
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
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(host.value).to.deep.equal(['two']);
  expect(tags?.length).to.equal(1);
  expect(tags?.[0]?.label).to.equal('Two');
});

it('activates Select All by default', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.privateActive).to.be.true;
  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.false;
});

it('deactivates all other options when an option is hovered', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
    host.shadowRoot?.querySelector<DropdownOption>('[data-test="select-all"]'),
  ];

  await aTimeout(0); // Wait for Floating UI
  await hover(options[0]);
  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
  expect(options[2]?.privateActive).to.be.false;
});

it('remains open when an option is selected via click', async () => {
  const host = await fixture<DropdownInAnotherComponent>(
    html`<glide-core-dropdown-in-another-component></glide-core-dropdown-in-another-component>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.shadowRoot?.querySelector('glide-core-dropdown-option'));

  const dropdown = host.shadowRoot?.querySelector('glide-core-dropdown');
  expect(dropdown?.open).to.be.true;
});

it('remains open when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  host.querySelector('glide-core-dropdown-option')?.focus();
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.true;
});

it('remains open when an option is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const option = host.querySelector('glide-core-dropdown-option');

  option?.focus();
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.true;
});

it('activates Select All on hover', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await aTimeout(0); // Wait for Floating UI
  await hover(options[0]);

  expect(options[0]?.privateActive).to.be.true;
});

it('does not activate the next option on ArrowDown when a tag is focused', async () => {
  // This test only accounts for when ArrowDown is pressed. Other keys like
  // ArrowUp and Home are left untested to avoid an additional seven or so
  // tests. Only testing ArrowDown is hopefully sufficient.

  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  host.shadowRoot?.querySelector<Tag>('[data-test="tag"]')?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(options[0]?.privateActive).to.be.true;
});

it('updates its tag when `label` of a selected option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.label = 'Three';
  await host.updateComplete;

  const tag = host.shadowRoot?.querySelector<Tag>('[data-test="tag"]');

  expect(tag?.label).to.equal('Three');
});

it('makes its tag editable when `editable` of a selected option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.editable = true;
  await host.updateComplete;

  const tag = host.shadowRoot?.querySelector<Tag>('[data-test="tag"]');

  expect(tag?.privateEditable).to.be.true;
});

it('selects and deselects options when `value` is set programmatically', async () => {
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
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.value = ['two', 'three'];
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.true;
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Three,');
  expect(host.value).to.deep.equal(['two', 'three']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('Three');
});

it('only selects the first option when `value` is set programmatically and multiple options have the same `value`', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.value = ['one'];
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
  expect(tags?.length).to.equal(1);
  expect(tags?.[0]?.label).to.equal('One');
});

it('does not update `value` when a disabled option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.querySelector('glide-core-dropdown-option'));

  expect(host.value).to.deep.equal([]);
});

it('updates `value` when made multiselect programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  host.multiple = true;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(host.value).to.deep.equal(['two']);
  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;

  await options[1]?.updateComplete;

  const checkbox = options[1]?.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="checkbox"]',
  );

  expect(checkbox?.checked).to.be.true;
});

it('updates `value` when the `value` of a selected option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
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

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'three';

  expect(host.value).to.deep.equal(['three', 'two']);
});

it('updates `value` when the `value` of a selected option is emptied programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
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

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = '';

  expect(host.value).to.deep.equal(['two']);
});

it('does not add duplicate values to `value` when `value` is set programmatically', async () => {
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
  );

  host.value = ['one', 'two'];

  expect(host.value).to.deep.equal(['one', 'two']);
});

it('only selects the first option with a matching value when multiple options have the same value and `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.value = ['one'];

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
});

it('selects multiple options with the same value when `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="One"
        value="one"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.value = ['one', 'one'];

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.true;
});

it('has no internal label when an option is newly selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  await click(host.querySelector('glide-core-dropdown-option:last-of-type'));

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  expect(internalLabel?.checkVisibility()).to.not.be.ok;
});

it('updates its tags and overflow count when options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown
      label="Label"
      style=${styleMap({
        display: 'block',
        maxWidth: '20rem',
      })}
      multiple
      open
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await aTimeout(0); // Wait for Floating UI
  await click(options[0]);
  await click(options[1]);
  await click(options[2]);
  await click(options[3]);
  await aTimeout(0); // Wait for the Resize Observer to do its thing

  const tagContainers = [
    ...(host.shadowRoot?.querySelectorAll<HTMLElement>(
      '[data-test="tag-container"]',
    ) ?? []),
  ].filter((element) => element.checkVisibility());

  const tagOverflowCount = host.shadowRoot?.querySelector(
    '[data-test="tag-overflow-count"]',
  );

  expect(tagContainers?.length).to.equal(2);
  expect(tagOverflowCount?.textContent?.trim()).to.equal('2');
});

it('updates its tags and overflow count when options are selected programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown
      label="Label"
      style=${styleMap({
        display: 'block',
        maxWidth: '15rem',
      })}
      multiple
      open
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

  await aTimeout(0); // Wait for the Resize Observer to do its thing

  const thirdOption = document.createElement('glide-core-dropdown-option');

  thirdOption.label = 'Three';
  thirdOption.selected = true;

  host.append(thirdOption);

  await aTimeout(0); // Wait for `#onDefaultSlotChange()`.

  const tagContainers = [
    ...(host.shadowRoot?.querySelectorAll<HTMLElement>(
      '[data-test="tag-container"]',
    ) ?? []),
  ].filter((element) => element.checkVisibility());

  const tagOverflowCount = host.shadowRoot?.querySelector(
    '[data-test="tag-overflow-count"]',
  );

  expect(tagContainers?.length).to.equal(1);
  expect(tagOverflowCount?.textContent?.trim()).to.equal('2');
});

it('deselects an option when its tag is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
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

  host.shadowRoot?.querySelector<Tag>('[data-test="tag"]')?.click();

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(host.value).to.deep.equal(['two']);
});

it('selects all enabled options when none are selected and Select All is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        disabled
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

  await aTimeout(0); // Wait for Floating UI
  await click(host.shadowRoot?.querySelector('[data-test="select-all"]'));

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.true;
  expect(host.value).to.deep.equal(['two', 'three']);
});

it('selects all enabled options when some are selected and Select All is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.shadowRoot?.querySelector('[data-test="select-all"]'));

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[2]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(options[2]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Three,');
  expect(host.value).to.deep.equal(['one', 'three']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('One');
  expect(tags?.[1]?.label).to.equal('Three');
});

it('deselects all options when all are selected and Select All is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
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

  await aTimeout(0); // Wait for Floating UI

  await click(
    host.shadowRoot?.querySelector<DropdownOption>('[data-test="select-all"]'),
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(0);
  expect(host.value).to.deep.equal([]);
  expect(tags?.length).to.equal(0);
});

it('selects all enabled options when none are selected and Select All is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(options[2]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Three,');
  expect(host.value).to.deep.equal(['two', 'three']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('Three');
});

it('selects all enabled options when some are selected and Select All is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' }); // Two's tag
  await sendKeys({ press: 'Tab' }); // Dropdown
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ press: ' ' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(options[2]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Three,');
  expect(host.value).to.deep.equal(['two', 'three']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('Three');
});

it('deselects all options when all are selected and Select All is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' }); // One's tag
  await sendKeys({ press: 'Tab' }); // Two's tag
  await sendKeys({ press: 'Tab' }); // Dropdown
  await sendKeys({ press: 'Home' });
  await sendKeys({ press: ' ' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(0);
  expect(host.value).to.deep.equal([]);
  expect(tags?.length).to.equal(0);
});

it('selects all enabled options when none are selected and Select All is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(options[2]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Three,');
  expect(host.value).to.deep.equal(['two', 'three']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('Three');
});

it('selects all enabled options when some are selected and Select All is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' }); // Two's tag
  await sendKeys({ press: 'Tab' }); // Dropdown
  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ press: 'Enter' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(options[2]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(2);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(labels?.[1]?.textContent?.trim()).to.equal('Three,');
  expect(host.value).to.deep.equal(['two', 'three']);
  expect(tags?.length).to.equal(2);
  expect(tags?.[0]?.label).to.equal('Two');
  expect(tags?.[1]?.label).to.equal('Three');
});

it('deselects all options when all are selected and Select All is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
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

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' }); // One's tag
  await sendKeys({ press: 'Tab' }); // Twos' tag
  await sendKeys({ press: 'Tab' }); // Dropdown
  await sendKeys({ press: 'Home' });
  await sendKeys({ press: 'Enter' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  const tags = host.shadowRoot?.querySelectorAll<Tag>('[data-test="tag"]');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(0);
  expect(host.value).to.deep.equal([]);
  expect(tags?.length).to.equal(0);
});

it('shows Select All when is enabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  host.selectAll = true;
  await host.updateComplete;

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.checkVisibility()).to.be.true;
});

it('sets Select All as selected when all enabled options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await aTimeout(0); // Wait for Floating UI
  await click(options[1]);
  await click(options[2]);

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.selected).to.be.true;
});

it('sets Select All as deselected when no options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await aTimeout(0); // Wait for Floating UI
  await click(options[0]);
  await click(options[1]);
  await click(options[0]);
  await click(options[1]);

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.selected).to.be.false;
});

it('sets Select All as indeterminate when not all options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await click(host.querySelector('glide-core-dropdown-option'));

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  expect(selectAll?.privateIndeterminate).to.be.true;
});

it('does not set Select All as indeterminate when no options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open select-all>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  await aTimeout(0); // Wait for Floating UI
  await click(options[0]);

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('does not set Select All as indeterminate when all options are selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const selectAll = host.shadowRoot?.querySelector<DropdownOption>(
    '[data-test="select-all"]',
  );

  await aTimeout(0); // Wait for Floating UI
  await click(options[0]);
  await click(options[1]);

  expect(selectAll?.privateIndeterminate).to.be.false;
});

it('closes when a tag is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="tag"]'), 'left');
  await host.updateComplete;

  expect(host.open).to.be.false;
});

it('closes when a tag is edited via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  await click(
    host.shadowRoot
      ?.querySelector('glide-core-tag')
      ?.shadowRoot?.querySelector('[data-test="edit-button"]'),
  );

  expect(host.open).to.be.false;
});

it('closes when a tag is edited via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.false;
});

it('closes when a tag is edited via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="One"
        editable
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.false;
});

it('cannot be tabbed to when disabled', async () => {
  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" disabled multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(document.body);
});

it('clicks its primary button when `click()` is called', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    host.click();
  });

  const button = host.shadowRoot?.querySelector('[data-test="primary-button"]');
  assert(button);

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('updates itself when a selected option is disabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown
      label="Label"
      filterable
      multiple
      open
      style=${styleMap({
        display: 'block',
        maxWidth: '20rem',
      })}
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        value="x"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await hover(options[1]);

  assert(options[1]);
  options[1].disabled = true;
  await host.updateComplete;

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const activeOptions = [...options].filter(
    ({ privateActive }) => privateActive,
  );

  const tagContainers = host.shadowRoot?.querySelectorAll<HTMLElement>(
    '[data-test="tag-container"]',
  );

  const tagOverflowCount = host.shadowRoot?.querySelector(
    '[data-test="tag-overflow-count"]',
  );

  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(options[2]?.ariaSelected).to.equal('true');
  expect(host.value).to.deep.equal(['one', 'three']);
  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');
  expect(tagContainers?.length).to.equal(2);
  expect(tagOverflowCount?.textContent?.trim()).to.equal('1');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('updates itself when a selected option is enabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown
      label="Label"
      filterable
      multiple
      open
      style=${styleMap({
        display: 'block',
        maxWidth: '20rem',
      })}
    >
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        value="x"
        disabled
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);

  options[1].disabled = false;
  await host.updateComplete;
  await aTimeout(0); // Wait for the Resize Observer to do its thing

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="input"]',
  );

  const activeOptions = [...options].filter(
    ({ privateActive }) => privateActive,
  );

  const tagContainers = host.shadowRoot?.querySelectorAll<HTMLElement>(
    '[data-test="tag-container"]',
  );

  const tagOverflowCount = host.shadowRoot?.querySelector(
    '[data-test="tag-overflow-count"]',
  );

  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(options[2]?.ariaSelected).to.equal('true');
  expect(host.value).to.deep.equal(['one', 'three', 'x']);
  expect(activeOptions.length).to.equal(1);
  expect(activeOptions.at(0)?.label).to.equal('One');
  expect(tagContainers?.length).to.equal(3);
  expect(tagOverflowCount?.textContent?.trim()).to.equal('2');

  expect(input?.getAttribute('aria-activedescendant')).to.equal(
    activeOptions.at(0)?.id,
  );
});

it('removes the correct value from `value` when an option is disabled and multiple options have the same `value`', async () => {
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

      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[2]);
  options[2].disabled = true;

  await host.updateComplete;

  expect(host.value).to.deep.equal(['one', 'two']);
});

it('enables an option when one is selected programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = true;

  expect(options[0]?.disabled).to.be.false;
  expect(options[1]?.disabled).to.true;
  expect(options[2]?.disabled).to.false;
});

it('sets `aria-selected` when made multiselect programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  await aTimeout(0); // Wait for Floating UI

  host.multiple = true;
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('true');
});
