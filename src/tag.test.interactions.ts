import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { emulateMedia, sendKeys } from '@web/test-runner-commands';
import GlideCoreTag from './tag.js';

it('removes itself on click', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  host.click();

  await waitUntil(() => {
    return !document.querySelector('glide-core-tag');
  });

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('does not remove itself on click when disabled', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" disabled removable></glide-core-tag>`,
  );

  host.click();

  expect(document.querySelector('glide-core-tag') instanceof GlideCoreTag).to.be
    .true;
});

it('removes itself on Space', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  await waitUntil(() => {
    return !document.querySelector('glide-core-tag');
  });

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('removes itself on Enter', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  await waitUntil(() => {
    return !document.querySelector('glide-core-tag');
  });

  expect(document.querySelector('glide-core-tag')).to.be.null;
});
