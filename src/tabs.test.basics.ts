import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Tabs from './tabs.js';
import './tabs.tab.js';
import TabsPanel from './tabs.panel.js';
import expectWindowError from './library/expect-window-error.js';
import requestIdleCallback from './library/request-idle-callback.js';

@customElement('glide-core-subclassed')
class Subclassed extends Tabs {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tabs')).to.equal(Tabs);

  expect(window.customElements.get('glide-core-tabs-panel')).to.equal(
    TabsPanel,
  );
});

it('selects the first tab when none is selected', async () => {
  const host = await fixture<Tabs>(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');
  const panels = host.querySelectorAll('glide-core-tabs-panel');

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[1]?.selected).to.be.false;

  expect(panels[0]?.ariaHidden).to.equal('false');
  expect(panels[1]?.ariaHidden).to.equal('true');
});

it('sets the width of its selected tab indicator to that of the selected tab', async () => {
  // The selected tab indicator transitions its width and position. The transitions
  // are disabled to simplify and speed up the test.
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
        selected
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const firstTab = host
    .querySelector('glide-core-tabs-tab:last-of-type')
    ?.shadowRoot?.querySelector('[data-test="component"]');

  const selectedTabIndicator = host.shadowRoot?.querySelector(
    '[data-test="selected-tab-indicator"]',
  );

  assert(firstTab);
  assert(selectedTabIndicator);

  await requestIdleCallback(); // Wait for the Resize Observer
  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('offsets the width of its tab indicator when its first tab is selected', async () => {
  // The selected tab indicator transitions its width and position. The transitions
  // are disabled to simplify and speed up the test.
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
        selected
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Three"
        panel="3"
        slot="nav"
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
      <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  await requestIdleCallback(); // Wait for the Resize Observer

  const firstTab = host
    .querySelector('glide-core-tabs-tab')
    ?.shadowRoot?.querySelector('[data-test="component"]');

  const selectedTabIndicator = host.shadowRoot?.querySelector(
    '[data-test="selected-tab-indicator"]',
  );

  assert(firstTab);
  assert(selectedTabIndicator);

  await requestIdleCallback(); // Wait for the Resize Observer
  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('offsets the width of its tab indicator when its middle tab is selected', async () => {
  // The selected tab indicator transitions its width and position. The transitions
  // are disabled to simplify and speed up the test.
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
        selected
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Three"
        panel="3"
        slot="nav"
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
      <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  await requestIdleCallback(); // Wait for the Resize Observer

  const middleTab = host
    .querySelector('glide-core-tabs-tab:nth-of-type(2)')
    ?.shadowRoot?.querySelector('[data-test="component"]');

  const selectedTabIndicator = host.shadowRoot?.querySelector(
    '[data-test="selected-tab-indicator"]',
  );

  assert(middleTab);
  assert(selectedTabIndicator);

  await requestIdleCallback(); // Wait for the Resize Observer
  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('offsets the width of its tab indicator when its last tab is selected', async () => {
  // The selected tab indicator transitions its width and position. The transitions
  // are disabled to simplify and speed up the test.
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Three"
        panel="3"
        slot="nav"
        selected
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
      <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  await aTimeout(0); // Wait for the Resize Observer

  const lastTab = host
    .querySelector('glide-core-tabs-tab:last-of-type')
    ?.shadowRoot?.querySelector('[data-test="component"]');

  const selectedTabIndicator = host.shadowRoot?.querySelector(
    '[data-test="selected-tab-indicator"]',
  );

  assert(lastTab);
  assert(selectedTabIndicator);

  await requestIdleCallback(); // Wait for the Resize Observer
  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('deselects all but its last selected tab when multiple are selected', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
        selected
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
        selected
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');
  const panels = host.querySelectorAll('glide-core-tabs-panel');

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.true;
  expect(tabs[1]?.tabIndex).to.equal(0);

  expect(panels[0]?.ariaHidden).to.equal('true');
  expect(panels[1]?.ariaHidden).to.equal('false');
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

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tabs>
        <glide-core-tabs-tab
          label="One"
          panel="1"
          slot="nav"
        ></glide-core-tabs-tab>
        <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>

        <div>Default Content</div>
      </glide-core-tabs>
    `);
  });
});

it('throws when its "nav" slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tabs>
        <glide-core-tabs-tab
          label="One"
          panel="1"
          slot="nav"
        ></glide-core-tabs-tab>
        <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>

        <div slot="nav">Tab 1</div>
      </glide-core-tabs>
    `);
  });
});

it('throws when a Tab does not have a corresponding Panel', async () => {
  const host = await fixture<Tabs>(html` <glide-core-tabs></glide-core-tabs>`);

  await expectWindowError(async () => {
    const tab = document.createElement('glide-core-tabs-tab');
    tab.label = 'Three';
    tab.panel = 'three';
    tab.slot = 'nav';

    host.append(tab);

    await host.updateComplete;
    await aTimeout(0); // Wait for `#validateTabAndPanelPairing()`
  });
});

it('throws when a Panel does not have a corresponding Tab', async () => {
  const host = await fixture<Tabs>(html`<glide-core-tabs></glide-core-tabs>`);

  await expectWindowError(async () => {
    const panel = document.createElement('glide-core-tabs-panel');
    panel.name = 'three';

    host.append(panel);

    await host.updateComplete;
    await aTimeout(0); // Wait for `#validateTabAndPanelPairing()`
  });
});
