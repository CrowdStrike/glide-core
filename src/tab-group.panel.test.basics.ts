import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import TabGroupPanel from './tab-group.panel.js';

@customElement('glide-core-subclassed')
class Subclassed extends TabGroupPanel {}

it('throws when `name` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-tab-group-panel>Panel</glide-core-tab-group-panel>`,
    );
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
