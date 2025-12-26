import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeGaussianBlurOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    stdDeviation?: string | number;
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：ガウシアンブラー
 * ガウシアン関数に基づくブラー効果を生成
 */
export class FeGaussianBlurC extends SvgFilterPrimitiveBase {
    constructor(options?: FeGaussianBlurOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.stdDeviation !== undefined) this.setStdDeviation(options.stdDeviation);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeGaussianBlurElement();
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
     * 標準偏差（ブラーの強度）を設定
     */
    public setStdDeviation(stdDeviation: string | number): this {
        this.setSvgAttribute("stdDeviation", stdDeviation.toString());
        return this;
    }

    /**
     * 標準偏差を取得
     */
    public getStdDeviation(): string | null {
        return this.getSvgAttribute("stdDeviation");
    }

    /**
     * X軸とY軸で異なる標準偏差を設定
     */
    public setStdDeviationXY(stdDeviationX: number, stdDeviationY: number): this {
        this.setSvgAttribute("stdDeviation", `${stdDeviationX} ${stdDeviationY}`);
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
     * 軽微なブラー効果を作成
     */
    public createSoftBlur(input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviation(1);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 中程度のブラー効果を作成
     */
    public createMediumBlur(input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviation(3);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 強いブラー効果を作成
     */
    public createStrongBlur(input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviation(5);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 極端に強いブラー効果を作成
     */
    public createExtremeBlur(input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviation(10);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 水平方向のモーションブラーを作成
     */
    public createMotionBlurHorizontal(intensity: number = 5, input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviationXY(intensity, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 垂直方向のモーションブラーを作成
     */
    public createMotionBlurVertical(intensity: number = 5, input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviationXY(0, intensity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * カスタムモーションブラーを作成
     */
    public createCustomMotionBlur(horizontalIntensity: number, verticalIntensity: number, input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviationXY(horizontalIntensity, verticalIntensity);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 背景ブラー効果を作成（フォーカス効果用）
     */
    public createBackgroundBlur(blurAmount: number = 8, input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setStdDeviation(blurAmount);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * テキスト影用の軽いブラーを作成
     */
    public createTextShadowBlur(input: string = "SourceAlpha", result: string = "blur"): this {
        this.setIn(input);
        this.setStdDeviation(2);
        this.setResult(result);
        return this;
    }

    /**
     * ドロップシャドウ用のブラーを作成
     */
    public createDropShadowBlur(blurRadius: number = 3, input: string = "SourceAlpha", result: string = "blur"): this {
        this.setIn(input);
        this.setStdDeviation(blurRadius);
        this.setResult(result);
        return this;
    }

    /**
     * グロー効果用のブラーを作成
     */
    public createGlowBlur(glowIntensity: number = 4, input: string = "SourceAlpha", result: string = "glow"): this {
        this.setIn(input);
        this.setStdDeviation(glowIntensity);
        this.setResult(result);
        return this;
    }

    /**
     * 境界を拡張してブラーを適用
     */
    public withExtendedBounds(x: number, y: number, width: number, height: number): this {
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    /**
     * 領域を自動拡張（ブラーが切り取られないように）
     */
    public autoExtendBounds(paddingPercent: number = 20): this {
        this.setX(`-${paddingPercent}%`);
        this.setY(`-${paddingPercent}%`);
        this.setWidth(`${100 + paddingPercent * 2}%`);
        this.setHeight(`${100 + paddingPercent * 2}%`);
        return this;
    }
}
