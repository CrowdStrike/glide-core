import { expect, fixture, html } from '@open-wc/testing';
import InlineAlert from './inline-alert.js';

it('focuses its removal button when `focus()` is called', async () => {
  const host = await fixture<InlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable>
      Label
    </glide-core-inline-alert>`,
  );

  host.focus();

  const button = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="removal-button"]',
  );

  expect(host.shadowRoot?.activeElement).to.equal(button);
});
