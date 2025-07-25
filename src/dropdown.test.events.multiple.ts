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
import Dropdown from './dropdown.js';
import './dropdown.option.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('dispatches one "change" event when an option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  click(
    host
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector('[data-test="checkbox"]'),
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event after "input"', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  click(
    host
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector('[data-test="checkbox"]'),
  );

  const changeSpy = sinon.spy();
  const inputSpy = sinon.spy();

  host.addEventListener('change', changeSpy);
  host.addEventListener('input', inputSpy);

  await waitUntil(() => changeSpy.callCount === 1);

  expect(changeSpy.calledAfter(inputSpy)).to.be.true;
});

it('dispatches one "change" event when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await sendKeys({ press: 'Tab' });

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when an option is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  click(
    host
      .querySelector('glide-core-dropdown-option')
      ?.shadowRoot?.querySelector('[data-test="checkbox"]'),
  );

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await sendKeys({ press: 'Tab' });

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected via Space', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await sendKeys({ press: 'Tab' });

  // Activate the first option before selecting it. The second option is
  // currently active because it's selected.
  await sendKeys({ press: 'ArrowUp' });

  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when Select All is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple select-all>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await click(host.shadowRoot?.querySelector('[data-test="select-all"]'));

  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when Select All is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple select-all>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await click(host.shadowRoot?.querySelector('[data-test="select-all"]'));

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "change" event when `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  setTimeout(() => {
    host.value = ['one', 'two'];
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "change" events upon selection after `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  host.value = ['one', 'two'];
  click(host.querySelector('glide-core-dropdown-option:last-of-type'));

  const event = await oneEvent(host, 'change');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch an "input" event when `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  setTimeout(() => {
    host.value = ['one', 'two'];
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('continues to dispatch "input" events upon selection after `value` is set programmatically', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        value="Label"
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Three"
        value="three"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  host.value = ['one', 'two'];
  click(host.querySelector('glide-core-dropdown-option:last-of-type'));

  const event = await oneEvent(host, 'input');
  expect(event instanceof Event).to.be.true;
});

it('dispatches one "change" event when an option is selected after Select All is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple select-all>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  await click(host.shadowRoot?.querySelector('[data-test="select-all"]'));

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await click(host.querySelector('glide-core-dropdown-option'));

  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when an option is selected after Select All is clicked', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple select-all>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>

      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  await requestIdleCallback(); // Wait for Floating UI

  await click(host.shadowRoot?.querySelector('[data-test="select-all"]'));

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await click(host.querySelector('glide-core-dropdown-option'));

  expect(spy.callCount).to.equal(1);
});

it('dispatches one "change" event when a tag is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    host.shadowRoot?.querySelector<HTMLElement>('[data-test="tag"]')?.click();
  });

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "input" event when a tag is removed', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" open multiple>
      <glide-core-dropdown-option
        label="Label"
        selected
      ></glide-core-dropdown-option>

      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  setTimeout(() => {
    host.shadowRoot?.querySelector<HTMLElement>('[data-test="tag"]')?.click();
  });

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await aTimeout(0);
  expect(spy.callCount).to.equal(1);
});
