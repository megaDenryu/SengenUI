import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeDropShadowOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    dx?: string | number;
    dy?: string | number;
    stdDeviation?: string | number;
    floodColor?: string;
    floodOpacity?: string | number;
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：ドロップシャドウ
 * 要素にドロップシャドウ効果を適用
 */
export class FeDropShadowC extends SvgFilterPrimitiveBase {
    constructor(options?: FeDropShadowOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.dx !== undefined) this.setDx(options.dx);
            if (options.dy !== undefined) this.setDy(options.dy);
            if (options.stdDeviation !== undefined) this.setStdDeviation(options.stdDeviation);
            if (options.floodColor) this.setFloodColor(options.floodColor);
            if (options.floodOpacity !== undefined) this.setFloodOpacity(options.floodOpacity);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeDropShadowElement();
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
     * ブラーの標準偏差を設定
     */
    public setStdDeviation(stdDeviation: string | number): this {
        this.setSvgAttribute("stdDeviation", stdDeviation.toString());
        return this;
    }

    /**
     * ブラーの標準偏差を取得
     */
    public getStdDeviation(): string | null {
        return this.getSvgAttribute("stdDeviation");
    }

    /**
     * シャドウの色を設定
     */
    public setFloodColor(color: string): this {
        this.setSvgAttribute("flood-color", color);
        return this;
    }

    /**
     * シャドウの色を取得
     */
    public getFloodColor(): string | null {
        return this.getSvgAttribute("flood-color");
    }

    /**
     * シャドウの不透明度を設定
     */
    public setFloodOpacity(opacity: string | number): this {
        this.setSvgAttribute("flood-opacity", opacity.toString());
        return this;
    }

    /**
     * シャドウの不透明度を取得
     */
    public getFloodOpacity(): string | null {
        return this.getSvgAttribute("flood-opacity");
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
     * 基本的なドロップシャドウを作成
     */
    public createBasicShadow(
        offsetX: number = 2,
        offsetY: number = 2,
        blur: number = 3,
        color: string = "rgba(0,0,0,0.3)",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 柔らかいドロップシャドウを作成
     */
    public createSoftShadow(
        offsetX: number = 3,
        offsetY: number = 3,
        blur: number = 6,
        color: string = "rgba(0,0,0,0.2)",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 硬いドロップシャドウを作成
     */
    public createHardShadow(
        offsetX: number = 4,
        offsetY: number = 4,
        blur: number = 0,
        color: string = "rgba(0,0,0,0.5)",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 長いドロップシャドウを作成（遠方の光源効果）
     */
    public createLongShadow(
        offsetX: number = 10,
        offsetY: number = 10,
        blur: number = 2,
        color: string = "rgba(0,0,0,0.25)",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 内側シャドウ風の効果を作成
     */
    public createInnerShadowEffect(
        offsetX: number = -1,
        offsetY: number = -1,
        blur: number = 2,
        color: string = "rgba(0,0,0,0.3)",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 色付きドロップシャドウを作成
     */
    public createColoredShadow(
        offsetX: number = 3,
        offsetY: number = 3,
        blur: number = 4,
        color: string,
        opacity: number = 0.6,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        this.setFloodOpacity(opacity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * グロー効果を作成（オフセットなし）
     */
    public createGlowEffect(
        blur: number = 5,
        color: string = "#00ff00",
        opacity: number = 0.8,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(0);
        this.setDy(0);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        this.setFloodOpacity(opacity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 3D効果のシャドウを作成
     */
    public create3DShadow(
        offsetX: number = 2,
        offsetY: number = 4,
        blur: number = 1,
        color: string = "rgba(0,0,0,0.4)",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * ネオン効果のシャドウを作成
     */
    public createNeonShadow(
        blur: number = 8,
        color: string = "#ff00ff",
        opacity: number = 0.9,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(0);
        this.setDy(0);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        this.setFloodOpacity(opacity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 紙の影効果を作成
     */
    public createPaperShadow(
        offsetX: number = 0,
        offsetY: number = 2,
        blur: number = 4,
        color: string = "rgba(0,0,0,0.12)",
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setDx(offsetX);
        this.setDy(offsetY);
        this.setStdDeviation(blur);
        this.setFloodColor(color);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 境界を自動拡張してシャドウが切り取られないようにする
     */
    public autoExtendBounds(paddingPercent: number = 25): this {
        this.setX(`-${paddingPercent}%`);
        this.setY(`-${paddingPercent}%`);
        this.setWidth(`${100 + paddingPercent * 2}%`);
        this.setHeight(`${100 + paddingPercent * 2}%`);
        return this;
    }

    /**
     * 特定の方向に境界を拡張
     */
    public extendBoundsInDirection(
        topPercent: number = 10,
        rightPercent: number = 10,
        bottomPercent: number = 10,
        leftPercent: number = 10
    ): this {
        this.setX(`-${leftPercent}%`);
        this.setY(`-${topPercent}%`);
        this.setWidth(`${100 + leftPercent + rightPercent}%`);
        this.setHeight(`${100 + topPercent + bottomPercent}%`);
        return this;
    }
}
