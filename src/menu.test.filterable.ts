import './options.js';
import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import Menu from './menu.js';
import './option.js';
import './input.js';
import './button.js';
import Tooltip from './tooltip.js';
import requestIdleCallback from './library/request-idle-callback.js';

it('opens on "input"', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <glide-core-input label="Label" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('glide-core-input');
  const option = host.querySelector('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

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

  const target = host.querySelector('glide-core-input');
  const option = host.querySelector('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  const tooltip = option?.shadowRoot?.querySelector<Tooltip>(
    '[data-test="tooltip"]',
  );

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: ' ' });

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;
  expect(tooltip?.open).to.be.true;
  expect(input?.value).to.be.empty.string;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
});

it('remains open when already open and its target is clicked', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu open>
      <glide-core-input label="Label" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const target = host.querySelector('glide-core-input');
  const option = host.querySelector('glide-core-option');

  const defaultSlot = host.shadowRoot?.querySelector<HTMLSlotElement>(
    '[data-test="default-slot"]',
  );

  await aTimeout(0);
  await click(target);

  expect(host.open).to.be.true;
  expect(target?.ariaExpanded).to.equal('true');
  expect(defaultSlot?.checkVisibility()).to.be.true;

  expect(
    host
      .querySelector('glide-core-options')
      ?.getAttribute('aria-activedescendant'),
  ).to.equal(option?.id);
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

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

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

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowLeft' }); // One

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  expect(input?.selectionStart).to.equal(3);
  expect(input?.selectionEnd).to.equal(3);
});

it('allows the insertion point to move on ArrowUp when its first Option or the first Option of a sub-Menu are active', async () => {
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

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowUp' }); // One

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

it('allows the insertion point to move on ArrowDown when its last Option of the last Option of a sub-Menu are active', async () => {
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

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

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

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

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

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowLeft' }); // Two

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

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });
  await sendKeys({ press: 'ArrowDown' }); // Six
  await sendKeys({ press: 'ArrowUp' }); // One

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

  const input = host
    .querySelector('[slot="target"]')
    ?.shadowRoot?.querySelector<HTMLInputElement>('[data-test="input"]');

  await requestIdleCallback(); // Wait for Floating UI
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'test' });

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
