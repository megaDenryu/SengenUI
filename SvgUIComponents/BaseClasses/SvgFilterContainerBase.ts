import { SvgContainerBase } from "./SvgContainerBase";

/**
 * SVGフィルターコンテナ要素の基底クラス
 * <filter> 要素が継承します
 * 
 * 特徴：
 * - フィルタープリミティブを子要素として持つ
 * - result、in属性等のフィルター固有の機能を提供
 */
export abstract class SvgFilterContainerBase extends SvgContainerBase {
    constructor() {
        super();
    }

    /**
     * フィルターのid属性を設定
     */
    public setFilterId(id: string): this {
        this.setSvgAttribute('id', id);
        return this;
    }

    /**
     * フィルターの適用範囲を設定
     */
    public setFilterUnits(units: 'userSpaceOnUse' | 'objectBoundingBox'): this {
        this.setSvgAttribute('filterUnits', units);
        return this;
    }

    /**
     * フィルター領域の左上座標とサイズを設定
     */
    public setFilterRegion(x: string | number, y: string | number, width: string | number, height: string | number): this {
        this.setSvgAttribute('x', x);
        this.setSvgAttribute('y', y);
        this.setSvgAttribute('width', width);
        this.setSvgAttribute('height', height);
        return this;
    }
}
