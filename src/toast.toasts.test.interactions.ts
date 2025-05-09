import { aTimeout, expect, fixture, html } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import Toast from './toast.js';
import { click, hover } from './library/mouse.js';

// "transitionend" is dispatched manually throughout these tests because that
// event isn't consistently emitted in CI. It's not clear why. The below issue
// may be related.
//
// https://github.com/modernweb-dev/web/issues/2588

afterEach(() => {
  // Toasts isn't removed for us by `fixture()` because Toasts is rendered as
  // a side effect of Toast and is appended to `document.body`. So we have to
  // manually remove it. Otherwise, Toasts that haven't been dismissed may be
  // left hanging around. And we want each test to start fresh.
  document.querySelector('glide-core-private-toasts')?.remove();
});

it('removes toasts on click when they are animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  const host = await fixture(
    html`<glide-core-toast label="Label"></glide-core-toast>`,
  );

  const toast = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector<Toast>('[data-test="toast"]');

  toast?.style.setProperty('--private-test-transition-duration', '0ms');

  // Toasts waits a tick before showing a new toast. There's comment in
  // Toasts' `show()` method explaining why.
  await aTimeout(0);

  await click(toast?.querySelector('[data-test="dismiss-button"]'));
  toast?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(toast?.isConnected).to.be.false;
  expect(host.isConnected).to.be.false;
});

it('removes toasts on click when they are not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(
    html`<glide-core-toast label="Label"></glide-core-toast>`,
  );

  const toast = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector('[data-test="toast"]');

  const dismissButton = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector('[data-test="dismiss-button"]');

  // Toasts waits a tick before showing a new toast. There's comment in
  // Toasts' `show()` method explaining why.
  await aTimeout(0);

  await click(dismissButton);

  expect(toast?.isConnected).to.be.false;
  expect(host.isConnected).to.be.false;
});

it('waits to dismiss toasts when they are hovered and animated', async () => {
  await emulateMedia({ reducedMotion: 'no-preference' });

  // `100` because it's a round and relatively small number.
  const duration = 100;

  const host = await fixture(
    html`<glide-core-toast
      label="Label"
      duration=${duration}
    ></glide-core-toast>`,
  );

  const toast = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector<Toast>('[data-test="toast"]');

  toast?.style.setProperty('--private-test-transition-duration', '0ms');

  // Toasts waits a tick before showing a new toast. There's comment in
  // Toasts' `show()` method explaining why.
  await aTimeout(0);

  await hover(toast);
  await aTimeout(duration);

  expect(toast?.isConnected).to.be.true;
  expect(host.isConnected).to.be.true;

  await hover(document.body);
  await aTimeout(duration);
  toast?.dispatchEvent(new TransitionEvent('transitionend'));

  expect(toast?.isConnected).to.be.false;
  expect(host.isConnected).to.be.false;
});

it('waits to remove toasts when they are hovered and not animated', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });
  const duration = 100;

  // `100` because it's a round and relatively small number.
  const host = await fixture(
    html`<glide-core-toast
      label="Label"
      duration=${duration}
    ></glide-core-toast>`,
  );

  const toast = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector<Toast>('[data-test="toast"]');

  // Toasts waits a tick before showing a new toast. There's comment in
  // Toasts' `show()` method explaining why.
  await aTimeout(0);

  await hover(toast);
  await aTimeout(duration);

  expect(toast?.isConnected).to.be.true;
  expect(host.isConnected).to.be.true;

  await hover(document.body);
  await aTimeout(duration);

  expect(toast?.isConnected).to.be.false;
  expect(host.isConnected).to.be.false;
});

it('removes itself when the last toast is dismissed', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });
  await fixture(html`<glide-core-toast label="Label"></glide-core-toast>`);

  const dismissButton = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector('[data-test="dismiss-button"]');

  // Toasts waits a tick before showing a new toast. There's comment in
  // Toasts' `show()` method explaining why.
  await aTimeout(0);

  await click(dismissButton);

  const toasts = document.querySelector('glide-core-private-toasts');
  expect(toasts).to.be.null;
});
