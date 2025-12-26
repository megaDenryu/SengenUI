import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeOffsetOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    dx?: string | number;
    dy?: string | number;
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：オフセット
 * 入力画像を指定した距離だけ移動
 */
export class FeOffsetC extends SvgFilterPrimitiveBase {
    constructor(options?: FeOffsetOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.dx !== undefined) this.setDx(options.dx);
            if (options.dy !== undefined) this.setDy(options.dy);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeOffsetElement();
        return new SvgElementProxy(element);
    }

    /**
     * 入力ソースを設定
     */
    public setIn(input: string): this {
        this.setSvgAttribute("in", input);
        return this;
    }

    /**
     * 入力ソースを取得
     */
    public getIn(): string | null {
        return this.getSvgAttribute("in");
    }

    /**
     * X軸方向のオフセットを設定
     */
    public setDx(dx: string | number): this {
        this.setSvgAttribute("dx", dx.toString());
        return this;
    }

    /**
     * X軸方向のオフセットを取得
     */
    public getDx(): string | null {
        return this.getSvgAttribute("dx");
    }

    /**
     * Y軸方向のオフセットを設定
     */
    public setDy(dy: string | number): this {
        this.setSvgAttribute("dy", dy.toString());
        return this;
    }

    /**
     * Y軸方向のオフセットを取得
     */
    public getDy(): string | null {
        return this.getSvgAttribute("dy");
    }

    /**
     * オフセットを同時に設定
     */
    public setOffset(dx: number, dy: number): this {
        this.setDx(dx);
        this.setDy(dy);
        return this;
    }

    /**
     * 結果の識別子を設定
     */
    public setResult(result: string): this {
        this.setSvgAttribute("result", result);
        return this;
    }

    /**
     * 結果の識別子を取得
     */
    public getResult(): string | null {
        return this.getSvgAttribute("result");
    }

    /**
     * X座標を設定
     */
    public setX(x: string | number): this {
        this.setSvgAttribute("x", x.toString());
        return this;
    }

    /**
     * X座標を取得
     */
    public getX(): string | null {
        return this.getSvgAttribute("x");
    }

    /**
     * Y座標を設定
     */
    public setY(y: string | number): this {
        this.setSvgAttribute("y", y.toString());
        return this;
    }

    /**
     * Y座標を取得
     */
    public getY(): string | null {
        return this.getSvgAttribute("y");
    }

    /**
     * 幅を設定
     */
    public setWidth(width: string | number): this {
        this.setSvgAttribute("width", width.toString());
        return this;
    }

    /**
     * 幅を取得
     */
    public getWidth(): string | null {
        return this.getSvgAttribute("width");
    }

    /**
     * 高さを設定
     */
    public setHeight(height: string | number): this {
        this.setSvgAttribute("height", height.toString());
        return this;
    }

    /**
     * 高さを取得
     */
    public getHeight(): string | null {
        return this.getSvgAttribute("height");
    }

    // === プリセットメソッド ===

    /**
     * 右下へのオフセット（シャドウ効果用）
     */
    public createShadowOffset(
        offsetX: number = 3,
        offsetY: number = 3,
        input: string = "SourceAlpha",
        result: string = "offset"
    ): this {
        this.setIn(input);
        this.setOffset(offsetX, offsetY);
        this.setResult(result);
        return this;
    }

    /**
     * 右へのオフセット
     */
    public createRightOffset(
        distance: number = 5,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(distance, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 左へのオフセット
     */
    public createLeftOffset(
        distance: number = 5,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(-distance, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 上へのオフセット
     */
    public createUpOffset(
        distance: number = 5,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(0, -distance);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 下へのオフセット
     */
    public createDownOffset(
        distance: number = 5,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(0, distance);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 対角線オフセット（右下）
     */
    public createDiagonalOffset(
        distance: number = 5,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(distance, distance);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 対角線オフセット（左上）
     */
    public createReverseDiagonalOffset(
        distance: number = 5,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(-distance, -distance);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 3D効果用のオフセット（段階的）
     */
    public create3DOffset(
        depthX: number = 2,
        depthY: number = 2,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(depthX, depthY);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * エンボス効果用の細かいオフセット
     */
    public createEmbossOffset(
        intensity: number = 1,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(intensity, intensity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 複製効果用のオフセット
     */
    public createDuplicateOffset(
        spacing: number = 10,
        direction: "right" | "left" | "up" | "down" = "right",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        switch (direction) {
            case "right":
                this.setOffset(spacing, 0);
                break;
            case "left":
                this.setOffset(-spacing, 0);
                break;
            case "up":
                this.setOffset(0, -spacing);
                break;
            case "down":
                this.setOffset(0, spacing);
                break;
        }
        if (result) this.setResult(result);
        return this;
    }

    /**
     * アウトライン効果用の微細オフセット
     */
    public createOutlineOffset(
        direction: "top" | "right" | "bottom" | "left",
        distance: number = 1,
        input: string = "SourceAlpha",
        result?: string
    ): this {
        this.setIn(input);
        switch (direction) {
            case "top":
                this.setOffset(0, -distance);
                break;
            case "right":
                this.setOffset(distance, 0);
                break;
            case "bottom":
                this.setOffset(0, distance);
                break;
            case "left":
                this.setOffset(-distance, 0);
                break;
        }
        if (result) this.setResult(result);
        return this;
    }

    /**
     * モーション効果用のオフセット
     */
    public createMotionOffset(
        velocityX: number,
        velocityY: number,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOffset(velocityX, velocityY);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 境界を拡張してオフセットが切り取られないようにする
     */
    public autoExtendBounds(paddingPercent: number = 15): this {
        this.setX(`-${paddingPercent}%`);
        this.setY(`-${paddingPercent}%`);
        this.setWidth(`${100 + paddingPercent * 2}%`);
        this.setHeight(`${100 + paddingPercent * 2}%`);
        return this;
    }

    /**
     * オフセット方向に応じて境界を動的に拡張
     */
    public smartExtendBounds(offsetMargin: number = 10): this {
        const dx = parseFloat(this.getDx() || "0");
        const dy = parseFloat(this.getDy() || "0");
        
        const leftExtend = dx < 0 ? Math.abs(dx) + offsetMargin : offsetMargin;
        const rightExtend = dx > 0 ? dx + offsetMargin : offsetMargin;
        const topExtend = dy < 0 ? Math.abs(dy) + offsetMargin : offsetMargin;
        const bottomExtend = dy > 0 ? dy + offsetMargin : offsetMargin;
        
        this.setX(-leftExtend);
        this.setY(-topExtend);
        this.setWidth(`calc(100% + ${leftExtend + rightExtend}px)`);
        this.setHeight(`calc(100% + ${topExtend + bottomExtend}px)`);
        return this;
    }
}
