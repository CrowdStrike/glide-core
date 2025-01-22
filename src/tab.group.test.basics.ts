import { assert, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTabGroup from './tab.group.js';
import './tab.js';
import GlideCoreTabPanel from './tab.panel.js';
import { click } from './library/mouse.js';
import expectWindowError from './library/expect-window-error.js';

function isPanelHidden(panel: GlideCoreTabPanel) {
  return panel.shadowRoot?.firstElementChild?.classList.contains('hidden');
}

it('registers itself', async () => {
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

  const [firstTab] = component.querySelectorAll('glide-core-tab');
  const selectedTab = component.querySelector('glide-core-tab[selected]');

  expect(selectedTab).to.equal(firstTab);

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

  const listener = oneEvent(component, 'selected');

  const [firstTab, secondTab, thirdTab, disabledTab] =
    component.querySelectorAll('glide-core-tab');

  const [firstPanel, secondPanel, thirdPanel] = component.querySelectorAll(
    'glide-core-tab-panel',
  );

  // first tab defaults to selected
  expect(firstTab.selected).to.be.true;

  // other tabs default to not selected
  expect(secondTab.selected).to.be.false;

  // first panel is not hidden by default
  expect(isPanelHidden(firstPanel)).to.be.false;

  // unselected panels are hidden by default
  expect(isPanelHidden(secondPanel)).to.be.true;

  await click(secondTab);
  const triggeredEvent = await listener;

  // after clicking a different tab, previous tab is no longer selected
  expect(firstTab.selected).to.be.false;

  // clicked tab becomes selected
  expect(secondTab.selected).to.be.true;

  // after clicking a different tab, previous panel is hidden
  expect(isPanelHidden(firstPanel)).to.be.true;

  // clicked tab's panel is no longer hidden
  expect(isPanelHidden(secondPanel)).to.be.false;

  expect(triggeredEvent.type).to.equal('selected');
  expect(triggeredEvent.bubbles).to.be.true;
  expect(triggeredEvent.composed).to.be.true;
  expect(triggeredEvent.target).to.equal(secondTab);

  secondTab.focus();
  await sendKeys({ press: 'ArrowRight' });
  // Should be focused on third tab. Press Enter on it
  await sendKeys({ press: 'Enter' });
  const secondTriggeredEvent = await listener;

  // after pressing Enter on a different tab, previous tab is no longer selected
  expect(secondTab.selected).to.be.false;

  // new tab becomes selected
  expect(thirdTab.selected).to.be.true;

  // after pressing Enter on a different tab, previous panel is hidden
  expect(isPanelHidden(secondPanel)).to.be.true;

  // new tab's panel is no longer hidden
  expect(isPanelHidden(thirdPanel)).to.be.false;

  expect(secondTriggeredEvent.type).to.equal('selected');
  expect(secondTriggeredEvent.bubbles).to.be.true;
  expect(secondTriggeredEvent.composed).to.be.true;
  expect(secondTriggeredEvent.target).to.equal(secondTab);

  await click(disabledTab);

  // clicking on a disabled tab does not make it selected
  expect(disabledTab.selected).to.be.false;
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

  const [firstTab, secondTab, thirdTab] =
    component.querySelectorAll('glide-core-tab');

  firstTab.focus();
  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });
  // right works
  expect(secondTab.selected).to.be.true;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });
  // left works
  expect(firstTab.selected).to.be.true;

  await sendKeys({ press: 'ArrowLeft' });
  await sendKeys({ press: 'Enter' });
  // left from first goes to last
  expect(thirdTab.selected).to.be.true;

  await sendKeys({ press: 'ArrowRight' });
  await sendKeys({ press: 'Enter' });
  // right from last goes to first
  expect(firstTab.selected).to.be.true;

  await sendKeys({ press: 'Home' });
  await sendKeys({ press: 'Enter' });
  expect(firstTab.selected).to.be.true;

  await sendKeys({ press: 'End' });
  await sendKeys({ press: 'Enter' });
  expect(thirdTab.selected).to.be.true;
});

it('sets padding-inline-start of the Tab Group via `--tabs-padding-inline-start`', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group style="--tabs-padding-inline-start: 100px;">
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabContainer = component?.shadowRoot?.querySelector(
    '[data-test="tab-container"]',
  );

  assert(tabContainer);

  expect(window.getComputedStyle(tabContainer).paddingInline).to.equal(
    '100px 0px',
  );
});

it('sets padding-inline-end of the Tab Group via `--tabs-padding-inline-end`', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group style="--tabs-padding-inline-end: 100px;">
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabContainer = component?.shadowRoot?.querySelector(
    '[data-test="tab-container"]',
  );

  assert(tabContainer);

  expect(window.getComputedStyle(tabContainer).paddingInline).to.equal(
    '0px 100px',
  );
});

it('sets padding-block-start of the Tab Group via `--tabs-padding-block-start`', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group style="--tabs-padding-block-start: 100px;">
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabContainer = component?.shadowRoot?.querySelector(
    '[data-test="tab-container"]',
  );

  assert(tabContainer);

  expect(window.getComputedStyle(tabContainer).paddingBlock).to.equal(
    '100px 0px',
  );
});

it('sets padding-block-end of the Tab Group via `--tabs-padding-block-end`', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group style="--tabs-padding-block-end: 100px;">
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabContainer = component?.shadowRoot?.querySelector(
    '[data-test="tab-container"]',
  );

  assert(tabContainer);

  expect(window.getComputedStyle(tabContainer).paddingBlock).to.equal(
    '0px 100px',
  );
});

it('sets padding-inline-start of the Tab Panel via `--panel-padding-inline-start`', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group style="--panel-padding-inline-start: 100px;">
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabPanel = component
    ?.querySelector('glide-core-tab-panel')
    ?.shadowRoot?.querySelector('[data-test="tab-panel"]');

  assert(tabPanel);

  expect(window.getComputedStyle(tabPanel).paddingInline).to.equal('100px 0px');
});

it('sets padding-inline-end of the Tab Panel via `--panel-padding-inline-end`', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group style="--panel-padding-inline-end: 100px;">
      <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>

      <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tabPanel = component
    ?.querySelector('glide-core-tab-panel')
    ?.shadowRoot?.querySelector('[data-test="tab-panel"]');

  assert(tabPanel);

  expect(window.getComputedStyle(tabPanel).paddingInline).to.equal('0px 100px');
});

it('throws an error when an element other than `glide-core-tab` is a child of the `nav` slot', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <div slot="nav">Tab 1</div>
        <glide-core-tab-panel name="1">Content for Tab 1</glide-core-tab-panel>
      </glide-core-tab-group>
    `);
  });
});

it('throws an error when an element other than `glide-core-tab-panel` is a child of the default slot', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-tab-group>
        <glide-core-tab slot="nav" panel="1">Tab 1</glide-core-tab>
        <div>Default Content</div>
      </glide-core-tab-group>
    `);
  });
});
