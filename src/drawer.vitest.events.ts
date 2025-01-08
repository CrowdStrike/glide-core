/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, fixture, html } from '@open-wc/testing-helpers';
import { expect, test } from 'vitest';
import { server } from '@vitest/browser/context';
import GlideCoreDrawer from './drawer.js';
import sinon from 'sinon';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

test('dispatches a "toggle" event on open', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  const spy = sinon.spy();
  component.addEventListener('toggle', spy);

  component.open = true;
  await aTimeout(0);

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
  expect(spy.calledWith(sinon.match.has('bubbles', true))).to.be.true;
});

test('dispatches a "toggle" event on close', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  const spy = sinon.spy();
  component.addEventListener('toggle', spy);

  component.open = false;
  await aTimeout(0);

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
  expect(spy.calledWith(sinon.match.has('bubbles', true))).to.be.true;
});

test('does not dispatch a "toggle" event when already open', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  const spy = sinon.spy();
  component.addEventListener('toggle', spy);

  component.open = true;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

test('does not dispatch a "toggle" event when already closed', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  const spy = sinon.spy();
  component.addEventListener('toggle', spy);

  component.open = false;
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
