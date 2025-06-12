import './option.js';
import './options.js';
import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { click } from './library/mouse.js';
import Menu from './menu.js';

it('dispatches a "click" event when an option is selected via mouse', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  option?.addEventListener('click', spy);

  await aTimeout(0); // Wait for Floating UI
  click(option);

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
  expect(spy.callCount).to.equal(1);
});

it('dispatches a "click" event when an option is selected via Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  option?.addEventListener('click', spy);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  sendKeys({ press: ' ' });

  assert(option);
  const event = await oneEvent(option, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
  expect(spy.callCount).to.equal(1);
});

it('sets the target of its "click" event to itself when an element in its slot is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            slot="icon"
            height="1rem"
            width="1rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const option = host.querySelector('glide-core-option');
  assert(option);

  await aTimeout(0); // Wait for Floating UI
  click(host.querySelector('svg'));

  const event = await oneEvent(option, 'click');
  expect(event.target).to.equal(option);
});

it('dispatches a "click" event when an option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  option?.addEventListener('click', spy);

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'Enter' });

  assert(option);
  const event = await oneEvent(option, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(option);
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "click" event when a disabled option is selected via mouse', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label" disabled></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  await aTimeout(0); // Wait for Floating UI
  option?.addEventListener('click', spy);
  await click(option);

  expect(spy.callCount).to.equal(0);
});

// TODO: test that enabled option is clicked this way?
it('does not dispatch a "click" event when a disabled option is focused then selected via Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const spy = sinon.spy();
  const options = host.querySelectorAll('glide-core-option');

  host.addEventListener('click', spy);

  await aTimeout(0); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "click" event when a disabled option is focused then selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const spy = sinon.spy();
  const options = host.querySelectorAll('glide-core-option');

  host.addEventListener('click', spy);

  await aTimeout(0); // Wait for Floating UI
  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('does not let submenu target "click" events propagate', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const targets = host.querySelectorAll('button');
  const spy = sinon.spy();

  host.querySelector('glide-core-options')?.addEventListener('click', spy);

  await aTimeout(0); // Wait for Floating UI
  await click(targets[1]);

  expect(spy.callCount).to.equal(0);
});

it('cancels "click" events that come from a submenu target whose parent option is a link', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" href="/">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const targets = host.querySelectorAll('button');

  await aTimeout(0); // Wait for Floating UI
  click(targets[1]);

  assert(targets[1]);
  const event = await oneEvent(targets[1], 'click');

  // We're listening for "click" on the target directly. So the listener here will be
  // called before `#onTargetSlotClick()`. Waiting a ticket gives `#onTargetSlotClick()`
  // a chance to be called.
  await aTimeout(0);

  expect(event.defaultPrevented).to.be.true;
});
