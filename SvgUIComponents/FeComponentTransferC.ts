import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeComponentTransferOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    result?: string;
}

/**
 * SVGフィルタープリミティブ：成分転送フィルター
 * RGBAの各チャンネルに対して独立した変換関数を適用
 */
export class FeComponentTransferC extends SvgFilterPrimitiveBase {
    constructor(options?: FeComponentTransferOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.result) this.setResult(options.result);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeComponentTransferElement();
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
     * 赤チャンネル関数を追加
     */
    public addRedFunction(
        type: "identity" | "table" | "discrete" | "linear" | "gamma",
        values?: number[],
        slope?: number,
        intercept?: number,
        amplitude?: number,
        exponent?: number,
        offset?: number
    ): this {
        const funcElement = SvgElementCreater.createFeFuncRElement();
        funcElement.setAttribute("type", type);
        
        if (values && (type === "table" || type === "discrete")) {
            funcElement.setAttribute("tableValues", values.join(" "));
        }
        if (slope !== undefined && type === "linear") {
            funcElement.setAttribute("slope", slope.toString());
        }
        if (intercept !== undefined && type === "linear") {
            funcElement.setAttribute("intercept", intercept.toString());
        }
        if (amplitude !== undefined && type === "gamma") {
            funcElement.setAttribute("amplitude", amplitude.toString());
        }
        if (exponent !== undefined && type === "gamma") {
            funcElement.setAttribute("exponent", exponent.toString());
        }
        if (offset !== undefined && type === "gamma") {
            funcElement.setAttribute("offset", offset.toString());
        }
        
        this._svgDom.element.appendChild(funcElement);
        return this;
    }

    /**
     * 緑チャンネル関数を追加
     */
    public addGreenFunction(
        type: "identity" | "table" | "discrete" | "linear" | "gamma",
        values?: number[],
        slope?: number,
        intercept?: number,
        amplitude?: number,
        exponent?: number,
        offset?: number
    ): this {
        const funcElement = SvgElementCreater.createFeFuncGElement();
        funcElement.setAttribute("type", type);
        
        if (values && (type === "table" || type === "discrete")) {
            funcElement.setAttribute("tableValues", values.join(" "));
        }
        if (slope !== undefined && type === "linear") {
            funcElement.setAttribute("slope", slope.toString());
        }
        if (intercept !== undefined && type === "linear") {
            funcElement.setAttribute("intercept", intercept.toString());
        }
        if (amplitude !== undefined && type === "gamma") {
            funcElement.setAttribute("amplitude", amplitude.toString());
        }
        if (exponent !== undefined && type === "gamma") {
            funcElement.setAttribute("exponent", exponent.toString());
        }
        if (offset !== undefined && type === "gamma") {
            funcElement.setAttribute("offset", offset.toString());
        }
        
        this._svgDom.element.appendChild(funcElement);
        return this;
    }

    /**
     * 青チャンネル関数を追加
     */
    public addBlueFunction(
        type: "identity" | "table" | "discrete" | "linear" | "gamma",
        values?: number[],
        slope?: number,
        intercept?: number,
        amplitude?: number,
        exponent?: number,
        offset?: number
    ): this {
        const funcElement = SvgElementCreater.createFeFuncBElement();
        funcElement.setAttribute("type", type);
        
        if (values && (type === "table" || type === "discrete")) {
            funcElement.setAttribute("tableValues", values.join(" "));
        }
        if (slope !== undefined && type === "linear") {
            funcElement.setAttribute("slope", slope.toString());
        }
        if (intercept !== undefined && type === "linear") {
            funcElement.setAttribute("intercept", intercept.toString());
        }
        if (amplitude !== undefined && type === "gamma") {
            funcElement.setAttribute("amplitude", amplitude.toString());
        }
        if (exponent !== undefined && type === "gamma") {
            funcElement.setAttribute("exponent", exponent.toString());
        }
        if (offset !== undefined && type === "gamma") {
            funcElement.setAttribute("offset", offset.toString());
        }
        
        this._svgDom.element.appendChild(funcElement);
        return this;
    }

