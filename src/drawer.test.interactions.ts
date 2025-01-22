/* eslint-disable @typescript-eslint/no-unused-expressions */

import { assert, expect, fixture, html } from '@open-wc/testing';
import { emulateMedia, sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreDrawer from './drawer.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('opens when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

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

it('opens when not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Content</glide-core-drawer>`,
  );

  component.open = true;
  await component.updateComplete;

  const aside = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

it('closes when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

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

it('closes when not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  component.open = false;
  await component.updateComplete;

  const aside = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  );

  expect(aside?.checkVisibility({ visibilityProperty: true })).to.not.be.ok;
});

it('closes on Escape', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="component"]')
    ?.focus();

  await sendKeys({ press: 'Escape' });

  expect(component.open).to.be.false;
});

it('has `set open(isOpen: boolean)` coverage', async () => {
  const stub = sinon.stub(console, 'error');

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Content</glide-core-drawer>`,
  );

  component.open = false;
  await component.updateComplete;

  component.open = true;
  await component.updateComplete;

  const animationPromises = component.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);
  await Promise.allSettled(animationPromises);

  stub.restore();
});
