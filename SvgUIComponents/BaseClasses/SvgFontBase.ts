import { SvgContainerBase } from "./SvgContainerBase";

/**
 * SVGフォント要素の基底クラス（非推奨）
 * <font>, <font-face>, <glyph> 等が継承します
 * 
 * 警告：SVGフォントはSVG 2.0で非推奨となり、ブラウザーサポートが削除されています
 * Webフォント（WOFF/WOFF2）の使用を推奨します
 * 
 * 特徴：
 * - フォント定義用の属性を持つ
 * - 子要素を持つことができる
 * - イベントリスナーは持たない
 */
export abstract class SvgFontBase extends SvgContainerBase {
    constructor() {
        super();
    }

    /**
     * フォントのid属性を設定
     */
    public setFontId(id: string): this {
        this.setSvgAttribute('id', id);
        return this;
    }

    /**
     * horizontal-origin-x属性を設定
     */
    public setHorizOriginX(x: number): this {
        this.setSvgAttribute('horiz-origin-x', x);
        return this;
    }

    /**
     * horizontal-advance-x属性を設定
     */
    public setHorizAdvX(x: number): this {
        this.setSvgAttribute('horiz-adv-x', x);
        return this;
    }
}
