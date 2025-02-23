import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = [
  'editOption',
  'editTag',
  'itemCount',
  'noResults',
  'closeInlineAlert',
  'tooltip',
] as const;

type PendingTranslation = (typeof PENDING_STRINGS)[number];

const translation: Omit<Translation, PendingTranslation> = {
  $code: 'ja',
  $name: 'Japanese',
  $dir: 'ltr',

  // These come from ./ja.json
  close: '閉じる',
  dismiss: '無視',
  selectAll: 'すべて選択',
  notifications: '通知',
  nextTab: 'Onglet suivant',
  previousTab: 'Onglet précédent',

  announcedCharacterCount: (current: number, maximum: number) =>
    `${maximum} 文字数の${current}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `${label}エントリのクリア`,
  removeTag: (label: string) => `タグを削除: ${label}`,
  actionsFor: (label: string) => `${label}のアクション`,
};

export default translation;
