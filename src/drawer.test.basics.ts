/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import GlideCoreDrawer from './drawer.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(globalThis.customElements.get('glide-core-drawer')).to.equal(
    GlideCoreDrawer,
  );
});

it('adds an `aria-label` when `label` is set', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer label="label">Drawer content</glide-core-drawer>`,
  );

  expect(component.shadowRoot?.querySelector('aside')?.ariaLabel).to.equal(
    'label',
  );
});

it('does not add an `aria-label` when `label` is unset', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  expect(component.shadowRoot?.querySelector('aside')).to.not.have.attribute(
    'aria-label',
  );
});

it('can have a default slot', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  expect(component.textContent).to.equal('Drawer content');
});

it('sets the width of the drawer based on the `--width` CSS variable', async () => {
  const styledDiv = document.createElement('div');
  styledDiv.setAttribute('style', '--width: 750px');

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
    { parentNode: styledDiv },
  );

  component.show();

  await elementUpdated(component);

  const animationPromises = component.shadowRoot
    ?.querySelector('[data-test="open"]')
    ?.getAnimations()
    ?.map((animation) => animation.finished);

  assert(animationPromises);

  await Promise.allSettled(animationPromises);

  expect(component.shadowRoot?.querySelector('aside')?.clientWidth).to.equal(
    750,
  );
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`<glide-core-drawer></glide-core-drawer>`);
  });
});

it('adds a class when the `pinned` attribute is set', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer pinned>Drawer content</glide-core-drawer>`,
  );

  component.show();

  expect(
    component.shadowRoot?.querySelector('aside')?.classList.contains('pinned'),
  ).to.be.true;
});

it('does not add a class when the `pinned` attribute is not set', async () => {
  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  component.show();

  expect(
    component.shadowRoot?.querySelector('aside')?.classList.contains('pinned'),
  ).to.be.false;
});

it('opens when the `open` attribute is set', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  expect(component.shadowRoot?.querySelector('[data-test="closed"]')).to.be.not
    .null;

  component.open = true;

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="open"]')).to.be.not
    .null;
});

it('opens the drawer when the `open` attribute is set when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  expect(component.shadowRoot?.querySelector('[data-test="closed"]')).to.be.not
    .null;

  component.open = true;

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="open"]')).to.be.not
    .null;
});

it('closes the drawer when the `open` attribute is removed', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Drawer content</glide-core-drawer>`,
  );

  expect(component.shadowRoot?.querySelector('aside[data-test="open"]')).to.be
    .not.null;

  component.removeAttribute('open');

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="closed"]')).to.be.not
    .null;
});

it('closes the drawer when the `open` attribute is removed when animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const component = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer open>Drawer content</glide-core-drawer>`,
  );

  expect(component.shadowRoot?.querySelector('aside[data-test="open"]')).to.be
    .not.null;

  component.removeAttribute('open');

  await elementUpdated(component);

  expect(component.shadowRoot?.querySelector('[data-test="closed"]')).to.be.not
    .null;
});
