import { emulateMedia, sendKeys } from '@web/test-runner-commands';
import { assert, expect, fixture, html, waitUntil } from '@open-wc/testing';
import Tab from './tab.js';
import { click } from './library/mouse.js';
import TabGroup from './tab.group.js';
import './tab.panel.js';

it('sets the selected tab using the `selected` attribute', async () => {
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav" selected>Two</glide-core-tab>
      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabs = host.querySelectorAll('glide-core-tab');

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[1]?.selected).to.be.true;
});

it('sets the selected tab by setting `selected` programmatically', async () => {
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab panel="1" slot="nav" selected>One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>
      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tab = host.querySelector<Tab>('glide-core-tab:nth-of-type(2)');

  assert(tab);
  tab.selected = true;

  const tabs = host.querySelectorAll('glide-core-tab');

  expect(tabs[0]?.selected).to.be.false;
  expect(tabs[1]?.selected).to.be.true;
});

it('changes tabs on click', async () => {
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>
      <glide-core-tab panel="3" slot="nav" disabled>Three</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
      <glide-core-tab-panel name="3">Three</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabs = host.querySelectorAll('glide-core-tab');
  const panels = host.querySelectorAll('glide-core-tab-panel');

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
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav" disabled>Two</glide-core-tab>
      <glide-core-tab panel="3" slot="nav">Three</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
      <glide-core-tab-panel name="3">Three</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabs = host.querySelectorAll('glide-core-tab');

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
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">One</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Two</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Three</glide-core-tab>

        <glide-core-tab-panel name="1">One</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Three</glide-core-tab-panel>
      </glide-core-tab-group>
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
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">One</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Two</glide-core-tab>
      <glide-core-tab slot="nav" panel="3">Three</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
      <glide-core-tab-panel name="3">Three</glide-core-tab-panel>
    </glide-core-tab-group>
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

it('disables its overflow buttons on scroll', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const parentNode = document.createElement('div');
  parentNode.style.width = '9rem';

  const host = await fixture(
    html`
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">One</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Two</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Three</glide-core-tab>

        <glide-core-tab-panel name="1">One</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Three</glide-core-tab-panel>
      </glide-core-tab-group>
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
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">One</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Two</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Three</glide-core-tab>

        <glide-core-tab-panel name="1">One</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Three</glide-core-tab-panel>
      </glide-core-tab-group>
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
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">One</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Two</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Three</glide-core-tab>

        <glide-core-tab-panel name="1">One</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Three</glide-core-tab-panel>
      </glide-core-tab-group>
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
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabs = host.querySelectorAll('glide-core-tab');

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
  const host = await fixture<TabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>

      <glide-core-tab-panel name="2">
        <glide-core-tab-group>
          <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
          <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>

          <glide-core-tab-panel name="1">One</glide-core-tab-panel>
          <glide-core-tab-panel name="2">Two</glide-core-tab-panel>
        </glide-core-tab-group>
      </glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabs = host.querySelectorAll('glide-core-tab');
  const panels = host.querySelectorAll('glide-core-tab-panel');

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
