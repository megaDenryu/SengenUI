import { SvgElementBase } from "./SvgElementBase";

/**
 * SVGフィルタープリミティブ要素の基底クラス
 * <feGaussianBlur>, <feOffset>, <feBlend> 等のフィルター効果が継承します
 * 
 * 特徴：
 * - result属性で出力結果を名前付け
 * - in属性で入力ソースを指定
 * - 子要素を持たない
 */
export abstract class SvgFilterPrimitiveBase extends SvgElementBase {
    constructor() {
        super();
    }

    /**
     * フィルターの出力結果に名前を付ける
     */
    public setResult(result: string): this {
        this.setSvgAttribute('result', result);
        return this;
    }

    /**
     * フィルターの入力ソースを指定
     */
    public setIn(inputSource: string): this {
        this.setSvgAttribute('in', inputSource);
        return this;
    }

    /**
     * フィルターの第2入力ソースを指定（ブレンド等で使用）
     */
    public setIn2(inputSource: string): this {
        this.setSvgAttribute('in2', inputSource);
        return this;
    }

    /**
     * スタイルを設定（オブジェクト形式）
     */
    public setStyleCSS(style: Partial<CSSStyleDeclaration>): this {
        Object.assign(this._svgDom.element.style, style);
        return this;
    }
}
