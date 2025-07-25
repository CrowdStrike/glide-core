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
import Dropdown from './dropdown.js';
import DropdownOption from './dropdown.option.js';
import type Tooltip from './tooltip.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('opens on click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.true;
  expect(options?.checkVisibility()).to.be.true;
});

it('toggles open and closed when its primary button is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]'));

  const options = host.shadowRoot?.querySelector('[data-test="options"]');

  expect(host.open).to.be.false;
  expect(options?.checkVisibility()).to.be.false;
});

it('selects an option on click via mouse', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[0]);

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
});

it('selects an option on click via `click()`', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.click();
  await options[0]?.updateComplete;
  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
});

it('selects an option when one is selected programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = true;
  await options[0]?.updateComplete;
  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
});

it('deselects an option when one is deselected programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = false;
  await options[0]?.updateComplete;
  await host.updateComplete;

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(0);
  expect(host.value).to.deep.equal([]);
});

it('does not select a disabled option on click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[0]);

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(0);
  expect(host.value).to.deep.equal([]);
});

it('selects an option on Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  await requestIdleCallback(); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  options[0]?.focus();
  await sendKeys({ press: ' ' });

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
});

it('selects an option when its icon is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

      <glide-core-dropdown-option label="Two" value="two">
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

  await requestIdleCallback(); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await click(options[0]?.querySelector('[slot="icon"]'));

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
});

it('does not deselect options on Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
});

it('selects an option on Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  await requestIdleCallback(); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');
  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('One,');
  expect(host.value).to.deep.equal(['one']);
});

it('deactivates all other options when an option is hovered', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await requestIdleCallback(); // Wait for Floating UI
  await hover(options[0]);
  await hover(options[1]);

  expect(options[0]?.privateActive).to.be.false;
  expect(options[1]?.privateActive).to.be.true;
});

it('closes when an option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(host.querySelector('glide-core-dropdown-option'));

  expect(host.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.false;
});

it('closes when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(host.open).to.be.false;
});

it('closes when an option is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const option = host.querySelector('glide-core-dropdown-option');

  option?.focus();
  await sendKeys({ press: ' ' });

  expect(host.open).to.be.false;
});

it('closes when an already selected option is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(host.querySelector('glide-core-dropdown-option'));

  expect(host.open).to.be.false;
});

it('closes on edit via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="Label"
        editable
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(host.shadowRoot?.querySelector('[data-test="edit-button"]'));

  expect(host.open).to.be.false;
});

it('deselects all other options when one is newly selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  const options = host.querySelectorAll('glide-core-dropdown-option');

  await requestIdleCallback(); // Wait for Floating UI
  await click(options[1]);

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.false;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(options[2]?.ariaSelected).to.equal('false');
  expect(host.value).to.deep.equal(['two']);
});

it('deselects all but the last selected option when made single-select programmatically', async () => {
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

  host.multiple = false;
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  const labels = host.shadowRoot?.querySelectorAll(
    '[data-test="selected-option-label"]',
  );

  expect(options[0]?.selected).be.false;
  expect(options[1]?.selected).be.true;
  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
  expect(labels?.length).to.equal(1);
  expect(labels?.[0]?.textContent?.trim()).to.equal('Two,');
  expect(host.value).to.deep.equal(['two']);
});

it('shows an Edit button when `editable` of the selected option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.editable = true;
  await host.updateComplete;

  const editButton = host.shadowRoot?.querySelector(
    '[data-test="edit-button"]',
  );

  expect(editButton?.checkVisibility()).to.be.true;
});

it('selects and deselects options when `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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

  host.value = ['two'];
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
});

it('only selects the first option when `value` is set programmatically and multiple options have the same `value`', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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

  expect(options[0]?.selected).to.be.true;
  expect(options[1]?.selected).to.be.false;
});

it('throws when `value` is set programmatically to include more than one value', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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
    host.value = ['one', 'two'];
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('updates `value` when an option `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'two';

  expect(host.value).to.deep.equal(['two']);
});

it('does not update `value` when a disabled option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(host.querySelector('glide-core-dropdown-option'));

  expect(host.value).to.deep.equal([]);
});

it('updates its `value` when made single-select programmatically', async () => {
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
        label="Three"
        value="three"
        disabled
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.multiple = false;
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.selected).to.be.false;
  expect(options[1]?.selected).to.be.true;
  expect(options[2]?.selected).to.be.false;
  expect(host.value).to.deep.equal(['two']);
});

