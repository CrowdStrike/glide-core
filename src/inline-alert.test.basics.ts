import { ArgumentError } from 'ow';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import GlideCoreInlineAlert from './inline-alert.js';
import sinon from 'sinon';

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

it('throws error if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreInlineAlert>(
      html`<glide-core-inline-alert></glide-core-inline-alert>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});
