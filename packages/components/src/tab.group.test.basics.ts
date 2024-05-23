import './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import TabGroup from './tab.group.js';
import TabPanel from './tab.panel.js';
import sinon from 'sinon';

TabGroup.shadowRootOptions.mode = 'open';
TabPanel.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-tab-group')).to.equal(TabGroup);
  expect(window.customElements.get('cs-tab-panel')).to.equal(TabPanel);
});

it('renders correct markup and sets correct attributes for the default case', async () => {
  const tabGroup = await fixture<TabGroup>(html`
    <cs-tab-group>
      <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
      <cs-tab-panel name="1">Content for Tab 1</cs-tab-panel>
    </cs-tab-group>
  `);

  await expect(tabGroup).to.be.accessible();
  const [firstTab] = tabGroup.tabElements;

  expect(tabGroup.activeTab).to.equal(
    firstTab,
    'activeTab defaults to first tab',
  );

  expect(tabGroup.variant).to.equal('primary');

  expect([...tabGroup.shadowRoot!.firstElementChild!.classList]).to.deep.equal([
    'component',
  ]);

  expect([
    ...tabGroup.shadowRoot!.querySelector('.tab-group')!.classList,
  ]).to.deep.equal(['tab-group', 'primary']);

  const slot = tabGroup.shadowRoot!.querySelector<HTMLSlotElement>(
    'slot:not([name="nav"])',
  );

  expect(slot).to.exist;
  expect(slot!.assignedElements.length).to.equal(0);
});

it('renders a secondary variant', async () => {
  const element = await fixture(html`
    <cs-tab-group variant="secondary">
      <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
      <cs-tab-panel name="1">Content for Tab 1</cs-tab-panel>
    </cs-tab-group>
  `);

  expect([
    ...element.shadowRoot!.querySelector('.tab-group')!.classList,
  ]).to.deep.equal(['tab-group', 'secondary']);
});

it('renders a vertical variant', async () => {
  const element = await fixture(html`
    <cs-tab-group variant="vertical">
      <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
      <cs-tab-panel name="1">Content for Tab 1</cs-tab-panel>
    </cs-tab-group>
  `);

  expect([
    ...element.shadowRoot!.querySelector('.tab-group')!.classList,
  ]).to.deep.equal(['tab-group', 'vertical']);
});

it('can switch tabs', async () => {
  const tabGroup = await fixture<TabGroup>(html`
    <cs-tab-group>
      <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
      <cs-tab slot="nav" panel="2">Tab 2</cs-tab>
      <cs-tab slot="nav" panel="3">Tab 3</cs-tab>
      <cs-tab slot="nav" panel="4" disabled>Disabled</cs-tab>

      <cs-tab-panel name="1">Content for Tab 1</cs-tab-panel>
      <cs-tab-panel name="2">Content for Tab 2</cs-tab-panel>
      <cs-tab-panel name="3">Content for Tab 3</cs-tab-panel>
      <cs-tab-panel name="4">Content for Tab 4</cs-tab-panel>
    </cs-tab-group>
  `);

  const listener = oneEvent(tabGroup, 'tab-show');

  const [firstTab, secondTab, thirdTab, disabledTab] = tabGroup.tabElements;
  const [firstPanel, secondPanel, thirdPanel] = tabGroup.panelElements;

  expect(firstTab.active).to.equal(true, 'first tab defaults to active');
  expect(secondTab.active).to.equal(false, 'other tabs default to not active');

  expect(isPanelHidden(firstPanel)).to.equal(
    false,
    'first panel is not hidden by default',
  );

  expect(isPanelHidden(secondPanel)).to.equal(
    true,
    'nonactive panel is hidden by default',
  );

  secondTab.click();
  const triggeredEvent = await listener;

  await expect(firstTab.active).to.equal(
    false,
    'after clicking a different tab, previous tab is no longer active',
  );

  expect(secondTab.active).to.equal(true, 'clicked tab becomes active');

  expect(isPanelHidden(firstPanel)).to.equal(
    true,
    'after clicking a different tab, previous panel is hidden',
  );

  expect(isPanelHidden(secondPanel)).to.equal(
    false,
    `clicked tab's panel is no longer hidden`,
  );

  expect(triggeredEvent.type).to.equal('tab-show', 'correct tab event fires');

  expect(triggeredEvent.detail.panel).to.equal(
    '2',
    'Can get the panel name from the tab click event',
  );

  secondTab.focus();
  await sendKeys({ press: 'Tab' });
  // Should be focused on third tab. Press Enter on it
  await sendKeys({ press: 'Enter' });
  const secondTriggeredEvent = await listener;

  expect(secondTab.active).to.equal(
    false,
    'after pressing Enter on a different tab, previous tab is no longer active',
  );

  expect(thirdTab.active).to.equal(true, 'new tab becomes active');

  expect(isPanelHidden(secondPanel)).to.equal(
    true,
    'after pressing Enter on a different tab, previous panel is hidden',
  );

  expect(isPanelHidden(thirdPanel)).to.equal(
    false,
    `new tab's panel is no longer hidden`,
  );

  expect(secondTriggeredEvent.type).to.equal(
    'tab-show',
    'correct tab event fires for keydown',
  );

  expect(secondTriggeredEvent.detail.panel).to.equal(
    '2',
    'Can get the panel name from the tab show event',
  );

  disabledTab.click();

  expect(disabledTab.active).to.equal(
    false,
    'clicking on a disabled tab does not make it active',
  );
});

