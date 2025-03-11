import { css } from 'lit';

export default [
  css`
    :host {
      display: inline-block;
      inline-size: 100%;
    }

    .component {
      &.large {
        --private-gap: var(--glide-core-spacing-base-sm);
        --private-padding-inline: var(--glide-core-spacing-base-sm);
        --private-padding-block: var(--glide-core-spacing-base-xxs);

        font-family: var(--glide-core-typography-family-primary);
        font-size: var(--glide-core-typography-size-body-label);
        font-style: var(--glide-core-body-sm-font-style);
        font-weight: var(--glide-core-typography-weight-regular);
      }

      &.small {
        --private-gap: var(--glide-core-spacing-base-xs);
        --private-padding-inline: var(--glide-core-spacing-base-xs);
        --private-padding-block: var(--glide-core-spacing-base-xxxs);
        --private-size: 0.75rem;

        font-family: var(--glide-core-typography-family-primary);
        font-size: var(--glide-core-typography-size-body-small);
        font-style: var(--glide-core-body-xs-font-style);
        font-weight: var(--glide-core-typography-weight-regular);
      }
    }
  `,
];
