/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTabGroup from './tab.group.js';
import GlideCoreTabPanel from './tab.panel.js';
import sinon from 'sinon';

GlideCoreTabGroup.shadowRootOptions.mode = 'open';
GlideCoreTabPanel.shadowRootOptions.mode = 'open';

it('renders an end overflow button on end overflow', async () => {
  const element = await fixture(html`
    <div style="width:25rem">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
        <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
        <glide-core-tab-panel name="5">Content for Tab 5</glide-core-tab-panel>
        <glide-core-tab-panel name="6">Content for Tab 6</glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  const endOverflowButton = tabGroup?.shadowRoot?.querySelector(
    '[data-test="overflow-end-button"]',
  );

  expect(endOverflowButton).to.be.not.null;
});

it('does not render an end overflow button when there is no end overflow', async () => {
  const element = await fixture(html`
    <div style="width:25rem">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
        <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
        <glide-core-tab-panel name="5">Content for Tab 5</glide-core-tab-panel>
        <glide-core-tab-panel name="6">Content for Tab 6</glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton).to.be.not.null;

  endOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      ) === null,
  );
});

it('renders a start overflow button on start overflow', async () => {
  const element = await fixture(html`
    <div style="width:25rem">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
        <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
        <glide-core-tab-panel name="5">Content for Tab 5</glide-core-tab-panel>
        <glide-core-tab-panel name="6">Content for Tab 6</glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  // Need to get the tab group into a state where there
  // is overflow on the right -- do this by first scrolling to the right

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton).to.be.not.null;

  endOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ),
  );
});

it('does not render a start overflow button when there is no start overflow', async () => {
  const element = await fixture(html`
    <div style="width:25rem">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
        <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
        <glide-core-tab-panel name="5">Content for Tab 5</glide-core-tab-panel>
        <glide-core-tab-panel name="6">Content for Tab 6</glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  let startOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-start-button"]',
    );

  expect(endOverflowButton).to.be.not.null;
  expect(startOverflowButton).to.be.null;

  endOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ),
  );

  startOverflowButton = tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="overflow-start-button"]',
  );

  startOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ) === null,
  );
});

it('scrolls tabs when overflow buttons are clicked', async () => {
  const spy = sinon.spy();

  const element = await fixture(html`
    <div style="width:25rem">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
        <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
        <glide-core-tab-panel name="5">Content for Tab 5</glide-core-tab-panel>
        <glide-core-tab-panel name="6">Content for Tab 6</glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  tabGroup?.shadowRoot
    ?.querySelector('[role="tablist"]')
    ?.addEventListener('scroll', spy);

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton).to.be.not.null;

  endOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      ) === null,
  );

  expect(spy.called).to.be.true;

  spy.resetHistory();

  const startOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-start-button"]',
    );

  expect(startOverflowButton).to.be.not.null;

  startOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ) === null,
  );

  expect(spy.called).to.be.true;
});

it('removes overflow buttons when the component is resized and there is no overflow', async () => {
  const element = await fixture(html`
    <div style="width:25rem" data-test="test-parent">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
        <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
        <glide-core-tab-panel name="5">Content for Tab 5</glide-core-tab-panel>
        <glide-core-tab-panel name="6">Content for Tab 6</glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton).to.be.not.null;

  const container = document?.querySelector<HTMLDivElement>(
    '[data-test="test-parent"]',
  );

  expect(container).to.be.not.null;

  container!.style.width = 'auto';

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ) === null &&
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      ) === null,
  );
});

it('renders overflow buttons when the component is resized and there is overflow', async () => {
  const element = await fixture(html`
    <div data-test="test-parent">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>
        <glide-core-tab slot="nav" panel="5">Tab 5</glide-core-tab>
        <glide-core-tab slot="nav" panel="6">Tab 6</glide-core-tab>

        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
        <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
        <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
        <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
        <glide-core-tab-panel name="5">Content for Tab 5</glide-core-tab-panel>
        <glide-core-tab-panel name="6">Content for Tab 6</glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton).to.be.null;

  const container = document?.querySelector<HTMLDivElement>(
    '[data-test="test-parent"]',
  );

  expect(container).to.be.not.null;

  container!.style.width = '25rem';

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ) === null &&
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      ),
  );
});

it('scrolls using keyboard when there is overflow and only a few pixels of overflowed tabs are on-screen', async () => {
  const spy = sinon.spy();

  const element = await fixture(html`
    <div style="width: 17rem;">
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
        <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
        <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>

        <glide-core-tab-panel name="1">Content for tab 1 </glide-core-tab-panel>
        <glide-core-tab-panel name="2">
          Content for tab 2
        </glide-core-tab-panel>
        <glide-core-tab-panel name="3">
          Content for tab 3
        </glide-core-tab-panel>
        <glide-core-tab-panel name="4">
          Content for tab 4
        </glide-core-tab-panel>
      </glide-core-tab-group>
    </div>
  `);

  const tabGroup = element.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  expect(tabGroup).to.be.not.null;

  tabGroup?.shadowRoot
    ?.querySelector('[role="tablist"]')
    ?.addEventListener('scroll', spy);

  tabGroup?.tabElements[0].focus();
  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'ArrowRight' });

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      ) === null,
  );

  expect(tabGroup?.tabElements[3]).to.have.focus;

  expect(spy.callCount).to.equal(1);

  spy.resetHistory();

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'ArrowLeft' });

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ) === null,
  );

  expect(tabGroup?.tabElements[0]).to.have.focus;

  expect(spy.callCount).to.equal(1);
});
