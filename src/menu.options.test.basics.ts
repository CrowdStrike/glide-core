import './menu.button.js';
import './menu.link.js';
import { fixture, html } from '@open-wc/testing';
import './menu.js';
import './menu.options.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-menu-options></glide-core-menu-options>`);
  });
});

it('throws when its default slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-menu-options>
        <option>Option</option>
      </glide-core-menu-options>`,
    );
  });
});
