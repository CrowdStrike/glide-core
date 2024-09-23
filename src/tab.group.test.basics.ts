/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTabGroup from './tab.group.js';
import GlideCoreTabPanel from './tab.panel.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreTabGroup.shadowRootOptions.mode = 'open';
GlideCoreTabPanel.shadowRootOptions.mode = 'open';

function isPanelHidden(panel: GlideCoreTabPanel) {
  return panel.shadowRoot?.firstElementChild?.classList.contains('hidden');
}

it('registers', async () => {
  expect(window.customElements.get('glide-core-tab-group')).to.equal(
    GlideCoreTabGroup,
  );

  expect(window.customElements.get('glide-core-tab-panel')).to.equal(
    GlideCoreTabPanel,
  );
});

it('renders correct markup and sets correct attributes for the default case', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  await expect(component).to.be.accessible();

  const [firstTab] = component.tabElements;

  expect(component.activeTab).to.equal(
    firstTab,
    'activeTab defaults to first tab',
  );

  expect([...component.shadowRoot!.firstElementChild!.classList]).to.deep.equal(
    ['component'],
  );

  expect([
    ...component.shadowRoot!.querySelector('.tab-group')!.classList,
  ]).to.deep.equal(['tab-group', 'animated']);

  const slot = component.shadowRoot!.querySelector<HTMLSlotElement>(
    'slot:not([name="nav"])',
  );

  expect(slot).to.exist;
  expect(slot!.assignedElements.length).to.equal(0);
});

it('can switch tabs', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
      <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>
      <glide-core-tab slot="nav" panel="4" disabled>Disabled</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
      <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
      <glide-core-tab-panel name="4">Content for Tab 4</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const listener = oneEvent(component, 'tab-show');

  const [firstTab, secondTab, thirdTab, disabledTab] = component.tabElements;
  const [firstPanel, secondPanel, thirdPanel] = component.panelElements;

  // first tab defaults to active
  expect(firstTab.active).to.be.true;

  // other tabs default to not active
  expect(secondTab.active).to.be.false;

  // first panel is not hidden by default
  expect(isPanelHidden(firstPanel)).to.be.false;

  // nonactive panel is hidden by default
  expect(isPanelHidden(secondPanel)).to.be.true;

  secondTab.click();
  const triggeredEvent = await listener;

  // after clicking a different tab, previous tab is no longer active
  expect(firstTab.active).to.be.false;

  // clicked tab becomes active
  expect(secondTab.active).to.be.true;

  // after clicking a different tab, previous panel is hidden
  expect(isPanelHidden(firstPanel)).to.be.true;

  // clicked tab's panel is no longer hidden
  expect(isPanelHidden(secondPanel)).to.be.false;

  expect(triggeredEvent.type).to.equal('tab-show', 'correct tab event fires');
  expect(triggeredEvent.bubbles).to.be.true;

  expect(triggeredEvent.detail.panel).to.equal(
    '2',
    'Can get the panel name from the tab click event',
  );

  secondTab.focus();
  await sendKeys({ press: 'ArrowRight' });
  // Should be focused on third tab. Press Enter on it
  await sendKeys({ press: 'Enter' });
  const secondTriggeredEvent = await listener;

  // after pressing Enter on a different tab, previous tab is no longer active
  expect(secondTab.active).to.be.false;

  // new tab becomes active
  expect(thirdTab.active).to.be.true;

  // after pressing Enter on a different tab, previous panel is hidden
  expect(isPanelHidden(secondPanel)).to.be.true;

  // new tab's panel is no longer hidden
  expect(isPanelHidden(thirdPanel)).to.be.false;

  expect(secondTriggeredEvent.type).to.equal(
    'tab-show',
    'correct tab event fires for keydown',
  );

  expect(secondTriggeredEvent.bubbles).to.be.true;

  expect(secondTriggeredEvent.detail.panel).to.equal(
    '2',
    'Can get the panel name from the tab show event',
  );

  disabledTab.click();

  // clicking on a disabled tab does not make it active
  expect(disabledTab.active).to.be.false;
});

it('can use left/right, home and end keys to focus on tabs', async () => {
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

  firstTab.focus();
  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });
  // right works
  expect(secondTab.active).to.be.true;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });
  // left works
  expect(firstTab.active).to.be.true;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });
  // left from first goes to last
  expect(thirdTab.active).to.be.true;

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });
  // right from last goes to first
  expect(firstTab.active).to.be.true;

  await sendKeys({ press: 'Home' });
  await sendKeys({ press: 'Enter' });
  expect(firstTab.active).to.be.true;

  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Enter' });
  expect(thirdTab.active).to.be.true;
});

it('throws an error when an element other than `glide-core-tab` is a child of the `nav` slot', async () => {
  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <div slot="nav">Tab 1</div>
        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      </glide-core-tab-group>
    `);
  });
});

it('throws an error when an element other than `glide-core-tab-panel` is a child of the default slot', async () => {
  const spy = sinon.spy();
  window.addEventListener('unhandledrejection', spy);

  // https://github.com/CrowdStrike/glide-core/pull/335#issuecomment-2327451869
  const stub = sinon.stub(console, 'error');

  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <div>Default Content</div>
      </glide-core-tab-group>
    `);
  });

  await waitUntil(() => spy.callCount === 1);
  stub.restore();
});
