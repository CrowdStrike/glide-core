import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { ifDefined } from 'lit/directives/if-defined.js';
import assertSlot from './assert-slot.js';

@customElement('glide-core-with-slot')
class WithSlot extends LitElement {
  @property()
  name?: string;

  @property({ type: Boolean })
  optional = false;

  @property({ type: Array })
  slotted?: (typeof Element | typeof Text)[] = [];

  override render() {
    return html`<slot
      name=${ifDefined(this.name)}
      ${assertSlot(this.slotted, this.optional)}
    ></slot>`;
  }
}

@customElement('glide-core-when-not-used-on-slot')
class WhenNotUsedOnSlot extends LitElement {
  override render() {
    return html`<div ${assertSlot()}></div>`;
  }
}

@customElement('glide-core-when-not-used-inside-tag')
class WhenNotUsedInsideATag extends LitElement {
  override render() {
    return html`<slot>${assertSlot()}</slot>`;
  }
}

@customElement('glide-core-reslotted')
class Reslotted extends LitElement {
  @property()
  name?: string;

  @property({ type: Boolean })
  optional = false;

  @property({ type: Array })
  slotted?: (typeof Element | typeof Text)[] = [];

  override render() {
    return html`<glide-core-with-slot
      name=${ifDefined(this.name)}
      .slotted=${this.slotted}
      ?optional=${this.optional}
    >
      <slot name=${ifDefined(this.name)}></slot>
    </glide-core-with-slot>`;
  }
}

it('throws when a required default slot is empty', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<WithSlot>(html`<glide-core-with-slot></glide-core-with-slot>`);

  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);
  expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;

  expect(spy.args.at(0)?.at(0).reason.message).to.equal(
    'Expected WithSlot to have a default slot.',
  );

  stub.restore();
});

it('throws when a required default slot is emptied', async () => {
  const host = await fixture<WithSlot>(
    html`<glide-core-with-slot>
      <button>Button</button>
    </glide-core-with-slot>`,
  );

  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;
  host.innerHTML = '';

  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected a default slot.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when a required named slot is empty', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<WithSlot>(
    html`<glide-core-with-slot name="test"></glide-core-with-slot>`,
  );

  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);
  expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;

  expect(spy.args.at(0)?.at(0).reason.message).to.equal(
    'Expected WithSlot to have a "test" slot.',
  );

  stub.restore();
});

it('throws when a required named slot is emptied', async () => {
  const host = await fixture<WithSlot>(
    html`<glide-core-with-slot name="test">
      <button slot="test">Button</button>
    </glide-core-with-slot>`,
  );

  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  host.innerHTML = '';
  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected a "test" slot.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when a typed and required default slot is empty', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<WithSlot>(
    html`<glide-core-with-slot
      .slotted=${[HTMLButtonElement]}
    ></glide-core-with-slot>`,
  );

  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);
  expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;

  expect(spy.args.at(0)?.at(0).reason.message).to.equal(
    'Expected WithSlot to have a slotted element that extends HTMLButtonElement.',
  );

  stub.restore();
});

it('throws when a typed and required default slot is emptied', async () => {
  const host = await fixture<WithSlot>(
    html`<glide-core-with-slot .slotted=${[HTMLButtonElement]}>
      <button>Button</button>
    </glide-core-with-slot>`,
  );

  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  host.innerHTML = '';
  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected WithSlot to have a slotted element that extends HTMLButtonElement.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when a typed and required default slot has the wrong element', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  await fixture<WithSlot>(
    html`<glide-core-with-slot
      .slotted=${[HTMLButtonElement, HTMLDivElement, Text]}
    >
      <a href="/">Link</a>
    </glide-core-with-slot>`,
  );

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected WithSlot to have a slotted element that extends HTMLButtonElement or HTMLDivElement or Text. Extends HTMLAnchorElement instead.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when a typed and required default slot only contains text', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  await fixture<WithSlot>(
    html`<glide-core-with-slot .slotted=${[HTMLButtonElement]}>
      Text
    </glide-core-with-slot>`,
  );

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected WithSlot to have a slotted element that extends HTMLButtonElement.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when a typed and required named slot is empty', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<WithSlot>(
    html`<glide-core-with-slot
      name="test"
      .slotted=${[HTMLButtonElement]}
    ></glide-core-with-slot>`,
  );

  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);
  expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;

  expect(spy.args.at(0)?.at(0).reason.message).to.equal(
    'Expected the "test" slot of WithSlot to have a slotted element that extends HTMLButtonElement.',
  );

  stub.restore();
});

