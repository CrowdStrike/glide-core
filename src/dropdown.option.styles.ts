import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      block-size: var(--private-option-height);
      border-radius: var(--glide-core-spacing-sm);
      max-inline-size: 21.875rem;
      transition: background-color 100ms ease-in-out;
      user-select: none;

      &.active {
        background-color: var(--glide-core-surface-hover);
      }

      &.large {
        --height: 1.75rem;
        --gap: var(--glide-core-spacing-sm);
        --padding-inline: var(--glide-core-spacing-sm);

        font-family: var(--glide-core-body-sm-font-family);
        font-size: var(--glide-core-body-sm-font-size);
        font-style: var(--glide-core-body-sm-font-style);
        font-weight: var(--glide-core-body-sm-font-weight);
        line-height: var(--glide-core-body-sm-line-height);
      }

      &.small {
        --height: 1.25rem;
        --gap: var(--glide-core-spacing-xs);
        --padding-inline: var(--glide-core-spacing-xs);

        font-family: var(--glide-core-body-xs-font-family);
        font-size: var(--glide-core-body-xs-font-size);
        font-style: var(--glide-core-body-xs-font-style);
        font-weight: var(--glide-core-body-xs-font-weight);
        line-height: var(--glide-core-body-xs-line-height);
      }
    }

    .option {
      align-items: center;
      block-size: var(--height);
      display: flex;
      gap: var(--gap);
      padding-inline: var(--padding-inline);
      user-select: none;
    }

    glide-core-checkbox {
      &::part(private-label-and-input-and-checkbox) {
        block-size: var(--height);
        padding-inline: var(--padding-inline);
      }
    }

    .checked-icon {
      display: inline-flex;
      justify-content: center;
      opacity: 0;

      &.visible {
        opacity: 1;
      }
    }

    .indeterminate-icon {
      display: none;
    }

    .tooltip {
      overflow: hidden;
    }

    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
];
