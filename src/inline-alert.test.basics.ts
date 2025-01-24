import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import GlideCoreInlineAlert from './inline-alert.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

it('registers itself', () => {
  expect(window.customElements.get('glide-core-inline-alert')).to.equal(
    GlideCoreInlineAlert,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational"
      >Label</glide-core-inline-alert
    >`,
  );

  // Wait for the animation to complete.
  await aTimeout(100);

  await expect(component).to.be.accessible();

  component.removable = true;
  await component.updateComplete;

  await expect(component).to.be.accessible();
});

it('throws error if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture<GlideCoreInlineAlert>(
      html`<glide-core-inline-alert></glide-core-inline-alert>`,
    );
  });
});
