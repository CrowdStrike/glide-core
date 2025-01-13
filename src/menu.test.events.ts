/* eslint-disable @typescript-eslint/no-unused-expressions */

import './menu.js';
import './menu.link.js';
import './menu.options.js';
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
import type GlideCoreMenu from './menu.js';

it('dispatches one link "click" event when a link is selected via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const link = component.querySelector('glide-core-menu-link');

  link?.addEventListener('click', spy);
  click(link);

  const event = await oneEvent(component, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(link);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one button "click" event when a button is selected via click', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const button = component.querySelector('glide-core-menu-button');

  assert(button);

  button.addEventListener('click', spy);
  click(button);

  const event = await oneEvent(button, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(button);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one link "click" event when a link is selected via Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const link = component.querySelector('glide-core-menu-link');

  assert(link);

  link.addEventListener('click', spy);
  component.querySelector('button')?.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(link, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(link);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one button "click" event when a button is selected via Space', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const button = component.querySelector('glide-core-menu-button');

  assert(button);

  button.addEventListener('click', spy);
  component.querySelector('button')?.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(button, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(button);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one link "click" event when a link is selected via Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const link = component.querySelector('glide-core-menu-link');

  assert(link);

  link.addEventListener('click', spy);
  component.querySelector('button')?.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(link, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(link);
  expect(spy.callCount).to.equal(1);
});

it('dispatches one button "click" event when a button is selected via Enter', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const button = component.querySelector('glide-core-menu-button');

  assert(button);

  button.addEventListener('click', spy);
  component.querySelector('button')?.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(button, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(button);
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch a "click" event when a disabled link is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link" disabled></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const link = component.querySelector('glide-core-menu-link');

  link?.addEventListener('click', spy);
  await click(link);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "click" event when a disabled button is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button
          label="Button"
          disabled
        ></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  const button = component.querySelector('glide-core-menu-button');

  button?.addEventListener('click', spy);
  await click(button);

  expect(spy.callCount).to.equal(0);
});
