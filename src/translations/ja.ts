import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = [
  'nextTab',
  'previousTab',
  'announcedCharacterCount',
  'displayedCharacterCount',
  'clearEntry',
  'actionsFor',
] as const;

type PendingTranslation = (typeof PENDING_STRINGS)[number];

const translation: Omit<Translation, PendingTranslation> = {
  $code: 'ja',
  $name: 'Japanese',
  $dir: 'ltr',

  // These come from ./ja.json
  close: '閉じる',
  dismiss: '無視',
  open: 'オープン',
  selectAll: 'すべて選択',
  moreInformation: '詳細情報',
  notifications: '通知',

  removeTag: (label: string) => `タグを削除: ${label}`,
};

export default translation;
