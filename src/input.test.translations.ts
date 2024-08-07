/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreInput from './input.js';

GlideCoreInput.shadowRootOptions.mode = 'open';

it('renders dynamic strings in Japanese', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Test"
      value="lorem"
      maxlength="40"
    ></glide-core-input>
  `);

  document.documentElement.setAttribute('lang', 'ja');
  await elementUpdated(element);

  const maxCharacterCountText = element.shadowRoot?.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(maxCharacterCountText?.textContent?.trim()).to.be.equal('5/40');

  const maxCharacterCountAnnouncement = element.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.be.equal(
    'Character count 5 of 40',
  );
});

it('renders dynamic strings in French', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Test"
      value="lorem"
      maxlength="40"
    ></glide-core-input>
  `);

  document.documentElement.setAttribute('lang', 'fr');
  await elementUpdated(element);

  const maxCharacterCountText = element.shadowRoot?.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(maxCharacterCountText?.textContent?.trim()).to.be.equal('5/40');

  const maxCharacterCountAnnouncement = element.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.be.equal(
    'Character count 5 of 40',
  );
});
