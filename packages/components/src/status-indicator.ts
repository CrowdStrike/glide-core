import { LitElement, html, svg } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './status-indicator.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-status-indicator': CsStatusIndicator;
  }
}

/**
 * @cssprop [--size] - Sets the size of the icon.
 */
@customElement('cs-status-indicator')
export default class CsStatusIndicator extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  variant: keyof typeof ICONS = 'idle';

  override render() {
    return html`<svg
      aria-hidden="true"
      class=${classMap({
        component: true,
        failed: this.variant === 'failed',
        idle: this.variant === 'idle',
        'in-progress': this.variant === 'in-progress',
        queued: this.variant === 'queued',
        scheduled: this.variant === 'scheduled',
        success: this.variant === 'success',
        'warning-critical': this.variant === 'warning-critical',
        'warning-high': this.variant === 'warning-high',
        'warning-informational': this.variant === 'warning-informational',
        'warning-low': this.variant === 'warning-low',
        'warning-medium': this.variant === 'warning-medium',
        'warning-zero': this.variant === 'warning-zero',
      })}
      fill="none"
      height="16"
      width="16"
      viewBox="0 0 24 24"
    >
      ${ICONS[this.variant]}
    </svg>`;
  }
}

const ICONS = {
  failed: svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z" fill="currentColor"/>`,
  idle: svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM10.5 9C10.5 8.44772 10.0523 8 9.5 8C8.94772 8 8.5 8.44772 8.5 9V15C8.5 15.5523 8.94772 16 9.5 16C10.0523 16 10.5 15.5523 10.5 15V9ZM15.5 9C15.5 8.44772 15.0523 8 14.5 8C13.9477 8 13.5 8.44772 13.5 9V15C13.5 15.5523 13.9477 16 14.5 16C15.0523 16 15.5 15.5523 15.5 15V9Z" fill="currentColor"/>`,
  'in-progress': svg`
    <path d="M3.34025 16.9997C2.0881 14.8298 2.72473 12.0644 4.79795 10.6601L4.80018 10.6578C6.46564 9.53235 8.65775 9.57012 10.2843 10.7523L13.7164 13.2477C15.3418 14.4299 17.5339 14.4676 19.2005 13.3421L19.2027 13.3399C21.2771 11.9356 21.9148 9.16792 20.6604 7.00026M17.002 20.6593C14.8321 21.9114 12.0667 21.2748 10.6623 19.2016L10.6601 19.1994C9.53457 17.5339 9.57234 15.3418 10.7545 13.7152L13.2499 10.2832C14.4321 8.6577 14.4699 6.46559 13.3444 4.79901L13.3399 4.79679C11.9356 2.72468 9.16792 2.08582 7.00026 3.3402M19.0705 4.92901C22.9758 8.83436 22.9758 15.1651 19.0705 19.0705C15.1651 22.9758 8.83436 22.9758 4.92901 19.0705C1.02366 15.1651 1.02366 8.83436 4.92901 4.92901C8.83436 1.02366 15.1651 1.02366 19.0705 4.92901Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`,
  queued: svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2031 14.5068C22.478 14.5254 22.7488 14.3647 22.8009 14.0941C22.9315 13.4162 23 12.7161 23 12C23 5.92487 18.0751 1 12 1C5.92493 1 1 5.92487 1 12C1 18.0751 5.92493 23 12 23C12.3811 23 12.7577 22.9806 13.1288 22.9428C13.5283 22.902 13.6796 22.4222 13.3955 22.1382L13.3787 22.1213C12.2072 20.9498 12.2072 19.0502 13.3787 17.8787C14.395 16.8623 15.9592 16.7277 17.1208 17.4748C17.3439 17.6182 17.6432 17.6141 17.8308 17.4266L19.8787 15.3787C20.5161 14.7412 21.3691 14.4506 22.2031 14.5068ZM12 5C12.5522 5 13 5.44769 13 6V11.0729C13 11.2623 13.1071 11.4355 13.2764 11.5201L16.4473 13.1056C16.9412 13.3525 17.1414 13.9532 16.8944 14.4472C16.6475 14.9412 16.0468 15.1414 15.5527 14.8944L11.5527 12.8944C11.214 12.725 11 12.3788 11 12V6C11 5.44769 11.4478 5 12 5Z" fill="currentColor"/>
    <path d="M22.7072 18.2071C23.0977 17.8166 23.0977 17.1834 22.7072 16.7929C22.3165 16.4023 21.6835 16.4023 21.2928 16.7929L17.5 20.5858L16.2072 19.2929C15.8165 18.9023 15.1835 18.9023 14.7928 19.2929C14.4023 19.6834 14.4023 20.3166 14.7928 20.7071L16.7928 22.7071C17.1835 23.0977 17.8165 23.0977 18.2072 22.7071L22.7072 18.2071Z" fill="currentColor"/>`,
  scheduled: svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2V3H6C3.79086 3 2 4.79086 2 7V19C2 21.2091 3.79086 23 6 23H18C20.2091 23 22 21.2091 22 19V7C22 4.79086 20.2091 3 18 3H17V2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2V3H9V2ZM7 5V6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6V5H15V6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6V5H18C19.1046 5 20 5.89543 20 7V9H4V7C4 5.89543 4.89543 5 6 5H7ZM16.2072 14.2071C16.5977 13.8166 16.5977 13.1834 16.2072 12.7929C15.8165 12.4023 15.1835 12.4023 14.7928 12.7929L11 16.5858L9.70715 15.2929C9.31653 14.9023 8.68347 14.9023 8.29285 15.2929C7.90234 15.6834 7.90234 16.3166 8.29285 16.7071L10.2928 18.7071C10.6835 19.0977 11.3165 19.0977 11.7072 18.7071L16.2072 14.2071Z" fill="currentColor"/>`,
  success: svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L10 13.5858L7.70711 11.2929C7.31658 10.9024 6.68342 10.9024 6.29289 11.2929C5.90237 11.6834 5.90237 12.3166 6.29289 12.7071L9.29289 15.7071C9.68342 16.0976 10.3166 16.0976 10.7071 15.7071L16.7071 9.70711Z" fill="currentColor"/>`,
  'warning-critical': svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 1.26793C12.3812 0.91069 11.6188 0.91069 11 1.26793L3 5.88676C2.3812 6.244 2 6.90428 2 7.61882V16.8564C2 17.5709 2.3812 18.2312 3 18.5884L11 23.2073C11.6188 23.5645 12.3812 23.5645 13 23.2073L21 18.5884C21.6188 18.2312 22 17.5709 22 16.8564V7.61882C22 6.90428 21.6188 6.244 21 5.88676L13 1.26793ZM12 7.6906C12.5523 7.6906 13 8.13829 13 8.6906V12.6906C13 13.2429 12.5523 13.6906 12 13.6906C11.4477 13.6906 11 13.2429 11 12.6906V8.6906C11 8.13829 11.4477 7.6906 12 7.6906ZM13 16.6906C13 17.2429 12.5523 17.6906 12 17.6906C11.4477 17.6906 11 17.2429 11 16.6906C11 16.1383 11.4477 15.6906 12 15.6906C12.5523 15.6906 13 16.1383 13 16.6906Z" fill="currentColor"/>`,
  'warning-high': svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>`,
  'warning-informational': svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>`,
  'warning-low': svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="currentColor"/>`,
  'warning-medium': svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8363 3.01444C13.0678 1.66185 11.1186 1.66185 10.3501 3.01444L1.26467 19.0047C0.505278 20.3412 1.47061 22 3.00781 22H21.1786C22.7158 22 23.6811 20.3412 22.9217 19.0047L13.8363 3.01444ZM12 9C12.5523 9 13 9.44772 13 10V14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14V10C11 9.44772 11.4477 9 12 9ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z" fill="currentColor"/>`,
  'warning-zero': svg`
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor"/>`,
};
