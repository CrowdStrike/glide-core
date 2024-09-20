/* eslint-disable @typescript-eslint/no-unused-expressions */

import './split-button.primary-button.js';
import './split-button.primary-link.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreSplitButton from './split-button.js';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreSplitButton.shadowRootOptions.mode = 'open';
GlideCoreSplitButtonSecondaryButton.shadowRootOptions.mode = 'open';
GlideCoreMenuButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-split-button')).to.equal(
    GlideCoreSplitButton,
  );
});

it('is accessible', async () => {
  const component = await fixture(html`
    <glide-core-split-button>
      <glide-core-split-button-primary-button
        label="Label"
      ></glide-core-split-button-primary-button>

      <glide-core-split-button-secondary-button
        label="Label"
        slot="secondary-button"
      >
        <glide-core-menu-button label="Label"></glide-core-menu-button>
      </glide-core-split-button-secondary-button>
    </glide-core-split-button>
  `);

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButton>(html`
    <glide-core-split-button>
      <glide-core-split-button-primary-link
        label="Label"
      ></glide-core-split-button-primary-link>

      <glide-core-split-button-secondary-button
        label="Label"
        slot="secondary-button"
      >
        <glide-core-menu-button label="Label"></glide-core-menu-button>
      </glide-core-split-button-secondary-button>
    </glide-core-split-button>
  `);

  expect(component.size).to.equal('large');
  expect(component.variant).to.equal('primary');
});

it('throws when its default slot is empty', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button>
        <glide-core-split-button-secondary-button
          label="Label"
          slot="secondary-button"
        >
          <glide-core-menu-button label="Label"></glide-core-menu-button>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>`,
    ),
  );
});

it('throws when its default slot is the incorrect type', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button>
        <div></div>

        <glide-core-split-button-secondary-button
          label="Label"
          slot="secondary-button"
        >
          <glide-core-menu-button label="Label"></glide-core-menu-button>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>`,
    ),
  );
});

it('throws when its "secondary-button" slot is empty', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button>
        <glide-core-split-button-primary-button
          label="Label"
        ></glide-core-split-button-primary-button>
      </glide-core-split-button>`,
    ),
  );
});

it('throws when its "secondary-button" slot is the incorrect type', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button>
        <glide-core-split-button-primary-button
          label="Label"
        ></glide-core-split-button-primary-button>

        <div slot="secondary-button"></div>
      </glide-core-split-button>`,
    ),
  );
});
