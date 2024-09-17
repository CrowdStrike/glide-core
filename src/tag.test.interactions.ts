/* eslint-disable @typescript-eslint/no-unused-expressions */

import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTag from './tag.js';

GlideCoreTag.shadowRootOptions.mode = 'open';

it('removes itself on click', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.click();

  // Wait for the animation to complete.
  await aTimeout(200);

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('removes itself on Space', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.focus();
  await sendKeys({ press: ' ' });

  // Wait for the animation to complete.
  await aTimeout(200);

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('removes itself on Enter', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  component.focus();
  await sendKeys({ press: 'Enter' });

  // Wait for the animation to complete.
  await aTimeout(200);

  expect(document.querySelector('glide-core-tag')).to.be.null;
});

it('supports `textContent`', async () => {
  const component = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="One"></glide-core-tag>`,
  );

  expect(component.textContent).to.equal('One');

  component.textContent = 'Two';
  expect(component.label).to.equal('Two');
});
