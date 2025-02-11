import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTabPanel from './tab.panel.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTabPanel {}

it('throws when `name` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-tab-panel>Panel</glide-core-tab-panel>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
