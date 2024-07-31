import './menu.link.js';
import './menu.options.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreMenu from './menu.js';

it('dispatches a "click" event when a link is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  setTimeout(() => document.querySelector('glide-core-menu-link')?.click());

  const event = await oneEvent(component, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "click" event when a button is clicked', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Link"></glide-core-menu-button>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  setTimeout(() => document.querySelector('glide-core-menu-button')?.click());

  const event = await oneEvent(component, 'click');
  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});
