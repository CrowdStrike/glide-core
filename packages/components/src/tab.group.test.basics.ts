import './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTabGroup from './tab.group.js';
import GlideCoreTabPanel from './tab.panel.js';
import expectArgumentError from './library/expect-argument-error.js';

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
  const tabGroup = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  await expect(tabGroup).to.be.accessible();

  const [firstTab] = tabGroup.tabElements;

  expect(tabGroup.activeTab).to.equal(
    firstTab,
    'activeTab defaults to first tab',
  );

  expect([...tabGroup.shadowRoot!.firstElementChild!.classList]).to.deep.equal([
    'component',
  ]);

  expect([
    ...tabGroup.shadowRoot!.querySelector('.tab-group')!.classList,
  ]).to.deep.equal(['tab-group']);

  const slot = tabGroup.shadowRoot!.querySelector<HTMLSlotElement>(
    'slot:not([name="nav"])',
  );

  expect(slot).to.exist;
  expect(slot!.assignedElements.length).to.equal(0);
});

it('can switch tabs', async () => {
  const tabGroup = await fixture<GlideCoreTabGroup>(html`
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
  expect(triggeredEvent.bubbles).to.be.true;

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

  expect(secondTriggeredEvent.bubbles).to.be.true;

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
  const tabGroup = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Tab 2</glide-core-tab>
      <glide-core-tab slot="nav" panel="3">Tab 3</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      <glide-core-tab-panel name="2">Content for Tab 2</glide-core-tab-panel>
      <glide-core-tab-panel name="3">Content for Tab 3</glide-core-tab-panel>
    </glide-core-tab-group>
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
  await expectArgumentError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <div>Default Content</div>
      </glide-core-tab-group>
    `);
  });
});
