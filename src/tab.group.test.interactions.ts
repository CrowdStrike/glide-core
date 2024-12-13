/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { emulateMedia } from '@web/test-runner-commands';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTabGroup from './tab.group.js';
import GlideCoreTabPanel from './tab.panel.js';
import sinon from 'sinon';

GlideCoreTabGroup.shadowRootOptions.mode = 'open';
GlideCoreTabPanel.shadowRootOptions.mode = 'open';

it('does not render overflow buttons when there is no overflow', async () => {
  const component = await fixture(html`
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

  const tabGroup = component.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  const startOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-start-button"]',
    );

  expect(startOverflowButton).to.be.null;

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton).to.be.null;
});

it('renders overflow buttons when there is overflow', async () => {
  const component = await fixture(html`
    <div style="width:23rem">
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

  const tabGroup = component.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  await waitUntil(() => {
    return (
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-start-button"]',
      ) !== null &&
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-end-button"]',
      ) !== null
    );
  });
});

it('renders a disabled start-overflow button when there is only overflow towards the end', async () => {
  const component = await fixture(html`
    <div style="width:23rem">
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

  const tabGroup = component.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  await waitUntil(() => {
    return (
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-start-button"]',
      ) !== null &&
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-end-button"]',
      ) !== null
    );
  });

  const startOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-start-button"]',
    );

  expect(startOverflowButton?.disabled).to.be.true;

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton?.disabled).to.be.false;
});

it('renders a disabled end-overflow button when there is only overflow at the start', async () => {
  const component = await fixture(html`
    <div style="width:23rem">
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

  const tabGroup = component.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  await waitUntil(() => {
    return (
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-start-button"]',
      ) !== null &&
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-end-button"]',
      ) !== null
    );
  });

  // Need to get the tab group into a state where there
  // is overflow at the start -- do this by first scrolling to the end

  const startOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-start-button"]',
    );

  expect(startOverflowButton?.disabled).to.be.true;

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(endOverflowButton?.disabled).to.be.false;

  endOverflowButton?.click();

  await waitUntil(() => {
    return (
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      )?.disabled === true
    );
  });

  expect(startOverflowButton?.disabled).to.be.false;
});

