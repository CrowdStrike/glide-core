import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreIconButton from './icon-button.js';

GlideCoreIconButton.shadowRootOptions.mode = 'open';

it('focuses its button when `focus()` is called', async () => {
  const component = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  component.focus();

  const button = component.shadowRoot?.querySelector('[data-test="button"]');
  expect(component.shadowRoot?.activeElement).to.equal(button);
});
