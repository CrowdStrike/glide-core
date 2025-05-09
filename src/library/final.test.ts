import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import final from './final.js';

@customElement('glide-core-final')
@final
class Final extends LitElement {}

@customElement('glide-core-subclassed')
class Subclassed extends Final {}

it('throws when a class is extended', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch (error) {
    spy(error);
  }

  expect(spy.callCount).to.equal(1);
  expect(spy.args.at(0)?.at(0) instanceof TypeError).to.be.true;

  expect(spy.args.at(0)?.at(0).message).to.equal(
    `Final doesn't allow extension. Please talk to us if a component doesn't meet your needs.`,
  );
});

it('does not throw when a class is not extended', () => {
  const spy = sinon.spy();

  try {
    new Final();
  } catch (error) {
    spy(error);
  }

  expect(spy.callCount).to.equal(0);
});
