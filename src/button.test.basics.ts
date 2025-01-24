import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreButton from './button.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-button')).to.equal(
    GlideCoreButton,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-button label="Label"></glide-core-button>`,
  );

  await expect(component).to.be.accessible();
});

it('has `#onPrefixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="prefix-icon">Prefix</span>
    </glide-core-button>
  `);
});

it('has `#onSuffixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="suffix-icon">Suffix</span>
    </glide-core-button>
  `);
});
