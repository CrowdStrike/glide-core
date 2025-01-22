import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

GlideCoreSplitButtonSecondaryButton.shadowRootOptions.mode = 'open';
GlideCoreMenuButton.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-secondary-button'),
  ).to.equal(GlideCoreSplitButtonSecondaryButton);
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreSplitButtonSecondaryButton>(html`
    <glide-core-split-button-secondary-button label="Label">
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  `);

  await expect(component).to.be.accessible();

  component.disabled = true;
  await component.updateComplete;

  await expect(component).to.be.accessible();
});

it('throws when its default slot is empty', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`
      <glide-core-split-button-secondary-button
        label="Label"
      ></glide-core-split-button-secondary-button>
    `);
  });
});

it('throws when its default slot is the incorrect type', async () => {
  await expectWindowError(() => {
    return fixture(html`
      <glide-core-split-button-secondary-button label="Label">
        <div></div>
      </glide-core-split-button-secondary-button>
    `);
  });
});
