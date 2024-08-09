import type { Translation } from '../library/localize.js';

const translation: Translation = {
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
  nextTab: '',
  previousTab: '',

  announcedCharacterCount: (current: number, maximum: number) =>
    `Character count ${current} of ${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `Clear ${label} entry`,
  removeTag: (label: string) => `タグを削除: ${label}`,
};

export default translation;