it('updates its `value` when the `value` of the selected option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = 'three';

  expect(host.value).to.deep.equal(['three']);
});

it('updates its `value` when the `value` of the selected option is removed programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);
  option.value = '';

  expect(host.value).to.deep.equal([]);
});

it('hides Select All', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" select-all>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const selectAll = host.shadowRoot?.querySelector('[data-test="select-all"]');

  expect(selectAll?.checkVisibility()).to.not.be.ok;
});

it('cannot be tabbed to when disabled', async () => {
  await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" disabled>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ down: 'Tab' });
  expect(document.activeElement).to.equal(document.body);
});

it('clicks its primary button when `click()` is called', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="primary-button"]');

  setTimeout(() => {
    host.click();
  });

  assert(button);

  const event = await oneEvent(button, 'click');
  expect(event instanceof PointerEvent).to.be.true;
});

it('unhides its options when made unfilterable', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  host.filterable = false;

  const options = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ hidden }) => !hidden);

  expect(options.length).to.equal(2);
});

it('adds the `value` of a programmatically enabled option to its `value`', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');

  assert(option);
  option.disabled = false;

  expect(host.value).to.deep.equal(['one']);
});

it('removes the `value` of a programmatically disabled option from its `value`', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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

  const option = host.querySelector('glide-core-dropdown-option');

  assert(option);
  option.disabled = true;

  expect(host.value).to.deep.equal([]);
  expect(option.selected).to.be.true;
});

it('updates itself when an option is newly selected', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
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

  await requestIdleCallback(); // Wait for Floating UI

  const option = host.querySelector<DropdownOption>(
    'glide-core-dropdown-option:last-of-type',
  );

  await click(option);

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const internalLabelTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  expect(host.value).to.deep.equal(['two']);
  expect(internalLabel?.textContent?.trim()).to.equal(option?.label);
  expect(internalLabelTooltip?.label).to.equal(option?.label);
});

it('updates itself when `label` of the selected option is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="One"
        value="one"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.label = 'Two';
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const internalLabelTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  expect(internalLabel?.textContent?.trim()).to.equal(option?.label);
  expect(internalLabelTooltip?.label).to.equal(option?.label);
});

it('updates itself when a selected option is enabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="One"
        value="one"
        disabled
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const option = host.querySelector('glide-core-dropdown-option');
  assert(option);

  option.disabled = false;
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const internalLabelTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  expect(host.value).to.deep.equal(['one']);
  expect(internalLabel?.textContent?.trim()).to.equal('One');
  expect(internalLabelTooltip?.label).to.equal('One');
});

it('updates itself when the selected option is disabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        value="x"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host);

  const options = host.querySelectorAll('glide-core-dropdown-option');
  assert(options[0]);

  options[0].disabled = true;
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const internalLabelTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  const activeOptions = [...options].filter(
    ({ privateActive }) => privateActive,
  );

  expect(host.value).to.deep.equal([]);
  expect(internalLabel?.textContent?.trim()).to.be.empty.string;
  expect(internalLabelTooltip?.disabled).to.be.true;
  expect(internalLabelTooltip?.label).to.be.empty.string;
  expect(activeOptions.length).to.equal(1);
  expect(options[1]?.privateActive).to.be.true;
});

