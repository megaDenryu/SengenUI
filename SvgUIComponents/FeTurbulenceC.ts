import { SvgElementProxy } from "../SengenBase/SvgDomProxy";
import { SvgElementCreater } from "../SengenBase/SvgDomProxy";
import { SvgFilterPrimitiveBase } from "./BaseClasses/SvgFilterPrimitiveBase";

export interface FeTurbulenceOptions {
    className?: string | string[];
    id?: string;
    baseFrequency?: string | number;
    numOctaves?: string | number;
    seed?: string | number;
    stitchTiles?: "stitch" | "noStitch";
    type?: "fractalNoise" | "turbulence";
    result?: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}

/**
 * SVGフィルタープリミティブ：ノイズ生成
 * パーリンノイズやフラクタルノイズを生成
 */
export class FeTurbulenceC extends SvgFilterPrimitiveBase {
    constructor(options?: FeTurbulenceOptions) {
        super();
        this._svgDom = this.createSvgDomProxy();
        if (options) {
            if (options.className) this.addClass(options.className);
            if (options.id) this.setSvgAttribute("id", options.id);
            if (options.baseFrequency !== undefined) this.setBaseFrequency(options.baseFrequency);
            if (options.numOctaves !== undefined) this.setNumOctaves(options.numOctaves);
            if (options.seed !== undefined) this.setSeed(options.seed);
            if (options.stitchTiles) this.setStitchTiles(options.stitchTiles);
            if (options.type) this.setType(options.type);
            if (options.result) this.setResult(options.result);
            if (options.x !== undefined) this.setX(options.x);
            if (options.y !== undefined) this.setY(options.y);
            if (options.width !== undefined) this.setWidth(options.width);
            if (options.height !== undefined) this.setHeight(options.height);
        }
    }

    protected createSvgDomProxy(): SvgElementProxy {
        const element = SvgElementCreater.createFeTurbulenceElement();
        return new SvgElementProxy(element);
    }

    /**
     * 基本周波数を設定
     */
    public setBaseFrequency(frequency: string | number): this {
        this.setSvgAttribute("baseFrequency", frequency.toString());
        return this;
    }

    /**
     * 基本周波数を取得
     */
    public getBaseFrequency(): string | null {
        return this.getSvgAttribute("baseFrequency");
    }

    /**
     * X軸とY軸で異なる基本周波数を設定
     */
    public setBaseFrequencyXY(frequencyX: number, frequencyY: number): this {
        this.setSvgAttribute("baseFrequency", `${frequencyX} ${frequencyY}`);
        return this;
    }

    /**
     * オクターブ数を設定
     */
    public setNumOctaves(octaves: string | number): this {
        this.setSvgAttribute("numOctaves", octaves.toString());
        return this;
    }

    /**
     * オクターブ数を取得
     */
    public getNumOctaves(): string | null {
        return this.getSvgAttribute("numOctaves");
    }

    /**
     * シード値を設定
     */
    public setSeed(seed: string | number): this {
        this.setSvgAttribute("seed", seed.toString());
        return this;
    }

    /**
     * シード値を取得
     */
    public getSeed(): string | null {
        return this.getSvgAttribute("seed");
    }

    /**
     * タイル接続方式を設定
     */
    public setStitchTiles(stitchTiles: "stitch" | "noStitch"): this {
        this.setSvgAttribute("stitchTiles", stitchTiles);
        return this;
    }

    /**
     * タイル接続方式を取得
     */
    public getStitchTiles(): string | null {
        return this.getSvgAttribute("stitchTiles");
    }

    /**
     * ノイズタイプを設定
     */
    public setType(type: "fractalNoise" | "turbulence"): this {
        this.setSvgAttribute("type", type);
        return this;
    }

