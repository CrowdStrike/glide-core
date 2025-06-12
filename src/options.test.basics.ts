import './option.js';
import './menu.js';
import { expect } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Options from './options.js';

// TODO: testing throwing when used outside of Menu or Select
@customElement('glide-core-subclassed')
class Subclassed extends Options {}

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
