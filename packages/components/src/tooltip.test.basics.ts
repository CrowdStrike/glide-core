import './tooltip.js';
import { expect, fixture, html } from '@open-wc/testing';
import CsTooltip from './tooltip.js';

CsTooltip.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-tooltip')).to.equal(CsTooltip);
});

it('is accessible', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <button slot="target">Target</button>
    </cs-tooltip>`,
  );

  // See the comment in the component's `render` method for an explanation.
  await expect(component).to.be.accessible({
    ignoredRules: ['aria-tooltip-name'],
  });
});

it('can have a tooltip', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip aria-label="Label">Tooltip</cs-tooltip>`,
  );

  const tooltip = component?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot:not([name])')
    ?.assignedNodes()
    .at(0);

  expect(tooltip?.textContent).to.equal('Tooltip');
});

it('can have a target', async () => {
  const component = await fixture<CsTooltip>(
    html`<cs-tooltip>
      Tooltip
      <button slot="target">Target</button>
    </cs-tooltip>`,
  );

  const assignedElements = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="target"]')
    ?.assignedElements();

  expect(assignedElements?.at(0)?.textContent).to.equal('Target');
});
