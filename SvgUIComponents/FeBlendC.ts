import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeBlendOptions {
    className?: string | string[];
    id?: string;
    mode?: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity";
    in?: string;
    in2?: string;
    result?: string;
}

/**
 * SVGフィルタープリミティブ：ブレンドフィルター
 * 二つの入力画像を様々なブレンドモードで合成
 */
export class FeBlendC extends SvgFilterPrimitiveBase {
    constructor(options?: FeBlendOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.mode) this.setMode(options.mode);
            if (options.in) this.setIn(options.in);
            if (options.in2) this.setIn2(options.in2);
            if (options.result) this.setResult(options.result);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeBlendElement();
        return new SvgElementProxy(element);
    }

    /**
     * ブレンドモードを設定
     */
    public setMode(mode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"): this {
        this.setSvgAttribute("mode", mode);
        return this;
    }

    /**
     * ブレンドモードを取得
     */
    public getMode(): string | null {
        return this.getSvgAttribute("mode");
    }

    /**
     * 第一入力ソースを設定
     */
    public setIn(input: string): this {
        this.setSvgAttribute("in", input);
        return this;
    }

    /**
     * 第一入力ソースを取得
     */
    public getIn(): string | null {
        return this.getSvgAttribute("in");
    }

    /**
     * 第二入力ソースを設定
     */
    public setIn2(input2: string): this {
        this.setSvgAttribute("in2", input2);
        return this;
    }

    /**
     * 第二入力ソースを取得
     */
    public getIn2(): string | null {
        return this.getSvgAttribute("in2");
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

    // === プリセットメソッド ===

    /**
     * 通常のブレンド（上書き）
     */
    public createNormalBlend(
        input1: string,
        input2: string,
        result: string = "normal-blend"
    ): this {
        this.setMode("normal");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * 乗算ブレンド
     */
    public createMultiplyBlend(
        input1: string,
        input2: string,
        result: string = "multiply-blend"
    ): this {
        this.setMode("multiply");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * スクリーンブレンド
     */
    public createScreenBlend(
        input1: string,
        input2: string,
        result: string = "screen-blend"
    ): this {
        this.setMode("screen");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * オーバーレイブレンド
     */
    public createOverlayBlend(
        input1: string,
        input2: string,
        result: string = "overlay-blend"
    ): this {
        this.setMode("overlay");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * ダーケンブレンド（暗く）
     */
    public createDarkenBlend(
        input1: string,
        input2: string,
        result: string = "darken-blend"
    ): this {
        this.setMode("darken");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * ライテンブレンド（明るく）
     */
    public createLightenBlend(
        input1: string,
        input2: string,
        result: string = "lighten-blend"
    ): this {
        this.setMode("lighten");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * カラー覆い焼きブレンド
     */
    public createColorDodgeBlend(
        input1: string,
        input2: string,
        result: string = "color-dodge-blend"
    ): this {
        this.setMode("color-dodge");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * カラー焼き込みブレンド
     */
    public createColorBurnBlend(
        input1: string,
        input2: string,
        result: string = "color-burn-blend"
    ): this {
        this.setMode("color-burn");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * ハードライトブレンド
     */
    public createHardLightBlend(
        input1: string,
        input2: string,
        result: string = "hard-light-blend"
    ): this {
        this.setMode("hard-light");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * ソフトライトブレンド
     */
    public createSoftLightBlend(
        input1: string,
        input2: string,
        result: string = "soft-light-blend"
    ): this {
        this.setMode("soft-light");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * 差の絶対値ブレンド
     */
    public createDifferenceBlend(
        input1: string,
        input2: string,
        result: string = "difference-blend"
    ): this {
        this.setMode("difference");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * 除外ブレンド
     */
    public createExclusionBlend(
        input1: string,
        input2: string,
        result: string = "exclusion-blend"
    ): this {
        this.setMode("exclusion");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * 色相ブレンド
     */
    public createHueBlend(
        input1: string,
        input2: string,
        result: string = "hue-blend"
    ): this {
        this.setMode("hue");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * 彩度ブレンド
     */
    public createSaturationBlend(
        input1: string,
        input2: string,
        result: string = "saturation-blend"
    ): this {
        this.setMode("saturation");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * カラーブレンド
     */
    public createColorBlend(
        input1: string,
        input2: string,
        result: string = "color-blend"
    ): this {
        this.setMode("color");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * 輝度ブレンド
     */
    public createLuminosityBlend(
        input1: string,
        input2: string,
        result: string = "luminosity-blend"
    ): this {
        this.setMode("luminosity");
        this.setIn(input1);
        this.setIn2(input2);
        this.setResult(result);
        return this;
    }

    /**
     * 背景とフォアグラウンドのブレンド
     */
    public blendWithBackground(
        foreground: string,
        mode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity" = "normal",
        result: string = "background-blend"
    ): this {
        this.setMode(mode);
        this.setIn("SourceGraphic");
        this.setIn2(foreground);
        this.setResult(result);
        return this;
    }

    /**
     * 複数画像の合成用ブレンド
     */
    public createLayerBlend(
        baseLayer: string,
        topLayer: string,
        blendMode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity",
        result: string = "layer-blend"
    ): this {
        this.setMode(blendMode);
        this.setIn(baseLayer);
        this.setIn2(topLayer);
        this.setResult(result);
        return this;
    }

    /**
     * テクスチャオーバーレイ
     */
    public createTextureOverlay(
        baseImage: string,
        texture: string,
        result: string = "texture-overlay"
    ): this {
        this.setMode("overlay");
        this.setIn(baseImage);
        this.setIn2(texture);
        this.setResult(result);
        return this;
    }

    /**
     * 照明効果（乗算）
     */
    public createLightingEffect(
        baseImage: string,
        lightMap: string,
        result: string = "lighting-effect"
    ): this {
        this.setMode("multiply");
        this.setIn(baseImage);
        this.setIn2(lightMap);
        this.setResult(result);
        return this;
    }

    /**
     * シャドウ合成
     */
    public createShadowComposite(
        mainImage: string,
        shadow: string,
        result: string = "shadow-composite"
    ): this {
        this.setMode("multiply");
        this.setIn(shadow);
        this.setIn2(mainImage);
        this.setResult(result);
        return this;
    }

    /**
     * ハイライト追加
     */
    public addHighlight(
        baseImage: string,
        highlight: string,
        result: string = "highlighted"
    ): this {
        this.setMode("screen");
        this.setIn(baseImage);
        this.setIn2(highlight);
        this.setResult(result);
        return this;
    }

    /**
     * カラーグレーディング
     */
    public createColorGrading(
        baseImage: string,
        gradingMap: string,
        mode: "overlay" | "soft-light" | "hard-light" | "color" = "overlay",
        result: string = "color-graded"
    ): this {
        this.setMode(mode);
        this.setIn(baseImage);
        this.setIn2(gradingMap);
        this.setResult(result);
        return this;
    }

    /**
     * 背景除去効果
     */
    public createBackgroundRemoval(
        foreground: string,
        background: string,
        result: string = "background-removed"
    ): this {
        this.setMode("difference");
        this.setIn(foreground);
        this.setIn2(background);
        this.setResult(result);
        return this;
    }

    /**
     * 画像マスキング
     */
    public createMaskedBlend(
        image: string,
        mask: string,
        mode: "normal" | "multiply" | "screen" = "multiply",
        result: string = "masked-blend"
    ): this {
        this.setMode(mode);
        this.setIn(image);
        this.setIn2(mask);
        this.setResult(result);
        return this;
    }

    /**
     * ダブルエクスポージャー効果
     */
    public createDoubleExposure(
        exposure1: string,
        exposure2: string,
        result: string = "double-exposure"
    ): this {
        this.setMode("screen");
        this.setIn(exposure1);
        this.setIn2(exposure2);
        this.setResult(result);
        return this;
    }

    /**
     * 入力ソースを変更
     */
    public changeInputs(input1: string, input2: string): this {
        this.setIn(input1);
        this.setIn2(input2);
        return this;
    }

    /**
     * ブレンドモードを動的に変更
     */
    public changeBlendMode(mode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity"): this {
        this.setMode(mode);
        return this;
    }
}
