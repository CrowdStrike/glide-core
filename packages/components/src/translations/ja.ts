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
  clearEntry: '入力のクリア',
  moreInformation: '詳細情報',
  notifications: '通知',

  removeTag: (label: string) => `タグを削除: ${label}`,
};

export default translation;
