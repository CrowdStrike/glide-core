import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTooltipContainer from './tooltip.container.js';

GlideCoreTooltipContainer.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-private-tooltip-container'),
  ).to.equal(GlideCoreTooltipContainer);
});

it('can have a single-key shortcut', async () => {
  const component = await fixture<GlideCoreTooltipContainer>(
    html`<glide-core-private-tooltip-container
      label="Label"
      .shortcut=${['Enter']}
    >
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`,
  );

  const shortcut = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="shortcut"]',
  );

  expect(shortcut?.textContent?.trim()).to.equal('Enter');
});

it('can have a multi-key shortcut', async () => {
  const component = await fixture<GlideCoreTooltipContainer>(
    html`<glide-core-private-tooltip-container
      label="Label"
      .shortcut=${['CMD', 'K']}
    >
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`,
  );

  const shortcut = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="shortcut"]',
  );

  expect(shortcut?.textContent?.replaceAll(/\s/g, '')).to.equal('CMD+K');
});

it('has no `role` when disabled', async () => {
  const component = await fixture<GlideCoreTooltipContainer>(
    html`<glide-core-private-tooltip-container label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`,
  );

  expect(component.role).to.equal('none');
});
