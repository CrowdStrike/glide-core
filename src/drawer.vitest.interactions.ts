/* eslint-disable @typescript-eslint/no-unused-expressions */

import { assert, expect, test } from 'vitest';
import { elementUpdated, fixture, html } from '@open-wc/testing-helpers';
import { server } from '@vitest/browser/context';
import { userEvent } from '@vitest/browser/context';
import GlideCoreDrawer from './drawer.js';
import sinon from 'sinon';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

test('opens when animated', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  component.open = true;

  const aside = component.shadowRoot?.querySelector('[data-test="component"]');

  const animationPromises = aside
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);
  await Promise.allSettled(animationPromises);

  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

test('opens when not animated', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  component.open = true;
  await elementUpdated(component);

  const aside = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

test('closes when animated', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  component.open = false;

  const aside = component.shadowRoot?.querySelector('[data-test="component"]');

  const animationPromises = aside
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);
  await Promise.allSettled(animationPromises);

  expect(aside?.checkVisibility({ visibilityProperty: true })).to.not.be.ok;
});

test('closes when not animated', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  component.open = false;
  await elementUpdated(component);

  const aside = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  );

  expect(aside?.checkVisibility({ visibilityProperty: true })).to.not.be.ok;
});

test('closes on Escape', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="component"]')
    ?.focus();

  await userEvent.keyboard('{escape}');

  expect(component.open).to.be.false;
});

test('has `this.#closeAnimation?.cancel()` coverage', async () => {
  await server.commands.emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  component.open = true;
  await elementUpdated(component);

  component.open = false;
  await elementUpdated(component);

  component.open = true;
  await elementUpdated(component);
});
