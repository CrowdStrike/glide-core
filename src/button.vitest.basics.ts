import { expect, test } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import GlideCoreButton from './button.js';

GlideCoreButton.shadowRootOptions.mode = 'open';

test('registers itself', () => {
  expect(window.customElements.get('glide-core-button')).to.equal(
    GlideCoreButton,
  );
});

test('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-button label="Label"></glide-core-button>`,
  );

  await expect(component).to.be.accessible();
});

test('has `#onPrefixSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="prefix-icon">Prefix</span>
    </glide-core-button>
  `);
});

test('has `#onSuffixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="suffix-icon">Suffix</span>
    </glide-core-button>
  `);
});
