import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreTextarea from './textarea.js';

it('updates its value on input', async () => {
  const host = await fixture<GlideCoreTextarea>(
    html`<glide-core-textarea value="" label="Label"></glide-core-textarea>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'value' });

  expect(host.value).to.equal('value');
});
