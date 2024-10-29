import { css } from 'lit';

export default [
  css`
    .component {
      align-items: center;
      block-size: var(--private-option-height);
      border-radius: var(--glide-core-spacing-sm);
      display: flex;
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
      flex-grow: 1;
      overflow: hidden;
      user-select: none;

      &.large {
        font-family: var(--glide-core-body-sm-font-family);
        font-size: var(--glide-core-body-sm-font-size);
        font-style: var(--glide-core-body-sm-font-style);
        font-weight: var(--glide-core-body-sm-font-weight);
        line-height: var(--glide-core-body-sm-line-height);
        padding-inline-start: var(--glide-core-spacing-sm);

        &:not(.editable) {
          padding-inline-end: var(--glide-core-spacing-sm);
        }
      }

      &.small {
        font-family: var(--glide-core-body-xs-font-family);
        font-size: var(--glide-core-body-xs-font-size);
        font-style: var(--glide-core-body-xs-font-style);
        font-weight: var(--glide-core-body-xs-font-weight);
        line-height: var(--glide-core-body-xs-line-height);
        padding-inline-start: var(--glide-core-spacing-xs);

        &:not(.editable) {
          padding-inline-end: var(--glide-core-spacing-xs);
        }
      }
    }

    .checkbox {
      flex-grow: 1;
      overflow: hidden;

      &.large {
        &::part(private-label-and-input-and-checkbox) {
          padding-inline-start: var(--glide-core-spacing-sm);
        }

        &:not(.editable) {
          &::part(private-label-and-input-and-checkbox) {
            padding-inline-end: var(--glide-core-spacing-sm);
          }
        }
      }

      &.small {
        &::part(private-label-and-input-and-checkbox) {
          padding-inline-start: var(--glide-core-spacing-xs);
        }

        &:not(.editable) {
          &::part(private-label-and-input-and-checkbox) {
            padding-inline-end: var(--glide-core-spacing-xs);
          }
        }
      }

      &::part(private-label-and-input-and-checkbox) {
        block-size: var(--private-option-height);
      }
    }

    .indeterminate-icon {
      display: none;
    }

    .icon-slot {
      display: block;

      &::slotted(*) {
        padding-inline-end: var(--glide-core-spacing-xs);
      }
    }

    .checkbox-icon-slot {
      &::slotted(*) {
        block-size: 1rem;
        display: block;
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
      --size: 1rem;

      display: contents;

      > svg {
        flex-shrink: 0;
        padding-inline-start: var(--glide-core-spacing-xs);
      }
    }

    .edit-button {
      align-items: center;
      background-color: transparent;
      block-size: 100%;
      border: none;
      display: flex;
      padding-block: 0;
      padding-inline-start: var(--glide-core-spacing-xs);

      &.active {
        color: var(--glide-core-text-primary-hover);
      }

      &.large {
        padding-inline-end: var(--glide-core-spacing-sm);
      }

      &.small {
        padding-inline-end: var(--glide-core-spacing-xs);
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
  `,
];
