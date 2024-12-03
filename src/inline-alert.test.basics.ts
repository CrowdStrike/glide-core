import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreInlineAlert from './inline-alert.js';

GlideCoreInlineAlert.shadowRootOptions.mode = 'open';

it('registers', () => {
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
  await elementUpdated(component);

  await expect(component).to.be.accessible();
});
