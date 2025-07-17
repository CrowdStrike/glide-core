import { assert, expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import InlineAlert from './inline-alert.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class Subclassed extends InlineAlert {}

it('registers itself', () => {
  expect(window.customElements.get('glide-core-inline-alert')).to.equal(
    InlineAlert,
  );
});

it('is accessible', async () => {
  const host = await fixture<InlineAlert>(
    html`<glide-core-inline-alert variant="informational"
      >Label</glide-core-inline-alert
    >`,
  );

  let animation: Animation | undefined;

  // Inline Alert animates its opacity when added to the page. We wait for the
  // animation to complete to avoid a color contrast violation.
  await waitUntil(() => {
    animation = host.shadowRoot
      ?.querySelector('[data-test="component"]')
      ?.getAnimations()
      ?.at(0);

    return animation;
  });

  assert(animation);
  await animation.finished;

  await expect(host).to.be.accessible();
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

it('throws error if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture<InlineAlert>(
      html`<glide-core-inline-alert></glide-core-inline-alert>`,
    );
  });
});
