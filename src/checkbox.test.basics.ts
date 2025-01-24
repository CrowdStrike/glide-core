import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { styleMap } from 'lit/directives/style-map.js';
import GlideCoreCheckbox from './checkbox.js';
import type GlideCoreTooltip from './tooltip.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-checkbox')).to.equal(
    GlideCoreCheckbox,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox label="Label" tooltip="Tooltip">
      <div slot="description">Description</div>
    </glide-core-checkbox>`,
  );

  await expect(component).to.be.accessible();
});

it('has a tooltip when "minimal" with a long label', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      style=${styleMap({
        display: 'block',
        maxWidth: '6.25rem',
      })}
      label=${'x'.repeat(100)}
      private-variant="minimal"
      private-show-label-tooltip
    ></glide-core-checkbox>`,
  );

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector<GlideCoreTooltip>(
    '[data-test="label-tooltip"]',
  );

  expect(tooltip?.disabled).to.be.false;
  expect(tooltip?.open).to.be.true;
});

it('has no tooltip when "minimal" with a short label', async () => {
  const component = await fixture<GlideCoreCheckbox>(
    html`<glide-core-checkbox
      label="Label"
      private-variant="minimal"
      private-show-label-tooltip
    ></glide-core-checkbox>`,
  );

  // Wait for the tooltip.
  await aTimeout(0);

  const tooltip = component.shadowRoot?.querySelector<GlideCoreTooltip>(
    '[data-test="label-tooltip"]',
  );

  expect(tooltip?.disabled).to.be.true;
});
