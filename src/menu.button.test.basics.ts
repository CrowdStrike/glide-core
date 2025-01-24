import { expect } from '@open-wc/testing';
import GlideCoreMenuButton from './menu.button.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu-button')).to.equal(
    GlideCoreMenuButton,
  );
});
