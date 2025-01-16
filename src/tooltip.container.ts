import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { type Placement } from '@floating-ui/dom';
import { map } from 'lit/directives/map.js';
import styles from './tooltip.container.styles.js';
import { LocalizeController } from './library/localize.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tooltip-private-container': GlideCoreTooltipContainer;
  }
}

@customElement('glide-core-tooltip-private-container')
class GlideCoreTooltipContainer extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  content?: string;

  @property({ type: Boolean })
  disabled = false;

  @property()
  placement?: Placement;

  @property({ type: Array })
  shortcut: string[] = [];

  override connectedCallback() {
    super.connectedCallback();

    this.id = nanoid();
    this.slot = 'private';
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          reversed: this.placement === 'left',
        })}
        role=${ifDefined(this.disabled ? undefined : 'tooltip')}
      >
        <span
          aria-label=${ifDefined(
            this.disabled ? undefined : this.#localize.term('tooltip'),
          )}
        ></span>

        <div class="content">${this.content}</div>

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

  #localize = new LocalizeController(this);
}
