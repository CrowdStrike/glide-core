import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import TabGroup from './tab-group.js';
import './tab-group.tab.js';
import TabGroupPanel from './tab-group.panel.js';
import expectWindowError from './library/expect-window-error.js';
import requestIdleCallback from './library/request-idle-callback.js';

@customElement('glide-core-subclassed')
class Subclassed extends TabGroup {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tab-group')).to.equal(TabGroup);

  expect(window.customElements.get('glide-core-tab-group-panel')).to.equal(
    TabGroupPanel,
  );
});

it('selects the first tab when none is selected', async () => {
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  const tabs = host.querySelectorAll('glide-core-tab-group-tab');
  const panels = host.querySelectorAll('glide-core-tab-group-panel');

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
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
        selected
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  const firstTab = host
    .querySelector('glide-core-tab-group-tab:last-of-type')
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
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
        selected
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Three"
        panel="3"
        slot="nav"
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="3">Three</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  await requestIdleCallback(); // Wait for the Resize Observer

  const firstTab = host
    .querySelector('glide-core-tab-group-tab')
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
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
        selected
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Three"
        panel="3"
        slot="nav"
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="3">Three</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  await requestIdleCallback(); // Wait for the Resize Observer

  const middleTab = host
    .querySelector('glide-core-tab-group-tab:nth-of-type(2)')
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
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Three"
        panel="3"
        slot="nav"
        selected
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="3">Three</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  await aTimeout(0); // Wait for the Resize Observer

  const lastTab = host
    .querySelector('glide-core-tab-group-tab:last-of-type')
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
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
        selected
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
        selected
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  const tabs = host.querySelectorAll('glide-core-tab-group-tab');
  const panels = host.querySelectorAll('glide-core-tab-group-panel');

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
      <glide-core-tab-group>
        <glide-core-tab-group-tab
          label="One"
          panel="1"
          slot="nav"
        ></glide-core-tab-group-tab>
        <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>

        <div>Default Content</div>
      </glide-core-tab-group>
    `);
  });
});

it('throws when its "nav" slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <glide-core-tab-group-tab
          label="One"
          panel="1"
          slot="nav"
        ></glide-core-tab-group-tab>
        <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>

        <div slot="nav">Tab 1</div>
      </glide-core-tab-group>
    `);
  });
});

it('throws when a Tab does not have a corresponding Panel', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <glide-core-tab-group-tab
          label="One"
          panel="1"
          slot="nav"
        ></glide-core-tab-group-tab>
      </glide-core-tab-group>
    `);
  });
});

it('throws when a Panel does not have a corresponding Tab', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      </glide-core-tab-group>
    `);
  });
});

it('throws when programmatically adding a Tab without a corresponding Panel', async () => {
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  await expectWindowError(() => {
    const tab = document.createElement('glide-core-tab-group-tab');
    tab.slot = 'nav';
    tab.panel = '2';
    tab.label = 'Two';
    host.append(tab);
  });
});

it('throws when programmatically adding a Panel without a corresponding Tab', async () => {
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  await expectWindowError(() => {
    const panel = document.createElement('glide-core-tab-group-panel');
    panel.name = '2';
    panel.textContent = 'Two';
    host.append(panel);
  });
});
