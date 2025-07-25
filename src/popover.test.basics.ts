import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Popover from './popover.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import requestIdleCallback from './library/request-idle-callback.js';

@customElement('glide-core-subclassed')
class Subclassed extends Popover {}

it('registers', async () => {
  expect(window.customElements.get('glide-core-popover')).to.equal(Popover);
});

it('is accessible', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  await expect(host).to.be.accessible();
});

it('opens', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      Popover
      <button slot="target">Target</button>
    </glide-core-popover>`,
  );

  const popover = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="popover"]',
  );

  await requestIdleCallback(); // Wait for Floating UI

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

  await requestIdleCallback(); // Wait for Floating UI

  expect(popover?.checkVisibility()).to.be.false;
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
    return fixture(html`<glide-core-popover></glide-core-popover>`);
  });
});

it('throws when it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-popover>Popover</glide-core-popover>`);
  });
});
