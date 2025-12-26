import { SvgContainerBase } from "./SvgContainerBase";

/**
 * SVGグラデーション要素の基底クラス
 * <linearGradient>, <radialGradient> が継承します
 * 
 * 特徴：
 * - <stop> 要素を子要素として持つ
 * - イベントリスナーは持たない
 */
export abstract class SvgGradientBase extends SvgContainerBase {
    constructor() {
        super();
    }

    /**
     * グラデーションのid属性を設定
     */
    public setGradientId(id: string): this {
        this.setSvgAttribute('id', id);
        return this;
    }

    /**
     * グラデーションの座標系を設定
     */
    public setGradientUnits(units: 'userSpaceOnUse' | 'objectBoundingBox'): this {
        this.setSvgAttribute('gradientUnits', units);
        return this;
    }

    /**
     * グラデーションの変形を設定
     */
    public setGradientTransform(transform: string): this {
        this.setSvgAttribute('gradientTransform', transform);
        return this;
    }

    /**
     * グラデーションの広がり方を設定
     */
    public setSpreadMethod(method: 'pad' | 'reflect' | 'repeat'): this {
        this.setSvgAttribute('spreadMethod', method);
        return this;
    }
}
