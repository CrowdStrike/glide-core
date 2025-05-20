import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import './link.js';
import './toast.js';
import { click } from './library/mouse.js';

afterEach(() => {
  // Toasts isn't removed for us by `fixture()` because Toasts is rendered as
  // a side effect of Toast and is appended to `document.body`. So we have to
  // manually remove it. Otherwise, Toasts that haven't been dismissed may be
  // left hanging around. And we want each test to start fresh.
  document.querySelector('glide-core-private-toasts')?.remove();
});

it('dispatches a "dismiss" event when a toast is automatically dismissed', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(
    html`<glide-core-toast label="Label" duration=${100}></glide-core-toast>`,
  );

  const event = await oneEvent(host, 'dismiss');

  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(host);
});

it('dispatches a "dismiss" event when a toast is dismissed by click', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(
    html`<glide-core-toast label="Label"></glide-core-toast>`,
  );

  // Toasts waits a tick before showing a newly added toast. There's comment
  // in Toasts' `show()` method explaining why.
  await aTimeout(0);

  const dismissButton = document
    .querySelector('glide-core-private-toasts')
    ?.shadowRoot?.querySelector('[data-test="dismiss-button"]');

  click(dismissButton);
  const event = await oneEvent(host, 'dismiss');

  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(host);
});

it('dispatches a "click" event when a link is clicked', async () => {
  await emulateMedia({ reducedMotion: 'reduce' });

  const host = await fixture(
    html`<glide-core-toast label="Label">
      Description
      <glide-core-link
        label="Label"
        data-test="link"
        href="/"
      ></glide-core-link>
    </glide-core-toast>`,
  );

  // Toasts waits a tick before showing a newly added toast. There's comment
  // in Toasts' `show()` method explaining why.
  await aTimeout(0);

  host?.addEventListener('click', (event: Event) => {
    event.preventDefault();
  });

  click(
    document
      .querySelector('glide-core-private-toasts')
      ?.shadowRoot?.querySelector('[data-test="toast"]')
      ?.querySelector('[data-test="link"]'),
  );

  const event = await oneEvent(host, 'click');
  const link = host.querySelector('glide-core-link');

  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(link);
});
