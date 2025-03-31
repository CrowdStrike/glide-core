import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { emulateMedia, sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreInlineAlert from './inline-alert.js';

it('removes itself on removable button click', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable>
      Label
    </glide-core-inline-alert>`,
  );

  click(host.shadowRoot?.querySelector('[data-test="removal-button"]'));

  await waitUntil(() => {
    return !document.querySelector('glide-core-inline-alert');
  });

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on removable button Space', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable>
      Label
    </glide-core-inline-alert>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  await waitUntil(() => {
    return !document.querySelector('glide-core-inline-alert');
  });

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});

it('removes itself on removable button Enter', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable>
      Label
    </glide-core-inline-alert>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  await waitUntil(() => {
    return !document.querySelector('glide-core-inline-alert');
  });

  expect(document.querySelector('glide-core-inline-alert')).to.be.null;
});