it('updates itself when multiple options are selected and the last selected option is disabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
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
    </glide-core-dropdown>`,
  );

  await click(host);

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);
  options[1].disabled = true;
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const internalLabelTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  const activeOptions = [...options].filter(
    ({ privateActive }) => privateActive,
  );

  expect(host.value).to.deep.equal(['one']);
  expect(internalLabel?.textContent?.trim()).to.equal('One');
  expect(internalLabelTooltip?.disabled).to.be.true;
  expect(internalLabelTooltip?.label).to.equal('One');
  expect(activeOptions.length).to.equal(1);
  expect(options[0]?.privateActive).to.be.true;
});

it('updates itself when multiple options are selected and the last selected option is enabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label=${'x'.repeat(500)}
        value="x"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        value="two"
        disabled
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);
  options[1].disabled = false;
  await host.updateComplete;

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const internalLabelTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  expect(host.value).to.deep.equal(['two']);
  expect(internalLabel?.textContent?.trim()).to.equal('Two');
  expect(internalLabelTooltip?.disabled).to.be.true;
  expect(internalLabelTooltip?.label).to.equal('Two');
});

it('updates itself when made single-select programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>
      <div slot="icon:three">✓</div>

      <glide-core-dropdown-option label="One" value="one" selected>
        <div slot="icon:one">✓</div>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two" value="two" selected>
        <div slot="icon:two">✓</div>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three" value="three" disabled selected>
        <div slot="icon:three">✓</div>
      </glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.multiple = false;
  await host.updateComplete;

  const icons = host.querySelectorAll('div');

  const internalLabel = host.shadowRoot?.querySelector(
    '[data-test="internal-label"]',
  );

  const internalLabelTooltip = host.shadowRoot?.querySelector<Tooltip>(
    '[data-test="internal-label-tooltip"]',
  );

  expect(host.value).to.deep.equal(['two']);
  expect(icons[1]?.checkVisibility()).to.be.true;
  expect(internalLabel?.textContent?.trim()).to.equal('Two');
  expect(internalLabelTooltip?.label).to.equal('Two');
});

it('does not show the icon of the last selected option when made single-select programmatically and the option does not have a value', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple>
      <div slot="icon:one">✓</div>
      <div slot="icon:two">✓</div>
      <div slot="icon:three">✓</div>

      <glide-core-dropdown-option label="One" value="one" selected>
        <div slot="icon:one">✓</div>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two" selected>
        <div slot="icon:two">✓</div>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Three" value="three" disabled selected>
        <div slot="icon:three">✓</div>
      </glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  host.multiple = false;
  await host.updateComplete;

  const icons = host.querySelectorAll('div');
  expect(icons[1]?.checkVisibility()).to.not.be.ok;
});

it('only shows the last selected option as selected when single-select and a selected option is dynamically added', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const firstOption = host.querySelector('glide-core-dropdown-option');
  const secondOption = document.createElement('glide-core-dropdown-option');

  secondOption.label = 'Two';
  secondOption.selected = true;

  host.append(secondOption);
  await aTimeout(0); // Wait for `#onDefaultSlotChange()`.
  await firstOption?.updateComplete;
  await secondOption?.updateComplete;

  expect(
    firstOption?.shadowRoot
      ?.querySelector('[data-test="checked-icon-container"]')
      ?.querySelector('[data-test="check"]')
      ?.checkVisibility(),
  ).to.not.be.ok;

  expect(
    secondOption?.shadowRoot
      ?.querySelector('[data-test="checked-icon-container"]')
      ?.querySelector('[data-test="check"]')
      ?.checkVisibility(),
  ).to.be.true;
});

it('enables an option when one is selected programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label">
      <glide-core-dropdown-option
        label="One"
        disabled
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        disabled
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = true;

  expect(options[0]?.disabled).to.be.false;
  expect(options[1]?.disabled).to.true;
});

it('sets `aria-selected` when an option is selected programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);
  options[1].selected = true;
  await options[1].updateComplete;

  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
});

it('sets `aria-selected` when an option is deselected programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[0]);
  options[0].selected = false;
  await options[0].updateComplete;

  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('false');
});

it('sets `aria-selected` when an option is disabled programmatically', async () => {
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

  await requestIdleCallback(); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);
  options[1].disabled = true;
  await options[1].updateComplete;

  expect(options[0]?.ariaSelected).to.equal('true');
  expect(options[1]?.ariaSelected).to.equal('false');
});

it('sets `aria-selected` when an option is enabled programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open>
      <glide-core-dropdown-option
        label="One"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        disabled
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const options = host.querySelectorAll('glide-core-dropdown-option');

  assert(options[1]);
  options[1].disabled = false;
  await options[1].updateComplete;

  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
});

it('sets `aria-selected` when made single-select programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple open>
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

  await requestIdleCallback(); // Wait for Floating UI

  host.multiple = false;
  await host.updateComplete;

  const options = host.querySelectorAll('glide-core-dropdown-option');

  expect(options[0]?.ariaSelected).to.equal('false');
  expect(options[1]?.ariaSelected).to.equal('true');
});

it('activates the first option when made single-select programmatically and Select All was previously active', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" multiple select-all>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]')); // Open so Select all gets activated
  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]')); // Close

  host.multiple = false;

  await click(host.shadowRoot?.querySelector('[data-test="primary-button"]')); // Open so the first option gets activated

  const activeOptions = [
    ...host.querySelectorAll('glide-core-dropdown-option'),
  ].filter(({ privateActive }) => privateActive);

  expect(activeOptions.length).to.equal(1);
  expect(activeOptions[0]?.label).to.equal('One');
});