it('throws when a typed and required named slot is emptied', async () => {
  const host = await fixture<WithSlot>(
    html`<glide-core-with-slot name="test" .slotted=${[HTMLButtonElement]}>
      <button slot="test">Button</button>
    </glide-core-with-slot>`,
  );

  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  host.innerHTML = '';
  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected the "test" slot of WithSlot to have a slotted element that extends HTMLButtonElement.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when a typed and required named slot has the wrong element', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  await fixture<WithSlot>(
    html`<glide-core-with-slot
      name="test"
      .slotted=${[HTMLButtonElement, HTMLDivElement, Text]}
    >
      <a slot="test" href="/">Link</a>
    </glide-core-with-slot>`,
  );

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected the "test" slot of WithSlot to have a slotted element that extends HTMLButtonElement or HTMLDivElement or Text. Extends HTMLAnchorElement instead.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('does not throw when an optional slot is empty', async () => {
  const spy = sinon.spy();
  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<WithSlot>(
    html`<glide-core-with-slot optional></glide-core-with-slot>`,
  );

  expect(spy.callCount).to.equal(0);
});

it('does not throw when an optional slot is emptied', async () => {
  const spy = sinon.spy();
  window.addEventListener('error', spy);

  const host = await fixture<WithSlot>(
    html`<glide-core-with-slot optional>
      <button>Button</button>
    </glide-core-with-slot>`,
  );

  host.innerHTML = '';

  // Wait for the event handler to be called.
  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not throw when a typed and required default slot only contains text and text is allowed', async () => {
  const spy = sinon.spy();
  window.addEventListener('error', spy);

  await fixture<WithSlot>(
    html`<glide-core-with-slot .slotted=${[Text]}> </glide-core-with-slot>`,
  );

  expect(spy.callCount).to.equal(0);
});

it('throws when a typed optional slot has the wrong element', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  await fixture<WithSlot>(
    html`<glide-core-with-slot
      .slotted=${[HTMLButtonElement, HTMLDivElement, Text]}
      optional
    >
      <a href="/">Link</a>
    </glide-core-with-slot>`,
  );

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected WithSlot to have a slotted element that extends HTMLButtonElement or HTMLDivElement or Text. Extends HTMLAnchorElement instead.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when not used on a slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<WhenNotUsedOnSlot>(
      html`<glide-core-when-not-used-on-slot></glide-core-when-not-used-on-slot>`,
    );
  } catch (error) {
    if (error instanceof Error) {
      spy(error);
    }
  }

  expect(spy.args.at(0)?.at(0).message).to.equal(
    'Directive can only be used on slots.',
  );
});

it('throws when not used inside an opening tag', async () => {
  const spy = sinon.spy();

  try {
    await fixture<WhenNotUsedInsideATag>(
      html`<glide-core-when-not-used-inside-tag></glide-core-when-not-used-inside-tag>`,
    );
  } catch (error) {
    if (error instanceof Error) {
      spy(error);
    }
  }

  expect(spy.args.at(0)?.at(0).message).to.equal(
    "Directive must be inside the element's opening tag.",
  );
});

it('throws when a reslotted and required default slot is empty', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  await fixture<Reslotted>(
    html`<glide-core-reslotted
      .slotted=${[HTMLDivElement]}
    ></glide-core-reslotted>`,
  );

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected WithSlot to have a slotted element that extends HTMLDivElement.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('throws when a reslotted default slot has the wrong element', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();
  const onerror = window.onerror;

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = spy;

  await fixture<Reslotted>(
    html`<glide-core-reslotted .slotted=${[HTMLDivElement]}>
      <a href="/">Link</a>
    </glide-core-reslotted>`,
  );

  expect(spy.callCount).to.equal(1);

  expect(spy.args.at(0)?.at(0)).to.equal(
    'Uncaught TypeError: Expected WithSlot to have a slotted element that extends HTMLDivElement. Extends HTMLAnchorElement instead.',
  );

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  window.onerror = onerror;

  stub.restore();
});

it('does not throw when a reslotted default slot has the correct element', async () => {
  const spy = sinon.spy();
  window.addEventListener('error', spy);

  await fixture<Reslotted>(
    html`<glide-core-reslotted .slotted=${[HTMLDivElement]}>
      <div>Content</div>
    </glide-core-reslotted>`,
  );

  expect(spy.callCount).to.equal(0);
});

it('throws when a reslotted and required named slot is empty', async () => {
  const stub = sinon.stub(console, 'error');
  const spy = sinon.spy();

  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<Reslotted>(
    html`<glide-core-reslotted
      name="test"
      .slotted=${[HTMLDivElement]}
    ></glide-core-reslotted>`,
  );

  await waitUntil(() => spy.callCount);

  expect(spy.callCount).to.equal(1);
  expect(spy.args.at(0)?.at(0) instanceof PromiseRejectionEvent).to.be.true;

  expect(spy.args.at(0)?.at(0).reason.message).to.equal(
    'Expected the "test" slot of WithSlot to have a slotted element that extends HTMLDivElement.',
  );

  stub.restore();
});

it('does not throw when a reslotted optional named slot is empty', async () => {
  const spy = sinon.spy();
  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<Reslotted>(
    html`<glide-core-reslotted name="test" optional></glide-core-reslotted>`,
  );

  expect(spy.callCount).to.equal(0);
});

it('does not throw when a reslotted optional slot is empty', async () => {
  const spy = sinon.spy();
  window.addEventListener('unhandledrejection', spy, { once: true });

  await fixture<Reslotted>(
    html`<glide-core-reslotted optional></glide-core-reslotted>`,
  );

  expect(spy.callCount).to.equal(0);
});
