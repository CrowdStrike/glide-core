import { css } from 'lit';
import skeleton from '@/src/styles/skeleton.js';

export default [
  css`
    ${skeleton('.loading-feedback')}
  `,
  css`
    :host {
      /*
        So consumers don't have to or don't forget to set it when they set "max-block-size".
      */
      display: block;
    }
  `,
];
