import { emulateMedia, sendKeys } from '@web/test-runner-commands';
import {
  assert,
  aTimeout,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import './tabs.tab.js';
import { click } from './library/mouse.js';
import Tabs from './tabs.js';
import './tabs.panel.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('sets the selected tab using the `selected` attribute', async () => {
  const host = await fixture<Tabs>(html`
    <glide-core-tabs>
      <glide-core-tabs-tab panel="1" slot="nav">One</glide-core-tabs-tab>
      <glide-core-tabs-tab panel="2" slot="nav" selected
        >Two</glide-core-tabs-tab
      >
      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[1]?.selected).to.be.true;
});

it('selects a tab that is selected programmatically', async () => {
  const host = await fixture<Tabs>(html`
    <glide-core-tabs>
      <glide-core-tabs-tab panel="1" slot="nav" selected
        >One</glide-core-tabs-tab
      >
      <glide-core-tabs-tab panel="2" slot="nav">Two</glide-core-tabs-tab>
      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');
  const panels = host.querySelectorAll('glide-core-tabs-panel');

  assert(tabs[1]);
  tabs[1].selected = true;

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.true;
  expect(tabs[1]?.tabIndex).to.equal(0);

  expect(panels[0]?.ariaHidden).to.equal('true');
  expect(panels[1]?.ariaHidden).to.equal('false');
});

it('selects its first tab when its selected tab is deselected programmatically', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
      <glide-core-tabs-tab slot="nav" panel="2" selected
        >Two</glide-core-tabs-tab
      >

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');
  const panels = host.querySelectorAll('glide-core-tabs-panel');

  assert(tabs[1]);

  tabs[1].selected = false;
  await tabs[1].updateComplete;

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[0]?.tabIndex).to.equal(0);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);

  expect(panels[0]?.ariaHidden).to.equal('false');
  expect(panels[1]?.ariaHidden).to.equal('true');
});

it('changes tabs on click', async () => {
  const host = await fixture<Tabs>(html`
    <glide-core-tabs>
      <glide-core-tabs-tab panel="1" slot="nav">One</glide-core-tabs-tab>
      <glide-core-tabs-tab panel="2" slot="nav">Two</glide-core-tabs-tab>
      <glide-core-tabs-tab panel="3" slot="nav" disabled
        >Three</glide-core-tabs-tab
      >

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
      <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');
  const panels = host.querySelectorAll('glide-core-tabs-panel');

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[2]?.selected).to.be.false;

  expect(panels[0]?.ariaHidden).to.equal('false');
  expect(panels[1]?.ariaHidden).to.equal('true');
  expect(panels[2]?.ariaHidden).to.equal('true');

  await click(tabs[1]);

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[1]?.selected).to.be.true;
  expect(tabs[2]?.selected).to.be.false;

  expect(panels[0]?.ariaHidden).to.equal('true');
  expect(panels[1]?.ariaHidden).to.equal('false');
  expect(panels[2]?.ariaHidden).to.equal('true');

  await click(tabs[2]);

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[1]?.selected).to.be.true;
  expect(tabs[2]?.selected).to.be.false;

  expect(panels[0]?.ariaHidden).to.equal('true');
  expect(panels[1]?.ariaHidden).to.equal('false');
  expect(panels[2]?.ariaHidden).to.equal('true');
});

it('changes tabs on keyboard interaction', async () => {
  const host = await fixture<Tabs>(html`
    <glide-core-tabs>
      <glide-core-tabs-tab panel="1" slot="nav">One</glide-core-tabs-tab>
      <glide-core-tabs-tab panel="2" slot="nav" disabled
        >Two</glide-core-tabs-tab
      >
      <glide-core-tabs-tab panel="3" slot="nav">Three</glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
      <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');

  tabs[0]?.focus();

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(0);
  expect(tabs[2]?.selected).to.be.false;
  expect(tabs[2]?.tabIndex).to.equal(-1);

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);
  expect(tabs[2]?.selected).to.be.true;
  expect(tabs[2]?.tabIndex).to.equal(0);

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[0]?.tabIndex).to.equal(0);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);
  expect(tabs[2]?.selected).to.be.false;
  expect(tabs[2]?.tabIndex).to.equal(-1);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);
  expect(tabs[2]?.selected).to.be.true;
  expect(tabs[2]?.tabIndex).to.equal(0);

  await sendKeys({ press: 'Home' });
  await sendKeys({ press: 'Enter' });

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[0]?.tabIndex).to.equal(0);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);
  expect(tabs[2]?.selected).to.be.false;
  expect(tabs[2]?.tabIndex).to.equal(-1);

  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Enter' });

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);
  expect(tabs[2]?.selected).to.be.true;
  expect(tabs[2]?.tabIndex).to.equal(0);
});

