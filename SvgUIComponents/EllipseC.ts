import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";
import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";

export interface EllipseOptions {
    cx?: number;
    cy?: number;
    rx?: number;
    ry?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    className?: string | string[];
    id?: string;
    transform?: string;
}

/**
 * SVG Ellipse要素のコンポーネント
 * 楕円を描画するためのSVG要素をラップします
 */
export class EllipseC extends SvgGraphicsBase {
    constructor(options?: EllipseOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.cx !== undefined) this.setCx(options.cx);
            if (options.cy !== undefined) this.setCy(options.cy);
            if (options.rx !== undefined) this.setRx(options.rx);
            if (options.ry !== undefined) this.setRy(options.ry);
            if (options.fill) this.setFill(options.fill);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.opacity !== undefined) this.setOpacity(options.opacity);
            if (options.transform) this.setTransform(options.transform);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const ellipse = SvgElementCreater.createEllipseElement();
        return new SvgElementProxy(ellipse);
    }

    /**
     * 楕円の中心X座標を設定
     */
    public setCx(cx: number): this {
        this.setSvgAttribute("cx", cx);
        return this;
    }

    /**
     * 楕円の中心X座標を取得
     */
    public getCx(): number {
        return parseFloat(this.getSvgAttribute("cx") || "0");
    }

    /**
     * 楕円の中心Y座標を設定
     */
    public setCy(cy: number): this {
        this.setSvgAttribute("cy", cy);
        return this;
    }

    /**
     * 楕円の中心Y座標を取得
     */
    public getCy(): number {
        return parseFloat(this.getSvgAttribute("cy") || "0");
    }

    /**
     * 楕円のX軸半径を設定
     */
    public setRx(rx: number): this {
        this.setSvgAttribute("rx", rx);
        return this;
    }

    /**
     * 楕円のX軸半径を取得
     */
    public getRx(): number {
        return parseFloat(this.getSvgAttribute("rx") || "0");
    }

    /**
     * 楕円のY軸半径を設定
     */
    public setRy(ry: number): this {
        this.setSvgAttribute("ry", ry);
        return this;
    }

    /**
     * 楕円のY軸半径を取得
     */
    public getRy(): number {
        return parseFloat(this.getSvgAttribute("ry") || "0");
    }

    /**
     * 楕円の中心座標を設定
     */
    public setCenter(cx: number, cy: number): this {
        this.setCx(cx);
        this.setCy(cy);
        return this;
    }

    /**
     * 楕円の中心座標を取得
     */
    public getCenter(): { cx: number, cy: number } {
        return {
            cx: this.getCx(),
            cy: this.getCy()
        };
    }

    /**
     * 楕円の半径を設定
     */
    public setRadii(rx: number, ry: number): this {
        this.setRx(rx);
        this.setRy(ry);
        return this;
    }

    /**
     * 楕円の半径を取得
     */
    public getRadii(): { rx: number, ry: number } {
        return {
            rx: this.getRx(),
            ry: this.getRy()
        };
    }

    /**
     * 楕円のサイズを設定（幅と高さから半径を計算）
     */
    public setSize(width: number, height: number): this {
        this.setRx(width / 2);
        this.setRy(height / 2);
        return this;
    }

    /**
     * 楕円のサイズを取得（半径から幅と高さを計算）
     */
    public getSize(): { width: number, height: number } {
        return {
            width: this.getRx() * 2,
            height: this.getRy() * 2
        };
    }

    /**
     * 楕円の境界ボックスを取得
     */
    public getBBox(): DOMRect {
        return (this._svgDom.element as SVGEllipseElement).getBBox();
    }

    /**
     * 楕円を円に変換（rx = ry）
     */
    public makeCircle(radius: number): this {
        this.setRx(radius);
        this.setRy(radius);
        return this;
    }

    /**
     * 楕円が円かどうかを判定
     */
    public isCircle(): boolean {
        return this.getRx() === this.getRy();
    }

    /**
     * 楕円の面積を計算
     */
    public getArea(): number {
        return Math.PI * this.getRx() * this.getRy();
    }

    /**
     * 楕円の周囲長を近似計算（ラマヌジャンの公式）
     */
    public getPerimeter(): number {
        const rx = this.getRx();
        const ry = this.getRy();
        const h = Math.pow((rx - ry) / (rx + ry), 2);
        return Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
    }

    /**
     * 指定した点が楕円内部にあるかを判定
     */
    public containsPoint(x: number, y: number): boolean {
        const cx = this.getCx();
        const cy = this.getCy();
        const rx = this.getRx();
        const ry = this.getRy();
        
        const dx = x - cx;
        const dy = y - cy;
        
        return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
    }
}
