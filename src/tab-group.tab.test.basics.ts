import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import TabGroupTab from './tab-group.tab.js';

@customElement('glide-core-subclassed')
class Subclassed extends TabGroupTab {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tab-group-tab')).to.equal(
    TabGroupTab,
  );
});

it('sets `ariaDisabled` and `tabIndex` when disabled', async () => {
  const host = await fixture<TabGroupTab>(html`
    <glide-core-tab-group-tab
      label="Label"
      panel="panel"
      disabled
    ></glide-core-tab-group-tab>
  `);

  expect(host?.ariaDisabled).to.equal('true');
  expect(host?.tabIndex).to.equal(-1);
});

it('throws when `panel` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-tab-group-tab label="Label"></glide-core-tab-group-tab>`,
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
