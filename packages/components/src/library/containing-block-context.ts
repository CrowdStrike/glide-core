import { createContext } from '@lit/context';

export const containingBlockContext = createContext<HTMLElement | undefined>(
  'containingBlockContext',
);
