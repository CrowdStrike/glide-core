import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import Tooltip from './tooltip.js';
import TooltipContainer from './tooltip.container.js';
import expectUnhandledRejection from '@/src/library/expect-unhandled-rejection.js';
import requestIdleCallback from '@/src/library/request-idle-callback.js';

@customElement('glide-core-subclassed')
class Subclassed extends Tooltip {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tooltip')).to.equal(Tooltip);
});

it('is accessible', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" description="Description">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await expect(host).to.be.accessible();
});

it('can be open', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  await requestIdleCallback(); // Wait for Floating UI

  expect(tooltip?.checkVisibility()).to.be.true;
});

it('passes down certain properties to its container', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip
      label="Label"
      description="Description"
      .shortcut=${['CMD', 'K']}
      screenreader-hidden
    >
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  await waitUntil(() => {
    return host.querySelector<TooltipContainer>(
      'glide-core-private-tooltip-container',
    );
  });

  const container = host.querySelector<TooltipContainer>(
    'glide-core-private-tooltip-container',
  );

  expect(container?.label).to.equal('Label');
  expect(container?.description).to.equal('Description');
  expect(container?.screenreaderHidden).to.be.true;
  expect(container?.shortcut).to.deep.equal(['CMD', 'K']);
});

it('is not open when disabled', async () => {
  const host = await fixture(
    html`<glide-core-tooltip label="Label" open disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const tooltip = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="tooltip"]',
  );

  await requestIdleCallback(); // Wait for Floating UI

  expect(tooltip?.checkVisibility()).to.be.false;
});

it('sets `aria-describedby` on its target when enabled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = host.querySelector('button');

  const container = host.querySelector('glide-core-private-tooltip-container');

  expect(button?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('does not set `aria-describedby` on its target when disabled', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" disabled>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = host.querySelector('button');
  expect(button?.getAttribute('aria-describedby')).to.be.null;
});

it('sets `aria-describedby` when not hidden from screenreaders', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label">
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = host.querySelector('button');
  const container = host.querySelector('glide-core-private-tooltip-container');

  expect(button?.getAttribute('aria-describedby')).to.equal(container?.id);
});

it('does not set `aria-describedby` on its target when hidden from screenreaders', async () => {
  const host = await fixture<Tooltip>(
    html`<glide-core-tooltip label="Label" screenreader-hidden>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );

  const button = host.querySelector('button');
  expect(button?.getAttribute('aria-describedby')).to.be.null;
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-tooltip>
        <button slot="target">Target</button>
      </glide-core-tooltip>`,
    );
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-tooltip label="Label"></glide-core-tooltip>`,
    );
  });
});

it('throws when it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-tooltip label="Label">Tooltip</glide-core-tooltip>`,
    );
  });
});

it('has `placement="top"` coverage', async () => {
  await fixture(
    html`<glide-core-tooltip label="Label" placement="top" open>
      <button slot="target">Target</button>
    </glide-core-tooltip>`,
  );
});
