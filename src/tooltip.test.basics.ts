import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import GlideCoreTooltip from './tooltip.js';
import GlideCoreTooltipContainer from './tooltip.container.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tooltip')).to.equal(
    GlideCoreTooltip,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await expect(component).to.be.accessible();
});

it('can be open', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(tooltip?.checkVisibility()).to.be.true;
});

it('passes down certain properties to its container', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip
      label="Label"
      .shortcut=${['CMD', 'K']}
      screenreader-hidden
    >
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await waitUntil(() => {
    return component.querySelector<GlideCoreTooltipContainer>(
      'glide-core-private-tooltip-container',
    );
  });

  const container = component.querySelector<GlideCoreTooltipContainer>(
    'glide-core-private-tooltip-container',
  );

  expect(container?.label).to.equal('Label');
  expect(container?.screenreaderHidden).to.be.true;
  expect(container?.shortcut).to.deep.equal(['CMD', 'K']);
});

it('is not open when disabled', async () => {
  const component = await fixture(
    html`<glide-core-tooltip label="Label" open disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(tooltip?.checkVisibility()).to.be.false;
});

it('sets `aria-describedby` on its target when enabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = component.querySelector('button');

  const container = component.querySelector(
    'glide-core-private-tooltip-container',
  );

  expect(button?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('does not set `aria-describedby` on its target when disabled', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = component.querySelector('button');
  expect(button?.getAttribute('aria-describedby')).to.equal(null);
});

it('sets `aria-describedby` when not hidden from screenreaders', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = component.querySelector('button');

  const container = component.querySelector(
    'glide-core-private-tooltip-container',
  );

  expect(button?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('does not set `aria-describedby` on its target when hidden from screenreaders', async () => {
  const component = await fixture<GlideCoreTooltip>(
    html`<glide-core-tooltip label="Label" screenreader-hidden>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = component.querySelector('button');
  expect(button?.getAttribute('aria-describedby')).to.equal(null);
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-tooltip></glide-core-tooltip>`);
  });
});

it('throws if it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-tooltip>Tooltip</glide-core-tooltip>`);
  });
});

it('has `placement="top"` coverage', async () => {
  await fixture(
    html`<glide-core-tooltip label="Label" placement="top" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );
});
