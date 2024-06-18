import { css } from 'lit';

export default css`
  .meta {
    column-gap: var(--glide-core-spacing-xs);
    display: flex;
    font-size: 0.75rem;
    grid-column: 2;
    justify-content: space-between;
  }

  .description {
    display: block;
  }

  .character-count {
    &.error {
      font-weight: var(--glide-core-font-weight-bold);
    }
  }

  .search-icon {
    align-items: center;
    display: flex;
  }

  .input-box {
    align-items: center;
    background-color: var(--glide-core-surface-base-lighter);
    block-size: 2.125rem;
    border: 1px solid var(--glide-core-border-base-light);
    border-radius: var(--glide-core-spacing-xs);
    box-sizing: border-box;
    color: var(--glide-core-text-body-1);
    display: flex;
    gap: var(--glide-core-spacing-xxs);
    line-height: var(--glide-core-body-xs-line-height);
    padding-inline: var(--glide-core-spacing-sm);

    &.error {
      border-color: var(--glide-core-status-error);
    }

    &.focused:not(.error) {
      border-color: var(--glide-core-border-focus);
    }

    /* We had to resort to a class selector because there may be a bug in Chrome and Safari
    * with ":read-only"
    * https://bugs.chromium.org/p/chromium/issues/detail?id=1519649
    */
    &.readonly {
      border: 1px solid transparent;
      padding-inline-start: 0;
    }

    &.disabled {
      background-color: var(--glide-core-surface-base-gray-light);
      color: var(--glide-core-text-tertiary-disabled);
    }

    input {
      border: none;
      color: inherit;
      cursor: inherit;
      font-family: var(--glide-core-font-sans);
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-xs-font-weight);
      inline-size: 100%;
      min-inline-size: 0;
      outline: none;
      padding: 0;

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        appearance: none;
      }
    }

    .suffix {
      align-items: center;
      display: flex;
    }
  }

  .clear-icon-button,
  .password-toggle,
  ::slotted([slot='suffix']) {
    align-items: center;
    background: none;
    border: none;
    color: var(--glide-core-icon-default);
    display: inline-flex;
    justify-content: center;
    padding: 0;
  }

  .clear-icon-button,
  .password-toggle,
  .search-icon,
  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    display: flex;
  }

  .empty .clear-icon-button {
    visibility: hidden;
  }
`;
