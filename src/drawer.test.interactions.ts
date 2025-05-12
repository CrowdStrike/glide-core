import { assert, expect, fixture, html } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import sinon from 'sinon';
import Drawer from './drawer.js';

it('can be opened programmatically when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const host = await fixture<Drawer>(
    html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
  );

  host.open = true;

  const aside = host.shadowRoot?.querySelector('[data-test="component"]');

  const animationPromises = aside
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);
  await Promise.allSettled(animationPromises);

  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

it('can be opened programmatically when not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<Drawer>(
    html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
  );

  host.open = true;
  await host.updateComplete;

  const aside = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

it('can be closed programmatically when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const host = await fixture<Drawer>(
    html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
  );

  host.open = false;

  const aside = host.shadowRoot?.querySelector('[data-test="component"]');

  const animationPromises = aside
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);
  await Promise.allSettled(animationPromises);

  expect(aside?.checkVisibility({ visibilityProperty: true })).to.not.be.ok;
});

it('can be closed programmatically when not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<Drawer>(
    html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
  );

  host.open = false;
  await host.updateComplete;

  const aside = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  );

  expect(aside?.checkVisibility({ visibilityProperty: true })).to.not.be.ok;
});

it('has `set open(isOpen: boolean)` coverage', async () => {
  const stub = sinon.stub(console, 'error');

  const host = await fixture<Drawer>(
    html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
  );

  host.open = false;
  await host.updateComplete;

  host.open = true;
  await host.updateComplete;

  const animationPromises = host.shadowRoot
    ?.querySelector('[data-test="component"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);
  await Promise.allSettled(animationPromises);

  stub.restore();
});
