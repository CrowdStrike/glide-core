import { expect } from '@open-wc/testing';
import GlideCoreMenuLink from './menu.link.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu-link')).to.equal(
    GlideCoreMenuLink,
  );
});
