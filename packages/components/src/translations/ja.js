export const PENDING_STRINGS = [
    'severityInformational',
    'severityCritical',
    'severityMedium',
    'success',
    'error',
    'informational',
];
const translation = {
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
    noResults: '結果が見つかりません',
    tooltip: 'ツールチップ：',
    announcedCharacterCount: (current, maximum) => `文字数 ${current}/${maximum}`,
    displayedCharacterCount: (current, maximum) => `${current}/${maximum}`,
    clearEntry: (label) => `${label}入力をクリア`,
    editOption: (label) => `編集オプション：${label}`,
    editTag: (label) => `タグの編集：${label}`,
    removeTag: (label) => `タグの削除：${label}`,
    itemCount: (count) => `${count}件`,
    closeInlineAlert: (variant) => `${variant}アラートを閉じる`,
};
export default translation;
