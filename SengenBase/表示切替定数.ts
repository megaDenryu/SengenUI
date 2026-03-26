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
 *   element.toggleAttribute(表示切替.attribute, false);
 *
 *   // 条件で切り替える
 *   element.toggleAttribute(表示切替.attribute, !isVisible, 表示切替.value.hidden);
 *
 * CSSルールは 表示切替定数.css.ts で定義されている。
 * SengenUI/index.ts から両方exportされるため、importするだけで適用される。
 */
export const 表示切替 = {
    attribute: "data-visibility",
    value: {
        hidden: "hidden",
    },
} as const;
