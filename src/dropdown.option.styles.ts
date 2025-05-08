import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      block-size: var(--private-option-height);
      border-radius: var(--glide-core-spacing-base-sm);
      display: flex;
      max-inline-size: 21.875rem;
      transition: background-color 100ms ease-in-out;
      user-select: none;

      &.active {
        &:not(.disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
        }
      }
    }

    .option {
      align-items: center;
      block-size: 100%;
      color: var(--glide-core-color-static-text-default);
      display: flex;
      flex-grow: 1;
      font-family: var(--glide-core-typography-family-primary);
      font-size: var(--glide-core-typography-size-body-default);
      font-weight: var(--glide-core-typography-weight-regular);
      overflow: hidden;
      padding-inline-start: 0.625rem;
      user-select: none;

      &:not(.count, .editable) {
        padding-inline-end: var(--glide-core-spacing-base-sm);
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }
    }

    .checkbox {
      flex-grow: 1;
      overflow: hidden;

      &::part(private-label-and-input-and-checkbox) {
        block-size: var(--private-option-height);
        padding-inline-start: var(--glide-core-spacing-base-sm);
      }

      &:not(.count, .editable) {
        &::part(private-label-and-input-and-checkbox) {
          padding-inline-end: var(--glide-core-spacing-base-sm);
        }
      }
    }

    .indeterminate-icon {
      display: none;
    }

    .icon-slot {
      &::slotted(*) {
        align-items: center;
        block-size: 1rem;
        display: flex;
        inline-size: 1rem;
        padding-inline-end: var(--glide-core-spacing-base-xs);
      }
    }

    .checkbox-icon-slot {
      &::slotted(*) {
        align-items: center;
        block-size: 1rem;
        display: flex;
        inline-size: 1rem;
      }
    }

    .tooltip {
      margin-inline-end: auto;
      overflow: hidden;
    }

    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .checked-icon-container {
      --private-size: 1rem;

      display: contents;

      > svg {
        flex-shrink: 0;
        padding-inline-start: var(--glide-core-spacing-base-xs);
      }
    }

    .edit-button {
      align-items: center;
      background-color: transparent;
      block-size: 100%;
      border: none;
      display: flex;
      padding-block: 0;
      padding-inline-end: 0;
      padding-inline-start: var(--glide-core-spacing-base-xs);

      &.active {
        &:not(.disabled) {
          color: var(--glide-core-color-interactive-text-link--hover);
        }
      }

      &.disabled {
        color: var(--glide-core-color-interactive-icon-default--disabled);
      }

      &:not(.count) {
        padding-inline-end: var(--glide-core-spacing-base-sm);
      }

      &:focus {
        outline: none;
      }
    }

    .edit-icon {
      block-size: 0.875rem;
      display: block;
      inline-size: 0.875rem;
    }

    .count-container {
      font-size: var(--glide-core-typography-size-body-small);
      padding-inline-end: var(--glide-core-spacing-base-sm);
      padding-inline-start: var(--glide-core-spacing-base-xs);

      &.disabled {
        color: var(--glide-core-icon-tertiary-disabled);
      }
    }
  `,
];
