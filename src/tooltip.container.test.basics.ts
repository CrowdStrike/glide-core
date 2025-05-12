import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import TooltipContainer from './tooltip.container.js';

@customElement('glide-core-subclassed')
class Subclassed extends TooltipContainer {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-private-tooltip-container'),
  ).to.equal(TooltipContainer);
});

it('can have a single-key shortcut', async () => {
  const host = await fixture<TooltipContainer>(
    html`<glide-core-private-tooltip-container
      label="Label"
      .shortcut=${['Enter']}
    >
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`,
  );

  const shortcut = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="shortcut"]',
  );

  expect(shortcut?.textContent?.trim()).to.equal('Enter');
});

it('can have a multi-key shortcut', async () => {
  const host = await fixture<TooltipContainer>(
    html`<glide-core-private-tooltip-container
      label="Label"
      .shortcut=${['CMD', 'K']}
    >
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`,
  );

  const shortcut = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="shortcut"]',
  );

  expect(shortcut?.textContent?.replaceAll(/\s/g, '')).to.equal('CMD+K');
});

it('has no `role` when disabled', async () => {
  const host = await fixture<TooltipContainer>(
    html`<glide-core-private-tooltip-container label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-private-tooltip-container>`,
  );

  expect(host.role).to.equal('none');
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
