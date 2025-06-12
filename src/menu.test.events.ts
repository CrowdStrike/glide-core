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

  await aTimeout(0); // Wait for Floating UI

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  option?.addEventListener('click', spy);
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

  await aTimeout(0); // Wait for Floating UI

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  option?.addEventListener('click', spy);

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

it('dispatches a "click" event when an option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  option?.addEventListener('click', spy);

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

  await aTimeout(0); // Wait for Floating UI

  const spy = sinon.spy();
  const option = host.querySelector('glide-core-option');

  option?.addEventListener('click', spy);
  await click(option);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "click" event when a disabled option is selected via Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const spy = sinon.spy();
  const options = host.querySelectorAll('glide-core-option');

  host.addEventListener('click', spy);
  options[0]?.focus();
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "click" event when a disabled option is selected via Enter', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-option label="One" disabled></glide-core-option>
        <glide-core-option label="Two"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI

  const spy = sinon.spy();
  const options = host.querySelectorAll('glide-core-option');

  host.addEventListener('click', spy);
  options[0]?.focus();
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});
