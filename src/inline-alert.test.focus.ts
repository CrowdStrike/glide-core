import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreInlineAlert from './inline-alert.js';

GlideCoreInlineAlert.shadowRootOptions.mode = 'open';

it('calling `focus()` focuses the button', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  const button = component.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="removal-button"]',
  );

  button?.focus();

  expect(component.shadowRoot?.activeElement).to.equal(button);
});
