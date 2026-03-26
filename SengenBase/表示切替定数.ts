import { globalStyle } from '@vanilla-extract/css';

/**
 * show()/hide() の代替として使用する汎用表示切替定数。
 *
 * 使い方:
 *   import { 表示切替 } from 'SengenUI/index';
 *
 *   // 非表示にする
 *   element.setAttribute(表示切替.attribute, 表示切替.value.hidden);
 *
 *   // 表示する（属性を除去してCSSのdisplayに委ねる）
 *   element.removeAttribute(表示切替.attribute);
 *
 *   // 条件で切り替える
 *   element.toggleAttribute(表示切替.attribute, !isVisible, 表示切替.value.hidden);
 */
export const 表示切替 = {
    attribute: "data-visibility",
    value: {
        hidden: "hidden",
    },
} as const;

// グローバルCSSルール: この属性が付与された要素を非表示にする
globalStyle(`[${表示切替.attribute}="${表示切替.value.hidden}"]`, {
    display: 'none !important',
});
