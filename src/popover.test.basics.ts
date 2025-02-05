import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCorePopover from './popover.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCorePopover {}

it('registers', async () => {
  expect(window.customElements.get('glide-core-popover')).to.equal(
    GlideCorePopover,
  );
});

it('is accessible', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await expect(host).to.be.accessible();
});

it('opens', async () => {
  const host = await fixture<GlideCorePopover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(popover?.checkVisibility()).to.be.true;
});

it('is not open when disabled', async () => {
  const host = await fixture(
    html`<glide-core-popover open disabled>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  // Wait for Floating UI.
  await aTimeout(0);

  expect(popover?.checkVisibility()).to.be.false;
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-popover></glide-core-popover>`);
  });
});

it('throws when it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-popover>Popover</glide-core-popover>`);
  });
});