it('has overflow buttons when overflowing', async () => {
  const parentNode = document.createElement('div');
  parentNode.style.width = '9rem';

  const host = await fixture(
    html`
      <glide-core-tabs>
        <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="3">Three</glide-core-tabs-tab>

        <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
        <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
        <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
      </glide-core-tabs>
    `,
    { parentNode },
  );

  await waitUntil(() => {
    return (
      host.shadowRoot?.querySelector('[data-test="overflow-start-button"]') &&
      host.shadowRoot?.querySelector('[data-test="overflow-end-button"]')
    );
  });
});

it('does not have overflow buttons when not overflowing', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
      <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>
      <glide-core-tabs-tab slot="nav" panel="3">Three</glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
      <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const startButton = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="overflow-start-button"]',
  );

  const endButton = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="overflow-end-button"]',
  );

  expect(startButton).to.be.null;
  expect(endButton).to.be.null;
});

it('hides its overflow buttons when overall tab content is reduced', async () => {
  // The selected tab indicator transitions its width and position. The transitions
  // are disabled to simplify and speed up the test.
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab slot="nav" panel="1"
        >${'x'.repeat(500)}</glide-core-tabs-tab
      >
      <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>
      <glide-core-tabs-tab slot="nav" panel="3">Three</glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
      <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  await waitUntil(() => {
    return (
      host.shadowRoot?.querySelector('[data-test="overflow-start-button"]') &&
      host.shadowRoot?.querySelector('[data-test="overflow-end-button"]')
    );
  });

  const firstTab = host.querySelector('glide-core-tabs-tab');

  assert(firstTab);
  firstTab.innerHTML = 'One';

  await waitUntil(() => {
    return (
      !host.shadowRoot?.querySelector('[data-test="overflow-start-button"]') &&
      !host.shadowRoot?.querySelector('[data-test="overflow-end-button"]')
    );
  });

  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('disables its overflow buttons on scroll', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const parentNode = document.createElement('div');
  parentNode.style.width = '9rem';

  const host = await fixture(
    html`
      <glide-core-tabs>
        <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="3">Three</glide-core-tabs-tab>

        <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
        <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
        <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
      </glide-core-tabs>
    `,
    { parentNode },
  );

  await waitUntil(() => {
    return (
      host.shadowRoot?.querySelector('[data-test="overflow-start-button"]') &&
      host.shadowRoot?.querySelector('[data-test="overflow-end-button"]')
    );
  });

  const startButton = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="overflow-start-button"]',
  );

  const endButton = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="overflow-end-button"]',
  );

  const tabList = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="tablist"]',
  );

  assert(tabList);

  tabList.scrollLeft = tabList.scrollWidth;
  await waitUntil(() => !startButton?.disabled);
  expect(endButton?.disabled).to.be.true;

  tabList.scrollLeft = 0;
  await waitUntil(() => !endButton?.disabled);
  expect(startButton?.disabled).to.be.true;

  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('scrolls when its overflow buttons are clicked', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const parentNode = document.createElement('div');
  parentNode.style.width = '9rem';

  const host = await fixture(
    html`
      <glide-core-tabs>
        <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="3">Three</glide-core-tabs-tab>

        <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
        <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
        <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
      </glide-core-tabs>
    `,
    { parentNode },
  );

  await waitUntil(() => {
    return (
      host.shadowRoot?.querySelector('[data-test="overflow-start-button"]') &&
      host.shadowRoot?.querySelector('[data-test="overflow-end-button"]')
    );
  });

  const startButton = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="overflow-start-button"]',
  );

  const endButton = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="overflow-end-button"]',
  );

  const tabList = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="tablist"]',
  );

  await click(endButton);
  expect(tabList?.scrollLeft).to.be.greaterThan(0);

  await waitUntil(() => !startButton?.disabled);
  await click(startButton);
  expect(tabList?.scrollLeft).to.equal(0);

  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('has no overflow buttons when resized to not overflow', async () => {
  const parentNode = document.createElement('div');
  parentNode.style.width = '8rem';

  const host = await fixture(
    html`
      <glide-core-tabs>
        <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>
        <glide-core-tabs-tab slot="nav" panel="3">Three</glide-core-tabs-tab>

        <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
        <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
        <glide-core-tabs-panel name="3">Three</glide-core-tabs-panel>
      </glide-core-tabs>
    `,
    { parentNode },
  );

  await waitUntil(() => {
    return (
      host.shadowRoot?.querySelector('[data-test="overflow-start-button"]') &&
      host.shadowRoot?.querySelector('[data-test="overflow-end-button"]')
    );
  });

  parentNode.style.width = 'auto';

  await waitUntil(
    () =>
      host.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ) === null &&
      host.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      ) === null,
  );
});

