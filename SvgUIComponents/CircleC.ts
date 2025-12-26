import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";
import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";

export interface CircleOptions {
    cx?: number;
    cy?: number;
    r?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: string | string[];
    id?: string;
}

/**
 * SVG Circle要素のコンポーネント
 * 円を描画するためのSVG要素をラップします
 */
export class CircleC extends SvgGraphicsBase {
    constructor(options?: CircleOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.cx !== undefined) this.setCx(options.cx);
            if (options.cy !== undefined) this.setCy(options.cy);
            if (options.r !== undefined) this.setRadius(options.r);
            if (options.fill) this.setFill(options.fill);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const circle = SvgElementCreater.createCircleElement();
        return new SvgElementProxy(circle);
    }

    /**
     * 円の中心X座標を設定
     */
    public setCx(cx: number): this {
        this.setSvgAttribute("cx", cx);
        return this;
    }

    /**
     * 円の中心Y座標を設定
     */
    public setCy(cy: number): this {
        this.setSvgAttribute("cy", cy);
        return this;
    }

    /**
     * 円の中心座標を設定
     */
    public setCenter(cx: number, cy: number): this {
        this.setCx(cx);
        this.setCy(cy);
        return this;
    }

    /**
     * 円の半径を設定
     */
    public setRadius(r: number): this {
        this.setSvgAttribute("r", r);
        return this;
    }

    /**
     * 円の中心X座標を取得
     */
    public getCx(): number {
        return parseFloat(this.getSvgAttribute("cx") || "0");
    }

    /**
     * 円の中心Y座標を取得
     */
    public getCy(): number {
        return parseFloat(this.getSvgAttribute("cy") || "0");
    }

    /**
     * 円の半径を取得
     */
    public getRadius(): number {
        return parseFloat(this.getSvgAttribute("r") || "0");
    }

    /**
     * 円の中心座標を取得
     */
    public getCenter(): { cx: number; cy: number } {
        return {
            cx: this.getCx(),
            cy: this.getCy()
        };
    }

    /**
     * 円を指定座標に移動（中心座標を変更）
     */
    public moveTo(cx: number, cy: number): this {
        return this.setCenter(cx, cy);
    }

    /**
     * 円を相対的に移動
     */
    public moveBy(deltaX: number, deltaY: number): this {
        const currentCx = this.getCx();
        const currentCy = this.getCy();
        return this.setCenter(currentCx + deltaX, currentCy + deltaY);
    }

    /**
     * 円のサイズを変更
     */
    public resize(newRadius: number): this {
        return this.setRadius(newRadius);
    }

    /**
     * 円を拡大・縮小（相対的）
     */
    public scale(factor: number): this {
        const currentRadius = this.getRadius();
        return this.setRadius(currentRadius * factor);
    }
}