it('scrolls tabs when overflow buttons are clicked', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const spy = sinon.spy();

  const component = await fixture(html`
    <div style="width:23rem">
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

  const tabGroup = component.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  await waitUntil(() => {
    return (
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-start-button"]',
      ) !== null &&
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-end-button"]',
      ) !== null
    );
  });

  tabGroup?.shadowRoot
    ?.querySelector('[role="tablist"]')
    ?.addEventListener('scroll', spy);

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  endOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      )?.disabled === true,
  );

  expect(spy.callCount).to.equal(1);

  spy.resetHistory();

  const startOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-start-button"]',
    );

  expect(startOverflowButton).to.be.not.null;
  expect(startOverflowButton?.disabled).to.be.false;

  startOverflowButton?.click();

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      )?.disabled === true,
  );

  expect(spy.callCount).to.equal(1);
  expect(startOverflowButton?.disabled).to.be.true;
  expect(endOverflowButton?.disabled).to.be.false;

  await emulateMedia({ reducedMotion: 'no-preference' });
});

it('removes overflow buttons when the component is resized and there is no overflow', async () => {
  const component = await fixture(html`
    <div style="width:23rem" data-test="test-parent">
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

  const tabGroup = component.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  await waitUntil(() => {
    return (
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-start-button"]',
      ) !== null &&
      tabGroup?.shadowRoot?.querySelector(
        '[data-test="overflow-end-button"]',
      ) !== null
    );
  });

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
  const component = await fixture(html`
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

  const tabGroup = component.querySelector<GlideCoreTabGroup>(
    'glide-core-tab-group',
  );

  const startOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-start-button"]',
    );

  const endOverflowButton =
    tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="overflow-end-button"]',
    );

  expect(startOverflowButton).to.be.null;
  expect(endOverflowButton).to.be.null;

  const container = document?.querySelector<HTMLDivElement>(
    '[data-test="test-parent"]',
  );

  expect(container).to.be.not.null;

  container!.style.width = '23rem';

  await waitUntil(
    () =>
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-start-button"]',
      ) !== null &&
      tabGroup?.shadowRoot?.querySelector<HTMLButtonElement>(
        '[data-test="overflow-end-button"]',
      ) !== null,
  );
});

it('has only one selected tab that is tabbable after pressing the Enter key', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
      <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
      <glide-core-tab slot="nav" panel="4">Tab 4</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
      <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
      <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const [firstTab, secondTab, thirdTab, fourthTab] = component.tabElements;

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(thirdTab.selected).to.be.false;
  expect(fourthTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(0);
  expect(secondTab.tabIndex).to.equal(-1);
  expect(thirdTab.tabIndex).to.equal(-1);
  expect(fourthTab.tabIndex).to.equal(-1);

  firstTab.focus();
  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });

  expect(firstTab.selected).to.be.false;
  expect(secondTab.selected).to.be.true;
  expect(thirdTab.selected).to.be.false;
  expect(fourthTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(-1);
  expect(secondTab.tabIndex).to.equal(0);
  expect(thirdTab.tabIndex).to.equal(-1);
  expect(fourthTab.tabIndex).to.equal(-1);

  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Enter' });

  expect(firstTab.selected).to.be.false;
  expect(secondTab.selected).to.be.false;
  expect(thirdTab.selected).to.be.false;
  expect(fourthTab.selected).to.be.true;
  expect(firstTab.tabIndex).to.equal(-1);
  expect(secondTab.tabIndex).to.equal(-1);
  expect(thirdTab.tabIndex).to.equal(-1);
  expect(fourthTab.tabIndex).to.equal(0);

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });

  expect(firstTab.selected).to.be.false;
  expect(secondTab.selected).to.be.false;
  expect(thirdTab.selected).to.be.true;
  expect(fourthTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(-1);
  expect(secondTab.tabIndex).to.equal(-1);
  expect(thirdTab.tabIndex).to.equal(0);
  expect(fourthTab.tabIndex).to.equal(-1);

  await sendKeys({ press: 'Home' });
  await sendKeys({ press: 'Enter' });

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(thirdTab.selected).to.be.false;
  expect(fourthTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(0);
  expect(secondTab.tabIndex).to.equal(-1);
  expect(thirdTab.tabIndex).to.equal(-1);
  expect(fourthTab.tabIndex).to.equal(-1);
});

it('has only one selected tab that is tabbable when clicked', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
      <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
      <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const [firstTab, secondTab, thirdTab] = component.tabElements;

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(thirdTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(0);
  expect(secondTab.tabIndex).to.equal(-1);
  expect(thirdTab.tabIndex).to.equal(-1);

  secondTab.click();

  expect(firstTab.selected).to.be.false;
  expect(secondTab.selected).to.be.true;
  expect(thirdTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(-1);
  expect(secondTab.tabIndex).to.equal(0);
  expect(thirdTab.tabIndex).to.equal(-1);

  thirdTab.click();

  expect(firstTab.selected).to.be.false;
  expect(secondTab.selected).to.be.false;
  expect(thirdTab.selected).to.be.true;
  expect(firstTab.tabIndex).to.equal(-1);
  expect(secondTab.tabIndex).to.equal(-1);
  expect(thirdTab.tabIndex).to.equal(0);
});

it('has only one tab panel that is selected and tabbable when a tab is clicked', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const [, secondTab] = component.tabElements;
  const [firstPanel, secondPanel] = component.panelElements;

  expect(firstPanel.privateIsSelected).to.be.true;
  expect(secondPanel.privateIsSelected).to.be.false;
  expect(firstPanel.tabIndex).to.equal(0);
  expect(secondPanel.tabIndex).to.equal(-1);

  secondTab.click();

  expect(firstPanel.privateIsSelected).to.be.false;
  expect(secondPanel.privateIsSelected).to.be.true;
  expect(firstPanel.tabIndex).to.equal(-1);
  expect(secondPanel.tabIndex).to.equal(0);
});

it('has only one tab panel that is selected and tabbable when using the keyboard to make selections', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const [firstTab] = component.tabElements;
  const [firstPanel, secondPanel] = component.panelElements;

  expect(firstPanel.privateIsSelected).to.be.true;
  expect(secondPanel.privateIsSelected).to.be.false;
  expect(firstPanel.tabIndex).to.equal(0);
  expect(secondPanel.tabIndex).to.equal(-1);

  firstTab.focus();

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });

  expect(firstPanel.privateIsSelected).to.be.false;
  expect(secondPanel.privateIsSelected).to.be.true;
  expect(firstPanel.tabIndex).to.equal(-1);
  expect(secondPanel.tabIndex).to.equal(0);
});

it('sets the last keyboard focused tab as tabbable ', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const [firstTab, secondTab] = component.tabElements;

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(0);
  expect(secondTab.tabIndex).to.equal(-1);

  firstTab.focus();
  await sendKeys({ press: 'ArrowRight' });

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(-1);
  expect(secondTab.tabIndex).to.equal(0);
});

it('sets the selected tab as tabbable on tab blur', async () => {
  // This behavior is to ensure that the last selected tab is the first tabbable
  // element in the component.

  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const [firstTab, secondTab] = component.tabElements;

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(0);
  expect(secondTab.tabIndex).to.equal(-1);

  firstTab.focus();
  await sendKeys({ press: 'ArrowRight' });

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(-1);
  expect(secondTab.tabIndex).to.equal(0);

  secondTab.blur();

  expect(firstTab.selected).to.be.true;
  expect(secondTab.selected).to.be.false;
  expect(firstTab.tabIndex).to.equal(0);
  expect(secondTab.tabIndex).to.equal(-1);
});
