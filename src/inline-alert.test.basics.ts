import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreInlineAlert from './inline-alert.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreInlineAlert {}

it('registers itself', () => {
  expect(window.customElements.get('glide-core-inline-alert')).to.equal(
    GlideCoreInlineAlert,
  );
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational"
      >Label</glide-core-inline-alert
    >`,
  );

  // Wait for the animation to complete.
  await aTimeout(100);

  await expect(host).to.be.accessible();

  host.removable = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
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

it('throws error if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture<GlideCoreInlineAlert>(
      html`<glide-core-inline-alert></glide-core-inline-alert>`,
    );
  });
});
