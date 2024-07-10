import './menu.link.js';
import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreMenu from './menu.js';
import GlideCoreMenuOptions from './menu.options.js';

GlideCoreMenu.shadowRootOptions.mode = 'open';

it('focuses the target on `focus()`', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.focus();

  const target = component.querySelector('button');
  assert(target);

  expect(document.activeElement).to.equal(target);
});

it('closes when it loses focus', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.focus();
  await sendKeys({ press: 'Tab' });

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  const options = component.querySelector('glide-core-menu-options');

  expect(component.open).to.be.false;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).be.false;
  expect(options?.getAttribute('aria-activedescendant')).to.equal('');
});

it('remains open when the options component is focused', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.focus();

  const options = component.querySelector('glide-core-menu-options');

  assert(options instanceof GlideCoreMenuOptions);
  options.focus();

  const defaultSlot =
    component?.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

  expect(component.open).to.be.true;
  expect(defaultSlot?.checkVisibility({ checkVisibilityCSS: true })).to.be.true;
});

it('remains open when an option is focused', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.focus();

  const option = component.querySelector('glide-core-menu-link');
  assert(option);
  option?.focus();

  expect(component.open).to.be.true;
});

it('sets the focused option as active', async () => {
  const component = await fixture<GlideCoreMenu>(
    html`<glide-core-menu open>
      <button slot="target">Target</button>

      <glide-core-menu-options>
        <glide-core-menu-button label="Button"></glide-core-menu-button>
        <glide-core-menu-link label="Link"></glide-core-menu-link>
      </glide-core-menu-options>
    </glide-core-menu>`,
  );

  component.focus();

  const target = component.querySelector('glide-core-menu-button');
  const link = component.querySelector('glide-core-menu-link');

  const options = component.querySelector('glide-core-menu-options');

  link?.focus();
  await elementUpdated(component);

  expect(target?.privateActive).to.be.false;
  expect(link?.privateActive).to.be.true;
  expect(options?.getAttribute('aria-activedescendant')).to.equal(link?.id);
});