    /**
     * アルファチャンネル関数を追加
     */
    public addAlphaFunction(
        type: "identity" | "table" | "discrete" | "linear" | "gamma",
        values?: number[],
        slope?: number,
        intercept?: number,
        amplitude?: number,
        exponent?: number,
        offset?: number
    ): this {
        const funcElement = SvgElementCreater.createFeFuncAElement();
        funcElement.setAttribute("type", type);
        
        if (values && (type === "table" || type === "discrete")) {
            funcElement.setAttribute("tableValues", values.join(" "));
        }
        if (slope !== undefined && type === "linear") {
            funcElement.setAttribute("slope", slope.toString());
        }
        if (intercept !== undefined && type === "linear") {
            funcElement.setAttribute("intercept", intercept.toString());
        }
        if (amplitude !== undefined && type === "gamma") {
            funcElement.setAttribute("amplitude", amplitude.toString());
        }
        if (exponent !== undefined && type === "gamma") {
            funcElement.setAttribute("exponent", exponent.toString());
        }
        if (offset !== undefined && type === "gamma") {
            funcElement.setAttribute("offset", offset.toString());
        }
        
        this._svgDom.element.appendChild(funcElement);
        return this;
    }

    // === プリセットメソッド ===

    /**
     * ガンマ補正
     */
    public createGammaCorrection(
        gamma: number = 2.2,
        result: string = "gamma-corrected"
    ): this {
        this.addRedFunction("gamma", undefined, undefined, undefined, 1, gamma, 0);
        this.addGreenFunction("gamma", undefined, undefined, undefined, 1, gamma, 0);
        this.addBlueFunction("gamma", undefined, undefined, undefined, 1, gamma, 0);
        this.setResult(result);
        return this;
    }

    /**
     * コントラスト調整
     */
    public createContrastAdjustment(
        contrast: number = 1.5,
        result: string = "contrast-adjusted"
    ): this {
        const intercept = (1 - contrast) * 0.5;
        this.addRedFunction("linear", undefined, contrast, intercept);
        this.addGreenFunction("linear", undefined, contrast, intercept);
        this.addBlueFunction("linear", undefined, contrast, intercept);
        this.setResult(result);
        return this;
    }

    /**
     * 明度調整
     */
    public createBrightnessAdjustment(
        brightness: number = 0.2,
        result: string = "brightness-adjusted"
    ): this {
        this.addRedFunction("linear", undefined, 1, brightness);
        this.addGreenFunction("linear", undefined, 1, brightness);
        this.addBlueFunction("linear", undefined, 1, brightness);
        this.setResult(result);
        return this;
    }

    /**
     * 色反転
     */
    public createInversion(result: string = "inverted"): this {
        this.addRedFunction("linear", undefined, -1, 1);
        this.addGreenFunction("linear", undefined, -1, 1);
        this.addBlueFunction("linear", undefined, -1, 1);
        this.setResult(result);
        return this;
    }

    /**
     * ポスタリゼーション（段階化）
     */
    public createPosterization(
        levels: number = 4,
        result: string = "posterized"
    ): this {
        const values: number[] = [];
        for (let i = 0; i <= levels; i++) {
            values.push(i / levels);
        }
        
        this.addRedFunction("discrete", values);
        this.addGreenFunction("discrete", values);
        this.addBlueFunction("discrete", values);
        this.setResult(result);
        return this;
    }

    /**
     * セピア調
     */
    public createSepiaEffect(result: string = "sepia"): this {
        // セピア調の色変換
        this.addRedFunction("table", [0, 0.2, 0.4, 0.6, 0.8, 1.0]);
        this.addGreenFunction("table", [0, 0.15, 0.3, 0.45, 0.6, 0.75]);
        this.addBlueFunction("table", [0, 0.1, 0.2, 0.3, 0.4, 0.5]);
        this.setResult(result);
        return this;
    }

    /**
     * ソラリゼーション
     */
    public createSolarization(
        threshold: number = 0.5,
        result: string = "solarized"
    ): this {
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            const y = x < threshold ? x : 1 - x;
            values.push(y);
        }
        
