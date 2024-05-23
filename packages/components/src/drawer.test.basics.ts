import './drawer.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import Drawer from './drawer.js';
import sinon from 'sinon';

Drawer.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-drawer')).to.equal(Drawer);
});

it('has defaults', async () => {
  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  expect(drawer.hasAttribute('open')).to.be.false;
});

it('can have a default slot', async () => {
  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
  );

  drawer.open();

  expect(drawer.textContent).to.equal('Drawer content');
});

it('sets the width of the element based on the "--width" CSS variable', async () => {
  const styledDiv = document.createElement('div');
  styledDiv.setAttribute('style', '--width: 750px');

  const drawer = await fixture<Drawer>(
    html`<cs-drawer>Drawer content</cs-drawer>`,
    { parentNode: styledDiv },
  );

  drawer.open();

  expect(drawer.shadowRoot?.querySelector('dialog')?.clientWidth).to.equal(750);
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<Drawer>(html`<cs-drawer></cs-drawer>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});
