/* eslint-disable @typescript-eslint/no-unused-expressions */

import './accordion.js';
import { click } from './library/mouse.js';
import { emulateMedia } from '@web/test-runner-commands';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreAccordion from './accordion.js';

GlideCoreAccordion.shadowRootOptions.mode = 'open';

it('dispatches a "toggle" event on open', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  click(component);

  const event = await oneEvent(component, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "toggle" event on close', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const component = await fixture<GlideCoreAccordion>(
    html`<glide-core-accordion label="Label" open>
      Content
    </glide-core-accordion>`,
  );

  click(component);

  const event = await oneEvent(component, 'toggle');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});
