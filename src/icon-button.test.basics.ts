import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreIconButton from './icon-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-icon-button')).to.equal(
    GlideCoreIconButton,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreIconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  await expect(component).to.be.accessible();
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(
      html`<glide-core-icon-button label="Label"></glide-core-icon-button>`,
    );
  });
});
