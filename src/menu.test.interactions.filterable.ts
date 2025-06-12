import './options.js';
import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import Menu from './menu.js';
import './option.js';
import './input.js';
import './button.js';
import Tooltip from './tooltip.js';

it('opens on input', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <glide-core-input label="Label" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('glide-core-input');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const option = host.querySelector('glide-core-option');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('opens on Space', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <glide-core-input label="Label" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label=${'x'.repeat(500)}></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const target = host.querySelector('glide-core-input');
  const option = host.querySelector('glide-core-option');

  const tooltip = option?.shadowRoot?.querySelector<Tooltip>(
    '[data-test="tooltip"]',
  );

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: ' ' });

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(input?.value).to.be.empty.string;
  expect(tooltip?.open).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('remains open when open and its target is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Label" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const target = host.querySelector('glide-core-input');
  const option = host.querySelector('glide-core-option');

  await aTimeout(0);
  await click(target);

  expect(host.open).to.be.true;
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('closes its sub-Menus when their targets are clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const options = host.querySelectorAll('glide-core-option');
  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];

  const defaultSlots = hosts.map((host) =>
    host.shadowRoot?.querySelector<HTMLSlotElement>(
      '[data-test="default-slot"]',
    ),
  );

  const targets = host.querySelectorAll('[slot="target"]');

  // Replaces the usual `await aTimeout(0)`. It's not clear why. But opening
  // Menus in tests sometimes takes more than a tick when sub-Menus are present.
  await waitUntil(() => {
    return (
      defaultSlots[0]?.checkVisibility() &&
      defaultSlots[1]?.checkVisibility() &&
      defaultSlots[2]?.checkVisibility()
    );
  });

  await click(targets[2]);

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.true;
  expect(hosts[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.be.true;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('true');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[0]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[1]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  await click(targets[1]);

  expect(hosts[0]?.open).to.be.true;
  expect(hosts[1]?.open).to.be.false;
  expect(hosts[2]?.open).to.be.false;

  expect(defaultSlots[0]?.checkVisibility()).to.be.true;
  expect(defaultSlots[1]?.checkVisibility()).to.not.be.ok;
  expect(defaultSlots[2]?.checkVisibility()).to.not.be.ok;

  expect(targets[0]?.ariaExpanded).to.equal('true');
  expect(targets[1]?.ariaExpanded).to.be.null;
  expect(targets[2]?.ariaExpanded).to.be.null;

  expect(options[0]?.ariaExpanded).to.equal('false');
  expect(options[1]?.ariaExpanded).to.equal('false');
  expect(options[2]?.ariaExpanded).to.be.null;

  expect(
    hosts[0]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(hosts[0]?.querySelector('glide-core-option')?.id);

  expect(
    hosts[1]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;

  expect(
    hosts[2]
      ?.querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.be.empty.string;
});

it('allows the insertion point to move on ArrowRight when not opening a sub-Menu', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>

        <glide-core-option label="Two">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  input?.setSelectionRange(0, 0);

  await sendKeys({ press: 'ArrowRight' }); // One

  expect(input?.selectionStart).to.equal(1);
  expect(input?.selectionEnd).to.equal(1);
});

it('allows the insertion point to move on ArrowLeft when not closing a sub-Menu', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>

        <glide-core-option label="Two">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Three"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowLeft' }); // One

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  expect(input?.selectionStart).to.equal(3);
  expect(input?.selectionEnd).to.equal(3);
});

it('allows the insertion point to move on ArrowUp when the first Option is active', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                    <glide-core-option label="Four"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Five"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Six"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowUp' }); // One

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);

  await sendKeys({ press: 'ArrowRight' }); // Two
  input?.setSelectionRange(4, 4);
  await sendKeys({ press: 'ArrowUp' }); // Two

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);

  await sendKeys({ press: 'ArrowRight' }); // Three
  input?.setSelectionRange(4, 4);
  await sendKeys({ press: 'ArrowUp' }); // Three

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);
});

it('allows the insertion point to move on ArrowDown when the last Option is active', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One"></glide-core-option>

        <glide-core-option label="Two">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Three"></glide-core-option>

              <glide-core-option label="Four">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Five"></glide-core-option>
                    <glide-core-option label="Six"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  input?.setSelectionRange(0, 0);

  await sendKeys({ press: 'ArrowDown' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Two

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);

  await sendKeys({ press: 'ArrowRight' }); // Three
  await sendKeys({ press: 'ArrowDown' }); // Four

  input?.setSelectionRange(0, 0);
  await sendKeys({ press: 'ArrowDown' }); // Four

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);

  await sendKeys({ press: 'ArrowRight' }); // Five
  await sendKeys({ press: 'ArrowDown' }); // Six

  input?.setSelectionRange(0, 0);
  await sendKeys({ press: 'ArrowDown' }); // Six

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);
});

it('does not allow the insertion point to move on ArrowRight when opening a sub-Menu', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  input?.setSelectionRange(0, 0);

  await sendKeys({ press: 'ArrowRight' }); // Two

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);

  await sendKeys({ press: 'ArrowRight' }); // Three

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);
});

it('does not allow the insertion point to move on ArrowLeft when closing a sub-Menu', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu" open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu" open>
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowLeft' }); // Two

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);

  await sendKeys({ press: 'ArrowLeft' }); // One

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);
});

it('does not allow the insertion point to move on ArrowUp when the first Option is not active', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Three"></glide-core-option>
                    <glide-core-option label="Four"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>

              <glide-core-option label="Five"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Six"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowDown' }); // Six
  await sendKeys({ press: 'ArrowUp' }); // One

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);

  await sendKeys({ press: 'ArrowRight' }); // Two
  await sendKeys({ press: 'ArrowDown' }); // Five

  input?.setSelectionRange(4, 4);
  await sendKeys({ press: 'ArrowUp' }); // Two

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);

  await sendKeys({ press: 'ArrowRight' }); // Three
  await sendKeys({ press: 'ArrowDown' }); // Four

  input?.setSelectionRange(4, 4);
  await sendKeys({ press: 'ArrowUp' }); // Three

  expect(input?.selectionStart).to.equal(4);
  expect(input?.selectionEnd).to.equal(4);
});

it('does not allow the insertion point to move on ArrowDown when the last Option is not active', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One"> </glide-core-option>

        <glide-core-option label="Two">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Three"></glide-core-option>

              <glide-core-option label="Four">
                <glide-core-menu slot="submenu">
                  <button slot="target">Target</button>

                  <glide-core-options>
                    <glide-core-option label="Five"></glide-core-option>
                    <glide-core-option label="Six"></glide-core-option>
                  </glide-core-options>
                </glide-core-menu>
              </glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  await aTimeout(0); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  input?.setSelectionRange(0, 0);

  await sendKeys({ press: 'ArrowDown' }); // Two

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);

  await sendKeys({ press: 'ArrowRight' }); // Three
  await sendKeys({ press: 'ArrowDown' }); // Four

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);

  await sendKeys({ press: 'ArrowRight' }); // Five
  await sendKeys({ press: 'ArrowDown' }); // Six

  expect(input?.selectionStart).to.equal(0);
  expect(input?.selectionEnd).to.equal(0);
});
