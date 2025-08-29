import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Popover from './popover.js';
import './popover.container.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import requestIdleCallback from './library/request-idle-callback.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class Subclassed extends Popover {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-popover')).to.equal(Popover);
});

it('is accessible', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
    </glide-core-popover>`,
  );

  await expect(host).to.be.accessible();
});

it('opens', async () => {
  const host = await fixture<Popover>(
    html`<glide-core-popover open>
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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
      <button slot="target">Target</button>
      <glide-core-popover-container>Popover</glide-core-popover-container>
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
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-popover>
        <button slot="target">Target</button>
      </glide-core-popover>`,
    );
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-popover>
        <button slot="target">Target</button>
        <div>Popover</div>
      </glide-core-popover>`,
    );
  });
});

it('throws when it does not have a "target" slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-popover>
        <glide-core-popover-container>Popover</glide-core-popover-container>
      </glide-core-popover>`,
    );
  });
});
