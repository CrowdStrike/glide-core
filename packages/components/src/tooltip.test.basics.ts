import './tooltip.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import CsTooltip from './tooltip.js';
import sinon from 'sinon';

CsTooltip.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-tooltip')).to.equal(CsTooltip);
});

it('is accessible', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
  );

  // See the comment in the component's `render` method for an explanation.
  await expect(component).to.be.accessible({
    ignoredRules: ['aria-tooltip-name'],
  });
});

it('can have a tooltip', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip aria-label="Label">
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
  );

  const tooltip = component?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot:not([name])')
    ?.assignedNodes()
    .at(0);

  expect(tooltip?.textContent?.trim()).to.equal('Tooltip');
});

it('can have a target', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <span slot="target" tabindex="0">Target</span>
    </cs-tooltip>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="target"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Target');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<CsTooltip>(html`<cs-tooltip></cs-tooltip>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});

it('throws if it does not have a "target" slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<CsTooltip>(html`<cs-tooltip> Tooltip </cs-tooltip>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});
