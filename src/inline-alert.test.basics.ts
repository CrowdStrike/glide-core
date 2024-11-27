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

// it('can be closed by clicking on the x icon', async () => {
//   const component = await fixture<GlideCoreInlineAlert>(
//     html`<glide-core-inline-alert
//       variant="informational"
//     ></glide-core-inline-alert>`,
//   );

//   const shadowElement = component.shadowRoot!.firstElementChild;

//   const closeButton = shadowElement?.querySelector<HTMLButtonElement>(
//     'glide-core-icon-button[label="Close"]',
//   );

//   assert(closeButton);

//   closeButton.click();

//   shadowElement?.dispatchEvent(new TransitionEvent('transitionend'));

//   await expect([
//     ...component.shadowRoot!.firstElementChild!.classList,
//   ]).to.deep.equal(['component', 'informational', 'closed']);
// });
