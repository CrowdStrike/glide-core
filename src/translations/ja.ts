import type { Translation } from '../library/localize.js';

export const PENDING_STRINGS = [] as const;

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
  nextTab: '次のタブ',
  previousTab: '前のタブ',
  noAvailableOptions: '使用可能なオプションがありません',
  noMatchingOptions: '一致するオプションがありません',
  tooltip: 'ツールチップ：',
  severityInformational: '重大度：情報',
  severityCritical: '重大度：Critical（重大）',
  severityMedium: '重大度：中',
  severityHigh: '重大度：高',
  success: '成功：',
  error: 'エラー：',
  informational: '情報：',
  loading: '読み込み中',
  add: '追加',

  announcedCharacterCount: (current: number, maximum: number) =>
    `文字数 ${current}/${maximum}`,
  displayedCharacterCount: (current: number, maximum: number) =>
    `${current}/${maximum}`,
  clearEntry: (label: string) => `${label}入力をクリア`,
  editOption: (label: string) => `編集オプション：${label}`,
  editTag: (label: string) => `タグの編集：${label}`,
  removeTag: (label: string) => `タグの削除：${label}`,
  itemCount: (count: string) => `${count}件`,
  maximum: (label: string) => `${label}の最大値`,
  setMaximum: (label: string) => `${label}の最大値を設定`,
  minimum: (label: string) => `${label}の最小値`,
  setMinimum: (label: string) => `${label}の最小値を設定`,
};

export default translation;
