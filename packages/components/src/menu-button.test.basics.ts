import { expect, fixture, html } from '@open-wc/testing';
import MenuButton from './menu-button.js';

MenuButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-menu-button')).to.equal(MenuButton);
});

it('has defaults', async () => {
  // Required attributes are supplied and not asserted below. The idea is that
  // this test shouldn't fail to typecheck if these templates are eventually
  // typechecked, which means supplying required attributes up front.
  const button = await fixture<MenuButton>(
    html`<cs-menu-button label="Label"></cs-menu-button>`,
  );

  // Not reflected. So no attribute assertions are necessary.
  expect(button.privateActive).to.equal(false);
});

it('can have a label', async () => {
  const button = await fixture<MenuButton>(
    html`<cs-menu-button label="Label"></cs-menu-button>`,
  );

  expect(button.shadowRoot?.textContent?.trim()).to.equal('Label');
});

it('can have an icon', async () => {
  const button = await fixture<MenuButton>(
    html`<cs-menu-button label="Label">
      <svg
        slot="icon"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </cs-menu-button>`,
  );

  const icon = button?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedElements()
    .at(0);
  expect(icon instanceof Element).to.be.true;
});
