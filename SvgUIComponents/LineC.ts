import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";

export interface LineOptions {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string; // 破線パターン
    className?: string | string[];
    id?: string;
}

/**
 * SVG Line要素のコンポーネント
 * 線を描画するためのSVG要素をラップします
 */
export class LineC extends SvgGraphicsBase {
    constructor(options?: LineOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.x1 !== undefined) this.setX1(options.x1);
            if (options.y1 !== undefined) this.setY1(options.y1);
            if (options.x2 !== undefined) this.setX2(options.x2);
            if (options.y2 !== undefined) this.setY2(options.y2);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.strokeDasharray) this.setDashArray(options.strokeDasharray);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const line = SvgElementCreater.createLineElement(0, 0, 0, 0, "black", 1);
        return new SvgElementProxy(line);
    }

    /**
     * 開始点のX座標を設定
     */
    public setX1(x1: number): this {
        this.setSvgAttribute("x1", x1);
        return this;
    }

    /**
     * 開始点のY座標を設定
     */
    public setY1(y1: number): this {
        this.setSvgAttribute("y1", y1);
        return this;
    }

    /**
     * 終了点のX座標を設定
     */
    public setX2(x2: number): this {
        this.setSvgAttribute("x2", x2);
        return this;
    }

    /**
     * 終了点のY座標を設定
     */
    public setY2(y2: number): this {
        this.setSvgAttribute("y2", y2);
        return this;
    }

    /**
     * 開始点を設定
     */
    public setStartPoint(x1: number, y1: number): this {
        this.setX1(x1);
        this.setY1(y1);
        return this;
    }

    /**
     * 終了点を設定
     */
    public setEndPoint(x2: number, y2: number): this {
        this.setX2(x2);
        this.setY2(y2);
        return this;
    }

    /**
     * 線の両端を設定
     */
    public setLine(x1: number, y1: number, x2: number, y2: number): this {
        this.setStartPoint(x1, y1);
        this.setEndPoint(x2, y2);
        return this;
    }

    /**
     * 破線パターンを設定
     */
    public setDashArray(dashArray: string): this {
        this.setSvgAttribute("stroke-dasharray", dashArray);
        return this;
    }

    /**
     * 実線に戻す
     */
    public setSolidLine(): this {
        this._svgDom.removeSvgAttribute("stroke-dasharray");
        return this;
    }

    /**
     * 開始点のX座標を取得
     */
    public getX1(): number {
        return parseFloat(this.getSvgAttribute("x1") || "0");
    }

    /**
     * 開始点のY座標を取得
     */
    public getY1(): number {
        return parseFloat(this.getSvgAttribute("y1") || "0");
    }

    /**
     * 終了点のX座標を取得
     */
    public getX2(): number {
        return parseFloat(this.getSvgAttribute("x2") || "0");
    }

    /**
     * 終了点のY座標を取得
     */
    public getY2(): number {
        return parseFloat(this.getSvgAttribute("y2") || "0");
    }

    /**
     * 開始点を取得
     */
    public getStartPoint(): { x: number; y: number } {
        return {
            x: this.getX1(),
            y: this.getY1()
        };
    }

    /**
     * 終了点を取得
     */
    public getEndPoint(): { x: number; y: number } {
        return {
            x: this.getX2(),
            y: this.getY2()
        };
    }

    /**
     * 線の長さを計算
     */
    public getLength(): number {
        const dx = this.getX2() - this.getX1();
        const dy = this.getY2() - this.getY1();
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 線の角度を計算（ラジアン）
     */
    public getAngleRadians(): number {
        const dx = this.getX2() - this.getX1();
        const dy = this.getY2() - this.getY1();
        return Math.atan2(dy, dx);
    }

    /**
     * 線の角度を計算（度）
     */
    public getAngleDegrees(): number {
        return this.getAngleRadians() * (180 / Math.PI);
    }

    /**
     * 線を指定分だけ移動
     */
    public moveBy(deltaX: number, deltaY: number): this {
        const x1 = this.getX1() + deltaX;
        const y1 = this.getY1() + deltaY;
        const x2 = this.getX2() + deltaX;
        const y2 = this.getY2() + deltaY;
        return this.setLine(x1, y1, x2, y2);
    }

    /**
     * 線を新しい位置に移動（開始点基準）
     */
    public moveTo(newX1: number, newY1: number): this {
        const dx = newX1 - this.getX1();
        const dy = newY1 - this.getY1();
        return this.moveBy(dx, dy);
    }

    /**
     * 線の長さを変更（開始点固定）
     */
    public setLength(newLength: number): this {
        const angle = this.getAngleRadians();
        const x1 = this.getX1();
        const y1 = this.getY1();
        const x2 = x1 + newLength * Math.cos(angle);
        const y2 = y1 + newLength * Math.sin(angle);
        return this.setEndPoint(x2, y2);
    }
}
