import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreTag from './tag.js';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('renders dynamic string in Japanese', async () => {
  const element = await fixture<GlideCoreTag>(
    html`<glide-core-tag removable-label="test-aria-label"
      ><span slot="prefix">Prefix</span
      ><span data-content>Tag</span></glide-core-tag
    >`,
  );

  document.documentElement.setAttribute('lang', 'ja');
  await elementUpdated(element);

  const iconButton = element.shadowRoot?.querySelector('button');

  expect(iconButton).to.have.attribute(
    'aria-label',
    `タグを削除: test-aria-label`,
  );

  expect(iconButton).to.have.attribute('type', 'button');
});

it('renders dynamic string in French', async () => {
  const element = await fixture<GlideCoreTag>(
    html`<glide-core-tag removable-label="test-aria-label"
      ><span slot="prefix">Prefix</span
      ><span data-content>Tag</span></glide-core-tag
    >`,
  );

  document.documentElement.setAttribute('lang', 'fr');
  await elementUpdated(element);

  const iconButton = element.shadowRoot?.querySelector('button');

  expect(iconButton).to.have.attribute(
    'aria-label',
    `Supprimer la balise : test-aria-label`,
  );

  expect(iconButton).to.have.attribute('type', 'button');
});
