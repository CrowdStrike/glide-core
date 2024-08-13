/* eslint-disable @typescript-eslint/no-unused-expressions */

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreInput from './input.js';
import type GlideCoreIconButton from './icon-button.js';

GlideCoreInput.shadowRootOptions.mode = 'open';

it('renders dynamic strings in Japanese', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Test"
      value="lorem"
      maxlength="40"
      clearable
    ></glide-core-input>
  `);

  document.documentElement.setAttribute('lang', 'ja');

  await elementUpdated(element);

  const maxCharacterCountText = element.shadowRoot?.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(maxCharacterCountText?.textContent?.trim()).to.equal('5/40');

  const maxCharacterCountAnnouncement = element.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.equal(
    'Character count 5 of 40',
  );

  expect(
    element.shadowRoot?.querySelector<GlideCoreIconButton>(
      '[data-test="clear-button"]',
    )?.label,
  ).to.equal('Clear Test entry');
});

it('renders dynamic strings in French', async () => {
  const element = await fixture<GlideCoreInput>(html`
    <glide-core-input
      label="Test"
      value="lorem"
      maxlength="40"
      clearable
    ></glide-core-input>
  `);

  document.documentElement.setAttribute('lang', 'fr');

  await elementUpdated(element);

  const maxCharacterCountText = element.shadowRoot?.querySelector(
    '[data-test="character-count-text"]',
  );

  expect(maxCharacterCountText?.textContent?.trim()).to.equal('5/40');

  const maxCharacterCountAnnouncement = element.shadowRoot?.querySelector(
    '[data-test="character-count-announcement"]',
  );

  expect(maxCharacterCountAnnouncement?.textContent?.trim()).to.equal(
    'Character count 5 of 40',
  );

  expect(
    element.shadowRoot?.querySelector<GlideCoreIconButton>(
      '[data-test="clear-button"]',
    )?.label,
  ).to.equal('Clear Test entry');
});
