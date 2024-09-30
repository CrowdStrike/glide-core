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
    }

    .option {
      align-items: center;
      block-size: 100%;
      display: flex;
      user-select: none;

      &.large {
        column-gap: var(--glide-core-spacing-sm);
        font-family: var(--glide-core-body-sm-font-family);
        font-size: var(--glide-core-body-sm-font-size);
        font-style: var(--glide-core-body-sm-font-style);
        font-weight: var(--glide-core-body-sm-font-weight);
        line-height: var(--glide-core-body-sm-line-height);
        padding-inline: var(--glide-core-spacing-sm);
      }

      &.small {
        column-gap: var(--glide-core-spacing-xs);
        font-family: var(--glide-core-body-xs-font-family);
        font-size: var(--glide-core-body-xs-font-size);
        font-style: var(--glide-core-body-xs-font-style);
        font-weight: var(--glide-core-body-xs-font-weight);
        line-height: var(--glide-core-body-xs-line-height);
        padding-inline: var(--glide-core-spacing-xs);
      }
    }

    glide-core-checkbox {
      &.large {
        &::part(private-label-and-input-and-checkbox) {
          padding-inline: var(--glide-core-spacing-sm);
        }
      }

      &.small {
        &::part(private-label-and-input-and-checkbox) {
          padding-inline: var(--glide-core-spacing-xs);
        }
      }

      &::part(private-label-and-input-and-checkbox) {
        block-size: var(--private-option-height);
      }
    }

    .checked-icon {
      display: inline-flex;
      justify-content: center;
      margin-inline-start: auto;
      opacity: 0;

      &.visible {
        opacity: 1;
      }
    }

    .indeterminate-icon {
      display: none;
    }

    .icon-slot {
      block-size: 1rem;
      display: none;
      inline-size: 1rem;
      overflow: hidden;

      &.visible {
        display: block;
      }
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
