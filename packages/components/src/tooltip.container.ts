import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import styles from './tooltip.container.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-private-tooltip-container': GlideCoreTooltipContainer;
  }
}

// This component exists because Tooltip's target and its tooltip both need to
// be in the light DOM so the `aria-describedby` on its target can be associated
// with the ID it references. Tooltip adds this element to its light DOM and then
// associates it with its target.
//
// One alternative solution is to ask consumers to add this component to Tooltip's
// default slot. But that would be additional work for them and would be a less
// natural API because consumers would pass `label`, `shortcut`, and other attributes
// to Tooltip Container instead of Tooltip.
//
// Another is to require that consumers always wrap their default slot content
// in an element, such as `<div>`. But an apparently stray `<div>` in our Storybook
// code example would beget questions or may be removed by the consumer after copying
// the code, resulting in an error from Tooltip and frustration.
//
// The latter solution would also prevent us from restricting allowed content by using
// an attribute (`label`). We'd be forced to allow arbitrary content via a slot.

/**
 * @attr {boolean} [disabled=false]
 * @attr {string} [label]
 * @attr {'bottom'|'left'|'right'|'top'} [placement]
 * @attr {boolean} [screenreader-hidden=false]
 * @attr {string[]} [shortcut=[]]
 */
@customElement('glide-core-private-tooltip-container')
@final
export default class GlideCoreTooltipContainer extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * @default false
   */
  @property({ type: Boolean })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;
    this.role = isDisabled || this.screenreaderHidden ? 'none' : 'tooltip';
  }

  @property()
  label?: string;

  @property()
  placement?: 'bottom' | 'left' | 'right' | 'top';

  @property({ attribute: 'screenreader-hidden', type: Boolean })
  screenreaderHidden = false;

  @property({ type: Array })
  shortcut: string[] = [];

  override connectedCallback() {
    super.connectedCallback();

    this.id = nanoid();

    this.role = this.role =
      this.disabled || this.screenreaderHidden ? 'none' : 'tooltip';

    this.slot = 'private';
  }

  override render() {
    return html`
      <div
        aria-hidden=${this.screenreaderHidden}
        class=${classMap({
          component: true,
          reversed: this.placement === 'left',
        })}
      >
        <div class="label">${this.label}</div>

        <kbd
          class=${classMap({
            shortcut: true,
            reversed: this.placement === 'left',
            visible: this.shortcut.length > 0,
          })}
          data-test="shortcut"
        >
          ${this.shortcut.length === 1
            ? this.shortcut.at(0)
            : map(this.shortcut, (shortcut, index) => {
                return html`
                  <kbd>${shortcut}</kbd>
                  ${index === this.shortcut.length - 1 ? '' : ' + '}
                `;
              })}
        </kbd>
      </div>
    `;
  }

  #isDisabled = false;
}