it('sets the selected tab as tabbable on tab blur', async () => {
  const host = await fixture<Tabs>(html`
    <glide-core-tabs>
      <glide-core-tabs-tab panel="1" slot="nav">One</glide-core-tabs-tab>
      <glide-core-tabs-tab panel="2" slot="nav">Two</glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[0]?.tabIndex).to.equal(0);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);

  tabs[0]?.focus();
  await sendKeys({ press: 'ArrowRight' });

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(0);

  await click(document.body);

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[0]?.tabIndex).to.equal(0);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);
});

it('can be nested', async () => {
  const host = await fixture<Tabs>(html`
    <glide-core-tabs>
      <glide-core-tabs-tab panel="1" slot="nav">One</glide-core-tabs-tab>
      <glide-core-tabs-tab panel="2" slot="nav">Two</glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>

      <glide-core-tabs-panel name="2">
        <glide-core-tabs>
          <glide-core-tabs-tab panel="1" slot="nav">One</glide-core-tabs-tab>
          <glide-core-tabs-tab panel="2" slot="nav">Two</glide-core-tabs-tab>

          <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
          <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
        </glide-core-tabs>
      </glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');
  const panels = host.querySelectorAll('glide-core-tabs-panel');

  tabs[1]?.click();
  await host.updateComplete;

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[1]?.selected).to.be.true;
  expect(tabs[2]?.selected).to.be.true;
  expect(tabs[3]?.selected).to.be.false;

  expect(panels[0]?.ariaHidden).to.equal('true');
  expect(panels[1]?.ariaHidden).to.equal('false');
  expect(panels[2]?.ariaHidden).to.equal('false');
  expect(panels[3]?.ariaHidden).to.equal('true');

  tabs[0]?.click();
  await host.updateComplete;

  expect(tabs[0]?.selected).to.be.true;
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[2]?.selected).to.be.true;
  expect(tabs[3]?.selected).to.be.false;

  expect(panels[0]?.ariaHidden).to.equal('false');
  expect(panels[1]?.ariaHidden).to.equal('true');
  expect(panels[2]?.ariaHidden).to.equal('false');
  expect(panels[3]?.ariaHidden).to.equal('true');
});

it('updates the width of its selected tab indicator when the label of a tab changes', async () => {
  // The selected tab indicator transitions its width and position. The transitions
  // are disabled to simplify and speed up the test.
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
      <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const firstTab = host
    .querySelector('glide-core-tabs-tab')
    ?.shadowRoot?.querySelector('[data-test="component"]');

  const selectedTabIndicator = host.shadowRoot?.querySelector(
    '[data-test="selected-tab-indicator"]',
  );

  assert(firstTab);
  assert(selectedTabIndicator);

  await requestIdleCallback(); // Wait for the Resize Observer
  firstTab.innerHTML = 'One (But Longer)';

  await requestIdleCallback(); // Wait for the Resize Observer
  expect(selectedTabIndicator?.clientWidth).to.equal(firstTab.clientWidth);

  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('sets aria attributes on tabs and panels when new ones are added', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
      <glide-core-tabs-tab slot="nav" panel="2">Two</glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tab = document.createElement('glide-core-tabs-tab');
  tab.slot = 'nav';
  tab.panel = '3';
  tab.textContent = 'Three';

  const panel = document.createElement('glide-core-tabs-panel');
  panel.name = '3';
  panel.textContent = 'Three';

  host.append(tab);
  host.append(panel);

  // Wait for `#onNavSlotChange()` and `#onDefaultSlotChange()`.
  await aTimeout(0);

  expect(tab.getAttribute('aria-controls')).to.equal(panel.id);
  expect(panel.getAttribute('aria-labelledby')).to.equal(tab.id);
});

it('deselects all but its last selected tab when multiple are selected', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab slot="nav" panel="1">One</glide-core-tabs-tab>
      <glide-core-tabs-tab slot="nav" panel="2" selected
        >Two</glide-core-tabs-tab
      >

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="2">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tab = document.createElement('glide-core-tabs-tab');
  tab.selected = true;
  tab.slot = 'nav';
  tab.panel = '3';
  tab.textContent = 'Three';

  const panel = document.createElement('glide-core-tabs-panel');
  panel.name = '3';
  panel.textContent = 'Three';

  host.append(tab);
  host.append(panel);

  // Wait for `#onNavSlotChange()` and `#onDefaultSlotChange()`.
  await aTimeout(0);

  const tabs = host.querySelectorAll('glide-core-tabs-tab');
  const panels = host.querySelectorAll('glide-core-tabs-panel');

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[0]?.tabIndex).to.equal(-1);
  expect(tabs[1]?.selected).to.be.false;
  expect(tabs[1]?.tabIndex).to.equal(-1);
  expect(tabs[2]?.selected).to.be.true;
  expect(tabs[2]?.tabIndex).to.equal(0);

  expect(panels[0]?.ariaHidden).to.equal('true');
  expect(panels[1]?.ariaHidden).to.equal('true');
  expect(panels[2]?.ariaHidden).to.equal('false');
});
