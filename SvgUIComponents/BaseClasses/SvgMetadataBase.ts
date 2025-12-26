import { SvgElementBase } from "./SvgElementBase";

/**
 * SVGメタデータ要素の基底クラス
 * <title>, <desc>, <metadata> が継承します
 * 
 * 特徴：
 * - テキストコンテンツを持つ
 * - イベントリスナーは持たない
 * - 子要素を持たない
 * - レンダリングされない
 */
export abstract class SvgMetadataBase extends SvgElementBase {
    constructor() {
        super();
    }

    /**
     * テキストコンテンツを設定
     */
    public setText(text: string): this {
        this._svgDom.element.textContent = text;
        return this;
    }

    /**
     * テキストコンテンツを取得
     */
    public getText(): string {
        return this._svgDom.element.textContent || '';
    }

    /**
     * スタイルを設定（オブジェクト形式）
     */
    public setStyleCSS(style: Partial<CSSStyleDeclaration>): this {
        Object.assign(this._svgDom.element.style, style);
        return this;
    }
}
