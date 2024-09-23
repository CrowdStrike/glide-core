import { assert, expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreToast from './toasts.toast.js';

GlideCoreToast.shadowRootOptions.mode = 'open';

it('emits a close event when closed', async () => {
  const component = await fixture<GlideCoreToast>(
    html`<glide-core-toast
      variant="informational"
      label="Label"
      description="Toast description"
    ></glide-core-toast>`,
  );

  const shadowElement = component.shadowRoot!.firstElementChild;

  const closeButton = shadowElement?.querySelector<HTMLButtonElement>(
    'glide-core-icon-button',
  );

  assert(closeButton);

  setTimeout(() => closeButton.click());

  const event = await oneEvent(component, 'close');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
