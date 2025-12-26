import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeDisplacementMapOptions {
    className?: string | string[];
    id?: string;
    in?: string;
    in2?: string;
    scale?: number;
    xChannelSelector?: "R" | "G" | "B" | "A";
    yChannelSelector?: "R" | "G" | "B" | "A";
    result?: string;
}

/**
 * SVGフィルタープリミティブ：変位マップフィルター
 * 画像の色情報を使って別の画像を変形させる効果
 */
export class FeDisplacementMapC extends SvgFilterPrimitiveBase {
    constructor(options?: FeDisplacementMapOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.in) this.setIn(options.in);
            if (options.in2) this.setIn2(options.in2);
            if (options.scale !== undefined) this.setScale(options.scale);
            if (options.xChannelSelector) this.setXChannelSelector(options.xChannelSelector);
            if (options.yChannelSelector) this.setYChannelSelector(options.yChannelSelector);
            if (options.result) this.setResult(options.result);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeDisplacementMapElement();
        return new SvgElementProxy(element);
    }

    /**
     * 変位される画像の入力ソースを設定
     */
    public setIn(input: string): this {
        this.setSvgAttribute("in", input);
        return this;
    }

    /**
     * 変位される画像の入力ソースを取得
     */
    public getIn(): string | null {
        return this.getSvgAttribute("in");
    }

    /**
     * 変位マップの入力ソースを設定
     */
    public setIn2(input2: string): this {
        this.setSvgAttribute("in2", input2);
        return this;
    }

    /**
     * 変位マップの入力ソースを取得
     */
    public getIn2(): string | null {
        return this.getSvgAttribute("in2");
    }

    /**
     * 変位の強さ（スケール）を設定
     */
    public setScale(scale: number): this {
        this.setSvgAttribute("scale", scale.toString());
        return this;
    }

    /**
     * 変位の強さ（スケール）を取得
     */
    public getScale(): number | null {
        const value = this.getSvgAttribute("scale");
        return value ? Number(value) : null;
    }

    /**
     * X方向の変位に使用するチャンネルを設定
     */
    public setXChannelSelector(channel: "R" | "G" | "B" | "A"): this {
        this.setSvgAttribute("xChannelSelector", channel);
        return this;
    }

    /**
     * X方向の変位に使用するチャンネルを取得
     */
    public getXChannelSelector(): string | null {
        return this.getSvgAttribute("xChannelSelector");
    }

    /**
     * Y方向の変位に使用するチャンネルを設定
     */
    public setYChannelSelector(channel: "R" | "G" | "B" | "A"): this {
        this.setSvgAttribute("yChannelSelector", channel);
        return this;
    }

    /**
     * Y方向の変位に使用するチャンネルを取得
     */
    public getYChannelSelector(): string | null {
        return this.getSvgAttribute("yChannelSelector");
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
     * 基本的な波打ち効果
     */
    public createWaveEffect(
        sourceImage: string,
        displacementMap: string,
        scale: number = 20,
        result: string = "wave-effect"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(displacementMap);
        this.setScale(scale);
        this.setXChannelSelector("R");
        this.setYChannelSelector("G");
        this.setResult(result);
        return this;
    }

    /**
     * 水面の歪み効果
     */
    public createWaterDistortion(
        sourceImage: string,
        waterMap: string,
        intensity: number = 15,
        result: string = "water-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(waterMap);
        this.setScale(intensity);
        this.setXChannelSelector("R");
        this.setYChannelSelector("B");
        this.setResult(result);
        return this;
    }

    /**
     * ガラスの歪み効果
     */
    public createGlassDistortion(
        sourceImage: string,
        glassMap: string,
        distortion: number = 10,
        result: string = "glass-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(glassMap);
        this.setScale(distortion);
        this.setXChannelSelector("G");
        this.setYChannelSelector("B");
        this.setResult(result);
        return this;
    }

    /**
     * 熱気の歪み効果
     */
    public createHeatDistortion(
        sourceImage: string,
        heatMap: string,
        intensity: number = 25,
        result: string = "heat-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(heatMap);
        this.setScale(intensity);
        this.setXChannelSelector("R");
        this.setYChannelSelector("R");
        this.setResult(result);
        return this;
    }

    /**
     * 大気の揺らぎ効果
     */
    public createAtmosphereDistortion(
        sourceImage: string,
        atmosphereMap: string,
        shimmer: number = 8,
        result: string = "atmosphere-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(atmosphereMap);
        this.setScale(shimmer);
        this.setXChannelSelector("G");
        this.setYChannelSelector("R");
        this.setResult(result);
        return this;
    }

    /**
     * 雲の形状変形
     */
    public createCloudDistortion(
        sourceImage: string,
        cloudMap: string,
        flow: number = 30,
        result: string = "cloud-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(cloudMap);
        this.setScale(flow);
        this.setXChannelSelector("B");
        this.setYChannelSelector("G");
        this.setResult(result);
        return this;
    }

    /**
     * 炎の歪み効果
     */
    public createFlameDistortion(
        sourceImage: string,
        flameMap: string,
        flicker: number = 40,
        result: string = "flame-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(flameMap);
        this.setScale(flicker);
        this.setXChannelSelector("R");
        this.setYChannelSelector("A");
        this.setResult(result);
        return this;
    }

    /**
     * 液体の歪み効果
     */
    public createLiquidDistortion(
        sourceImage: string,
        liquidMap: string,
        viscosity: number = 18,
        result: string = "liquid-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(liquidMap);
        this.setScale(viscosity);
        this.setXChannelSelector("B");
        this.setYChannelSelector("R");
        this.setResult(result);
        return this;
    }

    /**
     * 風の歪み効果
     */
    public createWindDistortion(
        sourceImage: string,
        windMap: string,
        strength: number = 12,
        result: string = "wind-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(windMap);
        this.setScale(strength);
        this.setXChannelSelector("A");
        this.setYChannelSelector("G");
        this.setResult(result);
        return this;
    }

    /**
     * 磁場の歪み効果
     */
    public createMagneticDistortion(
        sourceImage: string,
        magneticMap: string,
        field: number = 35,
        result: string = "magnetic-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(magneticMap);
        this.setScale(field);
        this.setXChannelSelector("G");
        this.setYChannelSelector("A");
        this.setResult(result);
        return this;
    }

    /**
     * 音波の歪み効果
     */
    public createSoundWaveDistortion(
        sourceImage: string,
        soundMap: string,
        amplitude: number = 22,
        result: string = "sound-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(soundMap);
        this.setScale(amplitude);
        this.setXChannelSelector("B");
        this.setYChannelSelector("A");
        this.setResult(result);
        return this;
    }

    /**
     * 重力の歪み効果
     */
    public createGravityDistortion(
        sourceImage: string,
        gravityMap: string,
        pull: number = 50,
        result: string = "gravity-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(gravityMap);
        this.setScale(pull);
        this.setXChannelSelector("A");
        this.setYChannelSelector("A");
        this.setResult(result);
        return this;
    }

    /**
     * X軸のみの変位
     */
    public createHorizontalDisplacement(
        sourceImage: string,
        displacementMap: string,
        scale: number = 20,
        channel: "R" | "G" | "B" | "A" = "R",
        result: string = "horizontal-displacement"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(displacementMap);
        this.setScale(scale);
        this.setXChannelSelector(channel);
        this.setYChannelSelector("A"); // Aチャンネルで無変位
        this.setResult(result);
        return this;
    }

    /**
     * Y軸のみの変位
     */
    public createVerticalDisplacement(
        sourceImage: string,
        displacementMap: string,
        scale: number = 20,
        channel: "R" | "G" | "B" | "A" = "G",
        result: string = "vertical-displacement"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(displacementMap);
        this.setScale(scale);
        this.setXChannelSelector("A"); // Aチャンネルで無変位
        this.setYChannelSelector(channel);
        this.setResult(result);
        return this;
    }

    /**
     * 円形の歪み効果
     */
    public createRadialDistortion(
        sourceImage: string,
        radialMap: string,
        intensity: number = 25,
        result: string = "radial-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(radialMap);
        this.setScale(intensity);
        this.setXChannelSelector("R");
        this.setYChannelSelector("G");
        this.setResult(result);
        return this;
    }

    /**
     * 螺旋の歪み効果
     */
    public createSpiralDistortion(
        sourceImage: string,
        spiralMap: string,
        twist: number = 30,
        result: string = "spiral-distortion"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(spiralMap);
        this.setScale(twist);
        this.setXChannelSelector("B");
        this.setYChannelSelector("R");
        this.setResult(result);
        return this;
    }

    /**
     * チャンネルを設定
     */
    public setChannels(xChannel: "R" | "G" | "B" | "A", yChannel: "R" | "G" | "B" | "A"): this {
        this.setXChannelSelector(xChannel);
        this.setYChannelSelector(yChannel);
        return this;
    }

    /**
     * 変位の強度を調整
     */
    public adjustIntensity(multiplier: number): this {
        const currentScale = this.getScale() || 1;
        this.setScale(currentScale * multiplier);
        return this;
    }

    /**
     * 逆変位効果（反対方向）
     */
    public reverseDisplacement(): this {
        const currentScale = this.getScale() || 1;
        this.setScale(-currentScale);
        return this;
    }

    /**
     * 微細な変位効果
     */
    public createSubtleDisplacement(
        sourceImage: string,
        displacementMap: string,
        result: string = "subtle-displacement"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(displacementMap);
        this.setScale(5);
        this.setXChannelSelector("R");
        this.setYChannelSelector("G");
        this.setResult(result);
        return this;
    }

    /**
     * 極端な変位効果
     */
    public createExtremeDisplacement(
        sourceImage: string,
        displacementMap: string,
        result: string = "extreme-displacement"
    ): this {
        this.setIn(sourceImage);
        this.setIn2(displacementMap);
        this.setScale(100);
        this.setXChannelSelector("R");
        this.setYChannelSelector("G");
        this.setResult(result);
        return this;
    }

    /**
     * 変位マップの説明を取得
     */
    public getDisplacementDescription(): string {
        const scale = this.getScale() || 0;
        const xChannel = this.getXChannelSelector() || "R";
        const yChannel = this.getYChannelSelector() || "G";
        
        let intensity = "";
        if (Math.abs(scale) < 10) intensity = "微細";
        else if (Math.abs(scale) < 30) intensity = "中程度";
        else if (Math.abs(scale) < 60) intensity = "強";
        else intensity = "極端";
        
        return `${intensity}な変位 (X:${xChannel}チャンネル, Y:${yChannel}チャンネル, スケール:${scale})`;
    }
}
