import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeMorphologyOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    operator?: "erode" | "dilate";
    radius?: string | number;
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：モルフォロジー
 * 膨張（dilate）と収縮（erode）によって形状を変更
 */
export class FeMorphologyC extends SvgFilterPrimitiveBase {
    constructor(options?: FeMorphologyOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.operator) this.setOperator(options.operator);
            if (options.radius !== undefined) this.setRadius(options.radius);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeMorphologyElement();
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
     * モルフォロジー演算子を設定
     */
    public setOperator(operator: "erode" | "dilate"): this {
        this.setSvgAttribute("operator", operator);
        return this;
    }

    /**
     * モルフォロジー演算子を取得
     */
    public getOperator(): string | null {
        return this.getSvgAttribute("operator");
    }

    /**
     * 半径を設定
     */
    public setRadius(radius: string | number): this {
        this.setSvgAttribute("radius", radius.toString());
        return this;
    }

    /**
     * 半径を取得
     */
    public getRadius(): string | null {
        return this.getSvgAttribute("radius");
    }

    /**
     * X軸とY軸で異なる半径を設定
     */
    public setRadiusXY(radiusX: number, radiusY: number): this {
        this.setSvgAttribute("radius", `${radiusX} ${radiusY}`);
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
     * 膨張効果を作成（形状を太くする）
     */
    public createDilate(
        radius: number = 1,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadius(radius);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 収縮効果を作成（形状を細くする）
     */
    public createErode(
        radius: number = 1,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("erode");
        this.setRadius(radius);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 軽微な膨張効果
     */
    public createSoftDilate(
        input: string = "SourceAlpha",
        result: string = "dilated"
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadius(0.5);
        this.setResult(result);
        return this;
    }

    /**
     * 軽微な収縮効果
     */
    public createSoftErode(
        input: string = "SourceAlpha",
        result: string = "eroded"
    ): this {
        this.setIn(input);
        this.setOperator("erode");
        this.setRadius(0.5);
        this.setResult(result);
        return this;
    }

    /**
     * 強い膨張効果
     */
    public createStrongDilate(
        radius: number = 3,
        input: string = "SourceAlpha",
        result: string = "dilated"
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadius(radius);
        this.setResult(result);
        return this;
    }

    /**
     * 強い収縮効果
     */
    public createStrongErode(
        radius: number = 3,
        input: string = "SourceAlpha",
        result: string = "eroded"
    ): this {
        this.setIn(input);
        this.setOperator("erode");
        this.setRadius(radius);
        this.setResult(result);
        return this;
    }

    /**
     * アウトライン作成用の膨張
     */
    public createOutlineDilate(
        outlineWidth: number = 2,
        input: string = "SourceAlpha",
        result: string = "outline"
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadius(outlineWidth);
        this.setResult(result);
        return this;
    }

    /**
     * 細い線を太くする膨張
     */
    public createThickenLines(
        thickness: number = 1,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadius(thickness);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 太い線を細くする収縮
     */
    public createThinLines(
        thinness: number = 1,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("erode");
        this.setRadius(thinness);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * ノイズ除去用の軽い収縮
     */
    public createNoiseReduction(
        input: string = "SourceGraphic",
        result: string = "cleaned"
    ): this {
        this.setIn(input);
        this.setOperator("erode");
        this.setRadius(0.3);
        this.setResult(result);
        return this;
    }

    /**
     * 水平方向の膨張
     */
    public createHorizontalDilate(
        radiusX: number = 2,
        input: string = "SourceAlpha",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadiusXY(radiusX, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 垂直方向の膨張
     */
    public createVerticalDilate(
        radiusY: number = 2,
        input: string = "SourceAlpha",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadiusXY(0, radiusY);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 水平方向の収縮
     */
    public createHorizontalErode(
        radiusX: number = 2,
        input: string = "SourceAlpha",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("erode");
        this.setRadiusXY(radiusX, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 垂直方向の収縮
     */
    public createVerticalErode(
        radiusY: number = 2,
        input: string = "SourceAlpha",
        result?: string
    ): this {
        this.setIn(input);
        this.setOperator("erode");
        this.setRadiusXY(0, radiusY);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * エンボス効果の前処理用膨張
     */
    public createEmbossDilate(
        input: string = "SourceAlpha",
        result: string = "emboss-dilated"
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadius(1);
        this.setResult(result);
        return this;
    }

    /**
     * グロー効果の外側リング作成用膨張
     */
    public createGlowDilate(
        glowRadius: number = 4,
        input: string = "SourceAlpha",
        result: string = "glow-ring"
    ): this {
        this.setIn(input);
        this.setOperator("dilate");
        this.setRadius(glowRadius);
        this.setResult(result);
        return this;
    }

    /**
     * 境界を自動拡張してモルフォロジー効果が切り取られないようにする
     */
    public autoExtendBounds(paddingPercent: number = 20): this {
        this.setX(`-${paddingPercent}%`);
        this.setY(`-${paddingPercent}%`);
        this.setWidth(`${100 + paddingPercent * 2}%`);
        this.setHeight(`${100 + paddingPercent * 2}%`);
        return this;
    }

    /**
     * 半径に応じて境界を動的に拡張
     */
    public smartExtendBounds(extraMargin: number = 5): this {
        const radiusStr = this.getRadius() || "0";
        const radiusValues = radiusStr.split(' ').map(r => parseFloat(r));
        const maxRadius = Math.max(...radiusValues);
        const margin = maxRadius + extraMargin;
        
        this.setX(-margin);
        this.setY(-margin);
        this.setWidth(`calc(100% + ${margin * 2}px)`);
        this.setHeight(`calc(100% + ${margin * 2}px)`);
        return this;
    }
}
