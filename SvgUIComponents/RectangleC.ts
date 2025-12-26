import { SvgElementProxy, SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgGraphicsBase } from "./BaseClasses/SvgGraphicsBase";

export interface RectangleOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    rx?: number; // 角の丸み
    ry?: number; // 角の丸み
    className?: string | string[];
    id?: string;
}

/**
 * SVG Rectangle要素のコンポーネント
 * 矩形を描画するためのSVG要素をラップします
 */
export class RectangleC extends SvgGraphicsBase {
    constructor(options?: RectangleOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();

        // オプションが指定されている場合は設定を適用
        if (options) {
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
            if (options.fill) this.setFill(options.fill);
            if (options.stroke) this.setStroke(options.stroke, options.strokeWidth);
            if (options.rx !== undefined) this.setRx(options.rx);
            if (options.ry !== undefined) this.setRy(options.ry);
            if (options.className) this.addSvgClass(options.className);
            if (options.id) this._svgDom.element.id = options.id;
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const rect = SvgElementCreater.createRectElement();
        return new SvgElementProxy(rect);
    }

    /**
     * 矩形のX座標を設定
     */
    public setX(x: number): this {
        this.setSvgAttribute("x", x);
        return this;
    }

    /**
     * 矩形のY座標を設定
     */
    public setY(y: number): this {
        this.setSvgAttribute("y", y);
        return this;
    }

    /**
     * 矩形の位置を設定
     */
    public setPosition(x: number, y: number): this {
        this.setX(x);
        this.setY(y);
        return this;
    }

    /**
     * 矩形の幅を設定
     */
    public setWidth(width: number): this {
        this.setSvgAttribute("width", width);
        return this;
    }

    /**
     * 矩形の高さを設定
     */
    public setHeight(height: number): this {
        this.setSvgAttribute("height", height);
        return this;
    }

    /**
     * 矩形のサイズを設定
     */
    public setSize(width: number, height: number): this {
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    /**
     * 角の丸みX半径を設定
     */
    public setRx(rx: number): this {
        this.setSvgAttribute("rx", rx);
        return this;
    }

    /**
     * 角の丸みY半径を設定
     */
    public setRy(ry: number): this {
        this.setSvgAttribute("ry", ry);
        return this;
    }

    /**
     * 角の丸みを設定
     */
    public setRoundedCorners(rx: number, ry?: number): this {
        this.setRx(rx);
        if (ry !== undefined) {
            this.setRy(ry);
        }
        return this;
    }

    /**
     * 矩形のX座標を取得
     */
    public getX(): number {
        return parseFloat(this.getSvgAttribute("x") || "0");
    }

    /**
     * 矩形のY座標を取得
     */
    public getY(): number {
        return parseFloat(this.getSvgAttribute("y") || "0");
    }

    /**
     * 矩形の幅を取得
     */
    public getWidth(): number {
        return parseFloat(this.getSvgAttribute("width") || "0");
    }

    /**
     * 矩形の高さを取得
     */
    public getHeight(): number {
        return parseFloat(this.getSvgAttribute("height") || "0");
    }

    /**
     * 矩形の位置を取得
     */
    public getPosition(): { x: number; y: number } {
        return {
            x: this.getX(),
            y: this.getY()
        };
    }

    /**
     * 矩形のサイズを取得
     */
    public getSize(): { width: number; height: number } {
        return {
            width: this.getWidth(),
            height: this.getHeight()
        };
    }

    /**
     * 矩形を指定位置に移動
     */
    public moveTo(x: number, y: number): this {
        return this.setPosition(x, y);
    }

    /**
     * 矩形を相対的に移動
     */
    public moveBy(deltaX: number, deltaY: number): this {
        const currentX = this.getX();
        const currentY = this.getY();
        return this.setPosition(currentX + deltaX, currentY + deltaY);
    }

    /**
     * 矩形のサイズを変更
     */
    public resize(width: number, height: number): this {
        return this.setSize(width, height);
    }

    /**
     * 矩形を拡大・縮小（相対的）
     */
    public scale(factorX: number, factorY?: number): this {
        const currentWidth = this.getWidth();
        const currentHeight = this.getHeight();
        const scaleY = factorY !== undefined ? factorY : factorX;
        return this.setSize(currentWidth * factorX, currentHeight * scaleY);
    }
}
