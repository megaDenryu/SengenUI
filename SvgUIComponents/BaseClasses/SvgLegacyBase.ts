import { SvgElementBase } from "./SvgElementBase";

/**
 * SVGレガシー要素の基底クラス
 * <color-profile>, <cursor> 等の非推奨要素が継承します
 * 
 * 警告：これらの要素はモダンブラウザーではサポートされていません
 * 互換性目的でのみ使用してください
 * 
 * 特徴：
 * - 最小限の実装
 * - イベントリスナーは持たない
 * - 子要素を持たない
 */
export abstract class SvgLegacyBase extends SvgElementBase {
    constructor() {
        super();
    }

    /**
     * スタイルを設定（オブジェクト形式）
     */
    public setStyleCSS(style: Partial<CSSStyleDeclaration>): this {
        Object.assign(this._svgDom.element.style, style);
        return this;
    }

    /**
     * name属性を設定
     */
    public setName(name: string): this {
        this.setSvgAttribute('name', name);
        return this;
    }
}
