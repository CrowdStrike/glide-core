import { aTimeout, expect, fixture, html } from '@open-wc/testing';
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

it('sets `ariaDisabled` and `tabIndex` when disabled programmatically', async () => {
  const host = await fixture<TabGroupTab>(html`
    <glide-core-tab-group-tab
      label="Label"
      panel="panel"
    ></glide-core-tab-group-tab>
  `);

  host.disabled = true;
  await host.updateComplete;

  expect(host?.ariaDisabled).to.equal('true');
  expect(host?.tabIndex).to.equal(-1);
});

it('sets `selected` when `privateSelect()` is called', async () => {
  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab
      label="Label"
      panel="1"
    ></glide-core-tab-group-tab>`,
  );

  setTimeout(() => {
    host.privateSelect();
  });

  await aTimeout(0);

  expect(host.selected).to.be.true;
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
