import './tag.js';
import * as sinon from 'sinon';
import {
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
  waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreDropdown from './dropdown.js';
import './dropdown.option.js';

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

  // Wait for Floating UI.
  await aTimeout(0);

  click(
    component
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector('[data-test="checkbox"]'),
  );

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event after "input"', async () => {
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

  // Wait for Floating UI.
  await aTimeout(0);

  click(
    component
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector('[data-test="checkbox"]'),
  );

  const changeSpy = sinon.spy();
  const inputSpy = sinon.spy();

  component.addEventListener('change', changeSpy);
  component.addEventListener('input', inputSpy);

  await waitUntil(() => changeSpy.callCount === 1);

  expect(changeSpy.calledAfter(inputSpy)).to.be.true;
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

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  component.focus();

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
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

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
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

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  click(
    component
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector('[data-test="checkbox"]'),
  );

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
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

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  component.focus();

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
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

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  component.focus();

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
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

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  await click(component.shadowRoot?.querySelector('[data-test="select-all"]'));

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

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  await click(component.shadowRoot?.querySelector('[data-test="select-all"]'));

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

  // Wait for Floating UI.
  await aTimeout(0);

  component.value = ['one', 'two'];
  click(component.querySelector('glide-core-dropdown-option:last-of-type'));

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

  // Wait for Floating UI.
  await aTimeout(0);

  component.value = ['one', 'two'];
  click(component.querySelector('glide-core-dropdown-option:last-of-type'));

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

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.shadowRoot?.querySelector('[data-test="select-all"]'));

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  await click(component.querySelector('glide-core-dropdown-option'));

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

  // Wait for Floating UI.
  await aTimeout(0);

  await click(component.shadowRoot?.querySelector('[data-test="select-all"]'));

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  await click(component.querySelector('glide-core-dropdown-option'));

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