    /**
     * ノイズタイプを取得
     */
    public getType(): string | null {
        return this.getSvgAttribute("type");
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
     * 基本的なフラクタルノイズを作成
     */
    public createFractalNoise(
        frequency: number = 0.1,
        octaves: number = 3,
        seed: number = 0,
        result: string = "noise"
    ): this {
        this.setType("fractalNoise");
        this.setBaseFrequency(frequency);
        this.setNumOctaves(octaves);
        this.setSeed(seed);
        this.setResult(result);
        return this;
    }

    /**
     * 基本的なタービュランスを作成
     */
    public createTurbulence(
        frequency: number = 0.1,
        octaves: number = 3,
        seed: number = 0,
        result: string = "turbulence"
    ): this {
        this.setType("turbulence");
        this.setBaseFrequency(frequency);
        this.setNumOctaves(octaves);
        this.setSeed(seed);
        this.setResult(result);
        return this;
    }

    /**
     * 細かいノイズを作成
     */
    public createFineNoise(seed: number = 1, result: string = "fine-noise"): this {
        this.setType("fractalNoise");
        this.setBaseFrequency(0.8);
        this.setNumOctaves(4);
        this.setSeed(seed);
        this.setResult(result);
        return this;
    }

    /**
     * 粗いノイズを作成
     */
    public createCoarseNoise(seed: number = 2, result: string = "coarse-noise"): this {
        this.setType("fractalNoise");
        this.setBaseFrequency(0.02);
        this.setNumOctaves(2);
        this.setSeed(seed);
        this.setResult(result);
        return this;
    }

    /**
     * 雲模様を作成
     */
    public createCloudPattern(seed: number = 3, result: string = "clouds"): this {
        this.setType("fractalNoise");
        this.setBaseFrequency(0.05);
        this.setNumOctaves(6);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 大理石模様を作成
     */
    public createMarblePattern(seed: number = 4, result: string = "marble"): this {
        this.setType("turbulence");
        this.setBaseFrequency(0.08);
        this.setNumOctaves(4);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 木目模様を作成
     */
    public createWoodGrain(seed: number = 5, result: string = "wood"): this {
        this.setType("fractalNoise");
        this.setBaseFrequencyXY(0.3, 0.05);
        this.setNumOctaves(5);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 水面模様を作成
     */
    public createWaterSurface(seed: number = 6, result: string = "water"): this {
        this.setType("turbulence");
        this.setBaseFrequency(0.15);
        this.setNumOctaves(3);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 火炎模様を作成
     */
    public createFlamePattern(seed: number = 7, result: string = "flame"): this {
        this.setType("turbulence");
        this.setBaseFrequencyXY(0.1, 0.3);
        this.setNumOctaves(4);
        this.setSeed(seed);
        this.setResult(result);
        return this;
    }

    /**
     * 金属テクスチャを作成
     */
    public createMetalTexture(seed: number = 8, result: string = "metal"): this {
        this.setType("fractalNoise");
        this.setBaseFrequency(0.6);
        this.setNumOctaves(2);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 砂のテクスチャを作成
     */
    public createSandTexture(seed: number = 9, result: string = "sand"): this {
        this.setType("fractalNoise");
        this.setBaseFrequency(1.0);
        this.setNumOctaves(1);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 石のテクスチャを作成
     */
    public createStoneTexture(seed: number = 10, result: string = "stone"): this {
        this.setType("turbulence");
        this.setBaseFrequency(0.2);
        this.setNumOctaves(5);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 布のテクスチャを作成
     */
    public createFabricTexture(seed: number = 11, result: string = "fabric"): this {
        this.setType("fractalNoise");
        this.setBaseFrequencyXY(0.4, 0.4);
        this.setNumOctaves(3);
        this.setSeed(seed);
        this.setStitchTiles("stitch");
        this.setResult(result);
        return this;
    }

    /**
     * 草のテクスチャを作成
     */
    public createGrassTexture(seed: number = 12, result: string = "grass"): this {
        this.setType("turbulence");
        this.setBaseFrequencyXY(0.05, 0.4);
        this.setNumOctaves(4);
        this.setSeed(seed);
        this.setResult(result);
        return this;
    }

    /**
     * 雷模様を作成
     */
    public createLightningPattern(seed: number = 13, result: string = "lightning"): this {
        this.setType("turbulence");
        this.setBaseFrequency(0.3);
        this.setNumOctaves(1);
        this.setSeed(seed);
        this.setResult(result);
        return this;
    }

    /**
     * カスタムパターンを作成
     */
    public createCustomPattern(
        type: "fractalNoise" | "turbulence",
        frequencyX: number,
        frequencyY: number,
        octaves: number,
        seed: number,
        result: string,
        seamless: boolean = false
    ): this {
        this.setType(type);
        this.setBaseFrequencyXY(frequencyX, frequencyY);
        this.setNumOctaves(octaves);
        this.setSeed(seed);
        this.setStitchTiles(seamless ? "stitch" : "noStitch");
        this.setResult(result);
        return this;
    }

    /**
     * アニメーション用の動的シード設定
     */
    public setAnimatedSeed(baseSeed: number, timeOffset: number = 0): this {
        const animatedSeed = baseSeed + Math.floor(Date.now() / 1000 + timeOffset) % 1000;
        this.setSeed(animatedSeed);
        return this;
    }

    /**
     * 境界を拡張してタイリング効果を確保
     */
    public enableSeamlessTiling(): this {
        this.setStitchTiles("stitch");
        this.setX("0%");
        this.setY("0%");
        this.setWidth("100%");
        this.setHeight("100%");
        return this;
    }

    /**
     * 境界を自動拡張
     */
    public autoExtendBounds(paddingPercent: number = 20): this {
        this.setX(`-${paddingPercent}%`);
        this.setY(`-${paddingPercent}%`);
        this.setWidth(`${100 + paddingPercent * 2}%`);
        this.setHeight(`${100 + paddingPercent * 2}%`);
        return this;
    }
}
