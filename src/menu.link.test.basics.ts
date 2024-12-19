/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreMenuLink from './menu.link.js';

GlideCoreMenuLink.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-menu-link')).to.equal(
    GlideCoreMenuLink,
  );
});

it('has defaults', async () => {
  // Required attributes are supplied and not asserted below. The idea is that
  // this test shouldn't fail to typecheck if these templates are eventually
  // typechecked, which means supplying required attributes up front.
  const component = await fixture<GlideCoreMenuLink>(
    html`<glide-core-menu-link label="Label" url="/"></glide-core-menu-link>`,
  );

  // Not reflected. So no attribute assertions are necessary.
  expect(component.privateActive).to.be.false;
});

it('can have a label', async () => {
  const component = await fixture<GlideCoreMenuLink>(
    html`<glide-core-menu-link label="Label" url="/"></glide-core-menu-link>`,
  );

  expect(component.shadowRoot?.textContent?.trim()).to.equal('Label');
});

it('can have a URL', async () => {
  const component = await fixture<GlideCoreMenuLink>(
    html`<glide-core-menu-link label="Label" url="/"></glide-core-menu-link>`,
  );

  expect(component.url).to.equal('/');
});

it('can have an icon', async () => {
  const component = await fixture<GlideCoreMenuLink>(
    html`<glide-core-menu-link label="Label">
      <svg
        slot="icon"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </glide-core-menu-link>`,
  );

  const icon = component?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedElements()
    .at(0);

  expect(icon instanceof Element).to.be.true;
});
