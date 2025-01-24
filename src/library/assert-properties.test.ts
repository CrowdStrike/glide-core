import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fixture, html } from '@open-wc/testing';
import assertProperties from './assert-properties.js';
import expectWindowError from './expect-window-error.js';

// TODO: test that it calls subclass `update()`?
// TODO: test does not throw when an optional property is not suplied

@customElement('glide-core-required-property')
@assertProperties('label')
class GlideCoreRequiredProperty extends LitElement {
  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  optional?: string;
}

it('throws when a required property is missing', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-required-property></glide-core-required-property>`,
    );
  });
});

// it('does not throw when an optional property is missing', async () => {
//   await expectWindowError(() => {
//     return fixture<GlideCoreRequiredProperty>(
//       html`<glide-core-required-property></glide-core-required-property>`,
//     );
//   });
// });

it('throws when a required property is undefined', async () => {
  const component = await fixture<GlideCoreRequiredProperty>(
    html`<glide-core-required-property
      label="Label"
    ></glide-core-required-property>`,
  );

  await expectWindowError(() => {
    component.label = undefined;
  });
});

// it('does not throw when an optional property is removed', async () => {
//   await expectWindowError(() => {
//     return fixture<GlideCoreRequiredProperty>(
//       html`<glide-core-required-property></glide-core-required-property>`,
//     );
//   });
// });
