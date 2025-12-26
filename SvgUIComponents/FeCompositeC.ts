import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeCompositeOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    in2?: string;
    operator?: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";
    k1?: string | number;
    k2?: string | number;
    k3?: string | number;
    k4?: string | number;
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：合成
 * 2つの入力画像を指定した合成モードで組み合わせ
 */
export class FeCompositeC extends SvgFilterPrimitiveBase {
    constructor(options?: FeCompositeOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.in2) this.setIn2(options.in2);
            if (options.operator) this.setOperator(options.operator);
            if (options.k1 !== undefined) this.setK1(options.k1);
            if (options.k2 !== undefined) this.setK2(options.k2);
            if (options.k3 !== undefined) this.setK3(options.k3);
            if (options.k4 !== undefined) this.setK4(options.k4);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeCompositeElement();
        return new SvgElementProxy(element);
    }

    /**
     * 最初の入力ソースを設定
     */
    public setIn(input: string): this {
        this.setSvgAttribute("in", input);
        return this;
    }

    /**
     * 最初の入力ソースを取得
     */
    public getIn(): string | null {
        return this.getSvgAttribute("in");
    }

    /**
     * 2番目の入力ソースを設定
     */
    public setIn2(input2: string): this {
        this.setSvgAttribute("in2", input2);
        return this;
    }

    /**
     * 2番目の入力ソースを取得
     */
    public getIn2(): string | null {
        return this.getSvgAttribute("in2");
    }

    /**
     * 合成演算子を設定
     */
    public setOperator(operator: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic"): this {
        this.setSvgAttribute("operator", operator);
        return this;
    }

    /**
     * 合成演算子を取得
     */
    public getOperator(): string | null {
        return this.getSvgAttribute("operator");
    }

    /**
     * 算術演算の係数k1を設定
     */
    public setK1(k1: string | number): this {
        this.setSvgAttribute("k1", k1.toString());
        return this;
    }

    /**
     * 算術演算の係数k1を取得
     */
    public getK1(): string | null {
        return this.getSvgAttribute("k1");
    }

    /**
     * 算術演算の係数k2を設定
     */
    public setK2(k2: string | number): this {
        this.setSvgAttribute("k2", k2.toString());
        return this;
    }

    /**
     * 算術演算の係数k2を取得
     */
    public getK2(): string | null {
        return this.getSvgAttribute("k2");
    }

    /**
     * 算術演算の係数k3を設定
     */
    public setK3(k3: string | number): this {
        this.setSvgAttribute("k3", k3.toString());
        return this;
    }

    /**
     * 算術演算の係数k3を取得
     */
    public getK3(): string | null {
        return this.getSvgAttribute("k3");
    }

    /**
     * 算術演算の係数k4を設定
     */
    public setK4(k4: string | number): this {
        this.setSvgAttribute("k4", k4.toString());
        return this;
    }

    /**
     * 算術演算の係数k4を取得
     */
    public getK4(): string | null {
        return this.getSvgAttribute("k4");
    }

    /**
     * 算術演算の全係数を設定
     */
    public setArithmeticCoefficients(k1: number, k2: number, k3: number, k4: number): this {
        this.setK1(k1);
        this.setK2(k2);
        this.setK3(k3);
        this.setK4(k4);
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
     * 基本的なオーバー合成を作成
     */
    public createOver(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("over");
        if (result) this.setResult(result);
        return this;
    }

    /**
     * マスク合成（input1をinput2でマスク）を作成
     */
    public createMask(input1: string, mask: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(mask);
        this.setOperator("in");
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 除外合成（input1からinput2を除外）を作成
     */
    public createExclude(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("out");
        if (result) this.setResult(result);
        return this;
    }

    /**
     * アトップ合成を作成
     */
    public createAtop(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("atop");
        if (result) this.setResult(result);
        return this;
    }

    /**
     * XOR合成を作成
     */
    public createXor(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("xor");
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 明度合成（ライター）を作成
     */
    public createLighter(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("lighter");
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 算術合成を作成
     */
    public createArithmetic(
        input1: string,
        input2: string,
        k1: number,
        k2: number,
        k3: number,
        k4: number,
        result?: string
    ): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(k1, k2, k3, k4);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 加算合成を作成
     */
    public createAdd(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(0, 1, 1, 0); // result = input1 + input2
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 乗算合成を作成
     */
    public createMultiply(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(1, 0, 0, 0); // result = input1 * input2
        if (result) this.setResult(result);
        return this;
    }

    /**
     * スクリーン合成を作成
     */
    public createScreen(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(-1, 1, 1, 0); // result = input1 + input2 - input1*input2
        if (result) this.setResult(result);
        return this;
    }

    /**
     * アルファ合成を作成（input1のアルファをinput2で制御）
     */
    public createAlphaComposite(input1: string, alphaSource: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(alphaSource);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(0, 1, 0, 0); // result = input1 * alphaSource
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 色相混合を作成
     */
    public createColorBlend(baseColor: string, blendColor: string, intensity: number = 0.5, result?: string): this {
        this.setIn(baseColor);
        this.setIn2(blendColor);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(0, 1 - intensity, intensity, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * オーバーレイ効果を作成
     */
    public createOverlay(baseImage: string, overlayImage: string, strength: number = 1, result?: string): this {
        this.setIn(baseImage);
        this.setIn2(overlayImage);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(strength, 1, 1 - strength, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * ソフトライト効果を作成
     */
    public createSoftLight(baseImage: string, lightSource: string, result?: string): this {
        this.setIn(baseImage);
        this.setIn2(lightSource);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(2, -1, 1, 0); // 近似的なソフトライト
        if (result) this.setResult(result);
        return this;
    }

    /**
     * カラーバーン効果を作成
     */
    public createColorBurn(baseImage: string, burnSource: string, result?: string): this {
        this.setIn(baseImage);
        this.setIn2(burnSource);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(0, 1, -1, 1); // 反転減算
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 差分合成を作成
     */
    public createDifference(input1: string, input2: string, result?: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(0, 1, -1, 0); // |input1 - input2|に近似
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 透明度調整を作成
     */
    public createOpacityAdjust(input: string, opacity: number, result?: string): this {
        this.setIn(input);
        this.setIn2("SourceGraphic"); // ダミー入力
        this.setOperator("arithmetic");
        this.setArithmeticCoefficients(0, opacity, 0, 0);
        if (result) this.setResult(result);
        return this;
    }

    /**
     * 境界を自動拡張
     */
    public autoExtendBounds(paddingPercent: number = 15): this {
        this.setX(`-${paddingPercent}%`);
        this.setY(`-${paddingPercent}%`);
        this.setWidth(`${100 + paddingPercent * 2}%`);
        this.setHeight(`${100 + paddingPercent * 2}%`);
        return this;
    }

    /**
     * カスタム領域を設定
     */
    public setCustomRegion(x: number, y: number, width: number, height: number): this {
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }
}