        this.addRedFunction("table", values);
        this.addGreenFunction("table", values);
        this.addBlueFunction("table", values);
        this.setResult(result);
        return this;
    }

    /**
     * 色温度調整
     */
    public createColorTemperature(
        temperature: "warm" | "cool" | "neutral" = "neutral",
        result: string = "color-temperature"
    ): this {
        switch (temperature) {
            case "warm":
                this.addRedFunction("linear", undefined, 1.1, 0.05);
                this.addGreenFunction("linear", undefined, 1.0, 0.02);
                this.addBlueFunction("linear", undefined, 0.9, -0.05);
                break;
            case "cool":
                this.addRedFunction("linear", undefined, 0.9, -0.05);
                this.addGreenFunction("linear", undefined, 1.0, 0.02);
                this.addBlueFunction("linear", undefined, 1.1, 0.05);
                break;
            case "neutral":
                this.addRedFunction("identity");
                this.addGreenFunction("identity");
                this.addBlueFunction("identity");
                break;
        }
        this.setResult(result);
        return this;
    }

    /**
     * チャンネル交換
     */
    public createChannelSwap(
        redSource: "R" | "G" | "B",
        greenSource: "R" | "G" | "B",
        blueSource: "R" | "G" | "B",
        result: string = "channel-swapped"
    ): this {
        // 単純化のため、テーブル関数で近似
        const identity = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
        const zero = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
        this.addRedFunction("table", redSource === "R" ? identity : zero);
        this.addGreenFunction("table", greenSource === "G" ? identity : zero);
        this.addBlueFunction("table", blueSource === "B" ? identity : zero);
        this.setResult(result);
        return this;
    }

    /**
     * 透明度調整
     */
    public createOpacityAdjustment(
        opacity: number = 0.8,
        result: string = "opacity-adjusted"
    ): this {
        this.addAlphaFunction("linear", undefined, opacity, 0);
        this.setResult(result);
        return this;
    }

    /**
     * ハイライト・シャドウ調整
     */
    public createHighlightShadowAdjustment(
        highlightGain: number = 1.2,
        shadowGain: number = 0.8,
        result: string = "highlight-shadow-adjusted"
    ): this {
        // S字カーブでハイライトとシャドウを調整
        const values: number[] = [];
        for (let i = 0; i <= 10; i++) {
            const x = i / 10;
            let y: number;
            if (x < 0.5) {
                y = Math.pow(x * 2, shadowGain) * 0.5;
            } else {
                y = 1 - Math.pow((1 - x) * 2, highlightGain) * 0.5;
            }
            values.push(Math.max(0, Math.min(1, y)));
        }
        
        this.addRedFunction("table", values);
        this.addGreenFunction("table", values);
        this.addBlueFunction("table", values);
        this.setResult(result);
        return this;
    }

    /**
     * 色相シフト（簡易版）
     */
    public createHueShift(
        shift: number = 0.1,
        result: string = "hue-shifted"
    ): this {
        const cos120 = Math.cos(120 * Math.PI / 180);
        const sin120 = Math.sin(120 * Math.PI / 180);
        
        // 簡易的な色相シフト（線形近似）
        this.addRedFunction("linear", undefined, 1 + shift, 0);
        this.addGreenFunction("linear", undefined, 1, shift * cos120);
        this.addBlueFunction("linear", undefined, 1, shift * sin120);
        this.setResult(result);
        return this;
    }

    /**
     * ビンテージ効果
     */
    public createVintageEffect(result: string = "vintage"): this {
        // ビンテージな色調
        this.addRedFunction("gamma", undefined, undefined, undefined, 1.1, 1.2, 0.05);
        this.addGreenFunction("gamma", undefined, undefined, undefined, 1.0, 1.1, 0.02);
        this.addBlueFunction("gamma", undefined, undefined, undefined, 0.9, 1.3, -0.03);
        this.setResult(result);
        return this;
    }

    /**
     * シネマティック効果
     */
    public createCinematicEffect(result: string = "cinematic"): this {
        // 映画的な色調（高コントラスト、暖色寄り）
        this.addRedFunction("linear", undefined, 1.15, -0.05);
        this.addGreenFunction("linear", undefined, 1.1, -0.03);
        this.addBlueFunction("linear", undefined, 0.95, -0.02);
        this.setResult(result);
        return this;
    }

    /**
     * 全チャンネルをリセット
     */
    public resetAllChannels(): this {
        this._svgDom.element.innerHTML = "";
        return this;
    }

    /**
     * 恒等変換（変化なし）
     */
    public createIdentityTransform(result: string = "identity"): this {
        this.addRedFunction("identity");
        this.addGreenFunction("identity");
        this.addBlueFunction("identity");
        this.addAlphaFunction("identity");
        this.setResult(result);
        return this;
    }

    /**
     * カスタムカーブ
     */
    public createCustomCurve(
        redValues: number[],
        greenValues: number[],
        blueValues: number[],
        alphaValues?: number[],
        result: string = "custom-curve"
    ): this {
        this.addRedFunction("table", redValues);
        this.addGreenFunction("table", greenValues);
        this.addBlueFunction("table", blueValues);
        if (alphaValues) {
            this.addAlphaFunction("table", alphaValues);
        }
        this.setResult(result);
        return this;
    }

    /**
     * 成分転送の説明を取得
     */
    public getTransferDescription(): string {
        const functions = this._svgDom.element.children.length;
        return `${functions}個のチャンネル関数による成分転送`;
    }
}
