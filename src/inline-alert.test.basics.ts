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
    html`<glide-core-inline-alert
      variant="informational"
    ></glide-core-inline-alert>`,
  );

  // Wait for the animation to complete.
  await aTimeout(100);

  await expect(component).to.be.accessible();

  component.removable = true;
  await elementUpdated(component);

  await expect(component).to.be.accessible();
});

it('sets correct role', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational"
      >Label</glide-core-inline-alert
    >`,
  );

  expect(
    component.shadowRoot?.firstElementChild?.getAttribute('role'),
  ).to.equal('alert');
});

it('sets variant, label', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational"
      >Label</glide-core-inline-alert
    >`,
  );

  expect(component.variant).to.equal('informational');
  expect(component.textContent).to.equal('Label');
});
