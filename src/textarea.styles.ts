import { css, unsafeCSS } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

/*
  `field-sizing` is only supported in Chrome and Edge
  at the moment (https://caniuse.com/mdn-css_properties_field-sizing),
  making this a progressive enhancement. This functionality is additive,
  rather than required for use with our components.
 
  `field-sizing` is also not recognized by lit-plugin, so we are seeing
  https://github.com/runem/lit-analyzer/issues/157 when
  attempting to use it directly in our CSS below. This use of unsafeCSS
  is a workaround for that bug for the time being.
 */
const fieldSizingContent = unsafeCSS(`
  field-sizing: content;
`);

export default [
  css`
    ${visuallyHidden('.character-count .hidden')}
  `,
  css`
    glide-core-private-label::part(private-tooltips) {
      align-items: flex-start;
      margin-block-start: var(--glide-core-spacing-sm);
    }

    .textarea-container {
      display: flex;
    }

    .description {
      display: block;

      &.hidden {
        display: none;
      }
    }

    .validity-message {
      display: block;
    }

    textarea {
      appearance: none;
      background-color: var(--glide-core-surface-base-lighter);
      border: 1px solid var(--glide-core-border-base);
      border-radius: 0.5rem;
      color: var(--glide-core-text-body-1);
      cursor: inherit;
      display: block;
      flex-grow: 1;
      font-family: var(--glide-core-body-xs-font-family);
      font-size: var(--glide-core-body-sm-font-size);
      font-weight: var(--glide-core-body-xs-font-weight);
      max-block-size: 5lh;
      min-block-size: 3lh;
      padding: var(--glide-core-spacing-xs) var(--glide-core-spacing-sm);
      resize: vertical;
      transition: border-color 200ms ease-in-out;

      ${fieldSizingContent};

      &:focus {
        outline: none;
      }

      &:focus-visible,
      &:focus-visible[readonly],
      &:hover {
        border-color: var(--glide-core-border-focus);
      }

      &::placeholder {
        color: var(--glide-core-text-placeholder);
      }

      &.error {
        border-color: var(--glide-core-status-error);
      }

      &[readonly] {
        background-color: transparent;
        border-color: transparent;
        outline: none;
        padding-inline-start: 0;
        resize: none;
        transition: none;
      }

      &[disabled] {
        background-color: var(--glide-core-surface-disabled);
        border: 0.0625rem solid var(--glide-core-border-base-light);
        color: var(--glide-core-text-tertiary-disabled);
      }
    }

    .meta {
      column-gap: var(--glide-core-spacing-xs);
      display: flex;
      font-size: var(--glide-core-body-xs-font-size);
      justify-content: space-between;
    }

    .character-count {
      &.error {
        font-weight: var(--glide-core-font-weight-bold);
      }
    }
  `,
];
