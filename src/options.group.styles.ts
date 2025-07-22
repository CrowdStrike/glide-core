import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${visuallyHidden('.label.visually-hidden')}
  `,
  css`
    :host(:not(:last-of-type))::after {
      background-color: var(--glide-core-color-static-stroke-secondary);
      block-size: 1px;
      border-radius: var(--glide-core-rounding-base-radius-sm);
      content: '';
      display: block;
      margin-block: var(--glide-core-spacing-base-xxxs);
    }

    .label {
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-small);
      font-weight: var(--glide-core-typography-weight-bold);
      padding-block: var(--glide-core-spacing-base-xxs);
      padding-inline: var(--glide-core-spacing-base-sm);
    }
  `,
];
