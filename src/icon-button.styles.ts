import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';

export default [
  css`
    ${focusOutline('.component:focus-visible')}
  `,
  css`
    :host {
      /* Contains elements with "padding" and "width". Inline by default. */
      display: inline-flex;
    }

    .component {
      align-items: center;
      block-size: var(--private-size, 1.625rem);
      border-color: transparent;
      border-radius: var(--glide-core-rounding-base-radius-sm);
      border-style: solid;
      border-width: 1px;
      cursor: pointer;
      display: inline-flex;
      inline-size: var(--private-size, 1.625rem);
      justify-content: center;
      padding-inline: 0;
      transition-duration: var(--glide-core-duration-moderate-02);
      transition-property: color, background-color, border-color, fill, stroke;
      transition-timing-function: var(--glide-core-animation-swoop-in);

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 1;
      }

      &.primary {
        background-color: var(
          --glide-core-color-interactive-surface-container-active
        );
        border-color: transparent;
        color: var(
          --private-icon-color,
          var(--glide-core-private-color-button-icon-primary)
        );

        &:disabled {
          background-color: var(
            --glide-core-color-static-surface-container-secondary
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--active);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          box-shadow: var(--glide-core-effect-hovered);
          color: var(--glide-core-color-interactive-icon-link);
        }
      }

      &.secondary {
        background-color: transparent;
        color: var(
          --private-icon-color,
          var(--glide-core-color-interactive-icon-default)
        );

        &:disabled {
          background-color: var(--glide-core-color-static-surface-container);
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-private-color-button-surface-active
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-default--active);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container--hover
          );
          border-color: transparent;
          color: var(--glide-core-color-interactive-icon-link);
        }
      }

      &.tertiary {
        background-color: transparent;
        block-size: var(--private-size, 1rem);
        border-color: transparent;
        border-radius: var(--glide-core-rounding-base-radius-xxs);
        color: var(
          --private-icon-color,
          var(--glide-core-color-interactive-icon-default)
        );
        inline-size: var(--private-size, 1rem);
        padding: 0;

        &:focus-visible {
          border-radius: 0.0625rem;
        }

        &:disabled {
          color: var(--glide-core-color-interactive-icon-default--disabled);
        }

        &:not(:disabled):active {
          background-color: var(
            --glide-core-color-interactive-surface-container-clickable
          );
          color: var(--glide-core-color-interactive-icon-active);
        }

        &:not(:active):hover:not(:disabled) {
          background-color: var(
            --glide-core-color-interactive-surface-container-clickable
          );
          color: var(
            --private-hovered-icon-color,
            var(--glide-core-color-interactive-icon-active--hover)
          );
        }
      }
    }

    .default-slot {
      &::slotted(*) {
        /*
          So that teams clicking Icon Button using Playwright don't have to use "force: true".
          Playwright uses "elementsFromPoint()" internally to locate elements. But there's a
          Chromium bug¹ where that method returns content slotted into the element clicked
          instead of the element itself.

          Or it may² be a specification issue. Either way, to reproduce it, use the "getByRole"
          locator to locate and click Icon Button: "page.getByRole('button').click()". The
          click will fail with a Playwright "intercepts pointer events" error related to the
          slotted content.

          It's not clear if Playwright can work around it like it has³ other "elementsFromPoint()"
          problems or if the fix needs to come from Chromium. I'll file a bug with Playwright and
          update this comment if I find out.

          In the meantime, disabling pointer events on the slotted content prevents it from being
          included in the array returned by "elementsFromPoint()". As a result, Playwright won't
          falsely believe it's intercepting events.

          1. https://issues.chromium.org/issues/40755138
          2. https://github.com/w3c/csswg-drafts/issues/556
          3. https://github.com/microsoft/playwright/blob/00429efc4ac67ece5d9ba220d7470ea97c0ca265/packages/injected/src/injectedScript.ts#L962-L968
        */
        pointer-events: none;
      }
    }
  `,
];
