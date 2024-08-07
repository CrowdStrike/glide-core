/* eslint-disable @typescript-eslint/no-unused-expressions */

import './drawer.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreDrawer from './drawer.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreDrawer.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-drawer')).to.equal(
    GlideCoreDrawer,
  );
});

it('adds an aria-label when "label" is set', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer label="label">Drawer content</glide-core-drawer>`,
  );

  expect(drawer.shadowRoot?.querySelector('aside')?.ariaLabel).to.equal(
    'label',
  );
});

it('does not add an aria-label when "label" is unset', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  expect(drawer.shadowRoot?.querySelector('aside')).to.not.have.attribute(
    'aria-label',
  );
});

it('can have a default slot', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  drawer.open();

  expect(drawer.textContent).to.equal('Drawer content');
});

it('sets the width of the element based on the "--width" CSS variable', async () => {
  const styledDiv = document.createElement('div');
  styledDiv.setAttribute('style', '--width: 750px');

  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
    { parentNode: styledDiv },
  );

  drawer.open();

  expect(drawer.shadowRoot?.querySelector('aside')?.clientWidth).to.equal(750);
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`<glide-core-drawer></glide-core-drawer>`);
  });
});

it('adds a class when the "pinned" attribute is set', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer pinned>Drawer content</glide-core-drawer>`,
  );

  drawer.open();

  expect(
    drawer.shadowRoot?.querySelector('aside')?.classList.contains('pinned'),
  ).to.be.true;
});

it('does not add a class when the "pinned" attribute is not set', async () => {
  const drawer = await fixture<GlideCoreDrawer>(
    html`<glide-core-drawer>Drawer content</glide-core-drawer>`,
  );

  drawer.open();

  expect(
    drawer.shadowRoot?.querySelector('aside')?.classList.contains('pinned'),
  ).to.be.false;
});
