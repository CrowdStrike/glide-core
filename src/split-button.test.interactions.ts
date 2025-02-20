import './menu.button.js';
import './split-button.primary-button.js';
import './split-button.primary-link.js';
import './split-button.secondary-button.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButton from './split-button.js';

it('sets `privateSize` on its buttons when `size` is set programmatically', async () => {
  const host = await fixture<GlideCoreSplitButton>(html`
    <glide-core-split-button>
      <glide-core-split-button-primary-button
        label="Label"
      ></glide-core-split-button-primary-button>

      <glide-core-split-button-secondary-button
        label="Label"
        slot="secondary-button"
      >
        <glide-core-menu-link label="Label"></glide-core-menu-link
      ></glide-core-split-button-secondary-button>
    </glide-core-split-button>
  `);

  host.size = 'small';

  const primaryButton = host.querySelector(
    'glide-core-split-button-primary-button',
  );

  const secondaryButton = host.querySelector(
    'glide-core-split-button-secondary-button',
  );

  expect(primaryButton?.privateSize).to.equal('small');
  expect(secondaryButton?.privateSize).to.equal('small');
});

it('sets `privateVariant` on its buttons when `variant` is set programmatically', async () => {
  const host = await fixture<GlideCoreSplitButton>(html`
    <glide-core-split-button>
      <glide-core-split-button-primary-button
        label="Label"
      ></glide-core-split-button-primary-button>

      <glide-core-split-button-secondary-button
        label="Label"
        slot="secondary-button"
      >
        <glide-core-menu-link label="Label"></glide-core-menu-link>
      </glide-core-split-button-secondary-button>
    </glide-core-split-button>
  `);

  host.variant = 'secondary';

  const primaryButton = host.querySelector(
    'glide-core-split-button-primary-button',
  );

  const secondaryButton = host.querySelector(
    'glide-core-split-button-secondary-button',
  );

  expect(primaryButton?.privateVariant).to.equal('secondary');
  expect(secondaryButton?.privateVariant).to.equal('secondary');
});
