import './options.js';
import { LitElement } from 'lit';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import Menu from './menu.js';
import { click } from '@/src/library/mouse.js';
import './option.js';
import './input.js';
import requestIdleCallback from '@/src/library/request-idle-callback.js';

@customElement('glide-core-target-as-slot')
class TargetAsSlot extends LitElement {
  override render() {
    return html`<glide-core-menu open>
      <slot name="target" slot="target"></slot>

      <glide-core-options>
        <slot></slot>
      </glide-core-options>
    </glide-core-menu>`;
  }
}

it('is accessible', async () => {
  const host = await fixture<Menu>(
    html`<glide-core-menu>
      <glide-core-input label="Target" slot="target"></glide-core-input>

      <glide-core-options>
        <glide-core-option label="One">
          <glide-core-menu slot="submenu">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>
        </glide-core-option>

        <glide-core-option label="Three" href="/"></glide-core-option>
      </glide-core-options>
    </glide-core-menu>`,
  );

  const hosts = [host, ...host.querySelectorAll('glide-core-menu')];

  const targets = [
    host.querySelector('glide-core-input'),
    ...host.querySelectorAll('button'),
  ];

  const options = host.querySelectorAll('glide-core-option');

  expect(targets[0]?.getAttribute('aria-controls')).to.equal(
    hosts[0]?.querySelector('glide-core-options')?.id,
  );

  expect(targets[0]?.ariaHasPopup).to.equal('true');
  expect(targets[1]?.ariaHasPopup).to.be.null;
  expect(targets[1]?.getAttribute('aria-controls')).to.be.null;
  expect(options[0]?.ariaHasPopup).to.equal('true');
  expect(options[1]?.ariaHasPopup).to.be.null;

  expect(
    hosts[0]?.querySelector('glide-core-options')?.ariaLabelledby,
  ).to.equal(targets[0]?.id);

  expect(
    hosts[1]?.querySelector('glide-core-options')?.ariaLabelledby,
  ).to.equal(targets[1]?.id);

  await expect(host).to.be.accessible();
});

it('has `#isFilterable` coverage', async () => {
  const host = await fixture<TargetAsSlot>(
    html`<glide-core-target-as-slot>
      <glide-core-input label="Target" slot="target"></glide-core-input>
      <glide-core-option label="Label"></glide-core-option>
    </glide-core-target-as-slot>`,
  );

  await requestIdleCallback(); // Wait for Floating UI
  await click(host.querySelector('glide-core-input'));
});
