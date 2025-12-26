import { SvgElementBase } from "./SvgElementBase";

/**
 * SVGテキスト専用要素の基底クラス
 * <tspan>, <textPath> が継承します
 * 
 * 注：<text> 要素自身はコンテナとして SvgContainerBase を継承します
 * 
 * 特徴：
 * - テキスト固有の属性（x, y, dx, dy等）を持つ
 * - イベントリスナーを持つ
 * - 子要素を持たない
 */
export abstract class SvgTextBase extends SvgElementBase {
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
     * x座標を設定
     */
    public setX(x: number | string): this {
        this.setSvgAttribute('x', x);
        return this;
    }

    /**
     * y座標を設定
     */
    public setY(y: number | string): this {
        this.setSvgAttribute('y', y);
        return this;
    }

    /**
     * dx（相対オフセット）を設定
     */
    public setDx(dx: number | string): this {
        this.setSvgAttribute('dx', dx);
        return this;
    }

    /**
     * dy（相対オフセット）を設定
     */
    public setDy(dy: number | string): this {
        this.setSvgAttribute('dy', dy);
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
