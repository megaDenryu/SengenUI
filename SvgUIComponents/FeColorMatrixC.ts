import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeColorMatrixOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
    values?: string;
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：色変換行列
 * 色の変換とエフェクトを適用
 */
export class FeColorMatrixC extends SvgFilterPrimitiveBase {
    constructor(options?: FeColorMatrixOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.type) this.setType(options.type);
            if (options.values) this.setValues(options.values);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeColorMatrixElement();
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
     * 変換タイプを設定
     */
    public setType(type: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha"): this {
        this.setSvgAttribute("type", type);
        return this;
    }

    /**
     * 変換タイプを取得
     */
    public getType(): string | null {
        return this.getSvgAttribute("type");
    }

    /**
     * 変換値を設定
     */
    public setValues(values: string): this {
        this.setSvgAttribute("values", values);
        return this;
    }

    /**
     * 変換値を取得
     */
    public getValues(): string | null {
        return this.getSvgAttribute("values");
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
     * カスタム色変換行列を設定
     */
    public setMatrix(matrix: number[]): this {
        if (matrix.length !== 20) {
            throw new Error("Color matrix must have exactly 20 values");
        }
        this.setType("matrix");
        this.setValues(matrix.join(" "));
        return this;
    }

    /**
     * 彩度調整を作成
     */
    public createSaturate(saturation: number = 1, input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setType("saturate");
        this.setValues(saturation.toString());
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 色相回転を作成
     */
    public createHueRotate(degrees: number, input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setType("hueRotate");
        this.setValues(degrees.toString());
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 輝度からアルファへの変換を作成
     */
    public createLuminanceToAlpha(input: string = "SourceGraphic", result?: string): this {
        this.setIn(input);
        this.setType("luminanceToAlpha");
        if (result) this.setResult(result);
        return this;
    }

    /**
     * グレースケール変換を作成
     */
    public createGrayscale(input: string = "SourceGraphic", result?: string): this {
        const matrix = [
            0.299, 0.587, 0.114, 0, 0,
            0.299, 0.587, 0.114, 0, 0,
            0.299, 0.587, 0.114, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * セピア調変換を作成
     */
    public createSepia(input: string = "SourceGraphic", result?: string): this {
        const matrix = [
            0.393, 0.769, 0.189, 0, 0,
            0.349, 0.686, 0.168, 0, 0,
            0.272, 0.534, 0.131, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 反転（ネガティブ）変換を作成
     */
    public createInvert(input: string = "SourceGraphic", result?: string): this {
        const matrix = [
            -1, 0, 0, 0, 1,
            0, -1, 0, 0, 1,
            0, 0, -1, 0, 1,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * コントラスト調整を作成
     */
    public createContrast(contrast: number = 1, input: string = "SourceGraphic", result?: string): this {
        const offset = (1 - contrast) / 2;
        const matrix = [
            contrast, 0, 0, 0, offset,
            0, contrast, 0, 0, offset,
            0, 0, contrast, 0, offset,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 明度調整を作成
     */
    public createBrightness(brightness: number = 1, input: string = "SourceGraphic", result?: string): this {
        const matrix = [
            brightness, 0, 0, 0, 0,
            0, brightness, 0, 0, 0,
            0, 0, brightness, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 色温度調整を作成（暖色・寒色）
     */
    public createColorTemperature(temperature: number = 0, input: string = "SourceGraphic", result?: string): this {
        // temperatureは-1（寒色）から1（暖色）の範囲
        const warmth = Math.max(0, temperature);
        const coolness = Math.max(0, -temperature);
        
        const matrix = [
            1 + warmth * 0.3, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1 + coolness * 0.3, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * ヴィンテージ効果を作成
     */
    public createVintage(input: string = "SourceGraphic", result?: string): this {
        const matrix = [
            0.6, 0.3, 0.1, 0, 0.1,
            0.2, 0.7, 0.1, 0, 0.05,
            0.1, 0.2, 0.5, 0, 0.1,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 特定色相の強調を作成
     */
    public createColorEmphasis(
        redEmphasis: number = 1,
        greenEmphasis: number = 1,
        blueEmphasis: number = 1,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        const matrix = [
            redEmphasis, 0, 0, 0, 0,
            0, greenEmphasis, 0, 0, 0,
            0, 0, blueEmphasis, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * ドリーム効果（夢想的な色調）を作成
     */
    public createDreamEffect(input: string = "SourceGraphic", result?: string): this {
        const matrix = [
            0.8, 0.2, 0.3, 0, 0.1,
            0.1, 0.9, 0.2, 0, 0.05,
            0.2, 0.1, 0.8, 0, 0.15,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * モノクローム（特定色）変換を作成
     */
    public createMonochrome(
        targetRed: number = 1,
        targetGreen: number = 0.5,
        targetBlue: number = 0,
        input: string = "SourceGraphic",
        result?: string
    ): this {
        const gray = 0.299; // 輝度の赤成分
        const matrix = [
            gray * targetRed, gray * targetRed, gray * targetRed, 0, 0,
            gray * targetGreen, gray * targetGreen, gray * targetGreen, 0, 0,
            gray * targetBlue, gray * targetBlue, gray * targetBlue, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * アルファプリマルチプライを作成
     */
    public createAlphaPremultiply(input: string = "SourceGraphic", result?: string): this {
        const matrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 色相シフト（レインボー効果）を作成
     */
    public createRainbowShift(shift: number = 60, input: string = "SourceGraphic", result?: string): this {
        // shift: 0-360度の色相シフト
        const rad = (shift * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        
        const matrix = [
            0.299 + 0.701 * cos + 0.168 * sin, 0.587 - 0.587 * cos + 0.330 * sin, 0.114 - 0.114 * cos - 0.497 * sin, 0, 0,
            0.299 - 0.299 * cos - 0.328 * sin, 0.587 + 0.413 * cos + 0.035 * sin, 0.114 - 0.114 * cos + 0.292 * sin, 0, 0,
            0.299 - 0.300 * cos + 1.250 * sin, 0.587 - 0.588 * cos - 1.050 * sin, 0.114 + 0.886 * cos - 0.203 * sin, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.setIn(input);
        this.setMatrix(matrix);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 境界を自動拡張
     */
    public autoExtendBounds(paddingPercent: number = 10): this {
        this.setX(`-${paddingPercent}%`);
        this.setY(`-${paddingPercent}%`);
        this.setWidth(`${100 + paddingPercent * 2}%`);
        this.setHeight(`${100 + paddingPercent * 2}%`);
        return this;
    }
}
