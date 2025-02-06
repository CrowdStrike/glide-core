import { css } from 'lit';

export default [
  css`
    :host {
      display: inline-block;
      inline-size: 100%;
    }

    .component {
      &.large {
        --private-gap: var(--glide-core-spacing-sm);
        --private-padding-inline: var(--glide-core-spacing-sm);
        --private-padding-block: var(--glide-core-spacing-xxs);

        font-family: var(--glide-core-body-sm-font-family);
        font-size: var(--glide-core-body-sm-font-size);
        font-style: var(--glide-core-body-sm-font-style);
        font-weight: var(--glide-core-body-sm-font-weight);
        line-height: var(--glide-core-body-sm-line-height);
      }

      &.small {
        --private-gap: var(--glide-core-spacing-xs);
        --private-padding-inline: var(--glide-core-spacing-xs);
        --private-padding-block: var(--glide-core-spacing-xxxs);
        --private-size: 0.75rem;

        font-family: var(--glide-core-body-xs-font-family);
        font-size: var(--glide-core-body-xs-font-size);
        font-style: var(--glide-core-body-xs-font-style);
        font-weight: var(--glide-core-body-xs-font-weight);
        line-height: var(--glide-core-body-xs-line-height);
      }
    }
  `,
];
