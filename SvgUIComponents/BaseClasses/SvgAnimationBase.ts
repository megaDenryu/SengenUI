import { SvgElementBase } from "./SvgElementBase";

/**
 * SVGアニメーション要素の基底クラス
 * <animate>, <animateTransform>, <animateMotion>, <set> 等が継承します
 * 
 * 特徴：
 * - アニメーション固有の属性（dur、repeatCount等）を持つ
 * - イベントリスナーは持たない
 * - 子要素を持たない
 */
export abstract class SvgAnimationBase extends SvgElementBase {
    constructor() {
        super();
    }

    /**
     * アニメーションの対象属性を設定
     */
    public setAttributeName(name: string): this {
        this.setSvgAttribute('attributeName', name);
        return this;
    }

    /**
     * アニメーションの期間を設定
     */
    public setDur(duration: string): this {
        this.setSvgAttribute('dur', duration);
        return this;
    }

    /**
     * アニメーションの繰り返し回数を設定
     */
    public setRepeatCount(count: number | 'indefinite'): this {
        this.setSvgAttribute('repeatCount', count.toString());
        return this;
    }

    /**
     * アニメーションの開始値を設定
     */
    public setFrom(value: string): this {
        this.setSvgAttribute('from', value);
        return this;
    }

    /**
     * アニメーションの終了値を設定
     */
    public setTo(value: string): this {
        this.setSvgAttribute('to', value);
        return this;
    }

    /**
     * アニメーションの開始タイミングを設定
     */
    public setBegin(begin: string): this {
        this.setSvgAttribute('begin', begin);
        return this;
    }

    /**
     * アニメーションの終了タイミングを設定
     */
    public setEnd(end: string): this {
        this.setSvgAttribute('end', end);
        return this;
    }

    /**
     * アニメーション終了後の動作を設定
     */
    public setFill(fill: 'freeze' | 'remove'): this {
        this.setSvgAttribute('fill', fill);
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
