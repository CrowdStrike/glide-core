import './drawer.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsDrawer from './drawer.js';
import expectArgumentError from './library/expect-argument-error.js';

CsDrawer.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-drawer')).to.equal(CsDrawer);
});

it('adds an aria-label when "label" is set', async () => {
  const drawer = await fixture<CsDrawer>(
    html`<cs-drawer label="label">Drawer content</cs-drawer>`,
  );

  expect(drawer.shadowRoot?.querySelector('aside')?.ariaLabel).to.equal(
    'label',
  );
});

it('does not add an aria-label when "label" is unset', async () => {
  const drawer = await fixture<CsDrawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  expect(drawer.shadowRoot?.querySelector('aside')).to.not.have.attribute(
    'aria-label',
  );
});

it('can have a default slot', async () => {
  const drawer = await fixture<CsDrawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  drawer.open();

  expect(drawer.textContent).to.equal('Drawer content');
});

it('sets the width of the element based on the "--width" CSS variable', async () => {
  const styledDiv = document.createElement('div');
  styledDiv.setAttribute('style', '--width: 750px');

  const drawer = await fixture<CsDrawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
    { parentNode: styledDiv },
  );

  drawer.open();

  expect(drawer.shadowRoot?.querySelector('aside')?.clientWidth).to.equal(750);
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`<cs-drawer></cs-drawer>`);
  });
});
