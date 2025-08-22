import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import TabsTab from './tabs.tab.js';

@customElement('glide-core-subclassed')
class Subclassed extends TabsTab {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tabs-tab')).to.equal(TabsTab);
});

it('sets `ariaDisabled` and `tabIndex` when disabled', async () => {
  const host = await fixture<TabsTab>(html`
    <glide-core-tabs-tab
      label="Label"
      panel="panel"
      disabled
    ></glide-core-tabs-tab>
  `);

  expect(host?.ariaDisabled).to.equal('true');
  expect(host?.tabIndex).to.equal(-1);
});

it('throws when `panel` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-tabs-tab label="Label"></glide-core-tabs-tab>`,
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