it('can use left/right, home and end keys to focus on tabs', async () => {
  const tabGroup = await fixture<TabGroup>(html`
    <cs-tab-group>
      <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
      <cs-tab slot="nav" panel="2">Tab 2</cs-tab>
      <cs-tab slot="nav" panel="3">Tab 3</cs-tab>

      <cs-tab-panel name="1">Content for Tab 1</cs-tab-panel>
      <cs-tab-panel name="2">Content for Tab 2</cs-tab-panel>
      <cs-tab-panel name="3">Content for Tab 3</cs-tab-panel>
    </cs-tab-group>
  `);

  const [firstTab, secondTab, thirdTab] = tabGroup.tabElements;

  firstTab.focus();
  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });
  expect(secondTab.active).to.equal(true, 'right works');

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });
  expect(firstTab.active).to.equal(true, 'left works');

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });
  expect(thirdTab.active).to.equal(true, 'left from first goes to last');

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });
  expect(firstTab.active).to.equal(true, 'right from last goes to first');

  await sendKeys({ press: 'Home' });
  await sendKeys({ press: 'Enter' });
  expect(firstTab.active).to.equal(true);

  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Enter' });
  expect(thirdTab.active).to.equal(true);
});

it('can use up/down keys to focus on vertical tabs', async () => {
  const tabGroup = await fixture<TabGroup>(html`
    <cs-tab-group variant="vertical">
      <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
      <cs-tab slot="nav" panel="2">Tab 2</cs-tab>
      <cs-tab slot="nav" panel="3">Tab 3</cs-tab>

      <cs-tab-panel name="1">Content for Tab 1</cs-tab-panel>
      <cs-tab-panel name="2">Content for Tab 2</cs-tab-panel>
      <cs-tab-panel name="3">Content for Tab 3</cs-tab-panel>
    </cs-tab-group>
  `);

  const [firstTab, secondTab, thirdTab] = tabGroup.tabElements;

  firstTab.focus();
  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Enter' });
  expect(secondTab.active).to.equal(true, 'down works');

  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ press: 'Enter' });
  expect(firstTab.active).to.equal(true, 'up works');

  await sendKeys({ press: 'ArrowUp' });
  await sendKeys({ press: 'Enter' });
  expect(thirdTab.active).to.equal(true, 'up from first goes to last');

  await sendKeys({ press: 'ArrowDown' });
  await sendKeys({ press: 'Enter' });
  expect(firstTab.active).to.equal(true, 'down from last goes to first');
});

it('throws an error when an element other than `cs-tab` is a child of the `nav` slot', async () => {
  const onerror = window.onerror;

  // Prevent Mocha from failing the test because of the failed "slotchange" assertion,
  // which is expected. We'd catch the error below. But it happens in an event handler
  // and so propagates to the window.
  //
  // https://github.com/mochajs/mocha/blob/99601da68d59572b6aa931e9416002bcb5b3e19d/browser-entry.js#L75
  //
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = null;

  const spy = sinon.spy();

  try {
    await fixture(html`
      <cs-tab-group variant="vertical">
        <div slot="nav">Tab 1</div>
        <cs-tab-panel name="1">Content for Tab 1</cs-tab-panel>
      </cs-tab-group>
    `);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;
});

it('throws an error when an element other than `cs-tab-panel` is a child of the default slot', async () => {
  const onerror = window.onerror;

  // Prevent Mocha from failing the test because of the failed "slotchange" assertion,
  // which is expected. We'd catch the error below. But it happens in an event handler
  // and so propagates to the window.
  //
  // https://github.com/mochajs/mocha/blob/99601da68d59572b6aa931e9416002bcb5b3e19d/browser-entry.js#L75
  //
  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = null;

  const spy = sinon.spy();

  try {
    await fixture(html`
      <cs-tab-group variant="vertical">
        <cs-tab slot="nav" panel="1">Tab 1</cs-tab>
        <div>Default Content</div>
      </cs-tab-group>
    `);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;
});

function isPanelHidden(panel: TabPanel) {
  return panel.shadowRoot?.firstElementChild?.classList.contains('hidden');
}
