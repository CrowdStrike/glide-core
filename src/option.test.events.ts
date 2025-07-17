import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import Option from './option.js';
import './options.js';
import './menu.js';
import { click, hover } from './library/mouse.js';
import pencilIcon from './icons/pencil.js';

it('dispatches a "click" event when clicked via mouse', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  click(host);

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(host);
});

it('dispatches a "click" event when clicked via `click()`', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  setTimeout(() => {
    host.click();
  });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(host);
});

it('does not dispatch a "click" event when disabled and clicked via mouse', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label" disabled></glide-core-option>`,
  );

  const spy = sinon.spy();

  host.addEventListener('click', spy);
  await click(host);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "click" event when disabled and clicked via `click()`', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label" disabled></glide-core-option>`,
  );

  const spy = sinon.spy();

  host.addEventListener('click', spy);
  host.click();

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "private-disabled-change" event when enabled programmatically', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label" disabled></glide-core-option>`,
  );

  const spy = sinon.spy();

  host.addEventListener('private-disabled-change', spy);
  host.disabled = false;

  expect(spy.callCount).to.equal(1);
});

it('dispatches a "private-disabled-change" event when disabled programmatically', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label="Label"></glide-core-option>`,
  );

  const spy = sinon.spy();

  host.addEventListener('private-disabled-change', spy);
  host.disabled = true;

  expect(spy.callCount).to.equal(1);
});

it('does not allow its "toggle" event to propagate', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option label=${'x'.repeat(500)}></glide-core-option>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  await hover(host);
  host.privateTooltipOpen = true;

  await aTimeout(0); // Wait for the Resize Observer to do its thing

  expect(spy.callCount).to.equal(0);
});

it('cancels navigation on click when disabled', async () => {
  const host = await fixture<Option>(
    html`<glide-core-option
      label="Label"
      href="/"
      disabled
    ></glide-core-option>`,
  );

  const tooltip = host?.shadowRoot?.querySelector('[data-test="tooltip"]');
  let wasNavigationCanceled = false;

  tooltip?.addEventListener('click', (event: Event) => {
    wasNavigationCanceled = event.defaultPrevented;

    // Cancel the event in case the component didn't. That way the browser doesn't
    // navigate during the test.
    event.preventDefault();
  });

  await aTimeout(0); // Wait for Floating UI
  await click(tooltip);

  expect(wasNavigationCanceled).to.be.true;
});

it('retargets content "click" events to itself', async () => {
  const host = await fixture(
    html`<glide-core-option label="One">
      <div slot="content">${pencilIcon} One</div>
      <glide-core-option label="Two" slot="content"></glide-core-option>
    </glide-core-option>`,
  );

  const icon = host.querySelector('svg');
  click(icon);

  const event = await oneEvent(host, 'click');
  expect(event.target).to.equal(host);
});

it('does not retarget nested option "click" events to itself', async () => {
  const host = await fixture(
    html`<glide-core-option label="One">
      <glide-core-menu slot="submenu" open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Two"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>
    </glide-core-option>`,
  );

  const nestedOption = host.querySelector('glide-core-option');

  await aTimeout(0); // Wait for Floating UI

  click(nestedOption);

  const event = await oneEvent(host, 'click');
  expect(event.target).to.equal(nestedOption);
});

it('cancels the original "click" event when its icon is clicked', async () => {
  const host = await fixture(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label" href="/">
          <div slot="icon">${pencilIcon}</div>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  let wasOriginalClickCanceled = false;

  // The simulated click via `click()` in `#onComponentClick()`.
  host.addEventListener('click', (event: Event) => {
    // Cancel the event so the browser doesn't navigate during the test.
    event.preventDefault();
  });

  host
    .querySelector('glide-core-option')
    // On the slot because `#onComponentClick()` stops propagation of the event.
    ?.shadowRoot?.querySelector('[data-test="icon-slot"]')
    // The original click. The one we want to verify was canceled.
    ?.addEventListener('click', (event: Event) => {
      // Now wait a tick for `#onComponentClick()` to be called.
      setTimeout(() => {
        wasOriginalClickCanceled = event.defaultPrevented;
      });
    });

  await aTimeout(0); // Wait for the timeout above
  await click(host.querySelector('[slot="icon"]'));

  expect(wasOriginalClickCanceled).to.be.true;
});
