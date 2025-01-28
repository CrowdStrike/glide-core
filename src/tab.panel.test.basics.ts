import { expect } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTabPanel from './tab.panel.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTabPanel {}

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
