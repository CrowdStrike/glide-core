/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('dispatches one "change" event when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    // Calling `click()` isn't sufficient because it simply sets
    // `selected` and so isn't likely to produce a duplicate event,
    // we assert against below. The checkbox, because it produces
    // its own "change" event, is most likely where the duplicate would
    // come from.
    component
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="checkbox"]')
      ?.click();
  });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via click', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    // Calling `click()` isn't sufficient because it simply sets
    // `selected` and so isn't likely to produce a duplicate event,
    // we assert against below. The checkbox, because it produces
    // its own "change" event, is most likely where the duplicate would
    // come from.
    component
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="checkbox"]')
      ?.click();
  });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Enter', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Space', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  component
    .querySelector('glide-core-dropdown-option')
    ?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "change" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    component.value = ['one', 'two'];
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "change" events upon selection after `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.value = ['one', 'two'];

  setTimeout(() => {
    component
      .querySelector<GlideCoreDropdownOption>(
        'glide-core-dropdown-option:last-of-type',
      )
      ?.click();
  });

  const event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "input" event when `value` is changed programmatically', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    component.value = ['one', 'two'];
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "input" events upon selection after `value` is changed programmatically', async () => {
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
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  component.value = ['one', 'two'];

  setTimeout(() => {
    component
      .querySelector<GlideCoreDropdownOption>(
        'glide-core-dropdown-option:last-of-type',
      )
      ?.click();
  });

  const event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
});

it('dispatches one "change" event when an option is selected after Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected after Select All is clicked', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown
      label="Label"
      placeholder="Placeholder"
      open
      multiple
      select-all
    >
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Two"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<GlideCoreDropdownOption>('[data-test="select-all"]')
      ?.click();
  });

  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    component.querySelector('glide-core-dropdown-option')?.click();
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when a tag is removed', async () => {
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

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="tag"]')
      ?.click();
  });

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when a tag is removed', async () => {
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

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="tag"]')
      ?.click();
  });

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});
