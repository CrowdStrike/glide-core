import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = [
  'severityInformational',
  'severityCritical',
  'severityMedium',
  'success',
  'error',
  'informational',
  'loading',
  'noAvailableOptions',
  'noMatchingOptions',
] as const;

type PendingTranslation = (typeof PENDING_STRINGS)[number];

const translation: Omit<Translation, PendingTranslation> = {
  $code: 'ja',
  $name: 'Japanese',
  $dir: 'ltr',

  // These come from ./ja.json
  close: '閉じる',
  dismiss: '閉じる',
  selectAll: 'すべて選択',
  notifications: '通知',
  nextTab: 'Onglet suivant',
  previousTab: 'Onglet précédent',
  tooltip: 'ツールチップ：',

  announcedCharacterCount: (current: number, maximum: number) =>
    `文字数 ${current}/${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `${label}入力をクリア`,
  editOption: (label: string) => `編集オプション：${label}`,
  editTag: (label: string) => `タグの編集：${label}`,
  removeTag: (label: string) => `タグの削除：${label}`,
  itemCount: (count: string) => `${count}件`,
};

export default translation;
