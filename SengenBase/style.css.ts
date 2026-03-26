import { globalStyle } from '@vanilla-extract/css';
import { 表示切替 } from './表示切替定数';

// グローバルCSSルール: この属性が付与された要素を非表示にする
globalStyle(`[${表示切替.attribute}="${表示切替.value.hidden}"]`, {
    display: 'none !important',
});
